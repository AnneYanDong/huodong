require.config(requireConfig);
require(["jquery", "fastClick", "FullPage", "ct", "bridge", "juicer"], function($, fastClick, fullpage, ct, Bridge, juicer) {
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
            msg: ""
        },
        charge: {
            loan: null,
            type: null,
            pay: null
        },

        start: function() {
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
                callback: function() {
                    this.hintLog("图片加载完成");
                    var timer = null;
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        oPreLoading.hide();
                        _this.init();
                    }, 500)
                }
            })

            ct.Ajax.do({
                url: indexData.ajaxUrl || "test.php",
                // requestDataType: "json",
                data: {
                    action: "status",
                    test: "look",
                    num: 1
                },
                success: function(d) {
                    if (d.errcode == 0) {
                        _this.status.login = true;
                    } else {
                        _this.status.msg = d.errmsg || "出错请重试";
                        oP.show(d.errmsg || "出错请重试");
                    }
                }
            })
        },

        init: function() {
            var _this = this;
            $(".wp").removeClass("hide");
            _this.fullPageObj = _this.fullpage();
            _this.apply();
            _this.openRule();
            _this.closeRule();
        },

        fullpage: function() {
            var _this = this;
            var fullpage = document.getElementsByClassName("wp-inner")[0].fullpage({
                start: 0,
                beforeChange: function(e) {
                    var now = "page" + e.next;
                    _this.changeState(now);
                    // if (e.next < e.cur) {
                    //     return false;
                    // }
                },
                afterChange: function(e) {
                    _this.fullPageObj.stop();
                    var now = "page" + e.cur;
                    if (now == "page0") {
                        $(".page1 .gift").on("click", function() {
                            oM.show();
                            $(".page1 .content").append('<div class="tipMsg"><img src="../static/img/20170615_msg.png"></div>')
                            // _this.fullPageObj.moveTo(1, true);
                        });


                        $(".process").on("click", function() {
                            console.log(local.origin + "shequ/discovery/index.php?route=account/business&type=3")
                            window.location.href = local.origin + "shequ/discovery/index.php?route=account/business&type=3";
                        })

                        _this.respondState(now);
                    }

                    if (now == "page1") {
                        $(".page1 li").removeClass("rotate").addClass("grayscale");

                        $(".page2 li").on("click", function() {
                            oMask.show();
                            var ele = $(this);
                            if (ele.hasClass("rotate")) {
                                oMask.hide();
                                _this.fullPageObj.moveTo(2, true);
                            } else {
                                ele.siblings().addClass("grayscale").removeClass("animated rotate").end().removeClass("grayscale").addClass("animated");
                                var timer = null;
                                clearTimeout(timer);
                                timer = setTimeout(function() {
                                    ele.addClass("rotate");
                                    clearTimeout(timer);
                                    timer = setTimeout(function() {
                                        _this.fullPageObj.moveTo(2, true);
                                        oMask.hide();
                                    }, 1200)
                                }, 200)
                            }
                            _this.charge.loan = $(this).data("loan-type");
                        })


                        _this.respondState(now, 0, true);
                    }

                    if (now == "page2") {
                        $(".page2 li").removeClass("rotate").addClass("grayscale");
                        $(".page3 li").on("click", function() {
                            oMask.show();
                            var ele = $(this);
                            ele.siblings().addClass("grayscale").removeClass("animated rotate").end().removeClass("grayscale").addClass("animated");
                            var timer = null;
                            clearTimeout(timer);
                            timer = setTimeout(function() {
                                ele.addClass("rotate");
                                clearTimeout(timer);
                                timer = setTimeout(function() {
                                    console.log(_this.charge)
                                    if (_this.cardType(_this.charge) == "continue") {
                                        var d = null;
                                        if (_this.charge.type == 1) {
                                            var tpl = $("#tpl-choose-pf").html();
                                        } else {
                                            var tpl = $("#tpl-choose-gd").html();
                                        }
                                        var resHtml = juicer(tpl, d)
                                    } else {
                                        var d = cardJson[_this.cardType(_this.charge)];
                                        console.log(d);
                                        var tpl = $("#tpl-card").html();
                                        var resHtml = juicer(tpl, d);

                                        juicer.register("index_add", indexFn);
                                        var ruleTpl = $("#tpl-rule").html();
                                        var resRuleHtml = juicer(ruleTpl, d);
                                        console.log(resRuleHtml);
                                    }
                                    $(".page4 .content").html("").append(resHtml);
                                    $(".rule").remove();
                                    $("body").append(resRuleHtml);
                                    oMask.hide();
                                    _this.fullPageObj.moveTo(3, true);
                                }, 1200)
                            }, 200)

                            _this.charge.type = $(this).data("card-type");
                        })
                        _this.respondState(now, 1, true, function() {
                            _this.charge.loan = null;
                        });
                    }

                    if (now == "page3") {
                        $(".page3 li").removeClass("rotate").addClass("grayscale");
                        if ($(".page4 .next")) {
                            $(".next li").on("click", function() {
                                oMask.show();
                                var ele = $(this);
                                ele.siblings().addClass("grayscale").removeClass("animated rotate").end().removeClass("grayscale").addClass("animated");
                                var timer = null;
                                clearTimeout(timer);
                                timer = setTimeout(function() {

                                    ele.addClass("rotate");
                                    clearTimeout(timer);
                                    timer = setTimeout(function() {
                                        console.log(_this.charge)
                                        if (_this.cardType(_this.charge) == "continue") {
                                            console.log("错了")
                                            return false;
                                        } else {
                                            var d = cardJson[_this.cardType(_this.charge)];
                                            console.log(d);
                                            var tpl = $("#tpl-card").html();
                                            var resHtml = juicer(tpl, d);

                                            juicer.register("index_add", indexFn);
                                            var ruleTpl = $("#tpl-rule").html();
                                            var resRuleHtml = juicer(ruleTpl, d);
                                        }
                                        $(".page5 .content").html("").append(resHtml);
                                        $(".rule").remove();
                                        $("body").append(resRuleHtml);
                                        oMask.hide();
                                        _this.fullPageObj.moveTo(4, true);
                                    }, 1200)
                                }, 200)
                                _this.charge.pay = $(this).data("pay");
                            })
                        }
                        _this.respondState(now, 2, true);
                    }

                    if (now == "page4") {
                        $(".page4 li").removeClass("rotate").addClass("grayscale");
                        _this.charge.pay = null;
                        _this.respondState(now, 3, true);
                    }
                }
            });
            return fullpage;
        },

        // 走后台跳转申请
        apply: function() {
            $(".page4,.page5").on("click", ".apply", function() {
                console.log("...")
                var type = $(this).data("link");
                ct.Ajax.do({
                    url: indexData.ajaxUrl || "test.php",
                    data: {
                        action: "apply",
                        type: type
                    },
                    success: function(d) {
                        if (d.errcode == 0) {
                            window.location.href = d.url;
                        } else {
                            oP.show(d.errmsg || "出错请重试");
                        }
                    }
                })
            })
        },

        changeState: function(page) {
            window.history.pushState && window.history.pushState({
                title: page
            }, page, "index.php#page=" + page); // 塞入新的历史
        },

        // 返回。
        respondState: function(page, to, isAnim, fn) {
            var _this = this;
            var app = ct.Tool.userAgent();
            if (Bridge && app.isGjj) {
                Bridge.onBack(function() {
                    if (page == "page0") {
                        return false;
                    } else {
                        if (isAnim) {
                            _this.fullPageObj.moveTo(to, true);
                        } else {
                            _this.fullPageObj.moveTo(to);
                        }
                        if (fn) {
                            fn();
                        }
                        return true;
                    }
                })
            } else {
                window.onpopstate = function() {
                    if (isAnim) {
                        console.log(_this.fullPageObj)
                        _this.fullPageObj.moveTo(to, true);
                    } else {
                        _this.fullPageObj.moveTo(to);
                    }
                    if (fn) {
                        fn();
                    }
                }
            }
        },

        // 打开规则
        openRule: function() {
            $(".content").on("click", ".rule-btn", function() {
                oM.show();
                $(".rule").fadeIn();
            })
        },

        // 关闭规则
        closeRule: function() {
            $("body").on("click", ".btn-close", function() {
                $(".rule").fadeOut(function() {
                    oM.hide();
                })
            })
        },

        cardType: function(obj) {
            var data = null;

            if (!obj) {
                return false;
            }
            if (obj.loan == 1) { // 1-5
                if (obj.type == 1) { // 浦发是1
                    if (!obj.pay) {
                        return "continue";
                    } else if (obj.pay == 1) { // 4000+
                        return "mk"
                    } else if (obj.pay == 2) { // 4000-
                        return "cx";
                    }
                } else if (obj.type == 2) { // 光大是2
                    if (!obj.pay) {
                        return "continue";
                    } else if (obj.pay == 1) { // 2500+
                        return "lt"
                    } else if (obj.pay == 2) { // 2500-
                        return "znsw";
                    }
                } else { // 兴业是3
                    return "lxjy";
                }
            } else if (obj.loan == 2) { // 6-30
                if (obj.type == 1) { // 浦发
                    if (!obj.pay) {
                        return "continue";
                    } else if (obj.pay == 1) { // 4000+
                        return "mk"
                    } else if (obj.pay == 2) { // 4000-
                        return "cx";
                    }
                } else if (obj.type == 2) { // 光大
                    if (!obj.pay) {
                        return "continue";
                    } else if (obj.pay == 1) { // 2500+
                        return "lt"
                    } else if (obj.pay == 2) { // 2500-
                        return "znsw";
                    }
                } else { // 兴业
                    return "lxy"
                }
            }
        },
    }


    run.start();
})
