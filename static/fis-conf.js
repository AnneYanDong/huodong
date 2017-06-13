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

fis.match("*.js",{
	url: 'r.51gjj.com/act/release$0',
	optimizer: fis.plugin('uglify-js')
})

fis.match("*.css",{
	url: 'r.51gjj.com/act/release$0',
	optimizer: fis.plugin('clean-css')
})

fis.match("css/{basicFullPage,mtool}.css",{
	url: "/act$0"
})

fis.match("resource/resource.js",{
	useHash: false,
    optimizer: null
})

fis.media('upload').match('*', {
  deploy: fis.plugin('http-push', {
    receiver: 'http://kaifa.jianbing.com/res/receiver.php',
    to: '/oss/hdtest' // 注意这个是指的是测试机器的路径，而非本地机器
  })
})