define(["Vue"],function(Vue){
	var phonecode = {
		template: '<div>phone</div>',
		data: function(){
			return {
				phone: '13'
			}
		},
		mounted: function(){
			this.test();
		},
		methods: {
			test: function(){
				console.log("i am phonecode")
			}
		}
	}
	return phonecode;
})