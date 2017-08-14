fis.set("project.ignore", ['node_modules/**', 'output/**', '.git/**', 'fis-conf.js', 'Lp/**', "public/**", "static/img/**", "static/less/**"])

fis.match("js/(*.js)",{
	useHash: true,
	optimizer: fis.plugin('uglify-js'),
	url: 'r.51gjj.com/act/release/js/$1'
})

fis.match("css/(*.css)",{
	useHash: true,
	optimizer: fis.plugin('clean-css'),
	url: 'r.51gjj.com/act/release/css/$1'
})

fis.match("css/{basicFullPage,mtool,rule-btn,marquee}.css",{
	url: "/act$0"
})