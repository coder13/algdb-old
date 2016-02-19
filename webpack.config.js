'use strict'

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ENV = process.env.NODE_ENV || 'dev';

console.log('NODE_ENV=', ENV)

// const Stylus = {
// 	dev: {
// 	  test: /\.styl$/,
// 	  loader: 'style-loader!css-loader!postcss-loader!stylus-loader'
// 	},
// 	prod: {
// 	  test: /\.styl$/,
// 	  loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!stylus-loader')
// 	}
// }

module.exports = {
	devtool: 'eval',
	entry: [
		'./src/app.js',
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server'
	],

	output: {
		path: './public',
		filename: 'app.js',
		publicPath: '/'
	},

	module: {
		resolve: {
			extensions: ['', '.js', '.styl', 'css']
		},

		loaders: [{
			test: /(\.js$)|(\.jsx$)/,
			exclude: /node_modules/,
			loaders: ['react-hot', 'babel-loader']
		}, {
			test: /\/public\//,
			loader: 'url-loader?limit=10000'
		}, {
			test: /\.(otf|eot|svg|ttf|woff)/,
			loader: 'url-loader?limit=10000'
		},	{
			test: /\.(jpe?g|png|gif)/,
			loader: 'url-loader?limit=10000'
		},	{
			test: /\.styl$/,
			loader: 'style-loader!css-loader!stylus-loader'
		},	{
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.json$/,
			loaders: ['json']
		}, {
			test: /\.hson$/,
			loaders: ['hson']
		}]
	},


	plugins: [
		new HtmlWebpackPlugin({
			title: 'visualcube demo',
			template: './src/index.html'
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],

	port: 3000,
	publicPath: '/',
	devServer: {
		port: 3000,
		hot: true,
		historyApiFallback: true,
		quiet: true,
		stats: {
			colors: true
		}
	}
};

/* module.exports = getConfig({
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
 }); */
