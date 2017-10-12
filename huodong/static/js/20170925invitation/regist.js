require.config(requireConfig);
require(["ct", "Vue", "bridge"], function(ct, Vue, Bridge) {
  ct.Tool.setFont();
  var oP = Object.create(ct.Prompt);
  oP.create().build();
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

  // function alertComponent() {
  //   var tplArr = [
  //     '<transition name="opacity">',
  //     '<div v-if="message" class="my-msg" v-text="message">',
  //     '</div>',
  //     '</transition>'
  //   ];
  //   return {
  //     props: {
  //       message: {
  //         type: String
  //       },
  //       time: {
  //         type: [Number, String],
  //         default: 3000
  //       }
  //     },
  //     template: tplArr.join(""),
  //     data: function() {
  //       return {
  //         timer: null
  //       }
  //     },
  //     watch: {
  //       'message': {
  //         immediate: true,
  //         handler: function(val, oldVal) {
  //           this.nullMessage();
  //         },
  //         deep: true
  //       }
  //     },
  //     methods: {
  //       nullMessage: function() {
  //         var vm = this;
  //         clearTimeout(vm.timer);
  //         vm.timer = setTimeout(function() {
  //           vm.$emit('closemytip');
  //         }, vm.time)
  //       }
  //     }
  //   }
  // }

  function phonecodeComponent() {
    var tplArr = [
      '<div class="phonecode-wrap" :class="stylecls">',
      '<input class="code" placeholder="请输入验证码">',
      '<div class="get-code" bp="91_2_2_0_验证码" @click="getCode"><span class="code-txt" v-text="codeTxt"></span></div>',
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
        },
        phone: {
          type: [String, Number]
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
            oP.show("codeurl不存在")
            return false;
          }
          if (!vm.phone) {
            oP.show("phone不存在")
            return false;
          }
          if (!vm.codeFlag) {
            oP.show("请勿重复获取验证码");
            return false;
          }
          vm.codeFlag = false;
          $.ajax({
            type: "post",
            dataType: "json",
            url: vm.codeurl,
            data: JSON.stringify({
              phone: vm.phone
            }),
            success: function(d) {
              if (d.success) {
                vm.timedown();
              } else {
                if (d.code == 300) {
                  oP.show(d.msg, {
                    callback: function(){
                      window.location.href = 'appdown.php';
                    }
                  })
                }else{
                  vm.codeFlag = true;
                  oP.show(d.msg || "错误");
                }
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
            setTimeout(function() {
              if (vm.time <= 0) {
                vm.codeTxt = '获取验证码';
                vm.codeFlag = true;
                vm.time = vm.codetime;
                return;
              }
              vm.time--;
              vm.codeTxt = vm.time;
              td();
            }, 1000)
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
        getCodeUrl: ct.Tool.url("/act/act170921/send_captcha"),
        phone: "",
        inviter: '',
        myTip: ''
      },
      filters: {
        phonenumber: function(v) {
          return (v + "").replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        }
      },
      components: {
        'my-phonecode': phonecode
      },
      created: function() {
        hide(function() {
          vm.init = true;
        });
        this.inviter = ct.Tool.getUrlData("inviter")
      },
      mounted: function() {
        ct.Tool.buryPoint_v2();
      },
      methods: {
        apply: function(){
          $.ajax({
            type: "post",
            dataType: "json",
            url: ct.Tool.url("/act/act170921/register"),
            data: JSON.stringify({
              phone: vm.phone,
              code: $(".code").val(),
              invite: ct.Tool.getUrlData("invite")
            }),
            success: function(d) {
              if (d.success) {
                console.log("fsf");
                window.location.href = 'appdown.php';
              } else {
                oP.show(d.msg || "错误")
              }
            },
            fail: function(xhr) {
              oP.show(xhr || "错误")
            }
          })
        }
      }
    })
  }
  init();
})