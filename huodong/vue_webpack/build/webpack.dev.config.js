const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config.js');
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
		new HtmlWebpackPlugin({
			filename: 'index.html', // 相对于webpack配置项output.path 资源打包的路径
			template: 'index.html', // 相对于webpack编译时的上下文目录，就是项目根目录，这里就是vue_webpack目录
			inject: true // 传递true或body时，所有JS资源将放置在body元素底部
		})
	]
})