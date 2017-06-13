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
    var imgSrc = "//r.51gjj.com/act/release/img/20170425_";
    var app = null;
    var oCondition = null;
    var oType = null;
    var oFlow = null;
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
            ct.Tool.setFont(6.4);
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
            // _this.openRule();
            // _this.closeRule();
            _this.render();
            _this.receive();
            // _this.share();
            _this.close();
            // _this.lookProvidentFund()
        },

        render: function () {
            var _this = this;
            $.ajax({
            // url: "https://kaifa.jianbing.com/act/act170413/get_status",
            // url: ct.Tool.url("/act/act170413/get_status"),
                url: "test.php",
                type: "POST",
                dataType: "json",
                success: function (d) {   
                    if (d.success) {
                        if (d.ret) {
                            var phone = d.ret.phone;
                            var time = d.ret.time;
                            oCondition = d.ret.condition;console.log(oCondition)
                            if (d.ret.type) {
                                oType = d.ret.type;
                            }
                            oFlow = d.ret.flow;
                        }   
                        $(".phone").text(phone);
                        $(".time span").text(time);
                    } else if(d.code == 1){
                        oP.show(d.msg || "出错请重试");
                    }
                }
            })
        },

        //领取
        receive: function () {
            $(".content").on("click", ".receive", function () { console.debug(oCondition)
                if (oCondition === true) {
                    oM.show();
                    $(".tips").html("<img src='" + imgSrc + "get"+ oFlow +".png'><div class='tips_invitation'></div><div class='tips_close'></div>");
                    $(".tips").fadeIn();
                } else if (oType === 1) {
                    oM.show();
                    $(".tips").html("<img src='" + imgSrc + "lookup.png'><div class='tips_invitation'></div><div class='tips_close'></div>");
                    $(".tips").fadeIn();
                } else if (oType === 2) {
                    oM.show();
                    $(".tips").html("<img src='" + imgSrc + "noChange.png'><div class='tips_invitation'></div><div class='tips_close'></div>");
                    $(".tips").fadeIn();
                } else {
                    oP.show("出错请重试！");
                }
            });
        },

        //查公积金或邀请
        lookProvidentFund: function () {
            $(".tips").on("click",".tips_invitation", function () {console.debug(666)
                console.debug(Bridge,app);
                if (oCondition === true) {
                    $(".tips").fadeOut(function() {
                    oM.hide();
                    })
                } else if (oType === 1) { //查公积金
                    if (Bridge && app.isGjj) {
                    Bridge.action('openAddAccount');
                    }
                } else if (oType === 2) { //邀请好友
                    Bridge.action('ShareTimeline', {
                    "title": "您的好友邀请您一起来查公积金",
                    'desc': '实时了解你的公积金账户动况，激活您的潜在财富！',
                    "thumb": "https://r.51gjj.com/image/static/invitation.png",
                    "link": "https://<?php echo $host;?>/hd/20160714/invite_out_v2.php?c=<?php echo $result['code'];?>"
                });
                }
            })
        },

        //关闭弹框
        close: function() {
            $(".tips").on("click",".tips_close",function () {
                $(".tips").fadeOut(function() {
                    oM.hide();
                })
            })
        }
    }
    run.start();
})