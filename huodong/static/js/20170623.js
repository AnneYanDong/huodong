//引入配置对象
require.config(requireConfig);
require(["jquery", "fastClick", "FullPage", "ct", "bridge", "juicer"], function ($, fastClick, fullpage, ct, Bridge, juicer) {
    var oMask = $(".mask");
    /*oP和oM的作用是在body元素的最下方默认生成两个div，一个是提示框，一个是遮罩层*/
    var oP = Object.create(ct.Prompt); //提示框对象
    oP.create().build();

    var oM = Object.create(ct.Mask); //遮罩层
    oM.create().build();

    var local = ct.Tool.local(); //获取域名

    ct.Tool.buryPoint(); //统计点击情况

    var run = {
        start: function () {
            console.log("鑫福贷活动！");
            var _this = this;

            /*解决移动端click点击300延迟*/
            fastClick.attach(document.body);

            /*设置HTML的font-size*/
            ct.Tool.setFont();
            //这个是给content自动加上固定宽高
            ct.Tool.handleBottomStatusBar();
            window.addEventListener("resize", ct.Tool.debounce(ct.Tool.setFont));
            window.addEventListener("resize", ct.Tool.debounce(ct.Tool.handleBottomStatusBar));


            /*整体预加载动画*/
            var oPreLoading = Object.create(ct.PreLodingUi);
            oPreLoading.create({
                preLoadingCls: "loading-bg-color", // 自定义加载动画颜色
                loadingEleCls: "loading-ele-color"
            }).build();
            var timer = null;
            clearTimeout(timer);
            timer = setTimeout(function () {
                oPreLoading.hide();
                // _this.init();
            }, 500);
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
        },


        init: function () {
            var _this = this;
            $('.wp').removeClass('hide');

            //点击规则按钮
            _this.openRule();
            _this.closeRule();

            //点击领取按钮
            _this.receive();

            //分享
            _this.share();
        },
        receive: function() {
            $('.content').on('click','.btn',function(){
                /*下面这个是真正的请求真接口，别删*/
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    // url: ct.Tool.url("/act/act170623/get_prize"),
                    url: "/act/act170623/get_prize",  //这个到时候换成鑫福贷活动的接口
                    data: JSON.stringify({
                        place_cid: ct.Tool.userAgent().isGjj ? 1 : 0,
                        tag: "进入页面" + projectName
                    }),
                    success: function (d) {
                        console.log(d);
                        //判断用户有没有领取补贴
                        if (d.success == true) {
                            var timer = null;
                            clearTimeout(timer);
                            if (d.ret.weChat == true) {
                                timer = setTimeout(function () {
                                    oP.show("登录51公积金管家APP领取奖品");
                                    timer = setTimeout(function () {
                                        window.location.href = d.ret.url;
                                    }, 1500);
                                }, 200);
                            } else {
                                if (d.ret.qq == true) {
                                    console.log('qq');
                                    timer = setTimeout(function () {
                                        oP.show("登录51公积金管家APP领取奖品");
                                        timer = setTimeout(function () {
                                            window.location.href = d.ret.url;
                                        }, 1500);
                                    }, 200);
                                } else {
                                    if (d.ret.login == false) {
                                        if (Bridge) {
                                            Bridge.action("login");
                                        }
                                    } else {
                                        if (d.ret.type == 1) {
                                            oP.show("您已经申请过该活动业务,试试其它活动~");
                                        } else if (d.ret.type == 2) {
                                            oP.show("您暂不符合活动条件,试试其他活动~");
                                        } else if (d.ret.type == 3) {
                                            timer = setTimeout(function () {
                                                oP.show("您已成功领取红包~");
                                                timer = setTimeout(function () {
                                                    window.location.href = d.ret.url;
                                                }, 1500)
                                            }, 200);
                                        } else {
                                            oP.show(d.msg || "出错请重试1");
                                        }
                                    }
                                }
                            }
                        }else {
                            oP.show(d.msg || "出错请重试2");
                        }
                    }
                });
            });
        },

        openRule: function () {
            $(".content").on("click", ".rule-btn", function (event) {
                oM.show();
                console.log("event target:" + event.target);

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
                            "title": "送你115元高温补贴",
                            'desc': "51鑫福贷申请即可获得15元，放款再得100元",
                            "thumb": "https://r.51gjj.com/act/release/img/20170623_wxshare.png",
                            "link": "http://" + host + "/act/home/huodong/20170623/"
                        });
                    }
                })
            }
            return this;
        }
    }

    var ruleJson = {
        rule: [
            "活动仅限于6月28日至奖品发完期间首次申请鑫福贷的用户；",
            "完成申请可获得15元现金红包，成功放款可获得100元现金红包。为了您能够顺利拿到奖励，请申请业务后及时关注“我的奖品”提示；",
            "成功领取后将在7个工作日内发放到您的支付宝账户，领取时请填写正确的个人支付宝账户；",
            "关于活动有任何疑问请咨询官方客服热线4008635151；",
            "本商品由51公积金管家提供，与设备生产商Apple Inc.公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。"
        ]
    }
    run.start();

});