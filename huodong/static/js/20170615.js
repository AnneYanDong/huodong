require.config(requireConfig);
require(["jquery", "fastClick", "FullPage", "ct", "bridge", "juicer"], function ($, fastClick, fullpage, ct, Bridge, juicer) {
    var oMask = $(".mask");

    var oP = Object.create(ct.Prompt);
    oP.create().build();

    var oM = Object.create(ct.Mask);
    oM.create().build();

    var local = ct.Tool.local();

    ct.Tool.buryPoint();

    var run = {
        status: {
            login: false,
            oUrl_1: "",
            oUrl_2: ""
        },

        start: function () {
            var _this = this;

            /*解决移动端click点击300延迟*/
            fastClick.attach(document.body);

            /*设置HTML的font-size*/
            ct.Tool.setFont();
            window.addEventListener("resize", ct.Tool.debounce(ct.Tool.setFont));
            window.addEventListener("resize", ct.Tool.debounce(ct.Tool.handleBottomStatusBar));
            // window.onresize = ct.Tool.debounce(ct.Tool.setFont)

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
            _this.pullDown();
            _this.receive();
            _this.skip();
            _this.openRule();
            _this.closeRule();
            _this.share();
        },

        render: function () {
            var _this = this;

            $.ajax({
                type: "POST",
                dataType: "JSON",
                // url: "test.php",
                url: "/act/act170615/get_status",
                success: function (d) {
                    if (!!d.success) {
                        if (d.ret.weChat == true) {
                            timer = setTimeout(function () {
                                oP.show("本活动需在app参加");
                                timer = setTimeout(function () {
                                    window.location.href = "http://d.51gjj.com/";
                                }, 1500)
                            }, 200);
                        } else {
                            if (d.ret.login == false) {
                                if (Bridge) {
                                    Bridge.action("login");
                                }
                            } else {
                                _this.status.oUrl_1 = d.ret.url_1;
                                _this.status.oUrl_2 = d.ret.url_2;
                                console.debug(_this.status.oUrl_2)
                                if (d.ret.have == true) {
                                    $(".page1").addClass("hide");
                                    $(".page2").removeClass("hide");
                                }
                            }
                        }
                    } else {
                        oP.show(d.msg || "出错请重试");
                        $(".page1").unbind();
                    }
                }
            })
        },

        pullDown: function () {
            $(".page1").on("click", ".gift", function () {
                oM.show();
                $(".wp").append('<div class="tipMsg"><img src="http://r.51gjj.com/act/release/img/20170615_msg.png"><div class="receive" bp="收下" title="收下"></div></div>');
            })
        },

        receive: function () {
            $(document).on("click", ".receive", function () {
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    // url: "test.php",
                    url: "/act/act170615/get_prize",
                    success: function (d) {
                        if (!!d.success) {
                            $(".tipMsg").remove();
                            $(".mt-mask").css("display", "none");
                            window.location.href = d.ret.url;
                        } else {
                            oP.show(d.msg || "出错请重试");
                        }
                    }
                })
            })
        },
        skip: function () {
            var _this = this;
            $(".page2 .looking").on("click", function () {
                window.location.href = _this.status.oUrl_2;
            });
            $(".page2 .apply").on("click", function () {
                window.location.href = _this.status.oUrl_1;
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
                            "title": "【父亲节快乐】这些年收获了很多祝福和礼物，但其实…",
                            'desc': "给的再多，不如懂你，点击领取父亲节专属礼包！",
                            "thumb": "https://r.51gjj.com/act/release/img/20170615_wxshare.png",
                            "link": "http://" + host + "/act/home/huodong/20170615/"
                        });
                    }
                })
            }
            return this;
        },

    }


    run.start();
})