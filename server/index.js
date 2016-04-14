'use strict';

const DEV = process.env.NODE_ENV === 'dev';

const app = require('ampersand-app');
const fs = require('fs');
const path = require('path');
const Hapi = require('hapi');
const Hoek = require('hoek');
const boom = require('boom');
const mongoose = require('mongoose');
const config = require('./config');

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
		methods: ['POST, GET, OPTIONS, PUT, DELETE'],
		origins: ['*'],
		allowCredentials: 'true'
	}
},
	require('inert'),
	require('hapi-auth-cookie'),
	require('bell'),
	require('./auth'),
	require('./api')
];

if (DEV) {
	plugins.push({
		register: require('h2o2')
	});
}

const App = global.App = app.extend({
	init: function () {
		let server = this.server = new Hapi.Server({
			debug: {
				request: ['error']
			},
			connections: {
				routes: {
					files: {
						relativeTo: path.join(__dirname, '../app/public')
					}
				}
			}
		});

		// Configure connection
		server.connection({
			port: config.port
		});

		// Database
		mongoose.connect(config.db.url);
		this.mongoose = mongoose;
		this.db = this.mongoose.connection;

		this.db.on('error', console.error.bind(console, 'connection error:'));
		this.db.once('open', function() {
			console.log('Connected to db', config.db.url);
		});

		this.models = require('./models');

		server.register(plugins, function (err) {
			if (err) {
				console.error(77, err);
			}
			const tryAuth = {
				strategy: 'session',
				mode: 'optional'
			};

			// Should go into seperate files:
			if (DEV) {
				console.log('Setting up proxy...');
				server.route({
					method: 'GET',
					path: '/{path*}',
					config: {
						auth: tryAuth,
						plugins: {
							'hapi-auth-cookie': {
								redirectTo: false
							}
						},
						handler: {
							proxy: {
								host: '0.0.0.0',
								port: '3000',
								protocol: 'http',
								passThrough: true
							}
						}
					}
				});
			} else {
				server.route({
					method: 'GET',
					path: '/{path*}',
					handler: {
						directory: {
							path: '.',
							index: true,
							listing: false,
							showHidden: false
						}
					}
				});

				// server.route({
				// 	method: 'GET',
				// 	path: '/{path*}',
				// 	config: {
				// 		auth: tryAuth,
				// 		plugins: {
				// 			'hapi-auth-cookie': {
				// 				redirectTo: false
				// 			}
				// 		},
				// 		// handler: {
				// 		// 	file: {
				// 		// 		path: 'index.html'
				// 		// 	}
				// 		// }
				// 	}
				// });

				server.ext('onPostHandler', function (request, reply) {
					const response = request.response;
					if (response.isBoom && response.output.statusCode === 404) {
						console.log(request.path);
						return reply.file('404.html', {
							filename: request.path
						});
					}

					return reply.continue();
				});
			}
			App.start();
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
