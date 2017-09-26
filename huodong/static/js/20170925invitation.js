require.config(requireConfig);
require(["ct", "loadingAnim", "Vue"], function(ct, loadingAnim, vue) {
  ct.Tool.setFont();
  return {
    registPage: function() {
    	var self = this;
	    ct.Tool.imgPreLoad({
	      callback: function() {
	      	console.log("fsf")
	        setTimeout(function() {
	          init.call(self);
	        }, 0)
	      }
	    })

	    function init(){
	      window.vm = new Vue({
	        el: ".wp",
	        data: {},
	        created: function() {
	        	loadingAnim.hide();
	        },
	        mounted: function() {

	        },
	        methods: {}
	      })
	    }
    }
  }
})