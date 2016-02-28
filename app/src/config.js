module.exports = {
	'localhost': {
		baseURL: 'http://localhost:8000',
		admin: true
	},
	'algdb.surge.sh': {
		admin: false
	}
}[window.location.hostname];

