require('./styles/main.styl');
require('jquery');
require('./lib/bootstrap.min.js');
require('./globals.js')

const App = require('ampersand-app');
const Router = require('./router');
const Me = require('./models/me');

if (typeof window !== 'undefined') {
	window.React = require('react');
}

const app = window.app = App.extend({
	init () {
		this.me = new Me();
		this.router = new Router();
		this.router.history.start();
	}
});

app.init();
