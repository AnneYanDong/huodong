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

            $.ajax({
                type: "POST",
                dataType: "JSON",
                url: ct.Tool.url("/app/request/activity"),
                data: JSON.stringify({
                    place_cid: ct.Tool.userAgent().isGjj ? 1 : 0,
                    tag: "进入页面" + projectName
                }),
                success: function (d) {
                    if (d.success) {

                    }
                }
            });
        },

        init: function() {
            console.log("私人订制活动");
            var _this = this;
            $(".wp").removeClass("hide");
            _this.fullPageObj = _this.fullpage();
            _this.apply();
        },

        fullpage: function() {
            var _this = this;
            var fullpage = document.getElementsByClassName("wp-inner")[0].fullpage({
                start: 0,
                beforeChange: function(e) {
                    var now = "page" + e.next;
                    _this.changeState(now); //把当前页面在改变之前塞入浏览器历史记录
                },
                afterChange: function(e) {
                    _this.fullPageObj.stop();
                    var now = "page" + e.cur;
                    if (now == "page0") {
                        $(".page1 .btn").on("click", function() {
                            if (!_this.status.login) {
                                oP.show(_this.status.msg);
                                return;
                            }
                            _this.fullPageObj.moveTo(1, true);
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


                        _this.respondState(now, 0, true);  //app点击返回箭头执行的函数
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

    var cardJson = {
        "lxy": {
            title: "立享悠白金卡",
            img: "xy_lxy.png",
            qy: [
                "银联白金卡，每年6次机场贵宾服务",
                "10积分=1公里，航空里程随心兑"
            ],
            hd: ["申请即送伴手礼"],
            cardApply: "34",
            process: "",
            rule: [
                "3月19日至3月31日，申请兴业银行立享白金卡精英系列或悠系列即可获精美伴手礼1份。",
                "本次伴手礼为一份价值30元的玻璃水杯，高品质更安全，出行携带更方便。",
                "每位用户限领取一次伴手礼，每日送出300份，先到先得。",
                "中奖后三日内请点击我的奖品来领取，请保证收货地址准确详细，超出三日未领取自动失效。",
                "有任何疑问或者帮助可联系客服4008635151。",
                "本商品由51公积金管家提供，与设备生产商Apple Inc公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。",
            ]
        },
        "lt": {
            title: "商务龙腾白金卡",
            img: "gd_lt.png",
            qy: [
                "银联白金卡，星级酒店住两送一",
                "半年内享无限次机场高铁贵宾厅"
            ],
            hd: ["申请即送伴手礼"],
            cardApply: "44",
            process: "",
            rule: [
                "3月19日至3月31日，申请光大银行龙腾白金卡或智能商务金卡即可获精美伴手礼1份。",
                "本次伴手礼为一份价值30元的玻璃水杯，高品质更安全，出行携带更方便。",
                "每位用户限领取一次伴手礼，每日送出300份，先到先得。",
                "中奖后三日内请点击我的奖品来领取，请保证收货地址准确详细，超出三日未领取自动失效。",
                "有任何疑问或者帮助可联系客服4008635151。",
                "本商品由51公积金管家提供，与设备生产商Apple Inc公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。",
            ]
        },
        "mk": {
            title: "梦卡白金卡",
            img: "pf_mk.png",
            qy: [
                "银联白金卡，最高30万现金贷款特权",
                "免年费，商场免费停车"
            ],
            hd: ["申请送积分，开卡送288现金"],
            cardApply: "38",
            process: "",
            rule: [
                "本活动为浦发专享活动，成功申请后您将获得1笔贷款和1张信用卡。",
                "完成申请后您将获得2017个积分（相当于30元），24小时内发放到个人账户。",
                "放款后您将另获得288元现金，3个工作日内发放到您的支付宝账号，为确保您能及时收到现金奖励，请点击我的-我的奖品，确保支付宝信息填写完善。如果您在活动前已申请鑫时贷，活动期间放款您仍然可以获得288元现金。",
                "红包的有效期为30天，您需要在30天内申请并激活放款。",
                "本活动仅限活动前未放款或未申请过的用户，已放款用户不参与本次活动。",
                "如有任何问题请咨询官方客服热线4008635151。",
                "本商品由51公积金管家提供，与设备生产商Apple Inc.公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。"
            ]
        },
        "cx": {
            title: "财星IC卡",
            img: "pf_cx.png",
            qy: [
                "银联金卡，最高30万现金贷款特权",
                "每月首次取现免手续费"
            ],
            hd: ["申请送积分，开卡送288现金"],
            cardApply: "22",
            process: "",
            rule: [
                "本活动为浦发专享活动，成功申请后您将获得1笔贷款和1张信用卡。",
                "完成申请后您将获得2017个积分（相当于30元），24小时内发放到个人账户。",
                "放款后您将另获得288元现金，3个工作日内发放到您的支付宝账号，为确保您能及时收到现金奖励，请点击我的-我的奖品，确保支付宝信息填写完善。如果您在活动前已申请鑫时贷，活动期间放款您仍然可以获得288元现金。",
                "红包的有效期为30天，您需要在30天内申请并激活放款。",
                "本活动仅限活动前未放款或未申请过的用户，已放款用户不参与本次活动。",
                "如有任何问题请咨询官方客服热线4008635151。",
                "本商品由51公积金管家提供，与设备生产商Apple Inc.公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。"
            ]
        },
        "znsw": {
            title: "智能商务金卡",
            img: "gd_znsw.png",
            qy: [
                "银联金卡，商旅预订，无忧出行",
                "48小时失卡保障服务"
            ],
            hd: ["申请即送伴手礼"],
            cardApply: "43",
            process: "",
            rule: [
                "3月19日至3月31日，申请光大银行龙腾白金卡或智能商务金卡即可获精美伴手礼1份。",
                "本次伴手礼为一份价值30元的玻璃水杯，高品质更安全，出行携带更方便。",
                "每位用户限领取一次伴手礼，每日送出300份，先到先得。",
                "中奖后三日内请点击我的奖品来领取，请保证收货地址准确详细，超出三日未领取自动失效。",
                "有任何疑问或者帮助可联系客服4008635151。",
                "本商品由51公积金管家提供，与设备生产商Apple Inc公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。",
            ]
        },
        "lxjy": {
            title: "立享精英白金卡",
            img: "xy_jy.png",
            qy: [
                "银联白金卡，境内机场贵宾厅礼遇",
                "刷卡自动豁免年费"
            ],
            hd: ["申请即送伴手礼"],
            cardApply: "42",
            process: "",
            rule: [
                "3月19日至3月31日，申请兴业银行立享白金卡精英系列或悠系列即可获精美伴手礼1份。",
                "本次伴手礼为一份价值30元的玻璃水杯，高品质更安全，出行携带更方便。",
                "每位用户限领取一次伴手礼，每日送出300份，先到先得。",
                "中奖后三日内请点击我的奖品来领取，请保证收货地址准确详细，超出三日未领取自动失效。",
                "有任何疑问或者帮助可联系客服4008635151。",
                "本商品由51公积金管家提供，与设备生产商Apple Inc公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。",
            ]
        }
    }

    run.start();
})
