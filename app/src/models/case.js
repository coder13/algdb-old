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

	initialize (options) {
		this.cube = _.merge({}, solved(), {
			corners: {perm: options.cp, orient: options.co},
			edges: {perm: options.ep, orient: options.eo}
		});
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
