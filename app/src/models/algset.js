const Model = require('ampersand-model');

module.exports = Model.extend({
	props: {
		id: 'string', // change to url
		name: 'string',
		image: 'string',
		abbrev: 'string',
		description: 'string',
		subsets: 'array',
		cases: 'array'
	},

	url () {
		let id = this.get('id');
		console.log(`${app.baseURL}/algset/${id}`);
		return `${app.baseURL}/algset/${id}`;
	}
});
