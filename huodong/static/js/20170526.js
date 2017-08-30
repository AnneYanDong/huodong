require.config(requireConfig);
require(["jquery", "fastClick", "FullPage", "ct", "bridge", "juicer"], function($, fastClick, fullpage, ct, Bridge, juicer) {
    var oMask = $(".mask");

    var oP = Object.create(ct.Prompt);
    oP.create().build();

    var oM = Object.create(ct.Mask);
    oM.create().build();

    var local = ct.Tool.local();

    ct.Tool.buryPoint();
    ct.Tool.share(63, "xykdzpyq");
    var run = {
        status: {
            login: false,
            weChat: false,
            url: "",
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
            ct.Tool.setFont_v2();
            window.addEventListener("resize", ct.Tool.debounce(ct.Tool.setFont_v2));
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
                    if (d.success == true) {
                        console.log("进入页面");
                    }
                }
            })
            $.ajax({
                // url: indexData.ajaxUrl || "test.php",
                type: "POST",
                dataType: "JSON",
                url: "/act/act170526/get_status",
                success: function(d) {
                    if (d.success) {
                        d = d.ret;
                        if (d.login) {
                            _this.status.login = d.login;
                        }
                        if (d.weChat) {
                            _this.status.weChat = d.weChat;
                        }
                        if (d.url) {
                            _this.status.url = d.url;
                        } 
                    } else {
                        _this.status.msg = d.msg || "出错请重试";
                        oP.show(d.msg || "出错请重试");
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
            _this.share();
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
                        $(".page1 .btn").on("click", function() {
                            if (!_this.status.login) { //未登录跳转登录页
                                // oP.show("请登陆app参与活动");
                                    if (Bridge) {
                                        Bridge.action("login");
                                    }
                            }
                            // if (_this.status.weChat == true) { //微信端打开
                            //     oP.show("请登陆app参与活动");
                            // }
                            _this.fullPageObj.moveTo(1, true);
                        });


                        $(".process").on("click", function() {
                            window.location.href = _this.status.url;
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
                console.log(type)
                $.ajax({
                    // url: indexData.ajaxUrl || "test.php",
                    url: "/act/act170526/get_url",
                    type: "POST",
                    dataType: "JSON",
                    data: JSON.stringify({type: type}),
                    success: function(d) {
                        if (d.success) {
                            window.location.href = d.ret.url;
                        } else {
                            oP.show(d.msg || "出错请重试");
                        }
                    }
                })
            })
        },

        changeState: function(page) {
            var dataArr = window.location.search.slice(1);console.log(dataArr);
            window.history.pushState && window.history.pushState({
                title: page
            }, page, "index.php?"+dataArr+"#page=" + page); // 塞入新的历史
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
            if (obj.loan == 1) { // 1-5万信用卡额度
                if (obj.type == 1) { // 浦发是1
                    return "psfq";  //巴萨分期白金卡
                } else if (obj.type == 2) { // 光大是2
                    if (!obj.pay) {
                        return "continue";
                    } else if (obj.pay == 1) { // 4000+
                        return "lt"
                    } else if (obj.pay == 2) { // 4000-
                        return "znsw";
                    }
                } else { // 兴业是3
                    return "lxjy"; //立享白金卡精英系列
                }
            } else if (obj.loan == 2) { // 6-50万信用卡额度
                if (obj.type == 1) { // 浦发
                    return "psfq"; //巴萨分期白金卡
                } else if (obj.type == 2) { // 光大
                    if (!obj.pay) {
                        return "continue";
                    } else if (obj.pay == 1) { // 4000+
                        return "lt"
                    } else if (obj.pay == 2) { // 4000-
                        return "znsw";
                    }
                } else { // 兴业
                    return "lxy"; //立享白金卡悠系列
                }
            }
        },

        //分享按钮：
        share: function() {
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
                    onclick: function() {
                        Bridge.action('ShareTimeline', {
                            "title": "公积金能办信用卡啦",
                            'desc': "定制信用卡拿现金大礼包",
                            "thumb": "https://r.51gjj.com/act/images/yunying/20170313_fx.jpg",
                            "link": "https://" + host + "/act/home/huodong/20170526/"
                        });
                    }
                })
            }
            return this;
        }
    }

    var cardJson = {
        "lxy": {
            title: "兴业立享白金卡悠系列",
            img: "xy_lxy.png",
            qy: [
                "取现0手续费 机场贵宾礼遇",
                "12期6.0% 一次性分期费率"
            ],
            hd: ["申请即送伴手礼，可叠加"],
            cardApply: "5",
            process: "",
            rule: [
                "即日起到8月30日，通过活动申请兴业银行任意信用卡即可获精美伴手礼1份，申请巴萨卡可获得58元现金红包，激活卡片更可获得258元现金红包。",
                "本次伴手礼为一份价值30元的复古牛皮笔记本，速写涂鸦记录心情。",
                "每位用户最多可获得2份伴手礼，每日送出100份，先到先得。",
                "获得伴手礼奖品后请在3日内点击我的-我的奖品完善收货信息完成领取，过期失效！",
                "有任何疑问或者帮助可联系客服4008635151。",
                "本商品由51公积金管家提供，与设备生产商Apple Inc公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。",        
            ]
        },
        "lt": {
            title: "光大智能商务白金卡",
            img: "zn_bj.png",
            qy: [
                "银联白金卡，星级酒店住两送一",
                "半年内享无限次机场高铁贵宾厅"
            ],
            hd: ["申请即送伴手礼，可叠加"],
            cardApply: "2",
            process: "",
            rule: [
                "即日起到8月30日，通过活动申请兴业银行任意信用卡即可获精美伴手礼1份，申请巴萨卡可获得58元现金红包，激活卡片更可获得258元现金红包。",
                "本次伴手礼为一份价值30元的复古牛皮笔记本，速写涂鸦记录心情。",
                "每位用户最多可获得2份伴手礼，每日送出100份，先到先得。",
                "获得伴手礼奖品后请在3日内点击我的-我的奖品完善收货信息完成领取，过期失效！",
                "有任何疑问或者帮助可联系客服4008635151。",
                "本商品由51公积金管家提供，与设备生产商Apple Inc公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。",  
            ]
        },
        "znsw": {
            title: "光大智能商务金卡",
            img: "gd_znsw.png",
            qy: [
                "免年费 赠100万航空意外险",
                "低息分期 自由周转"
            ],
            hd: ["申请即送伴手礼，可叠加"],
            cardApply: "3",
            process: "",
            rule: [
                "即日起到8月30日，通过活动申请兴业银行任意信用卡即可获精美伴手礼1份，申请巴萨卡可获得58元现金红包，激活卡片更可获得258元现金红包。",
                "本次伴手礼为一份价值30元的复古牛皮笔记本，速写涂鸦记录心情。",
                "每位用户最多可获得2份伴手礼，每日送出100份，先到先得。",
                "获得伴手礼奖品后请在3日内点击我的-我的奖品完善收货信息完成领取，过期失效！",
                "有任何疑问或者帮助可联系客服4008635151。",
                "本商品由51公积金管家提供，与设备生产商Apple Inc公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。",  
            ]
        },
        "lxjy": {
            title: "兴业立享白金卡精英系列",
            img: "xy_jy.png",
            qy: [
                "取现0手续费 1000万意外险",
                "12期6.0% 一次性分期费率"
            ],
            hd: ["申请即送伴手礼，可叠加"],
            cardApply: "4",
            process: "",
            rule: [
                "即日起到8月30日，通过活动申请兴业银行任意信用卡即可获精美伴手礼1份，申请巴萨卡可获得58元现金红包，激活卡片更可获得258元现金红包。",
                "本次伴手礼为一份价值30元的复古牛皮笔记本，速写涂鸦记录心情。",
                "每位用户最多可获得2份伴手礼，每日送出100份，先到先得。",
                "获得伴手礼奖品后请在3日内点击我的-我的奖品完善收货信息完成领取，过期失效！",
                "有任何疑问或者帮助可联系客服4008635151。",
                "本商品由51公积金管家提供，与设备生产商Apple Inc公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。",  
            ]
        },
        "psfq": {
            title: "浦发巴萨分期白金卡",
            img: "bs_bj.png",
            qy: [
                "50万额度尊享 白金超多权益",
                "无条件免年费 定期特价饮品",
                "1元机场停车 指定酒店住就送"
            ],
            hd: [
                "申请送58元，激活送258元现金红包"
            ],
            cardApply: "1",
            process: "",
            rule: [
                "即日起到8月30日，通过活动申请兴业银行任意信用卡即可获精美伴手礼1份，申请巴萨卡可获得58元现金红包，激活卡片更可获得258元现金红包。",
                "本次伴手礼为一份价值30元的复古牛皮笔记本，速写涂鸦记录心情。",
                "每位用户最多可获得2份伴手礼，每日送出100份，先到先得。",
                "获得伴手礼奖品后请在3日内点击我的-我的奖品完善收货信息完成领取，过期失效！",
                "有任何疑问或者帮助可联系客服4008635151。",
                "本商品由51公积金管家提供，与设备生产商Apple Inc公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。",  
            ]
        }
    }

    run.start();
})
