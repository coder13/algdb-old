'use strict';

const Users = require('./users');

module.exports.register = function(server, options, next) {
	server.log('Setting up auth...');

	if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
		throw new Error('Enviroment variables CLIENT_ID and/or CLIENT_SECRET not defined.');
	}

	console.log(`CLIENT_ID: ${process.env.CLIENT_ID}`);
	console.log(`CLIENT_SECRET: ${process.env.CLIENT_SECRET}`);

	// Setup the social WCA login strategy
	server.auth.strategy('wca', 'bell', {
		provider: {
			name: 'wca',
			useParamsAuth: true,
			protocol: 'oauth2',
			auth: 'https://www.worldcubeassociation.org/oauth/authorize',
			token: 'https://www.worldcubeassociation.org/oauth/token',
			scope: ['email', 'public'],
			scopeSeparator: ' ',
			profile: function (credentials, params, get, callback) {
				get('https://www.worldcubeassociation.org/api/v0/me', null, function (resp) {
					credentials.profile = resp.me;
					callback();
				});
			}
		},
		password: 'secret_cookie_encryption_password', //Use something more secure in production
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		isSecure: false //Should be set to true (which is the default) in production
	});

	//Setup the session strategy
	server.auth.strategy('session', 'cookie', {
		password: 'secret_cookie_encryption_password', //Use something more secure in production
		cookie: 'sid-algdb',
		redirectTo: '/', //If there is no session, redirect here
		isSecure: false //Should be set to true (which is the default) in production,
	});

	server.ext('onPostAuth', function (request, reply) {
		if (request.route.settings.role) {
			console.log(request.route.settings.role)
		}
		reply.continue();
	});

	// server.auth.scheme('users', Users);

	// server.auth.strategy('admin', 'users', {role: 'Admin'});
	// server.auth.strategy('moderator', 'users', {role: 'Moderator'});
	// server.auth.strategy('user', 'users', {role: 'User'});

	//Added a separate file for just routes.
	server.route(require('./routes'));
	next();
};

module.exports.register.attributes = {
	pkg: {
		name: 'auth',
		version: '0'
	}
};
