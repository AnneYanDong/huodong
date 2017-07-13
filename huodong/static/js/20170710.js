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
            weChat: false,
            qq: false,
            prize: "",
            oUrl_1: "",
            oUrl_2: "",
            type: ""
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
                url: "/act/act170710/get_status",
                success: function (d) {
                    if (!!d.success) {
                        _this.status.login = d.ret.login;
                        _this.status.weChat = d.ret.weChat;
                        _this.status.qq = d.ret.qq;
                        _this.status.oUrl_1 = d.ret.url_1;
                        _this.status.oUrl_2 = d.ret.url_2;
                        _this.status.prize = d.ret.prize;
                        if (d.ret.have == true) {
                            $(".page2").removeClass("hide");
                            $(".page2 .content").append('<div class="prizeMoney"><img src="http://r.51gjj.com/act/release/img/20170710_prize_' + _this.status.prize + '.png"></div>');
                            oP.show("您已领取过红包");
                            $(".apply").addClass("addShake");
                        } else {
                            $(".page1").removeClass("hide");
                            $(".page1 img").addClass("addFadeIn");
                            setTimeout(function () {
                                $(".page1").addClass("hide");
                                $(".page2").removeClass("hide");
                                $(".page2 .content").append('<div class="prizeMoney"><img src="http://r.51gjj.com/act/release/img/20170710_prize_' + _this.status.prize + '.png"></div>');
                                oM.show();
                                $(".page2").append('<div class="redPackets addMove"><img src="http://r.51gjj.com/act/release/img/20170710_redPackets.png"></div>');
                            }, 4000)
                        }
                    } else {
                        oP.show(d.msg || "出错请重试");
                        $(".page1").unbind();
                    }
                }
            })
        },

        pullDown: function () {
            var _this = this;
            $(".page2").on("click", ".redPackets img", function () {
                if (_this.status.weChat == true || _this.status.qq == true) {
                    oP.show("本活动需在app参加");
                    $(".prize").remove();
                    $(".mt-mask").css("display", "none");
                }
                if (_this.status.login == false) {
                    if (Bridge) {
                        Bridge.action("login");
                    }
                } else {
                    $.ajax({
                        type: "POST",
                        dataType: "JSON",
                        // url: "test.php",
                        url: "/act/act170710/get_prize",
                        success: function (d) {
                            if (!!d.success) {
                                _this.status.type = d.ret.type;
                                _this.status.prize = d.ret.prize;
                                if (d.ret.type == 1) {
                                    oP.show("您已申请活动业务,暂不符合参与条件,试试其他!");
                                    $(".redPackets").remove();
                                    oM.hide();
                                } else if (d.ret.type == 2) {
                                    oP.show(" 您已经参加了该业务的其他优惠活动,不要太贪心哦!");
                                    $(".redPackets").remove();
                                    oM.hide();
                                } else if (d.ret.type == 3) {
                                    $(".redPackets").remove();
                                    console.log(_this.status.prize);
                                    $(".page2").append('<div class="prize"><img src="http://r.51gjj.com/act/release/img/20170710_redPackets_' + _this.status.prize + '.png"><div class="receive" bp="收下" title="收下"></div></div>');
                                }
                            } else {
                                oP.show(d.msg || "出错请重试");
                            }
                        }
                    })
                }
            })
        },

        receive: function () {
            var _this = this;
            $(document).on("click", ".receive", function () {
                $(".prize").remove();
                $(".mt-mask").css("display", "none");
                $(".apply").addClass("addShake");
            })
        },

        skip: function () {
            var _this = this;
            $(".page2 .looking").on("click", function () {
                if (_this.status.weChat == true || _this.status.qq == true) {
                    var timer = null;
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        oP.show("在app中参与才能获得奖励哦");
                        timer = setTimeout(function () {
                            window.location.href = _this.status.oUrl_1;
                        }, 1500)
                    }, 200)
                } else {
                    if (_this.status.type == 1) {
                        oP.show("您已申请活动业务,暂不符合参与条件,试试其他!");
                    } else if (_this.status.type == 2) {
                        oP.show(" 您已经参加了该业务的其他优惠活动,不要太贪心哦!");
                    } else {
                        window.location.href = _this.status.oUrl_2;
                    }
                }
            });
            $(".page2 .apply").on("click", function () {
                if (_this.status.weChat == true) {
                    var timer = null;
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        oP.show("在app中参与才能获得奖励哦");
                        timer = setTimeout(function () {
                            window.location.href = _this.status.oUrl_1;
                        }, 1500)
                    }, 200)
                } else {
                    if (_this.status.type == 1) {
                        oP.show("您已申请活动业务,暂不符合参与条件,试试其他!");
                    } else if(_this.status.type == 2) {
                        oP.show(" 您已经参加了该业务的其他优惠活动,不要太贪心哦!");
                    } else {
                        window.location.href = _this.status.oUrl_1;
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
                            "title": "7.14银色情人节 这个节日我赞助",
                            'desc': "真情红包，真爱相送，点击领取258元现金红包！",
                            "thumb": "https://r.51gjj.com/act/release/img/20170710_wxshare.png",
                            "link": "http://" + host + "/act/home/huodong/20170710/"
                        });
                    }
                })
            }
            return this;
        },

    }


    run.start();
})