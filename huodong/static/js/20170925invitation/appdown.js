require.config(requireConfig);
require(["ct", "Vue"], function(ct, Vue) {
  ct.Tool.setFont();
  var platform = ct.Tool.userAgent();
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
          if (platform.isWeixin) {
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.balance6game.housingfund';
          }else if(platform.isiOS){
            window.location.href = 'https://itunes.apple.com/app/apple-store/id908573399?pt=83635804&ct=51gjj&mt=8';
          }else{
            window.location.href = 'http://apk.51gjj.com/51gjj_51gjj.apk';
          }
        }
      }
    })
  }
  init();
})