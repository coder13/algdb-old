const Collection = require('ampersand-rest-collection');
const Case = require('./case');

module.exports = Collection.extend({
	model: Case
});
