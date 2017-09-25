const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const devConfig = require('./webpack.dev.config.js');
const config = require('./config.js');
const compiler = webpack(devConfig); // node下调用webpack()返回一个compiler

var server = new webpackDevServer(compiler, {
  hot: true,
  noInfo: true,
  publicPath: config.dev.outputPublicPath,
  stats: {
    colors: true
  }
});

server.listen(config.dev.port, '0.0.0.0');

var url = `http://localhost:${config.dev.port}`;
var opn = require('opn');

// 打包完成后启动浏览器
server.middleware.waitUntilValid(function(){
	console.log(`> listening at ${url}`);
	opn(`${url}`);
})