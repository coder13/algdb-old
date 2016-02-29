'use strict';
const Schema = require('mongoose').Schema;
const Case = require('./case');

const Algset = module.exports = new Schema();
Algset.add({ // becasue of problems defining recrusive schema
	id: String,
	name: String,
	abbrev: String,
	description: String,
	Subsets: [Algset],
	Cases: [Case]
});

Algset.statics.findByName = function (name, cb) {
	return this.find({name: name});
};
