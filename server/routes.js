'use strict';

const Boom = require('boom');
const Joi = require('joi');
const mongoose = require('mongoose');
const Algset = App.models.Algset;

const validateAlgset = {
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
		}
	}
}, { // update
	method: ['PUT', 'PATCH'],
	path: '/algsets/{id}',
	config: {
		auth: 'simple',
		validate: validateAlgset,
		handler: function (request, reply) {
			Algset.findOneAndUpdate({id: request.params.id}, request.payload, function (err, algset) {
				console.log(84, err, algset.cases);
				if (err) {
					reply(Boom.badData(err));
				} else {
					reply(algset);
				}
			});
		}
	}
}, { // delete
	method: 'DELETE',
	path: '/algsets/{id}',
	config: {
		auth: 'simple',
		handler: function (request, reply) {
			Algset.findOneAndRemove({id: request.params.id}, function (err, doc, result) {
				if (err) {
					return reply(Boom.badData(err));
				}
				return reply(doc);
			});
		}
	}
}];
