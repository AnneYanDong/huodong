define(["zepto", "ct"],function(zepto, ct){
	return {
		hide: function(fn){
			var oEle = $(".vue-loading-wrap");
			oEle.addClass("vue-loading-hide");
			setTimeout(function(){
				oEle.remove();
				if (fn && ct.Tool.isFunction(fn)) {
					fn();
				}
			},0)
		}
	}
})