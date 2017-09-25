require.config(requireConfig);
define(["jquery", "ct", "bridge", "Vue", "FullPage"], function($, ct, Bridge, Vue, FullPage) {

  var oP = Object.create(ct.Prompt);
  oP.create().build();

  var oM = Object.create(ct.Mask);
  oM.create().build();

  var local = ct.Tool.local();
  var app = ct.Tool.userAgent();

  var cookie = Object.create(ct.Cookie);

  ct.Tool.buryPoint_v2(0);

  ct.Tool.share(88, "xykdz3");

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
          tag: "88_1_0_0_进入页面"
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
          pageOneshow: false,
          pageTwoshow: false,
          pageThreeshow: false,
          pageFourshow: false,
          pageFiveshow: false,
          choose: {
            cardAmount: 0,
            bank: 0
          },
          page: {
            show: null,
            now: ''
          },
          maskStatus: false,
          ruleStatus: false
        },
        created: function() {

        },
        mounted: function() {
          $(".vue-pre-loading").fadeOut();
          this.wpShow = true;
          this.$nextTick(function() {
            self.fullPageObj = this.fullpage();
          })          
          this.share();
        },
        watch: {
          'choose.bank': function() {
            var vm = this;
            if (vm.choose.bank != 0) {
              if (vm.choose.bank == 1) {
                if (vm.choose.cardAmount == 1) {
                  vm.$set(vm.page, 'show', vm.setData('pufabasa'));
                } else {
                  vm.$set(vm.page, 'show', vm.setData('pufabasa'));
                }
              } else if (vm.choose.bank == 2) {
                if (vm.choose.cardAmount == 1) {
                  vm.$set(vm.page, 'show', vm.setData('xingyejy'));
                } else {
                  vm.$set(vm.page, 'show', vm.setData('xingyelxy'));
                }
              }
            }
          }
        },
        methods: {
          fullpage: function() {
            var vm = this;
            var fullpage = vm.$refs.wpinner.fullpage({
              start: 0,
              beforeChange: function(e) {
                // var now = "page" + e.next;
                // vm.page.now = now;
              },
              afterChange: function(e) {
                self.fullPageObj.stop();

                var now = "page" + e.cur;
                vm.page.now = now;

                if (now == "page0") {
                  // if (!vm.pageOneshow) {
                  //   vm.pushState(vm.page.now);
                  // }
                  vm.respondState(now)
                  vm.pageOneshow = true;
                }

                if (now == "page1") {
                  // if (!vm.pageTwoshow) {
                  //   vm.pushState(vm.page.now);
                  // }
                  vm.respondState(now,0)
                  vm.pageTwoshow = true;
                }

                if (now == "page2") {
                  // if (!vm.pageThreeshow) {
                  //   vm.pushState(vm.page.now);
                  // }
                  vm.respondState(now, 1, function() {
                    vm.choose.cardAmount = 0;
                  })
                  vm.pageThreeshow = true;
                }

                // if (now == "page3") {
                //   // if (!vm.pageFourshow) {
                //   //   vm.pushState(vm.page.now);
                //   // }
                //   vm.respondState(now, 2, function() {
                //     vm.choose.bank = 0;
                //   })
                //   vm.pageFourshow = true;
                // }

                if (now == "page3") {
                  // if (!vm.pageFiveshow) {
                  //   vm.pushState(vm.page.now);
                  // }
                  if (vm.choose.bank == 1) {
                    vm.respondState(now, 2, function() {
                      // vm.choose.base = 0;
                      vm.choose.bank = 0;
                      vm.page.show = null;
                      vm.pageFiveshow = false;
                    })
                  } else if (vm.choose.bank == 2) {
                    vm.respondState(now, 2, function() {
                      vm.choose.bank = 0;
                      vm.page.show = null;
                      vm.pageFiveshow = false;
                    })
                  }
                  vm.pageFiveshow = true;
                }

                vm.pushState(vm.page.now);
              }
            });
            return fullpage;
          },
          startMake: function(n) {
            var vm = this;
            // vm.pushState(vm.page.now);
            self.fullPageObj.moveTo(n, true);
          },
          next: function(name, val, to) {
            var vm = this;
            vm.choose[name] = val;
            setTimeout(function() {
              // vm.pushState(vm.page.now)
              self.fullPageObj.moveTo(to, true);
            }, 400)
          },
          apply: function() {
            var vm = this;
            var loginId = cookie.get("jianbing_customer_id");
            
            if (Bridge && app.isGjj) {
              if (!/\d/g.test(loginId)) {
                Bridge.action('login');
                return false;
              }
            }

            var tag = '88_4_1_' + vm.page.show.bankId + '_立即申请' + vm.page.show.title;
            $.ajax({
              type: "POST",
              dataType: "JSON",
              url: ct.Tool.url("/act/request/activity"),
              data: JSON.stringify({
                source: app.isGjj ? 1 : 0,
                tag: tag
              }),
              success: function(d) {
                if (d.success == true) {

                }
              }
            })

            $.ajax({
              type: "POST",
              dataType: "JSON",
              url: ct.Tool.url("/act/act170913/get_gift"),
              data: JSON.stringify({
                type: vm.page.show.bankId
              }),
              success: function(d) {
                if (d.success == true) {
                  window.location.href = vm.page.show.url;
                } else {
                  oP.show(d.msg || "get_gift出错")
                }
              }
            })
          },
          process: function() {
            window.location.href = local.origin + "shequ/discovery/index.php?route=account/business&type=3";
          },
          showRule: function() {
            this.ruleStatus = !this.ruleStatus;
            this.maskStatus = !this.maskStatus;
          },
          setData: function(n) {
            var cardArr = {
              'pufabasa': {
                'title': '浦发巴萨分期白金卡',
                'img': 'https://r.51gjj.com/act/release/img/20170526_bs_bj.png',
                'interests': [
                  '50万额度尊享白金超多权益',
                  '无条件免年费 定期特价饮品',
                  '1元机场停车 指定酒店住就送'
                ],
                'activity': [
                  '申请送88888理财金（限领一次）,激活再送298元现金红包'
                ],
                'url': 'https://b.jianbing.com/business/home/h5/pufafcb/index.php',
                'bankId': '45'
              },
              'xingyelxy': {
                'title': '兴业立享悠白金卡',
                'img': 'https://r.51gjj.com/act/release/img/20170313_xy_lxy.png',
                'interests': [
                  '取现0手续费 机场贵宾礼遇',
                  '12期6.0%一次性分期费率'
                ],
                'activity': [
                  '申请送88888理财金（限领一次）'
                ],
                'url': 'https://b.jianbing.com/business/home/h5/xingyeu/index.php',
                'bankId': '34'
              },
              'xingyejy': {
                'title': '兴业立享精英白金卡',
                'img': 'https://r.51gjj.com/act/release/img/20170313_xy_jy.png',
                'interests': [
                  '取现0手续费 1000万意外险',
                  '12期6.0%一次性分期费率'
                ],
                'activity': [
                  '申请送88888理财金（限领一次）'
                ],
                'url': 'https://b.jianbing.com/business/home/h5/xingyej/index.php',
                'bankId': '42'
              }
            }
            return cardArr[n];
          },
          respondState: function(now, to, fn) {
            if (app.isGjj && Bridge) {
              Bridge.onBack(function() {
                if (now == "page0") {
                  return false;
                } else {
                  self.fullPageObj.moveTo(to, true);
                  if (fn && ct.Tool.isFunction(fn)) {
                    fn();
                  }
                  return true;
                }
              })
            } else {
              window.onpopstate = function(e) {
                // self.fullPageObj.moveTo(e.state.title.match(/\d/g)[0], true)
                if (fn && ct.Tool.isFunction(fn)) {
                  fn();
                }
                self.fullPageObj.moveTo(to, true)
              }
            }
          },
          pushState: function(curUrl) {
            window.history.pushState && window.history.pushState({
              title: curUrl
            }, curUrl, "index.php#page=" + curUrl); // 塞入新的历史
          },
          share: function() {
            if (app.isGjj && Bridge) {
              Bridge.action('quickIcon', {
                thumb: "https://r.51gjj.com/image/static/ico_title_share_dark.png",
                onclick: function() {
                  Bridge.action('ShareTimeline', {
                    "title": "公积金定制大额信用卡，白拿8万理财金！",
                    'desc': "还有298元现金红包送~",
                    "thumb": "https://r.51gjj.com/act/release/img/20170913_wx_xykdz2.png",
                    "link": "https://" + local.host + "/act/home/huodong/20170913/index.php#page=page0"
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