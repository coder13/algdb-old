const app = require('ampersand-app');
const Model = require('ampersand-model');
const Collection = require('ampersand-collection');
const Case = require('./case');

const countSet = function (subset) {
	return (subset.cases ? subset.cases.length : 0) +
	(subset.subsets ? subset.subsets.map(countSet).reduce((a,b) => a + b) : 0);
};

const Cases = Collection.extend({
	model: Case
});

const Algset = module.exports = Model.extend({
	idAttribute: '_id',
	props: {
		_id: 'string',
		id: 'string',
		name: 'string',
		image: 'string',
		abbrev: 'string',
		description: 'string',
		subsets: 'array',
		cases: 'array',

		cube: 'object',
		cp: 'array',
		co: 'array',
		ep: 'array',
		eo: 'array',
		mask: 'number'
	},

	derived: {
		caseCount: {
			deps: [],
			fn: function () {
				return countSet(this);
			}
		}
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
