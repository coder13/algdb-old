const Collection = require('ampersand-collection');
const Alg = require('./alg');

module.exports = Collection.extend({
	model: Alg,

	initialize () {
		// Propagate the event upwards.
		this.on('all', function (name, event) {
			this.parent.trigger(name, event);
		}, this);
	},

	addAlg (alg) {
		alg = alg || {};
		if (!alg.id) {
			alg.id = (this.models.length).toString();
		}

		this.trigger('change');
		return this.add(alg);
	},

	save () {
		this.parent.save();
	}
});
