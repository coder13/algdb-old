'use strict';

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var config = require('../server/config');
var data = require('./data');

MongoClient.connect(config.db.url, function(err, db) {
	assert.equal(null, err);
	console.log('Connected correctly to server.');

	let algsets = db.collection('algsets');

	algsets.deleteMany({}, function (err, result) {
		assert.equal(err, null);
		console.log('Succesfully deleted all algsets');

		algsets.insertOne(data, function (err, result) {
			assert.equal(err, null);
			console.log('Inserted data into collection algsets');
			db.close();
		});
	});
});
