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
            _this.showAnimation();
            _this.openRule();
            _this.closeRule();
            _this.apply();
            _this.share();
        },
        showAnimation: function() {
            var timer = null;
            timer = setTimeout(function(){
                $(".receive").addClass("animation");
                timer = setInterval(function(){
                    $(".receive").removeClass("animation");
                    timer = setInterval(function(){
                        $(".receive").addClass("animation");
                    },2000);
                },1500);
            },1000);
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

        apply: function () {
            var _this = this;
            var timer = null;
            clearTimeout(timer);
            $('.content').on('click', '.apply1,.apply2,.receive', function (event) {
                console.log(event.target);
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    // url: "test.php",
                    url: "/act/act170605/get_prize",
                    success: function (d) {
                        console.log(d);
                        _this.doAjax(d);
                    }
                })
            });
        },

        doAjax: function(d) {
            if (d.success == true) {
                if (d.ret.weChat == true) {
                    timer = setTimeout(function () {
                        window.location.href = d.ret.url;
                    }, 200);
                } else {
                    if (d.ret.login == false) {
                        if (Bridge) {
                            Bridge.action("login");
                        }
                    } else {
                        if (d.ret.match == true) {
                            timer = setTimeout(function () {
                                oP.show("已领券，去体验吧");
                                timer = setTimeout(function () {
                                    window.location.href = d.ret.url;
                                }, 1500)
                            }, 200);
                        } else {
                            timer = setTimeout(function () {
                                oP.show("暂不符合要求，看看其他业务吧");
                                timer = setTimeout(function () {
                                    window.location.href = d.ret.url;
                                }, 1500)
                            }, 200);
                        }
                    }
                }
            } else {
                oP.show(d.msg || "出错请重试");
            }
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
                            "title": "8万元额度3分钟到账，申请还送现金",
                            'desc': "申请送40，借款送50",
                            "thumb": "https://r.51gjj.com/act/release/img/20170605_wxshare.png",
                            "link": "https://" + host + "/act/home/huodong/20170605/"
                        });
                    }
                })
            }
            return this;
        },
    }
    run.start();
})
