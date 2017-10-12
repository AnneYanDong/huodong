const path = require('path');

module.exports = {
	entry: {
		index: path.resolve(__dirname, '../src/main.js'),
		act20170918: path.resolve(__dirname, '../src/main2.js')
	},
	title: {
		index: 'index',
		act20170918: 'act20170918'
	}
}