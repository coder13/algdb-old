'use strict';

const Boom = require('boom');
const Joi = require('joi');
const flat = require('flat');
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
			console.log(82,flat(request.payload));
			Algset.findOneAndUpdate({id: request.params.id}, flat(request.payload), function (err, algset) {
				console.log(84, err, algset.cases);
				if (err) {
					reply(Boom.badData(err));
				} else {
					reply(algset);
				}
			});
			// Algset.findByID(request.params.id, function (err, algset) {
			// 	if (!algset || algset.length === 0) {
			// 		return reply(Boom.notFound(`Algset with id, ${request.params.id}, could not be found`));
			// 	}

			// 	delete request.payload._id;
			// 	request.payload.modified = new Date();
			// 	console.log(87, request.payload.cases);
			// 	Algset.update({id: algset.id}, request.payload, {multi: false}, function (err, set) {
			// 		if (err) {
			// 			reply(Boom.badData(err));
			// 		} else {
			// 			reply(set);
			// 		}
			// 	});
			// });
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
