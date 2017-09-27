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

  function phonecodeComponent() {
    var tplArr = [
      '<div class="phonecode-wrap" :class="stylecls">',
      '<input class="code" placeholder="请输入验证码">',
      '<div class="get-code" @click="getCode"><span class="code-txt" v-text="codeTxt"></span></div>',
      '</div>'
    ];
    return {
      props: {
        stylecls: {
          type: String,
          default: 'phonecode-default'
        },
        codetime: {
          type: [Number, String],
          default: 60
        },
        codeurl: {
          type: [String]
        }
      },
      template: tplArr.join(""),
      data: function() {
        return {
          codeTxt: "获取验证码",
          codeFlag: true,
          time: ""
        }
      },
      mounted: function() {
        this.time = this.codetime;
      },
      methods: {
        getCode: function() {
          var vm = this;
          if (!vm.codeurl) {
            console.log("codeurl不存在")
          }
          if (!vm.codeFlag) {
            console.log("请勿重复获取验证码");
            return false;
          }          
          vm.codeFlag = false;
          $.ajax({
            type: "post",
            dataType: "json",
            url: vm.codeurl,
            success: function(d) {
              if (d.success) {
                vm.timedown();
              }else{
                console.log("codeurl调用失败");
              }
            },
            fail: function() {

            }
          })
        },
        timedown: function(fn) {
          var vm = this;
          vm.codeTxt = vm.time;
          function td() {
            setTimeout(function(){
              if (vm.time <= 0) {
                vm.codeTxt = '获取验证码';
                vm.codeFlag = true;
                vm.time = vm.codetime;
                return;
              }
              vm.time--;
              vm.codeTxt = vm.time;
              td();
            },1000)
          }
          td();
        }
      }
    }
  }

  function init() {
    var phonecode = phonecodeComponent();
    window.vm = new Vue({
      el: ".wp",
      data: {
        init: false,
        getCodeUrl: "test.php",
        phone: "13334321111"
      },
      filters:{
        phonenumber: function(v){
          return (v+"").replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        }
      },
      components: {
        'my-phonecode': phonecode
      },
      created: function() {
        hide(function() {
          vm.init = true;
        });
      },
      mounted: function() {},
      methods: {}
    })
  }
  init();
})