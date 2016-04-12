'use strict';

module.exports.register = function(server, options, next) {
	server.log('info', 'Setting up app routes...');

	const tryAuth = {
		strategy: 'session',
		mode: 'optional'
	};

	// Should go into seperate files:
	if (optins.dev) {
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
			path: '/',
			config: {
				auth: tryAuth,
				plugins: {
					'hapi-auth-cookie': {
						redirectTo: false
					}
				},
				handler: {
					file: {
						path: 'index.html'
					}
				}
			}
		});

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

		server.ext('onPostHandler', function (request, reply) {
			const response = request.response;
			if (response.isBoom && response.output.statusCode === 404) {
				return reply.file('404.html');
			}

			return reply.continue();
		});
	}
};

module.exports.register.attributes = {
	pkg: {
		name: 'api',
		version: '0'
	}
};
