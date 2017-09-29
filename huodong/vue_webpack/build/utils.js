const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

var cssLang = [{
  name: 'css',
  reg: /\.css$/,
  loader: 'css-loader'
}, {
  name: 'less',
  reg: /\.less$/,
  loader: 'less-loader'
}];

function genLoaders(lang) {
  var loaders = ['css-loader', 'postcss-loader'];
  if (lang.name !== 'css') {
    loaders.push(lang.loader);
  }
  if (isProd) {
    // 生产环境
    loaders = ExtractTextPlugin.extract({
      use: loaders
    })
  } else {
    loaders.unshift('vue-style-loader'); //数组头部增加一个元素
  }
  return loaders;
}

exports.styleLoaders = function() {
  var output = [];
  cssLang.forEach(lang => {
    output.push({
      test: lang.reg,
      use: genLoaders(lang)
    })
  })
  return output;
  // 返回的是一个数组，格式类似于
  /*	
  	[{
  		test: /\.css$/,
  		use: ['css-loader', 'postcss-loader']
  	},{
  		test: /\.less$/,
  		use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader']  非生产环境会带vue-style-loader。
  	}]
  */
}

exports.vueLoaderOptions = function() {
  var options = {
    loaders: {}
  };
  cssLang.forEach(lang => {
    options.loaders[lang.name] = genLoaders(lang);
  })

  return options;
  // 返回一个对象，类似
  // options{loaders:{
  // 		css: ['css-loader', 'postcss-loader'],
  // 		
  // }}
}

exports.genHtmlPlugins = function() {
  var baseWebpackConfig = require('./webpack.base.config');
  var path = require('path');
  var plugins = [];
  Object.keys(baseWebpackConfig.entry).forEach(function(name) {
  	plugins.push(
  		new HtmlWebpackPlugin({
  			filename: isProd ? path.resolve(__dirname, '../dist/' + name + '.html') : name + '.html',
  			template: 'index.tpl.html',
  			chunks: isProd ? ['vendor', 'manifest', name] : [name],
  			inject: true
  		})
  	)
  })
  return plugins
}