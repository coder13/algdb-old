'use strict';
const flat = require('flat');
const Schema = require('mongoose').Schema;
const Case = require('./case');

const Algset = module.exports = new Schema();
Algset.add({ // because of problems defining recursive schema
	id: String,
	name: String,
	abbrev: String,
	image: String,
	description: String,
	cube: {
		corners: {
			perm: {type: [Number], default: [0,1,2,3,4,5,6,7]},
			orient: {type: [Number], default: [0,0,0,0,0,0,0,0]}
		},
		edges: {
			perm: {type: [Number], default: [0,1,2,3,4,5,6,7,8,9,10,11]},
			orient: {type: [Number], default: [0,0,0,0,0,0,0,0,0,0,0,0]}
		},
		centers: {type: [Number], default: [0,1,2,3,4,5]}
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
