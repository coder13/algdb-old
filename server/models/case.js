'use strict';
const Schema = require('mongoose').Schema;
const Alg = require('./alg');

const Case = module.exports = new Schema({
	id: String,
	name: String,
	cube: Object,
	comment: String,
	algs: [Alg]
});

Case.statics.findByName = function (name, cb) {
	return this.find({name: name});
};
