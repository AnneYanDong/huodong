const webpack = require('webpack');
const path = require('path');
const utils = require('./utils');
const page = require('./page');

function resolve(relPath){
	// console.log(path.resolve(__dirname, relPath));
	return path.resolve(__dirname, relPath);
}

module.exports = {
	entry: page.entry,
	output: {
		filename: 'js/[name].js',
    chunkFilename: "js/[name].[chunkhash].js" // 非入口的模块文件。比如异步加载的模块。暂时用不到
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: "babel-loader",
			include: [resolve('../src')]
		},{
			test: /\.vue$/,
			use: {
				loader: 'vue-loader',
				options: utils.vueLoaderOptions() // 这里看官方教程https://vue-loader.vuejs.org/zh-cn/configurations/advanced.html，支持options: {js: ...., css: ....}
			}
		},{
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			use: {
				loader: 'url-loader',
				options: {
					limit: 1000,
					name: 'images/[name]_[hash:6].[ext]'
				}
			}
		},{
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'fonts/[name]_[hash:6].[ext]'
				}
			}]
		}]
	}
}