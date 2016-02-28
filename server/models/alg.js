'use strict';
const Schema = require('mongoose').Schema;

const Alg = module.exports = new Schema({
	id: String,
	type: String,
	auf: Object,
	comment: String,
	alg: String
});

Alg.statics.findByName = function (name, cb) {
	return this.find({name: name});
};

Alg.statics.compileName = function () {
	return this.auf + this.alg;
};
