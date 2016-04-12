'use strict';

const Joi = require('joi');
const Boom = require('boom');
const mongoose = require('mongoose');
const User = App.models.User;

module.exports = {
	getRole: function (request, reply) {
		if (request.auth.isAuthenticated) {
			User.findOne({email: request.auth.credentials.profile.email}, function (err, user) {
				request.role = user.role;
				reply.continue();
			});
		} else {
			reply.continue();
		}
	},

	getAll: function (request, reply) {
		if (request.role === 'Admin') {
			User.find(function (err, users) {
				if (err) {
					return reply(Boom.internal('Internal MongoDB error', err));
				}

				reply(users);
			});
		} else {
			reply(Boom.unauthorized());
		}
	},

	setRole: function (request, reply) {
		if (request.role !== 'Admin') {
			reply(Boom.unauthorized());
		} else {
			reply('good');
		}
	}
};
