'use strict';
const Schema = require('mongoose').Schema;

const Alg = module.exports = new Schema({
	id: String,
	type: String,
	auf: String,
	comment: String,
	alg: String
});

Alg.statics.compileName = function () {
	return this.auf + this.alg;
};
