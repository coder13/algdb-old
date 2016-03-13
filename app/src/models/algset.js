const app = require('ampersand-app');
const Model = require('ampersand-model');
const Cases = require('./case-collection');
const Cube = require('./cube');

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
		cube: {
			type: 'object',
			default: (() => solved())
		},
		subsets: {
			type: 'array',
			default: (() => [])
		}
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

	initialize (options) {
		// this.on('all', function (name, event) {
		// 	console.log(39, name, event);
		// })

		if (options.cube) {
			this.set('cube', new Cube(options.cube));
		} else {
			this.set('cube', new Cube(solved()));
		}
	},

	addCase (_case) {
		return this.cases.addCase(_case);
	},

	removeCase (_case) {
		this.cases.remove(_case);
		this.trigger('change'); // ugh
		this.save();
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
		let baseURL = this.collection ? this.collection.url() : `${app.baseURL}/algsets`;
		return `${baseURL}/${id}`;
	}
});
