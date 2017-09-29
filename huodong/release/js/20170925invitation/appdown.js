require.config(requireConfig);
require(["ct", "Vue"], function(ct, Vue) {
  ct.Tool.setFont();
  window.addEventListener("resize", ct.Tool.debounce(ct.Tool.setFont));

  function hide(fn) {
    var oEle = $(".vue-loading-wrap");
    oEle.addClass("vue-loading-hide");
    setTimeout(function() {
      oEle.remove();
      if (fn && ct.Tool.isFunction(fn)) {
        fn();
      }
    }, 0)
  }

  function init() {
    window.vm = new Vue({
      el: ".wp",
      data: {
        init: false
      },
      created: function() {
        hide(function() {
          vm.init = true;
        });
      },
      mounted: function() {},
      methods: {
        appdown: function(){
          
        }
      }
    })
  }
  init();
})