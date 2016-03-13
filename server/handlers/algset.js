'use strict';

const Joi = require('joi');
const Boom = require('boom');
const mongoose = require('mongoose');
const Algset = App.models.Algset;

module.exports = {
	validate: {
		payload: {
			_id: Joi.string(),
			name: Joi.string().required(),
			id: Joi.string(),
			image: Joi.string(),
			abbrev: Joi.string(),
			description: Joi.string(),
			cube: Joi.object(),
			subsets: Joi.array(),
			cases: Joi.array()
		}
	},

	getAll: function (request, reply) {
		Algset.find(function (err, algsets) {
			if (err) {
				return reply(Boom.internal('Internal MongoDB error', err));
			}

			reply(algsets);
		});
	},

	get: function (request, reply) {
		console.log(33, request.params.id);
		App.db.collection('algdb').findOne({id: request.params.id}, function (err, algset) {
			if (err) {
				return reply(Boom.internal('Internal MongoDB error', err));
			} else if (algset) {
				console.log(algset);
				return reply(algset);
			}
			reply().code(404);
		});
	},

	create: function (request, reply) {
		let algset = new Algset({
			id: request.params.id,
			name: request.payload.name,
			image: request.payload.image,
			abbrev: request.payload.abbrev,
			description: request.payload.description
		});
		algset.save(function (err, algset) {
			if (err) {
				reply(Boom.badData(err));
			} else {
				reply(algset);
			}
		});
	},

	update: function (request, reply) {
		Algset.findOneAndUpdate({id: request.params.id}, request.payload, function (err, algset) {
			if (err) {
				reply(Boom.badData(err));
			} else {
				reply().code(200);
			}
		});
	},

	remove: function (request, reply) {
		Algset.findOneAndRemove({id: request.params.id}, function (err, algset, result) {
			if (err) {
				return reply(Boom.badData(err));
			}
			return reply().code(200);
		});
	}
};
