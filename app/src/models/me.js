const app = require('ampersand-app');
const Model = require('ampersand-model');
const xhr = require('xhr');

module.exports = Model.extend({
	props: {
		id: 'number',
		username: 'string',
		wca_id: 'string',
		name: 'string',
		avatar: 'object',
		email: 'string',
		role: 'string'
	},

	derived: {
		isLoggedIn: {
			deps: ['id'],
			fn () {
				return !!this.id;
			}
		}
	},

	url () {
		return `${app.apiURL}/me`;
	}
});
