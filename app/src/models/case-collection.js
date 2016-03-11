const Collection = require('ampersand-rest-collection');
const Case = require('./case');

module.exports = Collection.extend({
	model: Case,

	initialize () {
		// Propgate event upwards
		this.on('all', function (name, event) {
			this.parent.trigger(name, event);
		}, this);
	},

	addCase (_case) {
		if (!_case.id) {
			_case.id = (this.models.length).toString();
		}

		return this.add(_case);
	},

	save () {
		this.parent.save();
	}
});
