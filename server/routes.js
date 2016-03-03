'use strict';

const Boom = require('boom');
const Joi = require('joi');
const mongoose = require('mongoose');
const Algset = App.models.Algset;

const validateAlgset = {
	payload: {
		name: Joi.string().required(),
		id: Joi.string(),
		image: Joi.string(),
		abbrev: Joi.string(),
		description: Joi.string(),
		subsets: Joi.array(),
		cases: Joi.array()
	}
};

module.exports = [{
/*	Algsets: 	*/

	method: 'GET',
	path: '/algsets',
	config: {
		handler: function (request, reply) {
			Algset.find(function (err, algsets) {
				if (err) {
					return reply(Boom.internal('Internal MongoDB error', err));
				}

				reply(algsets);
			});
		}
	}
}, { // get algset
	method: 'GET',
	path: '/algsets/{id}',
	config: {
		handler: function (request, reply) {
			App.db.collection('algdb').findOne({id: request.params.id}, function (err, algset) {
				if (err) {
					return reply(Boom.internal('Internal MongoDB error', err));
				}
				reply(algset);
			});
		}
	}
}, { // create
	method: 'POST',
	path: '/algsets/{id}',
	config: {
		auth: 'simple',
		validate: validateAlgset,
		handler: function (request, reply) {
			let algset = new Algset({
				id: request.params.id,
				name: request.payload.name,
				image: request.params.image,
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
		}
	}
}, { // update
	method: 'PUT',
	path: '/algsets/{id}',
	config: {
		auth: 'simple',
		validate: validateAlgset,
		handler: function (request, reply) {
			reply(Boom.notFound());
		}
	}
}, { // delete
	method: 'DELETE',
	path: '/algsets/{id}',
	config: {
		auth: 'simple',
		handler: function (request, reply) {
			reply(Boom.notFound());
		}
	}
}];
