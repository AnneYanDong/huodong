const webpack = require('webpack');
const path = require('path');
const utils = require('./utils');

function resolve(relPath){
	return path.resolve(__dirname, relPath);
}

module.exports = {
	entry: {
		app: resolve('../src/main.js')
	},
	output: {
		filename: 'js/[name].js'
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
					limit: 10000,
					name: 'images/[name].[hash:7].[ext]'
				}
			}
		},{
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'fonts/[name].[hash:7].[ext]'
				}
			}]
		}]
	}
}