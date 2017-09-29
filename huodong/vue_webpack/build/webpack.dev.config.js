const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config');
const utils = require('./utils');
const config = require('./config');

Object.keys(baseWebpackConfig.entry).forEach(function(name){
	baseWebpackConfig.entry[name] = [
		`webpack-dev-server/client?http://localhost:${config.dev.port}/`,
		'webpack/hot/dev-server'
	].concat(baseWebpackConfig.entry[name])
});
// 输入的baseWebpackConfig.entry结构类似
/*
{
	app: ['webpack-dev-server/client?http://localhost:8080/','webpack/hot/dev-server','/src/app.js'],
	main: ['webpack-dev-server/client?http://localhost:8080/','webpack/hot/dev-server','/src/main.js']
}
*/

module.exports = merge(baseWebpackConfig,{
	output: {
		path: config.dev.outputPath,
		publicPath: config.dev.outputPublicPath
	},
	module: {
		rules: utils.styleLoaders()
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		...utils.genHtmlPlugins()
	]
})