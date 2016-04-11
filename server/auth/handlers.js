'use strict';
const qs = require('qs');

const User = App.models.User;

module.exports = {
	login: function (request, reply) {
		if (!request.auth.isAuthenticated) {
			return reply('Authentication failed due to: ' + request.auth.error.message);
		}

		let creds = request.auth.credentials;

		request.cookieAuth.set(creds);

		// Add/update user if they don't exist.
		User.update({email: creds.profile.email},
			{$set: {
				email: creds.profile.email,
				profile: creds.profile
			}},
			{upsert: true},
			function (err, numAffected) {
				if (err) {
					console.error(err);
				}
			});

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
