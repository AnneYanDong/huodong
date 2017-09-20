require.config(requireConfig);
define(["jquery", "ct", "bridge", "Vue-dev", "jqueryEasing"], function($, ct, Bridge, Vue, _) {

  var oP = Object.create(ct.Prompt);
  oP.create().build();

  var oM = Object.create(ct.Mask);
  oM.create().build();

  var local = ct.Tool.local();
  var app = ct.Tool.userAgent();

  var cookie = Object.create(ct.Cookie);

  ct.Tool.buryPoint_v2(0);

  ct.Tool.share(89, "qqymx");

  var run = {
    start: function() {
      var _this = this;

      /*解决移动端click点击300延迟*/
      // fastClick.attach(document.body);

      /*设置HTML的font-size*/
      ct.Tool.setFont();
      window.addEventListener("resize", ct.Tool.debounce(ct.Tool.setFont));

      /*图片预加载*/
      ct.Tool.imgPreLoad({
        callback: function() {
          this.hintLog("图片加载完成");
          var timer = null;
          clearTimeout(timer);
          timer = setTimeout(function() {
            _this.init();
          }, 500)
        }
      })

      $.ajax({
        type: "POST",
        dataType: "JSON",
        url: ct.Tool.url("/act/request/activity"),
        data: JSON.stringify({
          source: ct.Tool.userAgent().isGjj ? 1 : 0,
          tag: "89_1_0_33_进入页面"
        }),
        success: function(d) {
          if (d.success == true) {

          }
        }
      })
    },
    init: function() {
      var self = this;
      window.vm = new Vue({
        el: ".wp",
        data: {
          wpShow: false,
          itemHeight: "",
          allowStart: false,
          pageShow: false,
          maskStatus: false,
          ruleStatus: false,
          giftStatus: false,
          buttonTxt: "马上抢",
          result: {},
          giftImg: ""
        },
        mounted: function() {
          $(".vue-pre-loading").fadeOut();
          this.pageShow = true;
          this.$nextTick(function() {
            $.ajax({
              type: "POST",
              dataType: "json",
              url: ct.Tool.url("/act/act170918/get_status"),
              data: JSON.stringify({

              }),
              success: function(d) {
                if (d.success == true) {
                  vm.setItemInfo();
                  if (d.ret.lottery == 0) {
                    vm.initAnim();
                    vm.startAnim();
                  } else if (d.ret.lottery == 1) {
                    vm.$set(vm.result, 'gift', d.ret);
                    vm.buttonTxt = "立即使用";
                    vm.hasLotteried();
                  }
                } else {
                  oP.show(d.msg || "抽奖失败，请联系客服咨询");
                  return false;
                }
              }
            })
          })
        },
        watch: {
          "result": {
            handler: function() {
              if (this.result && this.result.gift && this.result.gift.code) {
                switch (this.result.gift.code) {
                  case '0500':
                    this.giftImg = 'g-500';
                    break;
                }
              }
            },
            deep: true
          }
        },
        methods: {
          setItemInfo: function() {
            this.itemHeight = $(".count-item")[0].getBoundingClientRect().height || $(".count-item").eq(0).height();
          },
          initAnim: function() {
            var vm = this;
            var countHeight = vm.itemHeight;
            var moveY = countHeight * 10;
            var initAnimArr = vm.createInitNum();
            var initAnimTimer = null;
            vm.$nextTick(function() {
              // 10个为一轮。
              $(".init-anim").each(function(index, item) {
                $(this).delay(index * 300).animate({
                  "backgroundPositionY": -(moveY + countHeight * initAnimArr[index]) + "px",
                }, {
                  duration: 1500,
                  easing: "easeInOutCirc",
                  complete: function() {
                    clearTimeout(initAnimTimer);
                    initAnimTimer = setTimeout(function() {
                      $(".init-anim").addClass("question-mark");
                      $(".init-anim").css({
                        backgroundPosition: '0px 0px'
                      });
                      vm.allowStart = true;
                    }, 400)
                  }
                })
              })
            })
          },
          startAnim: function() {
            var vm = this;
            var startAnimTimer = null;
            var loginId = cookie.get("jianbing_customer_id");
            vm.$refs.buttonapply.addEventListener("click", function() {

              if (!vm.result.gift.login) {
                oP.show("请先登录51公积金管家APP参与活动", {
                  callback: function() {
                    if (app.isGjj && Bridge) {
                      Bridge.action('login');
                    }
                  }
                })
                return false;
              }

              // if (Bridge && app.isGjj) {
              //   if (!/\d/g.test(loginId)) {
              //     oP.show("请先登录APP", {
              //       callback: function() {
              //         Bridge.action('login');
              //       }
              //     })
              //     return false;
              //   }
              // }
              if (!vm.allowStart) {
                return false;
              }
              if (vm.result && vm.result.gift && vm.result.gift.code) {
                vm.buttonTxt = "立即使用";
                window.location.href = vm.result.gift.url;
                return false;
              }
              vm.allowStart = false;
              $.ajax({
                type: "POST",
                dataType: "json",
                url: ct.Tool.url("/act/act170918/get_gift"),
                data: JSON.stringify({

                }),
                success: function(d) {
                  if (d.success == true && d.ret.lottery == 1) {
                    vm.$set(vm.result, 'gift', d.ret);
                    vm.$nextTick(function() {
                      $(".count-item").removeClass("question-mark")
                      var countHeight = vm.itemHeight;
                      var initAnimArr = vm.result.gift.code.split("");
                      var moveY = countHeight * 30;
                      $(".count-item").each(function(index, item) {
                        $(this).delay(index * 300).animate({
                          "backgroundPositionY": -(moveY + countHeight * initAnimArr[index]) + "px",
                        }, {
                          duration: 2000 + initAnimArr.length,
                          easing: "easeInOutCirc",
                          complete: function() {
                            clearTimeout(startAnimTimer);
                            startAnimTimer = setTimeout(function() {
                              vm.allowStart = true;
                              vm.maskStatus = true;
                              vm.giftStatus = true;
                              vm.buttonTxt = "立即使用"
                            }, 400)
                          }
                        })
                      })
                    })
                  } else {
                    oP.show(d.msg || "暂不符合活动要求，看看其他贷款", {
                      callback: function(){
                        window.location.href = d.ret.url;
                      }
                    })
                  }
                }
              })
            })
          },
          hasLotteried: function() {
            var vm = this;
            vm.$nextTick(function() {
              var initAnimArr = vm.result.gift.code.split("");
              $(".count-item").each(function(index, item) {
                $(this).css("backgroundPositionY", -(vm.itemHeight * initAnimArr[index]) + "px");
              })
            })
            vm.$refs.buttonapply.addEventListener("click", function() {
              vm.goUrl();
            })
          },
          goUrl: function() {
            if (this.result.gift) {
              window.location.href = this.result.gift.url;
            }
          },
          createInitNum: function() {
            var vm = this;
            var arr = [];
            for (var i = 0; i < 2; i++) {
              arr.push(Math.floor(Math.random() * 10))
            }
            if (arr[1] != 0) {
              arr[0] = 0;
            }
            if (arr[0] > 1) {
              arr[0] = 1;
            }
            return arr;
          },
          showRule: function() {
            this.ruleStatus = !this.ruleStatus;
            this.maskStatus = !this.maskStatus;
          },
          closeGift: function() {
            this.maskStatus = false;
            this.giftStatus = false;
            this.ruleStatus = false;
          },
          share: function() {
            if (app.isGjj && Bridge) {
              Bridge.action('quickIcon', {
                thumb: "https://r.51gjj.com/image/static/ico_title_share_dark.png",
                onclick: function() {
                  Bridge.action('ShareTimeline', {
                    "title": "5万元3分钟到账，抢1000元免息额度",
                    'desc': "抽多少免多少",
                    "thumb": "https://r.51gjj.com/act/release/img/20170918_wx_jyd.jpg",
                    "link": "https://" + local.host + "act/home/huodong/20170918/index.php"
                  });
                }
              })
            }
          }
        }
      })
    }
  }

  run.start();
})