'use strict';

const Boom = require('boom');
const Algset = require('./handlers/algset');

module.exports = [{
/*	Algsets: 	*/
	method: 'GET',
	path: '/algsets',
	config: {
		handler: Algset.getAll
	}
}, { // get algset
	method: 'GET',
	path: '/algsets/{id}',
	config: {
		handler: Algset.get
	}
}, { // create
	method: 'POST',
	path: '/algsets/{id}',
	config: {
		auth: 'simple',
		validate: Algset.validate,
		handler: Algset.create
	}
}, { // update
	method: 'PUT',
	path: '/algsets/{id}',
	config: {
		auth: 'simple',
		validate: Algset.validate,
		handler: Algset.update
	}
}, { // delete
	method: 'DELETE',
	path: '/algsets/{id}',
	config: {
		auth: 'simple',
		handler: Algset.remove
	}
}];
