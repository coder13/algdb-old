require('./assets/favicon.png');
require('./styles/main.styl');
require('jquery');
require('./lib/bootstrap.min.js');
require('./globals.js');

const App = require('ampersand-app');
const Router = require('./router');
const Me = require('./models/me');
const Algsets = require('./models/algset-collection');
const Config = require('./config');

if (typeof window !== 'undefined') {
	window.React = require('react');
}

if (typeof window !== 'undefined') {
	window.Lodash = require('lodash');
}

const app = window.app = App.extend({
	init () {
		this.me = new Me();
		this.me.fetch();

		this.algsets = new Algsets();

		app.router = new Router();
		app.router.history.start();
	},

	addAlgset (algset) {
		if (algset.name.length > 10) {
			algset.abbrev = algset.name.split(' ').map(i => i ? i[0].toUpperCase() : '').join('');
		}

		app.algsets.create(algset, {
			success: () => console.log('Successfully created algset.')
		});
	}
}, Config);

app.init();
