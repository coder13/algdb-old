'use strict';

const Boom = require('boom');
const Algset = require('./handlers/algset');

const base = '/api/v0';

module.exports = [{
/*	Algsets: 	*/
	method: 'GET',
	path: `${base}/algsets`,
	config: {
		handler: Algset.getAll
	}
}, { // get algset
	method: 'GET',
	path: `${base}/algsets/{id}`,
	config: {
		handler: Algset.get
	}
}, { // create
	method: 'POST',
	path: `${base}/algsets/{id}`,
	config: {
		auth: 'session',
		validate: Algset.validate,
		handler: Algset.create
	}
}, { // update
	method: 'PUT',
	path: `${base}/algsets/{id}`,
	config: {
		auth: 'session',
		validate: Algset.validate,
		handler: Algset.update
	}
}, { // delete
	method: 'DELETE',
	path: `${base}/algsets/{id}`,
	config: {
		auth: 'session',
		handler: Algset.remove
	}
}];
