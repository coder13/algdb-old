const Model = require('ampersand-model');

module.exports = Model.extend({
	props: {
		id: 'string',
		name: 'string',
		image: 'string',
		description: 'string',
		algs: 'array',

		cube: 'object',
		cp: 'array',
		co: 'array',
		ep: 'array',
		eo: 'array',
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
