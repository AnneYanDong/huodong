require.config(requireConfig);
require(['ct', 'Vue', 'bridge'], function(ct, Vue, Bridge) {
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
        ct.Tool.buryPoint_v2();
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
          if (this.page.info.current_reward <= 0) {
            oP.show("您没有可以提现的金额，赶快去邀请好友吧！");
            return false;
          }
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
                    vm.page.info.total_reward = d.ret.total_reward;
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
                  vm.page.info.total_reward = d.ret.total_reward;
                  vm.draw = !vm.draw;
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
        },
        invite: function() {
          $.ajax({
            type: "get",
            dataType: "json",
            url: ct.Tool.url("/act/act170921/invite"),
            data: {},
            success: function(d) {
              if (d.success) {
                if (d.ret.login) {
                  if (Bridge && app.isGjj) {
                    Bridge.action('ShareTimeline', {
                      "title": "您的好友邀请您一起来查公积金",
                      'desc': '实时了解你的公积金账户动况，激活您的潜在财富！',
                      "thumb": "https://r.51gjj.com/image/static/invitation.png",
                      "link": ct.Tool.url("/act/home/huodong/20170925invitation/regist.php?invite=" + d.ret.invite + "&inviter=" + d.ret.inviter)
                    });
                  }
                } else {
                  oP.show("邀请好友需要在APP登陆后操作")
                }
              } else {
                oP.show(d.msg || "错误");
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