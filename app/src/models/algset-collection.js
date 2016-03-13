const Collection = require('ampersand-rest-collection');
const Algset = require('./algset');

module.exports = Collection.extend({
	model: Algset,

	url () {
		return `${app.baseURL}/algsets`;
	}
});
