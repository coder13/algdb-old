const baseConfig = {
	apiURL: '/api/v0'
};

const locationConfig = {
	'localhost': {

	},
	'algdb.surge.sh': {

	}
};

module.exports = Object.assign({}, baseConfig, locationConfig[window.location.hostname]);
