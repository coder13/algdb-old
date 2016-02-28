const Model = require('ampersand-model');

module.exports = Model.extend({
	props: {

	},

	initialize () {
		this.login();
	},

	login () {

	},

	save () {
		console.log('saving...', JSON.stringify(this));
		window.localStorage.setItem('algdb_me', JSON.stringify(this));
	},

	load () {
		if (window.localStorage.getItem('algdb_me')) {
			this.set(JSON.parse(window.localStorage.getItem('algdb_me')));
		}
	}
});
