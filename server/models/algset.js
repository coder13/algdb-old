'use strict';
const flat = require('flat');
const Schema = require('mongoose').Schema;
const Case = require('./case');

const Algset = module.exports = new Schema();
Algset.add({ // because of problems defining recrusive schema
	id: String,
	name: String,
	abbrev: String,
	description: String,
	cube: {
		corners: {
			perm: Array,
			orient: Array
		},
		edges: {
			perm: Array,
			orient: Array
		},
		centers: Array
	},
	subsets: [Algset],
	cases: [Case]
});

// Algset.pre('findOneAndUpdate', function (next) {
// 	this._update = flat(this._update);
// 	next();
// });

Algset.statics.findByID = function (id, cb) {
	return this.findOne({id: id}, cb);
};

Algset.statics.findByName = function (name, cb) {
	return this.find({name: name}, cb);
};
