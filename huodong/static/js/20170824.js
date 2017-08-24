require.config(requireConfig);
require(["jquery", "fastClick", "FullPage", "ct", "bridge", "juicer"], function ($, fastClick, fullpage, ct, Bridge, juicer) {
    var oMask = $(".mask");

    var oP = Object.create(ct.Prompt);
    oP.create().build();

    var oM = Object.create(ct.Mask);
    oM.create().build();

    var local = ct.Tool.local();
    var source = ct.Tool.userAgent().isGjj ? 1 : 0;
    ct.Tool.buryPoint_v2(source);
    // ct.Tool.share(82,"zmtkj");
    var run = {
        start: function () {
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
                callback: function () {
                    this.hintLog("图片加载完成");
                    var timer = null;
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        oPreLoading.hide();
                        _this.init();
                    }, 500)
                }
            })
        },

        init: function () {
            console.log("七夕活动");
            var _this = this;
            _this.setNavAttr();
            _this.share();
            $(".wp-outer").removeClass("hide");
            _this.PageBuryRequest();
            _this.getAmount();
        },
        getAmount: function() {
            $.ajax({
                type: "POST",
                dataType: "JSON",
                // url: "test.php",
                url: "/invest2/user/queryUser/totalTenderAmount",
                success: function (d) {
                    console.log("后台数据：",d);
                    if (10100 <= d.resCode < 10200) {
                        console.log("10100-10200");
                        if(Bridge) {
                            Bridge.action("login");
                        }
                    } else {
                        if (d.resCode == 1) {
                            console.log("1");
                            $(".amount span:eq(1)").text(d.resData.currentUserTenderMoney);
                        } else {
                            oP.show(d.resMsg || "出错请重试");
                        }
                    }
                }
            });
        },
        setNavAttr: function() {
            if (Bridge) {
                Bridge.action("setNavigationColor",{backgroundColor:"#212226",textColor:"#fff",iconType:"1"});
            }
        },
        PageBuryRequest: function () {
            $.ajax({
                type: "POST",
                dataType: "JSON",
                url: "/act/request/activity",
                data: JSON.stringify({
                    source: ct.Tool.userAgent().isGjj ? 1 : 0,
                    tag: "20170821_1_0_0_进入页面"
                }),
                success: function (d) {
                    if (d.success) {

                    }
                }
            });
        },
        //分享按钮：
        share: function () {
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
                    onclick: function () {
                        Bridge.action('ShareTimeline', {
                            "title": "抢个红包过周末",
                            'desc': "利息5折、现金、实物...",
                            "thumb": "https://r.51gjj.com/act/release/img/20170821_share.png",
                            "link": "https://" + host + "/act/wechat/act_analyzes"
                        });
                    }
                })
            }
            return this;
        }
    }
    run.start();
})
