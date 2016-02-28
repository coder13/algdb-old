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

const app = window.app = App.extend({
	init () {
		this.me = new Me();

		this.algsets = new Algsets();
		this.algsets.fetch({
			success: function () {
				app.router = new Router();
				app.router.history.start();
			}
		});

	},

	findAlgset (name) {
		if (typeof name === 'string') {
			return app.DB.find(set => (set.id || set.abbrev || set.name || '').toLowerCase() === name.toLowerCase());
		}
		return name;
	}
}, Config);

app.init();