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
    var oUrl_1 = null;
    var oUrl_2 = null;
    var run = {
        status: {
            weChat: false,
            login: false,
            code: "",
            msg: ""
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
            _this.openRule();
            _this.closeRule();
            _this.render();
            _this.apply();
            _this.share();
            _this.pullDown();
            _this.enter();
        },

        render: function () {
            var _this = this;
            $.ajax({
                type: "POST",
                dataType: "JSON",
                // url: "test.php",
                url: "/act/act170601/get_status",
                // data: {
                //     "action": "accept"
                // },
                success: function (d) {
                    if (!!d.success) {
                        _this.status.login = d.ret.login;
                        _this.status.weChat = d.ret.weChat;
                        if (d.ret.have == false || _this.status.weChat == true) {
                            $(".mt-mask").removeClass("hide");
                            $(".redEnvelope").css("display", "block");
                            $(".redEnvelope").append("<img class='red' src='//r.51gjj.com/act/release/img/20170601_redPacket.png'/>");
                            if ($(".redEnvelope .red").length > 0) {
                                $(".redEnvelope .red").addClass("imgTop");
                            }
                        } else if (d.ret.have == true) {
                            $(".wp").css("-webkit-overflow-scrolling", "touch");
                        }
                        oUrl_1 = d.ret.url_1;
                        oUrl_2 = d.ret.url_2;
                    } else {
                        oP.show(d.msg || "出错请重试");
                        if (d.code) {
                            _this.status.code = d.code;
                        }
                    }
                }
            })
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

        //拆红包
        pullDown: function () {
            var _this = this;
            $(document).on("click", ".redEnvelope img", function () {
                // $.ajax({
                //     type: "POST",
                //     dataType: "JSON",
                //     url: "/act/act170601/get_status",
                //     success: function (d) {
                //         if (!!d.success) {
                //             _this.status.login = d.ret.login;
                //             _this.status.weChat = d.ret.weChat;
                //             oUrl_1 = d.ret.url_1;
                //             oUrl_2 = d.ret.url_2;
                //         } else {
                //             oP.show(d.msg || "出错请重试");
                //             if (d.code) {
                //                 _this.status.code = d.code;
                //             }
                //         }
                //     }
                // })
                if (_this.status.weChat == true) {
                    $(".redEnvelope").remove();
                    $(".mt-mask").addClass("hide");
                    oP.show("本活动需在app参加");
                    $(".wp").css("-webkit-overflow-scrolling", "touch");
                } else {
                    if (_this.status.login == false) {
                        // oP.show("请登陆app参与活动");
                        if (Bridge) {
                            Bridge.action("login");
                        }
                    } else {
                        $(".redEnvelope img").remove();
                        $(".redEnvelope").append("<img src='//r.51gjj.com/act/release/img/20170601_receive.png'/><div class='accept' bp='收下奖励' title='收下奖励'></div>");
                    }
                }
            })
        },

        //收下奖励
        enter: function () {
            $(document).on("click", ".redEnvelope .accept", function () {
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    // url: "test.php",
                    url: "/act/act170601/get_prize",
                    // data: {
                    //     "action": "accept"
                    // },
                    success: function (d) {
                        if (!!d.success) {
                            $(".redEnvelope").remove();
                            $(".wp").css("-webkit-overflow-scrolling", "touch");
                            $(".mt-mask").addClass("hide");
                        } else {
                            oP.show(d.msg || "出错请重试");
                        }
                    }
                })
            })
        },

        //立即申请
        apply: function () {
            var _this = this;
            var timer = null;
            clearTimeout(timer);
            $(document).on("click", ".apply", function () {
                if (_this.status.code) {
                    oP.show(_this.status.msg);
                } else {
                    if (_this.status.weChat == true) {
                        timer = setTimeout(function () {
                            oP.show("本活动需在app参加");
                            timer = setTimeout(function () {
                                window.location.href = "http://d.51gjj.com/";
                            }, 1500)
                        }, 200);
                    } else {
                        window.location.href = oUrl_1;
                    }
                }
            });
            $(document).on("click", ".look", function () {
                if (_this.status.code) {
                    oP.show(_this.status.msg);
                } else {
                    if (_this.status.weChat == true) {
                        timer = setTimeout(function () {
                            oP.show("本活动需在app参加");
                            timer = setTimeout(function () {
                                window.location.href = "http://d.51gjj.com/";
                            }, 1500)
                        }, 200);
                    } else {
                        window.location.href = oUrl_2;
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
                            "title": "大节难逃 领“拦路红包”",
                            'desc': "免费领取618“拦路红包”，人手一份，祝你狂欢！",
                            "thumb": "https://r.51gjj.com/act/release/img/20170601_share_1.png",
                            "link": "http://" + host + "/act/home/huodong/20170601/"
                        });
                    }
                })
            }
            return this;
        },
    }
    run.start();
})