const Model = require('ampersand-model');

const countSet = function (subset) {
	return (subset.cases ? subset.cases.length : 0) +
	(subset.subsets ? subset.subsets.map(countSet).reduce((a,b) => a + b) : 0);
};

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

	derived: {
		caseCount: {
			deps: [],
			fn: function () {
				return countSet(this);
			}
		}
	},

	url () {
		let id = this.get('id');
		console.log(`${app.baseURL}/algset/${id}`);
		return `${app.baseURL}/algset/${id}`;
	}
});
