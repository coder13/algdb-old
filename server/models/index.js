'use strict';

const mongoose = require('mongoose');
const Algset = require('./algset');
const Case = require('./case');
const Alg = require('./alg');
const User = require('./user');

module.exports = {
	Algset: mongoose.model('Algset', Algset, 'algsets'),
	Case: mongoose.model('Case', Case, 'algsets'),
	Alg: mongoose.model('Alg', Alg, 'algsets'),

	User: mongoose.model('User', User, 'users')
};
