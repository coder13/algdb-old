// Return differnet config based off of NODE_ENV;
const baseConfig = {
	host: 'localhost',
	port: '8000',
	router: {
		stripTrailingSlash: true
	},
	db: {
		url: 'mongodb://localhost:27017/algdb',
		settings: {
			db: {
				native_parser: false
			}
		}
	}
};

const config = {
	dev: {

	},
	prod: {

	}
};

module.exports = Object.assign({}, baseConfig, config[process.env.NODE_ENV || 'dev']);
