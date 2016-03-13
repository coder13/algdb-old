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

		this.algsets = new Algsets();
		this.algsets.fetch({
			success: function (coll, response, options) {
				console.log('Grabbed', response.length, 'algsets');
				app.router = new Router();
				app.router.history.start();
			},
			error: function (coll, response, options) {
				let error = JSON.parse(response.body);
				console.error('Error:', error.statusCode, error.error);
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
	}
}, Config);

app.init();
