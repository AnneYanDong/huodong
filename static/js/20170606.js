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
            _this.apply();
            _this.compute();
            _this.use();
            _this.close();
        },

        render: function () {
            $.ajax({
                type: "POST",
                dataType: "JSON",
                // url: "test.php",
                url: "/act/act170606/get_status",
                success: function (d) {
                    if (!!d.success) {
                        if (d.ret.login == false) {
                            timer = setTimeout(function () {
                                oP.show("请登录app参与活动");
                                timer = setTimeout(function () {
                                    if (Bridge) {
                                        Bridge.action("login");
                                    }
                                }, 1500)
                            }, 200);
                        } else {
                            if (d.ret.have == true) {
                                oUrl = d.ret.url;
                                oM.show();
                                $(".wp").append('<div class="prize"><img src="//r.51gjj.com/act/release/img/20170606_prize.png"/><div class="use" bp="立即使用" title="立即使用"></div></div>');
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
            $(".loan input").keyup(function () {
                var loanMoney = $(".loan input").val();
                console.log(loanMoney)
                if (_this.checkNum()) {
                    console.log(111)
                    if (loanMoney === "2") {
                        console.log(2222)
                        $(".result").html("104.41");
                    } else if (loanMoney == "3") {
                        $(".result").html("156.62");
                    } else if (loanMoney == "4") {
                        $(".result").html("208.82");
                    } else if (loanMoney == "5") {
                        $(".result").html("261.03");
                    } else if (loanMoney == "6") {
                        $(".result").html("313.23");
                    } else if (loanMoney == "7") {
                        $(".result").html("365.44");
                    } else if (loanMoney == "8") {
                        $(".result").html("417.64");
                    } else if (loanMoney == "9") {
                        $(".result").html("469.85");
                    } else {
                        $(".result").html("");
                    }
                }
            })
        },

        //检验输入数字为2~9
        checkNum: function () {
            var _this = this;
            var re = /^([2-9]{1})+$/;
            var loanMoney = $(".loan input").val();
            if (loanMoney == "") {
                $(".result").html("");
            }
            if (re.test(loanMoney) || loanMoney == "") {
                return true;
            } else {
                oP.show("请输入2~9整数")
                // return false;
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

        apply: function () {
            var _this = this;
            var timer = null;
            clearTimeout(timer);
            $('.wp .content').on('click', '.receive', function () {
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    url: "/act/act170606/get_prize",
                    success: function (d) {
                        if (!!d.success) {
                            if (d.ret.type == 1) {
                                timer = setTimeout(function () {
                                    oP.show("您已有券，请先去使用");
                                    timer = setTimeout(function () {
                                        window.location.href = d.ret.url;
                                    }, 1000)
                                }, 200)
                            } else if (d.ret.type == 2) {
                                timer = setTimeout(function () {
                                    // oP.show("恭喜领到1张1个月免息券，快去白用钱");
                                    oM.show();
                                    $(".wp").append('<div class="prize"><img src="//r.51gjj.com/act/release/img/20170606_msg.png"/></div>');
                                    // $(".prize").fadeOut(900);
                                    // $(".mt-mask").css("display", "none");
                                    timer = setTimeout(function () {
                                        window.location.href = d.ret.url;
                                    }, 1000)
                                }, 200)
                            } else if (d.ret.type == 3) {
                                timer = setTimeout(function () {
                                    oP.show("抱歉不符合条件，请去其他试试吧");
                                }, 300)
                                timer = setTimeout(function () {
                                    window.location.href = d.ret.url;
                                }, 1000)
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

        use: function () {
            $(document).on('click', '.prize .use', function () {
                window.location.href = oUrl;
            })
        },
        close: function () {
            $(".mt-mask").on("click", function () {
                if ($(".prize").length > 0) {
                    $(".mt-mask").css("display", "none");
                    $(".prize").remove();
                }
            })
        }
    }
    run.start();
})