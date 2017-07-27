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
    var oType = "";
    var oMsg = "";
    var run = {
        start: function () {
            var _this = this;

            /*解决移动端click点击300延迟*/
            fastClick.attach(document.body);

            /*设置HTML的font-size*/
            ct.Tool.setFont();
            // ct.Tool.handleBottomStatusBar();
            window.addEventListener("resize", ct.Tool.debounce(ct.Tool.setFont));
            // window.addEventListener("resize", ct.Tool.debounce(ct.Tool.handleBottomStatusBar));
            // window.onresize = ct.Tool.debounce(ct.Tool.setFont)

            /*整体预加载动画*/
            var oPreLoading = Object.create(ct.PreLodingUi);
            oPreLoading.create({
                preLoadingCls: "loading-bg-color", // 自定义加载动画颜色
                loadingEleCls: "loading-ele-color"
            }).build();

            app = ct.Tool.userAgent();

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
            _this.openRule();
            _this.closeRule();
            _this.receive();
            _this.compute();
            _this.close();
            _this.apply();
            _this.share();
        },

        render: function () {
            var timer = null;
            clearTimeout(timer);
            $.ajax({
                type: "POST",
                dataType: "JSON",
                // url: "test.php",
                url: "/act/act170608/get_status",
                success: function (d) {
                    if (!!d.success) {
                        if (d.ret.weChat == true) {
                            timer = setTimeout(function () {
                                oP.show("本活动需在app参加");
                                timer = setTimeout(function () {
                                    window.location.href = "http://d.51gjj.com/"
                                }, 1500)
                            }, 200);
                        } else {
                            if (d.ret.login == false) {
                                if (Bridge) {
                                    Bridge.action("login");
                                }
                            } else {
                                if (d.ret.have == true) {
                                    oUrl = d.ret.url;
                                    oM.show();
                                    $(".wp").append('<div class="ticket"><img src="//r.51gjj.com/act/release/img/20170608_ticket.png" /><div class="apply"></div></div>');
                                }
                            }
                        }
                    } else {
                        oP.show(d.msg || "出错请重试");
                    }
                }
            })
        },

        compute: function () {
            var _this = this;
            $(".input-1 input").keyup(function () {
                var loanMoney = $(".input-1 input").val();
                var month = $(".input-2 input").val();
                loanMoney = Number(loanMoney);
                month = Number(month);
                _this.checkNum1(loanMoney);
                if (loanMoney && month) {
                    var interest = Number(loanMoney * month * 0.011191);
                    var money = Number(interest - (loanMoney * month * 0.00899));
                    interest = Math.round(interest);
                    money = Math.round(money);
                    if (_this.checkNum1(loanMoney) && _this.checkNum2(month)) {
                        console.log("jinlai 了");
                        console.debug(_this.checkNum1(loanMoney), _this.checkNum2(month))
                        $('.interest').text(interest);
                        $('.money').text(money);
                    } else {
                        $('.interest').text("");
                        $('.money').text("");
                    }
                }
            })
            $(".input-2 input").keyup(function () {
                var loanMoney = $(".input-1 input").val();
                var month = $(".input-2 input").val();
                loanMoney = Number(loanMoney);
                month = Number(month);
                console.log(loanMoney, month)
                _this.checkNum2(month);
                if (loanMoney && month) {
                    var interest = Number(loanMoney * month * 0.011);
                    var money = Number(interest - (loanMoney * month * 0.0088));
                    interest = Math.round(interest);
                    money = Math.round(money);
                    if (_this.checkNum1(loanMoney) && _this.checkNum2(month)) {
                        $('.interest').text(interest);
                        $('.money').text(money);
                    } else {
                        $('.interest').text("");
                        $('.money').text("");
                    }
                }
            })
        },

        //检验输入数字为1~300000
        checkNum1: function (loanMoney) {
            var loanMoney = loanMoney;
            var _this = this;
            // var re = /^[0-9]*[1-9][0-9]*$/;
            var re = /^[1-9]{1}\d{0,4}$|^[1-2]{1}\d{5}$|^3(0)(0)(0)(0)(0)$/
            if (loanMoney == "") {
                $(".interest").html("");
                $(".money").html("");
            }
            if (re.test(loanMoney)) {
                return true;
            } else {
                oP.show("借款金额请输入1~300000整数");
                return false;
            }
        },
        //1~36数字
        checkNum2: function (month) {
            var month = month;
            // var re = /^[0-9]*[1-9][0-9]*$/;console.log("约束",month)
            var re = /^(1|2|3|4|5|6|7|8|9)$|^[1,2]{1}\d{1}$|^3(0|1|2|3|4|5|6)$/;
            if (month == "") {
                $(".interest").html("");
                $(".money").html("");
            }
            console.log("数据11", typeof (month), month)
            if (re.test(month)) {
                console.log("数据", month)
                return true;
            } else {
                oP.show("借款期数请输入1~36的整数");
                return false;
            }
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

        receive: function () {
            var _this = this;
            var timer = null;
            clearTimeout(timer);
            $('.wp .content').on('click', '.receive', function () {
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    // url: "test.php",
                    url: "/act/act170608/get_prize",
                    success: function (d) {
                        if (!!d.success) {
                            if (d.ret.type == 1) { //弹框，领券
                                oUrl = d.ret.url;
                                oM.show();
                                $(".wp").append('<div class="ticket"><img src="//r.51gjj.com/act/release/img/20170608_ticket.png" /><div class="apply"></div></div>');
                            } else if (d.ret.type == 2) {
                                oP.show("您不符合业务申请条件");
                            } else if (d.ret.type == 3) {
                                oP.show("您已申请过该业务");
                            } else {
                                oP.show(d.msg || "出错请重试");
                            }
                        } else {
                            oP.show(d.msg || "出错请重试");
                        }
                    }
                })

            })
        },

        close: function () {
            $(".mt-mask").on("click", function () {
                if ($(".ticket").length > 0) {
                    $(".mt-mask").css("display", "none");
                    $(".ticket").remove();
                }
            })
        },

        apply: function () {
            $(document).on('click', '.apply', function () {
                if ($(".ticket").length > 0) {
                    console.log(oUrl)
                    window.location.href = oUrl;
                }
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
                            "title": "史无前例",
                            'desc': "广发鑫秒贷放肆八折",
                            "thumb": "https://r.51gjj.com/act/release/img/20170608_wxshare.png",
                            "link": "https://" + host + "/act/home/huodong/20170608/"
                        });
                    }
                })
            }
            return this;
        },
    }
    run.start();
})
