'use strict';
const Schema = require('mongoose').Schema;

const Case = module.exports = new Schema({
	id: String,
	name: String,
	cube: Object,
	comment: String,
	algs: Array
});

Case.statics.findByName = function (name, cb) {
	return this.find({name: name});
};
