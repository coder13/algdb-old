'use strict';
const qs = require('qs');

module.exports = {
	login: function (request, reply) {
		if (!request.auth.isAuthenticated) {
			return reply('Authentication failed due to: ' + request.auth.error.message);
		}

		request.cookieAuth.set(request.auth.credentials);

		return reply.redirect('/');
	},

	logout: function(request, reply) {
		request.cookieAuth.clear();
		return reply().redirect('/');
	},

	profile: function (request, reply) {
		if (request.auth.isAuthenticated) {
			reply(request.auth.credentials.profile);
		} else {
			reply().code(401);
		}
	}
};
