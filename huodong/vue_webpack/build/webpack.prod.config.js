process.env.NODE_ENV = 'production';
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config');
const utils = require('./utils');
const config = require('./config');

module.exports = merge(baseWebpackConfig, {
	output: {
		path: config.prod.outputPath,
		publicPath: config.prod.outputPublicPath
	},
	module: {
		rules: utils.styleLoaders()
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"'
		}),
		new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextPlugin({
			filename: 'css/style.css?[contenthash:8]'
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: function(module, count){
				return module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
	    chunks: ['vendor']
		})
	]
})