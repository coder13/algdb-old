'use strict';

const mongoose = require('mongoose');
const Algset = require('./algset');
const Case = require('./case');
const Alg = require('./alg');

module.exports = {
	Algset: mongoose.model('Algset', Algset, 'algsets'),
	Case: mongoose.model('Case', Case, 'algsets'),
	Alg: mongoose.model('Alg', Alg, 'algsets')
};
