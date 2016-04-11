'use strict';
const Schema = require('mongoose').Schema;
const Algset = require('./algset');

const User = module.exports = new Schema({
	email: String,
	username: String,
	token: String,
	profile: {},
	role: String,
	algsets: [Algset]
});
