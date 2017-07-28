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
    var totalChance = 0;
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
            $(".out-wrap").removeClass("hide");

            _this.getChance();
            _this.raffle();
            _this.shareToFriend();
            console.log("送积分活动！");
        },
        getChance: function () {
            $.ajax({
                type: "POST",
                dataType: "JSON",
                // url: "test.php",
                url: "/act/act170721/get_status",
                success: function (d) {
                    console.log(d);
                    if (d.success) {
                        var d = d.ret;
                        if (d.is_weChat || d.is_qq) {
                            setTimeout(function(){
                                    window.location.href = d.url;
                            },1500);
                        } else {
                            if (!d.login) {
                                oP.show("亲爱滴，登陆后才能玩耍哦，快去登陆吧~");
                                if (Bridge) {
                                    Bridge.action("login");
                                }
                            } else {
                                if (d.chance <= 0) {
                                    oP.show("机会用尽啦，不要太贪心哦，邀请好友一起玩");
                                }
                            }
                        }
                    }
                }
            })
        },
        raffle: function () {
            var _this = this;
            var timer = null;
            clearTimeout(timer);
            $('.wp-inner .content').on('click', '.turntable,.arrow', function () {
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    url: "test.php",
                    // url: "/act/act170721/get_prize",
                    success: function (d) {
                        console.log(d);
                        if (d.success) {
                            var d = d.ret;
                            if(d.is_qq || d.is_weChat) {
                                setTimeout(function(){
                                    window.location.href = d.url;
                                },1500);
                            } else {
                                if (d.login == false) {
                                    oP.show("亲爱滴，登陆后才能玩耍哦，快去登陆吧~");
                                    if (Bridge) {
                                        Bridge.action("login");
                                    }
                                } else {
                                    console.log("机会次数",d.chance);
                                    //判断用户的抽奖次数
                                    if (d.chance > 0) {
                                        $('.turntable').addClass('turning');
                                        timer = setTimeout(function(){
                                            console.log("angle->",d.angle);
                                            // $(".turntable").animate({transform:"rotate('+ d.angle +'deg)"},"slow");
                                            $(".turntable").css("transition","transform 1s ease").css("transform","rotate("+ d.angle + "deg)");
                                            timer = setTimeout(function(){
                                                oP.show("人品爆发，中奖啦！恭喜抽中" + d.gift_name + "!");
                                                $('.turntable').removeClass('turning');
                                            },500);
                                        },3000);
                                    } else {
                                        oP.show("机会用尽啦，不要太贪心哦，邀请好友一起玩");
                                    }
                                }
                            }
                        } else {
                            oP.show(d.msg || "哎呀，出错了呢");
                        }
                    }
                })

            })
        },
        shareToFriend: function(){
            var _this = this;
            $('.wp-inner .content').on('click','.btn2',function(){
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    // url: "test.php",
                    url: "/act/act170721/get_prize",
                    success: function (d) {
                        console.log(d);
                        var d = d.ret;
                        if(d.is_qq || d.is_weChat) {
                            setTimeout(function(){
                                window.location.href = d.url;
                            },1500);
                        } else {
                            if (d.login == false) {
                                oP.show("亲爱滴，登陆后才能玩耍哦，快去登陆吧~");
                                if (Bridge) {
                                    Bridge.action("login");
                                }
                            }else {
                                console.log("分享功能");
                                _this.share(d.invitation_code);
                            }
                        }
                    }
                })
            });
        },

        //分享按钮：
        share: function (invitation_code) {
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
                            "title": "转盘抽奖",
                            'desc': "查公积金送积分",
                            "thumb": "https://r.51gjj.com/act/release/img/20170721_share.png",
                            "link": "https://" + host + "/20160714/invite_out_v2.php?c=" + invitation_code
                        });
                    }
                })
            }
            return this;
        },
    }
    run.start();
})
