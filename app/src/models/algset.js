const app = require('ampersand-app');
const Model = require('ampersand-model');
const Cases = require('./case-collection');

const countSet = function (subset) {
	return (subset.cases ? subset.cases.length : 0) +
	(subset.subsets && subset.subsets.length > 0 ? subset.subsets.map(countSet).reduce((a,b) => a + b) : 0);
};

const Algset = module.exports = Model.extend({
	idAttribute: '_id',
	props: {
		_id: 'string',
		id: 'string',
		name: 'string',
		image: 'string',
		abbrev: 'string',
		description: 'string',
		cube: 'object',
		subsets: 'array'
		// cases: 'array',
	},

	derived: {
		caseCount: {
			deps: [],
			fn: function () {
				return countSet(this);
			}
		}
	},

	collections: {
		cases: Cases
	},

	ajaxConfig () {
		return {
			headers: {
				authorization: 'Basic YWw6Z3M=' // al:gs
			},
			xhrFields: {
				withCredentials: true
			}
		};
	},

	url () {
		let id = this.get('id');
		return `${app.baseURL}/algsets/${id}`;
	}
});
