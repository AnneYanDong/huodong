require.config(requireConfig);
require(["jquery", "fastClick", "FullPage", "ct", "bridge", "juicer"], function($, fastClick, fullpage, ct, Bridge, juicer) {
  var oMask = $(".mask");

  var oP = Object.create(ct.Prompt);
  oP.create().build();

  var oM = Object.create(ct.Mask);
  oM.create().build();

  var local = ct.Tool.local();
  var source = ct.Tool.userAgent().isGjj ? 1 : 0;
  ct.Tool.buryPoint_v2(source);
  ct.Tool.share(82, "zmtkj");
  var run = {
    start: function() {
      var _this = this;

      /*解决移动端click点击300延迟*/
      fastClick.attach(document.body);

      /*设置HTML的font-size*/
      ct.Tool.setFont();
      ct.Tool.handleBottomStatusBar();
      window.addEventListener("resize", ct.Tool.debounce(ct.Tool.setFont));
      window.addEventListener("resize", ct.Tool.debounce(ct.Tool.handleBottomStatusBar));
      window.onresize = ct.Tool.debounce(ct.Tool.setFont)

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
      });
    },
    init: function() {
      console.log("周末提款机2.0活动");
      var _this = this;
      _this.setNavAttr();
      _this.share();
      $(".wp-outer").removeClass("hide");
      _this.PageBuryRequest();
      _this.withdraw();
      _this.openRule();
      _this.closeRule();
    },
    withdraw: function() {
      var _this = this;
      $(".content").on("click", ".btn1,.btn2,.btn3,.btn4", function() {
        var btn = $(this);
        var btn_id = btn[0].classList.value.substring(3);
        $.ajax({
          type: "POST",
          dataType: "JSON",
          data: JSON.stringify({ btn_id }),
          // url: "test.php",
          url: "/act/act170822/get_button/" + (btn_id - 1) + "",
          success: function(d) {
            if (d.success) {
              if (d.ret.is_weChat || d.ret.is_qq) {
                window.location.href = d.ret.url;
              } else {
                if (!d.ret.login) {
                  if (Bridge) {
                    Bridge.action("login");
                  }
                } else {
                  window.location.href = d.ret.url;
                }
              }
            } else {
              oP.show(d.msg);
            }
          }
        });
      });
    },
    setNavAttr: function() {
      if (Bridge) {
        Bridge.action("setNavigationColor", { backgroundColor: "#fff", textColor: "#202124", iconType: "1" });
      }
    },
    PageBuryRequest: function() {
      $.ajax({
        type: "POST",
        dataType: "JSON",
        url: "/act/request/activity",
        data: JSON.stringify({
          source: ct.Tool.userAgent().isGjj ? 1 : 0,
          tag: "82_1_0_0_进入页面"
        }),
        success: function(d) {
          if (d.success) {

          }
        }
      });
    },
    openRule: function() {
      $(".wp-inner").on("click", ".rule-btn", function(event) {
        oM.show();
        var ruleTpl = $('#tpl-rule').html();
        var resRuleHtml = juicer(ruleTpl, ruleJson);
        $('body').append(resRuleHtml);
        $(".rule").fadeIn();
      });
    },
    // 关闭规则
    closeRule: function() {
      $("body").on("click", ".btn-close", function() {
        $(".rule").fadeOut(function() {
          oM.hide();
        });
      });
    },
    //分享按钮
    share: function() {
      var u = navigator.userAgent;
      var app = {
        mobile: !!u.match(/AppleWebKit.*Mobile.*/),
        isAndroid: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1 || u.indexOf("android") > -1,
        isiOS: /[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(u),
        webApp: -1 == u.indexOf("Safari"),
        weixin: u.indexOf("MicroMessenger") > -1,
        isGjj: /^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(u) || /^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(u),
        isAndroidGjj: /^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(u),
        isiOSGjj: /^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(u),
        isGjjFdjsq: /^android\/[\w\W]+client\/[\w\W]+category\/51fdjsq$/.test(u)
      };
      var host = window.location.host;
      if (app.isGjj && Bridge) {
        Bridge.action('quickIcon', {
          thumb: "https://r.51gjj.com/image/static/ico_title_share_dark.png",
          onclick: function() {
            Bridge.action('ShareTimeline', {
              "title": "抢个红包过周末",
              'desc': "利息5折、现金、实物...",
              "thumb": "https://r.51gjj.com/act/release/img/20170821_share.png",
              "link": "https://" + host + "/act/home/huodong/20170821/index.php"
            });
          }
        });
      }
      return this;
    }
  };
  var ruleJson = {
    rule: [
      "领券后，通过活动页面完成申请或放款将获得特定奖励，同个业务奖励只能领取一次。",
      "领券后申请金优贷，每日前100名将获得精美定制笔记本一份；领券后申请金卡贷并放款，享受当月利息下调50%；领券后申请金安贷24小时未放款，获得超时赔付50元现金；领券后申请金花贷并放款，获得50元无门槛抵息券。",
      "此活动针对从未申请过金花贷、金优贷、金卡贷、金安贷业务的新用户，一个用户至多领取到这4个业务对应的奖励。",
      "抵息券将在首月还款直接减免，逾期、提前还款将不享受此优惠；现金/实物奖励将在用户信息完整后7个工作日内打款/寄出，请确认收款/收货信息准确性。",
      "有任何疑问或者帮助可联系客服4008635151。",
      "本商品由51公积金管家提供，与设备生产商Apple Inc.公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。"
    ]
  };
  run.start();
});