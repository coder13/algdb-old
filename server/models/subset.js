'use strict';
const Schema = require('mongoose').Schema;

const Subset = module.exports = new Schema({
	id: String,
	name: String,
	description: String,
	subsets: Array,
	cases: Array
});

Subset.statics.findByName = function (name, cb) {
	return this.find({name: name});
};
