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
const DB = require('./data/algs');

if (typeof window !== 'undefined') {
	window.React = require('react');
}

const app = window.app = App.extend({
	init () {
		this.me = new Me();

		this.algsets = new Algsets();
		this.algsets.fetch({
			success: function () {
				app.router = new Router();
				app.router.history.start();
			},
			error: function () {
				app.router = new Router();
				app.router.history.start();
			}
		});
	},

	addAlgset (algset) {
		if (algset.name.length > 10) {
			algset.abbrev = algset.name.split(' ').map(i => i ? i[0].toUpperCase() : '').join('');
		}

		app.algsets.create(algset, {
			success: () => console.log('Successfully created algset.')
		});
	},

	findAlgset (name) {
		if (typeof name === 'string') {
			return app.DB.find(set => (set.algsetID || set.abbrev || set.name || '').toLowerCase() === name.toLowerCase());
		}
		return name;
	}
}, Config);

app.init();
