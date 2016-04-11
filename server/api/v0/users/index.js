'use strict';

const Boom = require('boom');
const handlers = require('./handlers');

const base = '/api/v0';

module.exports = [{
/*	Users: 	*/
	method: 'GET',
	path: `${base}/users`,
	config: {
		auth: 'session',
		pre: [{method: handlers.getRole}],
		handler: handlers.getAll
	}
}, { // get algset
	method: 'GET',
	path: `${base}/users/{id}`,
	config: {
		handler: handlers.get
	}
}, { // update
	method: 'PUT',
	path: `${base}/users/{id}/setrole`,
	config: {
		auth: 'session',
		handler: handlers.setRole
	}
}];
