fis.match("*.{js,css}",{
	useHash: true
})

fis.match('*.png', {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
  optimizer: fis.plugin('png-compressor')
});

fis.match("js/lib/*.js",{
	useHash: false
})

fis.match("css/lib/*.css",{
	useHash: false
})

fis.match("*.js",{
	url: 'r.51gjj.com/act/releaseopt$0',
	optimizer: fis.plugin('uglify-js')
})

fis.match("*.css",{
	url: 'r.51gjj.com/act/releaseopt$0',
	optimizer: fis.plugin('clean-css')
})

fis.match("resource/resource.js",{
	useHash: false,
    optimizer: null
})