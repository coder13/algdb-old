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
		console.log(15, _case);
		if (!_case.name) {
			_case.name = (this.models.length).toString();
		}

		return this.add(_case);
	},

	save () {
		this.parent.save();
	}
});
