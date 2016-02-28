'use strict';
const Schema = require('mongoose').Schema;

const Algset = module.exports = new Schema({
	id: String,
	name: String,
	abbrev: String,
	description: String,
	Subsets: Array,
	Cases: Array
});

Algset.statics.findByName = function (name, cb) {
	return this.find({name: name});
};
