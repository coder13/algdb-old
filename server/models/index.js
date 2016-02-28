'use strict';

const mongoose = require('mongoose');

module.exports = {
	Algset: mongoose.model('Algset', require('./algset'), 'algdb'),
	Subset: mongoose.model('Subset', require('./subset'), 'algdb'),
	Case: mongoose.model('Case', require('./case'), 'algdb'),
	Alg: mongoose.model('Alg', require('./alg'), 'algdb')
};
