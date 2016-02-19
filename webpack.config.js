'use strict'

const getConfig = require('hjs-webpack');
const fs = require('fs');

console.log('NODE_ENV=', process.env.NODE_ENV)

module.exports = getConfig({
	in: 'src/app.js',
	out: 'public',
	html: function (context) {
		let html = `<!doctype html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/></head><body><div id="root"></div></body><script src="/app.js"></script>`
		return {
			'404.html': html,
			'index.html': html
		}
	},

	devServer: {
		quiet: true
	}
});
