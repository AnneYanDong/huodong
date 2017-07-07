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
            console.log("开始执行！");
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
            }),
            /*ct.Ajax.do({
                url: indexData.ajaxUrl || "test.php",
                success: function(d) {
                    console.log("初始化请求：",_this);
                    if(d.success == true) {
                        console.log(d);
                        if (d.ret.have_new == true) {
                            timer = setTimeout(function () {
                                timer = setTimeout(function () {
                                    oM.show();
                                    _this.tpShow(d);
                                }, 500);
                            }, 200);
                        }
                    } else {
                        oP.show(d.msg || "出错了请重试");
                    }
                }
            });*/
            /*埋点请求*/
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
            $.ajax({
                type: "POST",
                dataType: "JSON",
                url: "/act/act170705/get_judge",
                success: function(d) {
                    if(d.success == true) {
                        console.log(d);
                        if (d.ret.have_new == true) {
                            timer = setTimeout(function () {
                                timer = setTimeout(function () {
                                    oM.show();
                                    _this.tpShow(d);
                                }, 500);
                            }, 200);
                        }
                    } else {
                        oP.show(d.msg || "出错了请重试");
                    }
                }
            });

        },

        init: function () {
            var _this = this;
            $('.wp').removeClass('hide');

            //点击规则按钮
            _this.openRule();
            _this.closeRule();

            //点击领取按钮
            _this.grabBonus();

            //分享
            _this.share();
        },

        tpShow: function(d) {
            console.log("tpShow:",this);
            var _this = this;
            var img = new Image();
            /*动态加载图片*/
            var price = d.ret.gift_price;
            img.dataset.src = "<?php echo $imgUrl; ?>bonus_" + price + ".png";
            img.src = "http://r.51gjj.com/act/release/img/20170705_bonus_"  + price + ".png";
            img.alt = "弹屏" + price;
            var imgContainer = $(".tp-img-container")[0];
            imgContainer.appendChild(img);

            $(".tp-img-container").fadeIn();
            $(".tp-apply").show();
            $(".content").on("click",".tp-img-container",function(){
                $(".bonus-rain").fadeOut();
                _this.tpHide();
            });
            $(".content").on("click",".tp-apply",function(){
                timer = setTimeout(function () {
                    _this.tpHide();
                    window.location.href = d.ret.url;
                }, 1500);
            });
        },
        toApp: function(d) {
            var timer = null;
            clearTimeout(timer);
            timer = setTimeout(function () {
                timer = setTimeout(function () {
                    window.location.href = d.ret.url;
                }, 1500);
            }, 200);
        },
        bonusRaining: function() {
            $(".bonus-rain").show();
            /*随机生成初始位置*/
            var rp=parseInt(Math.random()*300+300);
            var left=parseInt(Math.random()*1600+000);
            var top=parseInt(Math.random()*10+(-10));
            // console.log(rp + "," + left + "," +　top);

            $('.bonus-rain').prepend('<div class="dd"></div>');
            $('.bonus-rain').children('div').eq(0).css({'left':left,'top':top});
            $('.bonus-rain').children('div').eq(0).animate({'left':(left - rp),'top':$(window).height()+20},1000);
        },

        shakeHand: function() {
            var timer = null;
            clearTimeout(timer);
            $(".bonus-shake").addClass("hand-shake");
            $(".bonus1").fadeOut();
            $(".bonus2").fadeOut();
            $(".bonus3").fadeOut();
        },
        tpHide: function () {
            oM.hide();
            $(".tp-img-container").fadeOut();
            $(".tp-apply").hide();
            $(".bonus-shake").removeClass("hand-shake");
            $(".bonus1").fadeIn();
            $(".bonus2").fadeIn();
            $(".bonus3").fadeIn();
        },

        grabBonus: function() {
            var _this = this;
            console.log(_this);

            $('.content').on('click','.btn',function(){
                /*ct.Ajax.do({
                    url: indexData.ajaxUrl || "test.php",
                    success: function (d) {
                        var bTimer = null;
                        console.log(d);
                        if (d.success == true) {
                            if (d.ret.weChat == true) {
                                _this.toApp(d);
                            } else {
                                if (d.ret.qq == true) {
                                    _this.toApp(d);
                                } else {
                                    if (d.ret.login == false) {
                                        if (Bridge) {
                                            Bridge.action("login");
                                        }
                                    } else {
                                        if (d.ret.have_new == true) {
                                            timer = setTimeout(function () {
                                                timer = setTimeout(function () {
                                                    window.location.href = d.ret.url;
                                                }, 500);
                                            }, 200);
                                        } else {
                                            if(d.ret.apply == true) {
                                                oP.show("暂不符合要求，去看看其他业务吧~");
                                                timer = setTimeout(function () {
                                                    timer = setTimeout(function () {
                                                        window.location.href = d.ret.url;
                                                    }, 1000)
                                                }, 200);
                                            } else {
                                                _this.shakeHand();
                                                bTimer = setInterval(_this.bonusRaining,30);
                                                timer = setTimeout(function () {
                                                    timer = setTimeout(function () {
                                                        oM.show();
                                                        _this.tpShow(d);
                                                        clearInterval(bTimer);
                                                    }, 1000)
                                                }, 200);
                                            }
                                        }
                                    }
                                }
                            }
                        }else {
                            oP.show(d.msg || "出错了请重试");
                        }
                    }
                });*/

                /*下面这个是真正的请求真接口，别删*/
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    // url: ct.Tool.url("/act/act170705/get_status"),
                    url: "/act/act170705/get_status",
                    success: function (d) {
                        var bTimer = null;
                        console.log(d);
                        if (d.success == true) {
                            if (d.ret.weChat == true) {
                                _this.toApp(d);
                            } else {
                                if (d.ret.qq == true) {
                                    _this.toApp(d);
                                } else {
                                    if (d.ret.login == false) {
                                        if (Bridge) {
                                            Bridge.action("login");
                                        }
                                    } else {
                                        if (d.ret.have_new == true) {
                                            timer = setTimeout(function () {
                                                timer = setTimeout(function () {
                                                    window.location.href = d.ret.url;
                                                }, 1000);
                                            }, 200);
                                        } else {
                                            if(d.ret.apply == true) {
                                                oP.show("暂不符合要求，去看看其他业务吧~");
                                                timer = setTimeout(function () {
                                                    timer = setTimeout(function () {
                                                        window.location.href = d.ret.url;
                                                    }, 1500)
                                                }, 200);
                                            } else {
                                                _this.shakeHand();
                                                bTimer = setInterval(_this.bonusRaining,30);
                                                timer = setTimeout(function () {
                                                    timer = setTimeout(function () {
                                                        oM.show();
                                                        _this.tpShow(d);
                                                        clearInterval(bTimer);
                                                    }, 1000)
                                                }, 200);
                                            }
                                        }
                                    }
                                }
                            }
                        }else {
                            oP.show(d.msg || "出错了请重试");
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
                            "title": "5万元3分钟到账，抢最高300元抵息",
                            'desc': "30-300元抵息人人有份",
                            "thumb": "https://r.51gjj.com/act/release/img/20170705_wxfx_jyd.png",
                            "link": "http://" + host + "/act/home/huodong/20170705/"
                        });
                    }
                })
            }
            return this;
        }
    }

    var ruleJson = {
        rule: [
            "通过活动页面完成申请或放款，首月还款时直接抵扣还款利息及本金，提前还款、逾期等将无法享受该优惠。",
            "本活动致力于回馈金盈贷新老用户，未申请过金盈贷用户与之前审批通过未放款用户都可参与此活动。",
            "同一用户仅能领取一次，红包券有效期为20天，您需要在失效之前完成放款。",
            "有任何疑问或者帮助可联系客服4008635151。",
            "本商品由51公积金管家提供，与设备生产商Apple Inc.公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。"
        ]
    }
    run.start();

});