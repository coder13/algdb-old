'use strict';
const Schema = require('mongoose').Schema;
const Alg = require('./alg');

const Case = module.exports = new Schema({
	id: String,
	name: String,
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
	comment: String,
	algs: [Alg]
});

Case.statics.findByName = function (name, cb) {
	return this.find({name: name});
};
