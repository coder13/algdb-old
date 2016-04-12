'use strict';

const Boom = require('boom');
const handlers = require('./handlers');

const base = '/api/v0';

module.exports = [{
	method: 'GET',
	path: `${base}/users`,
	config: {
		auth: 'session',
		pre: [{method: handlers.getRole}],
		handler: handlers.getAll
	}
}];
