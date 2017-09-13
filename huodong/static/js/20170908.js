require.config(requireConfig);
define(["jquery", "fastClick", "ct", "bridge", "Vue"], function($, fastClick, ct, Bridge, Vue) {

  var oP = Object.create(ct.Prompt);
  oP.create().build();

  var oM = Object.create(ct.Mask);
  oM.create().build();

  var local = ct.Tool.local();
  var app = ct.Tool.userAgent();

  ct.Tool.buryPoint_v2(0);

  ct.Tool.share();

  var run = {
    start: function() {
      var _this = this;

      /*解决移动端click点击300延迟*/
      fastClick.attach(document.body);

      /*设置HTML的font-size*/
      ct.Tool.setFont();
      window.addEventListener("resize", ct.Tool.debounce(ct.Tool.setFont));
      // window.onresize = ct.Tool.debounce(ct.Tool.setFont)

      /*整体预加载动画*/
      var oPreLoading = Object.create(ct.PreLodingUi);
      oPreLoading.create({
        preLoadingCls: "loading-bg-color", // 自定义加载动画颜色
        loadingEleCls: "loading-ele-color"
      }).build();

      /*图片预加载*/
      ct.Tool.imgPreLoad({
        callback: function() {
          this.hintLog("图片加载完成");
          var timer = null;
          clearTimeout(timer);
          timer = setTimeout(function() {
            oPreLoading.hide();
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
          tag: "20170908_1_0_0_进入页面"
        }),
        success: function(d) {
          if (d.success == true) {

          }
        }
      })
    },

    init: function() {
      $(".wp").removeClass("hide");
      var vm = new Vue({
        el: ".content",
        data: {
          page: {
            stepArr: null,
            slidePos: [],
            amount: [{
              amount: 160,
              class: 'p-160',
              txt: '(到账金额2万以下)'
            }, {
              amount: 260,
              class: 'p-260',
              txt: '(2万≤到账金额<4万)'
            }, {
              amount: 360,
              class: 'p-360',
              txt: '(到账金额4万及以上)'
            }],
            lineFillWidth: "",
            showAmount: {
              'amount': '160',
              'class': 'p-160',
              'txt': '(到账金额2万以下)'
            },
            maxIndex: [],
          },
          maskStatus: false,
          ruleStatus: false
        },
        created: function() {
          this.setStep();
        },
        mounted: function() {
          this.moveSlideBar();
        },
        watch: {
          'page.lineFillWidth': function() {
            var vm = this;
            var nth = '';
            vm.page.slidePos.forEach(function(item, index) {
              vm.$nextTick(function() {
                if ((Number(vm.page.lineFillWidth.width.split('px')[0]) + 30) - item >= 0) {
                  vm.pushDiff(index, vm.page.maxIndex);
                  nth = vm.chargeMax(vm.page.maxIndex);
                  if (nth == vm.page.slidePos.length - 1) {
                    nth = vm.page.amount.length - 1;
                  };
                  vm.page.showAmount.amount = vm.page.amount[nth].amount;
                  vm.page.showAmount.class = vm.page.amount[nth].class;
                  vm.page.showAmount.txt = vm.page.amount[nth].txt;
                  $('.circle').eq(index).addClass('active');
                } else {
                  vm.popNeed(index, vm.page.maxIndex);
                  $('.circle').eq(index).removeClass('active');
                }
              })
            })
          }
        },
        methods: {
          setStep: function() {
            var vm = this;
            var selfSet = [{
              style: {
                left: '2rem'
              },
              txt: '20000元'
            }, {
              style: {
                left: '4.15rem'
              },
              txt: '40000元'
            }]
            // 第一个和最后一个
            var first = {
              style: {
                left: '0'
              },
              "txt": '3000元'
            };
            var last = {
              style: {
                right: '-7px'
              },
              "txt": '50000元'
            };
            selfSet.unshift(first);
            selfSet.push(last);
            vm.page.stepArr = selfSet;
            vm.getPos();
          },
          getPos: function() {
            var vm = this;
            var arr = [];
            vm.$nextTick(function() {
              $(".circle").each(function(index, item) {
                vm.page.slidePos.push($(this).offset().left);
              })
            })
          },
          moveSlideBar: function() {
            var vm = this;
            var slide = vm.$refs.slidebar;
            var startPos = {
              x: "",
              y: "",
            }
            slide.addEventListener("touchstart", start);
            slide.addEventListener("touchmove", move);
            slide.addEventListener("touchend", end);

            function start(e) {
              var touch = e.touches[0];
              startPos.x = touch.clientX;
              startPos.y = touch.clientY;
              // slide.classList.add("slider-big");
            }

            function move(e) {
              e.preventDefault();
              var touch = e.touches[0];
              var dir = "";
              // var moveX = Math.abs(touch.clientX - startPos.x);
              // var moveY = Math.abs(touch.clientY - startPos.y);
              // if ((moveX - moveY) > 0) {
              //   dir = 1;
              //   console.log("左右")
              // } else {
              //   dir = 2;
              //   console.log("上下");
              // }
              // 明确滑动范围，起始和结尾
              // if (dir == 1) {
              if (touch.clientX <= vm.page.slidePos[0]) {
                $(slide).css({
                  transform: 'translateX(' + 0 + 'px)',
                  webkitTransform: 'translateX(' + 0 + 'px)'
                })
                vm.page.lineFillWidth = { width: '0px' };
              } else if (touch.clientX >= vm.page.slidePos[vm.page.slidePos.length - 1]) {
                $(slide).css({
                  transform: 'translateX(' + (vm.page.slidePos[vm.page.slidePos.length - 1] - vm.page.slidePos[0]) + 'px)',
                  webkitTransform: 'translateX(' + (vm.page.slidePos[vm.page.slidePos.length - 1] - vm.page.slidePos[0]) + 'px)'
                })
                vm.page.lineFillWidth = { width: (vm.page.slidePos[vm.page.slidePos.length - 1] - vm.page.slidePos[0]) + 'px' };
              } else {
                $(slide).css({
                  transform: 'translateX(' + (touch.clientX - 30) + 'px)',
                  webkitTransform: 'translateX(' + (touch.clientX - 30) + 'px)'
                })
                vm.page.lineFillWidth = { width: touch.clientX - 30 + 'px' };
              }
              // }
            }

            function end(e) {
              // slide.classList.remove("slider-big");
            }
          },
          chargeMax: function(arr) {
            if (arr.length > 1) {
              var max = arr[0];
              for (var i = 0; i < arr.length; i++) {
                if (arr[i] > max) {
                  max = arr[i];
                }
              }
            } else {
              max = arr[0];
            }
            return max;
          },
          pushDiff: function(n, arr) {
            if (arr.indexOf(n) > -1) {
              return false;
            } else {
              arr.push(n);
            }
            return arr;
          },
          popNeed: function(n, arr) {
            if (arr.length) {
              if (arr.indexOf(n)) {
                arr.splice(n, 1);
              } else {
                return false;
              }
            }
          },
          showRule: function() {
            this.ruleStatus = !this.ruleStatus;
            this.maskStatus = !this.maskStatus;
          },
          getPrize: function() {
            $.ajax({
              url: ct.Tool.url("/act/act170908/get_gift"),
              dataType: 'JSON',
              type: 'POST',
              data: '',
              success: function(d) {
                if (d.success) {
                  // 非APP
                  if (d.ret.is_weChat || d.ret.is_qq) {
                    if (d.ret.type == 1) {
                      oP.show('您还有150元现金券未使用，请登录51公积金管家APP使用');
                      return false;
                    } else if (d.ret.type == 2) {
                      oP.show('成功领取奖励，请登录app领券，立即享受优惠');
                      return false;
                    } else {
                      oP.show(d.ret.msg || '领券失败')
                    }
                  } else if (app.isGjj) { // APP
                    alert("..")
                    if (!d.ret.login) {
                      oP.show('未登录，请先登录APP', {
                        callback: function() {
                          if (Bridge && app.isGjj) {
                            Bridge.action('login');
                          }
                        }
                      });
                      return false;
                    }
                    if (d.ret.type == 1) {
                      oP.show('您还有150元现金券未使用，请先去使用', {
                        callback: function() {
                          window.location.href = d.ret.url;
                        }
                      });
                      return false;
                    } else if (d.ret.type == 2) {
                      oP.show('成功领取奖励，立即享受优惠', {
                        callback: function() {
                          window.location.href = d.ret.url;
                        }
                      });
                    }
                  } else {
                    oP.show('请登录51公积金管家APP参与该活动');
                    return false;
                  }
                } else {
                  oP.show('活动尚未开始！试试其他活动');
                  return false;
                }
              },
              error: function(jqxhr) {
                console.log(jqxhr);
              }
            })
          }
        }
      })
    }
  }

  run.start();
})