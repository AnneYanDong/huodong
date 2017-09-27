require.config(requireConfig);
require(["ct", "loadingAnim", "Vue", "phonecode"], function(ct, loadingAnim, Vue, phonecode) {
  ct.Tool.setFont();

  function init() {
    window.vm = new Vue({
      el: ".wp",
      data: {
      	init: false
      },
      components: {
      	'my-phonecode': phonecode
      },
      created: function() {
        loadingAnim.hide(function(){
        	vm.init = true;
        });
      },
      mounted: function() {

      },
      methods: {

      }
    })
  }
  init();
})