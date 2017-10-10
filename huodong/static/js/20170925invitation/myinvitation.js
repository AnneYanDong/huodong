require.config(requireConfig);
require(['ct', 'Vue', 'jquerynstSlider'], function(ct, Vue, _) {
  ct.Tool.setFont();
  var app = ct.Tool.userAgent();
  var platform = ct.Tool.userAgent();
  var oP = Object.create(ct.Prompt).create().build();
  window.addEventListener('resize', ct.Tool.debounce(ct.Tool.setFont));

  function hide(fn) {
    var oEle = $('.vue-loading-wrap');
    oEle.addClass('vue-loading-hide');
    setTimeout(function() {
      oEle.remove();
      if (fn && ct.Tool.isFunction(fn)) {
        fn();
      }
    }, 0)
  }

  function mask() {
    var tplArr = [
      '<transition name="opacity">',
      '<div class="mask" v-if="show" ref="mask"></div>',
      '</transition>'
    ]

    return {
      props: {
        show: {
          type: [Boolean],
          default: false
        }
      },
      template: tplArr.join(""),
      data: function() {
        return {

        }
      },
      created: function() {},
      mounted: function() {
        this.banScroll();
      },
      methods: {
        banScroll: function() {
          this.$refs.mask.addEventListener('touchmove', function(e) {
            e.preventDefault();
          })
        }
      }
    }
  }

  function init() {
    window.vm = new Vue({
      el: ".wp",
      data: {
        init: false,
        scrollShow: false,
        page: {},
        draw: false,
        username: "",
        useralipay: ""
      },
      components: {
        'my-mask': mask()
      },
      created: function() {
        hide(function() {
          vm.init = true;
        });
      },
      mounted: function() {
        this.getProcess();
      },
      computed: {
        maskShow: function() {
          return this.draw;
        }
      },
      methods: {
        toggleRule: function() {
          this.draw = !this.draw;
        },
        active: function(event) {
          var vm = this;
          var oE = $(event.currentTarget);
          var oList = vm.$refs.list;
          var oInvitation = vm.$refs.invitation;
          if (oE.hasClass('active')) {
            oE.removeClass('active');
          } else {
            oE.addClass('active');
          }

          var oLine = vm.$refs.line;
          var oProcess = vm.$refs.process;
          var oProcessH = oProcess && oProcess.offsetHeight;
          var oLineH = oLine && oLine.offsetHeight;
          var allowScrollH = oList.offsetHeight - oInvitation.offsetHeight;
          if (allowScrollH <= 0) {
            vm.scrollShow = false;
            return;
          }
          vm.scrollShow = true;
          if (typeof oProcess !== 'undefined') {
            oProcess.style.top = oInvitation.scrollTop * (oLineH - oProcessH) / allowScrollH + 'px';
          }
        },
        setLine: function() {
          var vm = this;
          var oList = vm.$refs.list;
          var oInvitation = vm.$refs.invitation;
          oInvitation.addEventListener('scroll', function() {
            var oLine = vm.$refs.line;
            var oProcess = vm.$refs.process;
            var oProcessH = oProcess && oProcess.offsetHeight;
            var oLineH = oLine && oLine.offsetHeight;
            var allowScrollH = oList.offsetHeight - oInvitation.offsetHeight;
            if (allowScrollH <= 0) {
              vm.scrollShow = false;
              return;
            }
            vm.scrollShow = true;
            if (typeof oProcess !== 'undefined') {
              oProcess.style.top = oInvitation.scrollTop * (oLineH - oProcessH) / allowScrollH + 'px';
            }
          })
        },
        getProcess: function() {
          var vm = this;
          $.ajax({
            url: ct.Tool.url("/act/act170921/get_progress"),
            dataType: 'json',
            type: 'get',
            data: {},
            success: function(d) {
              if (d.success) {
                if (d.ret.login) {
                  vm.$set(vm.page, 'info', d.ret)
                  vm.$nextTick(function() {
                    vm.setLine();
                  })
                } else {
                  vm.$set(vm.page, 'info', d.ret)
                }
              } else {
                oP.show(d.msg || "fail")
              }
            },
            fail: function() {

            }
          })
        },
        withdraw: function() {
          var vm = this;
          if (this.page.info.alipay) {
            this.draw = true;
          } else {
            $.ajax({
              url: ct.Tool.url('/act/act170921/withdraw_cash'),
              dataType: 'json',
              type: 'get',
              data: {},
              success: function(d) {
                if (d.success) {
                  if (d.ret.login) {
                    oP.show('提现成功');
                    vm.page.info.current_reward = d.ret.current_reward;
                  } else {
                    if (app.isGjj && Bridge) {
                      Bridge.action("login")
                    } else {
                      oP.show("请在51公积金管家参与活动")
                    }
                  }
                } else {
                  oP.show(d.msg || '错误')
                }
              },
              fail: function() {

              }
            })
          }
        },
        enterAlipay: function() {
          var vm = this;
          $.ajax({
            url: ct.Tool.url('/act/act170921/save_cash'),
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({
              name: vm.username,
              alipay: vm.useralipay
            }),
            success: function(d) {
              if (d.success) {
                if (d.ret.login) {
                  oP.show('提现成功');
                  vm.page.info.current_reward = d.ret.current_reward;
                } else {
                  if (app.isGjj && Bridge) {
                    Bridge.action("login")
                  } else {
                    oP.show("请在51公积金管家参与活动")
                  }
                }
              } else {
                oP.show(d.msg || '错误')
              }
            },
            fail: function() {

            }
          })
        }
      }
    })
  }
  init();
})