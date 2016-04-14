'use strict';
const Boom = require('boom');
const Schema = require('mongoose').Schema;
const Algset = require('./algset');

const User = module.exports = new Schema({
	email: String,
	username: String,
	token: String,
	profile: {},
	role: String,
	algsets: [Algset]
});

// Deprecate?
User.statics.getRole = function (request, reply) {
	if (request.auth.isAuthenticated) {
		this.findOne({email: request.auth.credentials.profile.email}, function (err, user) {
			request.role = user.role;
			reply.continue();
		});
	} else {
		reply.continue();
	}
};

// Returns function that allows request to continue if user meets the role.
// TODO: Turn into hierarchy where Admins stumps Moderator Stumps User.
User.statics.role = function (role) {
	return function (request, reply) {
		if (request.auth.isAuthenticated) {
			this.findOne({email: request.auth.credentials.profile.email}, function (err, user) {
				if (user.role === role) {
					request.role = user.role;
					reply.continue();
				} else {
					reply(Boom.unauthorized('You do not have the correct permissions.'));
				}
			});
		} else {
			reply(Boom.unauthorized('Please login.'));
		}
	};
};
