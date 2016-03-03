module.exports = {
	'localhost': {
		baseURL: 'http://localhost:8000',
		admin: true
	},
	'algdb.surge.sh': {
		// baseURL: 'http://localhost:8000',
		admin: false
	}
}[window.location.hostname];

