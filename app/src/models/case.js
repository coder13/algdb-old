const _ = require('lodash');
const Model = require('ampersand-model');
const Collection = require('ampersand-collection');
const Alg = require('./alg');
const Cube = require('./cube');

const Algs = Collection.extend({
	idAttribute: '_id',
	model: Alg,

	initialize () {
		// Propagate the event upwards.
		this.on('all', function (name, event) {
			this.parent.trigger(name, event);
		}, this);
	},

	save () {
		this.parent.save();
	}
});

module.exports = Model.extend({
	props: {
		id: 'string',
		image: 'string',
		description: 'string',

		cube: {
			type: 'object',
			default: (() => solved())
		},
		mask: {
			type: 'number',
			default: 0b11111111111111111111
		}
	},

	derived: {
		algCount: {
			deps: [],
			fn: function () {
				return this.algs.length;
			}
		}
	},

	collections: {
		algs: Algs
	},

	initialize (options) {
		options = options || {};

		if (options.cube) {
			this.set('cube', new Cube(options.cube));
		} else {
			this.set('cube', new Cube(solved()));
		}
	},

	addAlg (alg) {
		let newAlg = this.algs.add(new Alg(alg));
		this.trigger('change', alg);
		// this.save();
		return newAlg;
	},

	remove () {
		this.collection.remove(this);
		this.collection.save();
	},

	save () {
		this.collection.save();
	}
});
