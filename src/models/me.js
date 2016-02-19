const Model = require('ampersand-model');

module.exports = Model.extend({
	props: {
		filterCaseType: {
			type: 'array',
			default: (() => [])
		}, filterAlgType: {
			type: 'array',
			default: (() => [])
		}
	},

	initialize () {
		this.load();
		this.save();
	},

	save () {
		console.log('saving...');
		console.log(JSON.stringify(this));
		window.localStorage['clltrainer'] = JSON.stringify(this);
	},

	load () {
		if (window.localStorage.getItem('clltrainer')) {
			this.set(JSON.parse(window.localStorage.getItem('clltrainer')));
		}
	}
});
