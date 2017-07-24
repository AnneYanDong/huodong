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
       /* floatText: {
            src: ["<?php echo $imgUrl; ?>bsk_float_icon.png","../img/20170531_bsk_float_icon.png",
            "../img/20170531_bsk_float_icon.png","../img/20170531_bsk_float_icon.png",
            "../img/20170531_bsk_float_icon.png","../img/20170531_bsk_float_icon.png",
            "../img/20170531_bsk_float_icon.png","../img/20170531_bsk_float_icon.png","../img/20170531_bsk_float_icon.png"],
            text: ["text1","text2","text3","text4","text5","text6","text7","text8","text9"]
        },*/

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
            _this.render();
            _this.apply();
            _this.share()
            _this.openRule();
            _this.closeRule();
        },

        render: function () {
            var _this = this;
            // console.log("render->",_this);
            // console.log("第一个浮动文字的icon",_this.floatText.src[0]);
            // console.log("第一个浮动文字的文本",_this.floatText.text[0]);

            // $(".float-text").empty();
            // $(".float-text").append("<ul></ul>");
            // var len = _this.floatText.src.length;
            // console.log("长度：",len);
            // for (var i = 0; i <= len - 1; i++) {
            //     $(".float-text ul").append("<li><img/></li>");
            //     console.log($(".float-text ul li"));
            //     var imgs = $("li img");
            //     var spans = $("li span");
            //     imgs[i].setdata.src = _this.floatText.src[i];
            // }

            $('.location1').liMarquee({
                direction: "left",
                scrollamount: 50,
                hoverstop: false,
                drag: false,
            });
            $('.location2').liMarquee({
                direction: "left",
                scrollamount: 40,
                hoverstop: false,
                drag: false,
            });
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
                            "title": "你刷卡我免息",
                            'desc': "送你316元免息金",
                            "thumb": "https://r.51gjj.com/act/release/img/20170531_wxfx.png",
                            "link": "http://" + host + "/act/home/huodong/20170531/"
                        });
                    }
                })
            }
            return this;
        },

        //立即申请
        apply: function () {
            $(".content").on("click", ".apply", function () {
                $.ajax({
                    /*同一域名下的不同文件夹是可以访问到*/
                    // url: "test.php",
                    url: "/act/act170510/get_status",
                    type: "POST",
                    dataType: "JSON",
                    success: function (d) {
                        if (d.success) {
                            d = d.ret;
                            var timer = null;
                            clearTimeout(timer);
                            if (d.weChat == true || d.qq == true) {
                                window.location.href = d.url;
                            } else if (d.login == false) {
                                if (Bridge) {
                                    Bridge.action("login");
                                }
                            } else {
                                if (d.type == 1) {
                                    window.location.href = d.url;
                                } else if (d.type == 2) {
                                    timer = setTimeout(function () {
                                        oP.show("您可获得316元现金，快去激活您的卡片吧~");
                                        timer = setTimeout(function () {
                                            window.location.href = d.url;
                                        }, 1500)
                                    }, 200);
                                } else if (d.type == 3) {
                                    timer = setTimeout(function () {
                                        oP.show("您已拥有大额现金券，快去激活您的卡片吧~");
                                        timer = setTimeout(function () {
                                            window.location.href = d.url;
                                        }, 1500)
                                    }, 200);
                                } else {
                                    oP.show(d.msg || "出错请重试");
                                }
                            }
                        } else if (d.code == 1) {
                            oP.show(d.msg || "出错请重试");
                        } else {
                            oP.show(d.msg);
                        }
                    }
                })
            });
        },
    }
    
    run.start();
})
