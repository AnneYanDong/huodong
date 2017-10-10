require.config(requireConfig);
require(["ct", "Vue", "jquerynstSlider"], function(ct, Vue, _) {
  ct.Tool.setFont();
  var app = ct.Tool.userAgent();
  var platform = ct.Tool.userAgent();
  var oP = Object.create(ct.Prompt).create().build();
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
          this.$refs.mask.addEventListener("touchmove", function(e) {
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
        ruleShow: false,
        moneyAmount: ""
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
        this.setSlider();
      },
      computed: {
        moneyDesc: function() {
          if (this.moneyAmount >= 0 && this.moneyAmount <= 10000) {
            return "1万以下";
          } else if (this.moneyAmount > 10000 && this.moneyAmount <= 20000) {
            return "1-2万";
          } else if (this.moneyAmount > 20000 && this.moneyAmount <= 50000) {
            return "2-5万";
          } else if (this.moneyAmount > 50000 && this.moneyAmount <= 80000) {
            return "5-8万";
          } else if (this.moneyAmount > 80000 && this.moneyAmount <= 100000) {
            return "8-10万";
          } else if (this.moneyAmount > 100000 && this.moneyAmount <= 150000) {
            return "10-15万";
          } else if (this.moneyAmount > 150000 && this.moneyAmount <= 200000) {
            return "15-20万";
          } else if (this.moneyAmount > 200000) {
            return "20万以上"
          }
        },
        commission: function() {
          if (this.moneyAmount >= 0 && this.moneyAmount <= 10000) {
            return "60";
          } else if (this.moneyAmount > 10000 && this.moneyAmount <= 20000) {
            return "100";
          } else if (this.moneyAmount > 20000 && this.moneyAmount <= 50000) {
            return "150";
          } else if (this.moneyAmount > 50000 && this.moneyAmount <= 80000) {
            return "200";
          } else if (this.moneyAmount > 80000 && this.moneyAmount <= 100000) {
            return "300";
          } else if (this.moneyAmount > 100000 && this.moneyAmount <= 150000) {
            return "400";
          } else if (this.moneyAmount > 150000 && this.moneyAmount <= 200000) {
            return "500";
          } else if (this.moneyAmount > 200000) {
            return "800"
          }
        },
        maskShow: function() {
          return this.ruleShow;
        }
      },
      methods: {
        setSlider: function() {
          var vm = this;
          $('.nstSlider').nstSlider({
            "left_grip_selector": ".leftGrip",
            "value_bar_selector": ".bar",
            "rounding": 1000,
            "value_changed_callback": function(cause, leftValue, rightValue) {
              var $container = $(this).parent();
              vm.moneyAmount = leftValue;
            }
          });
        },
        toggleRule: function() {
          this.ruleShow = !this.ruleShow;
        },
        process: function() {
          window.location.href = 'myinvitation.php';
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
                        "link": "https://b.jianbing.com/act/home/20170925invitation/regist.php?invite=" + d.ret.invite + "&phone=" + d.ret.inviter
                    });
                  }
                }else{
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