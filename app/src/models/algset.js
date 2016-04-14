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

	url () {
		let id = this.get('id');
		let baseURL = this.collection ? this.collection.url() : `${app.apiURL}/algsets`;
		return `${baseURL}/${id}`;
	}
});
