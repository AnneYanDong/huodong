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
    var purpose = [];
    var counter = 0;
    var timer = null;
    clearInterval(timer);
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
        start: function () {
            var _this = this;

            /*解决移动端click点击300延迟*/
            fastClick.attach(document.body);

            /*设置HTML的font-size*/
            ct.Tool.setFont();
            ct.Tool.handleBottomStatusBar();
            // window.addEventListener("resize", ct.Tool.debounce(ct.Tool.setFont));
            // window.addEventListener("resize", ct.Tool.debounce(ct.Tool.handleBottomStatusBar));
            window.onresize = ct.Tool.debounce(ct.Tool.setFont)

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
                    if (d.success) {

                    }
                }
            })
        },

        init: function () {
            var _this = this;
            $(".wp").removeClass("hide");
            _this.checkWithDrawAmount();
            _this.getCustStatus();
            /*clearInterval(timer);*/
            _this.withDraw();
            _this.openRule();
            _this.closeRule();
            _this.share();
            console.log("周末提款机");
        },
        getCustStatus: function(){
            var _this = this;
            $.ajax({
                type: "POST",
                dataType: "JSON",
                url: "/act/act170725/get_status",
                success: function (d) {
                    console.log("进入页面的请求d->",d);
                    if (d.success) {
                        var d = d.ret;
                        _this.getCustType(d,d.type);
                    } else {
                        oP.show(d.msg || "活动尚未开始");
                    }
                }
            })
        },
     /*   showMoney: function() {
            var visible = counter % 5;
            if (visible === 0) {
                for(var i = 0; i < 4; i++) {
                    $(".dynamic-money .money" + (i + 1)).addClass("hide");
                }
            } else {
                for(var j = 0; j < visible; j++) {
                    $(".dynamic-money .money" + (j + 1)).removeClass("hide");
                }
            }
            counter++;
        },*/
        checkAmount: function (withdrawal) {
            var withdrawal = withdrawal;
            var _this = this;
            var re = /^[1-7]{1}\d{0,4}$|^[8-9]{1}\d{0,3}$|^8(0)(0)(0)(0)$/;
            if (re.test(withdrawal)) {
                return true;
            } else {
                oP.show("请输入1~80000整数");
                return false;
            }
        },
        checkWithDrawAmount: function() {
            var _this = this;
            $(".atm-total-input input").keyup(function(){
                var amount = Number($(this).val());
                _this.checkAmount(amount);
                setTimeout(function(){
                    $(".atm-content .finger-box").show().addClass("hint");
                },500);
            });
        },
        getCustLabel: function() {
            var _this = this;
            $(".atm-content ul").on("click","li.btn",function(){
                var that = this;
                $(this).toggleClass("down");
                setTimeout(function(){
                    $(that).toggleClass("up");
                    $(".atm-content ul div").toggleClass("bgColor");
                },300);
                var btn = $(that).data('purpose');
                if ($(that).is(".down")) {
                    purpose.push(btn);
                } else {
                    purpose.pop($(that).data('purpose'));
                }
                console.log("purpose:",purpose);
            });
        },
        backToOrigin: function() {
            var _this = this;
            $(".withdraw-btn").removeAttr("disabled");
            //清空数据,恢复按钮样式
            $(".atm-total-input input").val("");
            purpose.length = 0;
            $(".atm-usage ul li.btn").removeClass("down").removeClass("up").addClass(".btn");
            $(".atm-usage ul .div").removeClass("bgColor").addClass(".div");
           /* console.log(timer);
            clearInterval(timer);
            $(".dynamic-money img").addClass("hide");*/
            $("#money").removeClass("money").addClass("hide");
        },
        getCustType: function(d,type) {

            console.log(d);
            var _this = this;
            switch(type) {
                case 1:
                    setTimeout(function(){
                        /*clearInterval(timer);
                        $(".dynamic-money img").addClass("hide");*/
                        $("#money").removeClass("money").addClass("hide");
                        oM.show();
                        $(".tp-hide1").fadeIn();
                        $(".content .tp-jk").fadeIn();
                        $(".content .tp-apply-btn").fadeIn();
                        $(".content").on("click",".tp-hide1",function(){
                            $(".content .tp-hide1").fadeOut();
                            $(".content .tp-jk").fadeOut();
                            $(".content .tp-apply-btn").fadeOut();
                            oM.hide();
                            //清空数据,恢复按钮样式
                            _this.backToOrigin();
                        })
                        $(".content").on("click",".tp-apply-btn",function(){
                            window.location.href = d.url;
                        });
                    },500);
                    break;
                case 2:
                    setTimeout(function(){
                        /*clearInterval(timer);
                        $(".dynamic-money img").addClass("hide");*/
                        $("#money").removeClass("money").addClass("hide");
                        oM.show();
                        $(".tp-hide2").fadeIn();
                        $(".content .tp-jy").fadeIn();
                        $(".content .tp-apply-btn").fadeIn();
                        $(".content").on("click",".tp-hide2",function(){
                            $(".content .tp-hide2").fadeOut();
                            $(".content .tp-jy").fadeOut();
                            $(".content .tp-apply-btn").fadeOut();
                            oM.hide();
                            //清空数据,恢复按钮样式
                            _this.backToOrigin();
                        })
                        $(".content").on("click",".tp-apply-btn",function(){
                            window.location.href = d.url;
                        });
                    },500);
                    break;
                case 3:
                    setTimeout(function(){
                        /*clearInterval(timer);
                        $(".dynamic-money img").addClass("hide");*/
                        $("#money").removeClass("money").addClass("hide");
                        oM.show();
                        $(".tp-hide3").fadeIn();
                        $(".content .tp-ja").fadeIn();
                        $(".content .tp-apply-btn").fadeIn();
                        $(".dynamic-money img").addClass("hide");
                        $(".content").on("click",".tp-hide3",function(){
                            $(".content .tp-hide3").fadeOut();
                            $(".content .tp-ja").fadeOut();
                            $(".content .tp-apply-btn").fadeOut();
                            oM.hide();
                            //清空数据,恢复按钮样式
                            _this.backToOrigin();
                        })
                        $(".content").on("click",".tp-apply-btn",function(){
                            window.location.href = d.url;
                        });
                    },500);
                    break;
                case 4:
                    setTimeout(function(){
                        /*clearInterval(timer);
                        $(".dynamic-money img").addClass("hide");*/
                        $("#money").removeClass("money").addClass("hide");
                        oM.show();
                        $(".tp-hide4").fadeIn();
                        $(".content .tp-jh").fadeIn();
                        $(".content .tp-apply-btn").fadeIn();
                        $(".dynamic-money img").addClass("hide");
                        $(".content").on("click",".tp-hide4",function(){
                            $(".content .tp-hide4").fadeOut();
                            $(".content .tp-jh").fadeOut();
                            $(".content .tp-apply-btn").fadeOut();
                            oM.hide();
                            //清空数据,恢复按钮样式
                            _this.backToOrigin();
                        })
                        $(".content").on("click",".tp-apply-btn",function(){
                            window.location.href = d.url;
                        });
                    },500);
                    break;
            }
        },
        withDraw: function(){
            clearInterval(timer);
            var _this = this;
            _this.getCustLabel();
            $(".atm-content").on("click",".withdraw-btn",function(){
                $(".withdraw-btn").attr("disabled","disabled");
                console.log(purpose);
                $(".atm-content .finger-box").fadeOut();
                var amount = $(".atm-total-input input").val();
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    data: JSON.stringify({"money": amount,"purpose": purpose}),
                    // url: "test.php",
                    url: "/act/act170725/get_button",
                    success: function(d){
                        if (d.success) {
                            var d = d.ret;
                            if(d.is_weChat || d.is_qq) {
                                setTimeout(function(){
                                    window.location.href = d.url;
                                },1500);
                            } else {
                                if (!d.login) {
                                    if (Bridge) {
                                        Bridge.action("login");
                                    }
                                } else {
                                        /*timer = setInterval(_this.showMoney,100);*/
                                        $("#money").removeClass("hide").addClass("money");
                                        switch(d.type) {
                                            case 0:
                                            case 5:
                                                clearInterval(timer);
                                                $(".dynamic-money img").addClass("hide");
                                                oP.show("暂不符合活动规则，去看看其他");
                                                _this.backToOrigin();
                                                setTimeout(function(){
                                                    window.location.href = d.url;
                                                },1500);
                                                break;
                                            case 6:
                                                clearInterval(timer);
                                                $(".dynamic-money img").addClass("hide");
                                                oP.show("提款机余额不足，去试试其他");
                                                _this.backToOrigin();
                                                setTimeout(function(){
                                                    window.location.href = d.url;
                                                },1500);
                                                break;
                                        }
                                        _this.getCustType(d,d.type);
                                }
                            }
                        } else {
                            oP.show(d.msg || "出错了请重试");
                            _this.backToOrigin();
                        }
                    }
                });
                $(".withdraw-btn").removeAttr("disabled");
            });
        },
        openRule: function () {
            $(".wp-inner").on("click", ".rule-btn", function (event) {
                oM.show();

                var ruleTpl = $('#tpl-rule').html();
                var resRuleHtml = juicer(ruleTpl, ruleJson);
                // juicer.register("msg_show",msgs);
                $('body').append(resRuleHtml);
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
                            "title": "抢个红包过周末",
                            'desc': "利息5折、现金、实物...",
                            "thumb": "https://r.51gjj.com/act/release/img/20170725_weChat_share.png",
                            "link": "https://" + host + "/act/home/huodong/20170725/index.php"
                        });
                    }
                })
            }
            return this;
        },
    }
    var ruleJson = {
        rule: [
            "领券后，通过活动页面完成申请或放款将获得特定奖励，同个业务奖励只能领取一次。",
            "领券后申请金优贷，每日前100名将获得精美定制笔记本一份；领券后申请金卡贷并放款，享受当月利息下调50%；领券后申请金安贷24小时未放款，获得超时赔付50元现金；领券后申请金花贷并放款，获得50元无门槛抵息券。",
            "此活动针对从未申请过金花贷、金优贷、金卡贷、金安贷业务的新用户，一个用户至多领取到这4个业务对应的奖励。",
            "抵息券将在首月还款直接减免，逾期、提前还款将不享受此优惠；现金/实物奖励将在用户信息完整后7个工作日内打款/寄出，请确认收款/收货信息准确性。",
            "有任何疑问或者帮助可联系客服4008635151。",
            "本商品由51公积金管家提供，与设备生产商Apple Inc.公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。"
        ]
    }
    run.start();
})
