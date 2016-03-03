'use strict';

const app = require('ampersand-app');
const Hapi = require('hapi');
const Hoek = require('hoek');
const boom = require('boom');
const mongoose = require('mongoose');
const config = require('./config');

const users = {
	al: {
		username: 'al',
		password: 'gs',
		name: 'Al Gs',
		id: '2133d32a'
	}
};

const plugins = [{
	register: require('good'),
	options: {
		reporters: [{
			reporter: require('good-console'),
			events: {log: '*', response: '*'}
		}]
	}
}, {
	register: require('hapi-cors'),
	options: {
		methods: ['POST, GET, OPTIONS, PUT, DELTE'],
		origins: ['http://localhost:3000']
	}
}];

const validate = function (request, username, password, callback) {
	const user = users[username];
	if (!user) {
		return callback(null, false);
	}

	if (password === user.password) {
		callback(null, true, {
			id: user.id,
			name: user.name
		});
	} else {
		callback(null, false);
	}
	// bcrypt.compare(password, user.password, (err, isValid) => {
	// 	callback(err, isValid, { id: user.id, name: user.name });
	// });
};

const App = global.App = app.extend({
	init: function () {
		let server = this.server = new Hapi.Server({
			debug: {
				request: ['error']
			}
		});

		server.connection({
			port: config.port
		});

		mongoose.connect(config.db.url);
		this.mongoose = mongoose;
		this.db = this.mongoose.connection;

		this.db.on('error', console.error.bind(console, 'connection error:'));
		this.db.once('open', function() {
			console.log('Connected to db', config.db.url);
		});

		this.models = require('./models');

		server.register(require('hapi-auth-basic'), function (err) {
			Hoek.assert(!err, 'Error registering hapi-auth-basic');
			server.auth.strategy('simple', 'basic', {validateFunc: validate});

			server.register(plugins, function (err) {
				server.route(require('./routes'));

				App.start();
			});
		});
	},

	start: function () {
		App.server.start(function (err) {
			Hoek.assert(!err, 'Failed to start server: ' + err);

			App.server.log('Server running at:', App.server.info.uri);
		});
	}
});

app.init();
