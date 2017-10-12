process.env.NODE_ENV = 'production';
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const utils = require('./utils');
const config = require('./config');

module.exports = merge(baseWebpackConfig, {
	output: {
		path: config.prod.outputPath,
		filename: 'js/[name]_[chunkhash].js'
	},
	module: {
		rules: utils.styleLoaders()
	},
	plugins: [
    new webpack.ProgressPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
		new CleanWebpackPlugin(['dist'],{
			root: path.resolve(__dirname, "../")
		}),	
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"'
		}),
		new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextPlugin({
			filename: 'css/[name]_[contenthash:6].css'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: function(module, count){
				console.log(count);
				return module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
	    chunks: ['vendor']
		}),
		...utils.genHtmlPlugins()
	]
})