const _ = require('lodash');
const Collection = require('ampersand-collection');
const Model = require('ampersand-model');

module.exports = Model.extend({
	props: {
		id: 'string',
		name: 'string',
		image: 'string',
		description: 'string',
		algs: 'array',

		cube: 'object',
		mask: 'number'
	},

	derived: {
		algCount: {
			deps: [],
			fn: function () {
				return this.algs.length;
			}
		}
	}
});
