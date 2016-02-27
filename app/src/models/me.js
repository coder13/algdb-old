const Model = require('ampersand-model');

module.exports = Model.extend({
	props: {

	},

	initialize () {
		this.load();
		this.save();
	},

	save () {
		console.log('saving...', JSON.stringify(this));
		window.localStorage.setItme('algdb_me', JSON.stringify(this));
	},

	load () {
		if (window.localStorage.getItem('algdb_me')) {
			this.set(JSON.parse(window.localStorage.getItem('algdb_me')));
		}
	}
});
