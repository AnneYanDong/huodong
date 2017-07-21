require.config(requireConfig);
require(["jquery", "fastClick", "lucky-card", "ct", "bridge", "juicer", "marquee"], function ($, fastClick, LuckyCard, ct, Bridge, juicer, liMarquee) {
    var oMask = $(".mask");

    var oP = Object.create(ct.Prompt);
    oP.create().build();

    var oM = Object.create(ct.Mask);
    oM.create().build();

    var local = ct.Tool.local();

    ct.Tool.buryPoint();

    var myDay = new Date().getDay();
    var app = null;
    var oUrl = null;
    var run = {
        status: {
            login: false,
            msg: ""
        },
        charge: {
            loan: null,
            type: null,
            pay: null
        },

        start: function () {
            var _this = this;

            /*解决移动端click点击300延迟*/
            fastClick.attach(document.body);

            /*设置HTML的font-size*/
            ct.Tool.setFont();
            ct.Tool.handleBottomStatusBar();
            window.addEventListener("resize", ct.Tool.debounce(ct.Tool.setFont));
            window.addEventListener("resize", ct.Tool.debounce(ct.Tool.handleBottomStatusBar));
            // window.onresize = ct.Tool.debounce(ct.Tool.setFont)

            /*整体预加载动画*/
            var oPreLoading = Object.create(ct.PreLodingUi);
            oPreLoading.create({
                preLoadingCls: "loading-bg-color", // 自定义加载动画颜色
                loadingEleCls: "loading-ele-color"
            }).build();

            app = ct.Tool.userAgent();
            console.log(app);

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

            $.ajax({
                type: "POST",
                dataType: "JSON",
                url: ct.Tool.url("/app/request/activity"),
                data: JSON.stringify({
                    place_cid: ct.Tool.userAgent().isGjj ? 1 : 0,
                    tag: "进入页面" + projectName
                }),
                success: function (d) {
                    if (d.success == true) {

                    }
                }
            })
        },

        init: function () {
            var _this = this;
            $(".wp").removeClass("hide");
            // _this.openRule();
            // _this.closeRule();
            _this.apply();
            _this.share()
        },

        // 打开规则
        openRule: function () {
            $(".content").on("click", ".rule-btn", function () {
                oM.show();
                $(".rule").fadeIn();
            })
        },

        // 关闭规则
        closeRule: function () {
            $("body").on("click", ".btn-close", function () {
                $(".rule").fadeOut(function () {
                    oM.hide();
                })
            })
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
                            "title": "烂世，别妨碍我的生活！",
                            'desc': "年轻小资消费搭档or成家立业必然选择，这次你的选择？",
                            "thumb": "https://r.51gjj.com/act/release/img/20170512_share1.png",
                            "link": "http://" + host + "/act/home/huodong/20170512/"
                        });
                    }
                })
            }
            return this;
        },

        //立即申请
        apply: function () {
            $(".content").on("click", "#gold", function () {
                window.location.href = "https://b.jianbing.com/shequ/discovery/index.php?route=bankx/index&bank_id=43&from=activity_?from=activity_20170512";
            });
            $(".content").on("click", "#platinum", function () {
                var timer = null;
                clearTimeout(timer);
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    // url: "test.php",
                    url: "/act/act170512/get_status",
                    success: function (d) {
                        console.log(d);
                        if (d.success == true) {
                            var d = d.ret;
                            if (d.is_weChat || d.is_qq) {
                                window.location.href = "https://b.jianbing.com/shequ/discovery/index.php?route=bankx/index&bank_id=1&from=activity_?from=activity_20170512";
                            } else {
                                if (!d.login) {
                                    if (Bridge) {
                                        Bridge.action("login");
                                    }
                                } else {
                                    if (d.jump) {
                                        window.location.href = "https://b.jianbing.com/shequ/discovery/index.php?route=bankx/index&bank_id=1&from=activity_?from=activity_20170512";
                                    } else {
                                        oP.show("您暂不符合该卡申请资格，可尝试申请智能金卡");
                                        timer = setTimeout(function(){
                                            window.location.href = "https://b.jianbing.com/shequ/discovery/index.php?route=bankx/index&bank_id=43&from=activity_?from=activity_20170512";
                                        },2000);
                                    }
                                }
                            }
                        }
                    }
                })
            });
        },
    }
    run.start();
})
