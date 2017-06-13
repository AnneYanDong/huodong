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
            window.addEventListener("resize", ct.Tool.debounce(ct.Tool.setFont));
            window.addEventListener("resize", ct.Tool.debounce(ct.Tool.handleBottomStatusBar));
            // window.onresize = ct.Tool.debounce(ct.Tool.setFont)

            /*整体预加载动画*/
            var oPreLoading = Object.create(ct.PreLodingUi);
            oPreLoading.create({
                preLoadingCls: "loading-bg-color", // 自定义加载动画颜色
                loadingEleCls: "loading-ele-color"
            }).build();

            app = ct.Tool.userAgent();
            console.log(app);

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
            _this.apply();
            // _this.share()
        },

        render: function () {
            // var _this = this;
            // $.ajax({
            // url: "https://kaifa.jianbing.com/act/act170413/get_status",
            // url: ct.Tool.url("/act/act170413/get_status"),
            //     url: "test.php",
            //     type: "POST",
            //     dataType: "json",
            //     success: function (d) {   
            //         if (d.success) {
            //             oUrl = d.ret.url;
            //         } else if(d.code == 1){
            //             oP.show(d.msg || "出错请重试");
            //         }
            //     }
            // })
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



        //立即申请
        apply: function () {
            $(document).on("click",".apply", function () {
                 $.ajax({
                    // url: ct.Tool.url("/act/act170513/get_status"),
                    url:"/act/act170513/get_status",
                    
                    type: "POST",
                    dataType: "json",
                    data: {},
                    success: function (d) {
                        if (d.success) {
                            d = d.ret;
                            var timer = null;
                            clearTimeout(timer);
                            if (d.order == false) {
                                oP.show("您不符合领券要求，去看看其他吧~");
                            } else if (d.order == true) {
                                timer = setTimeout(function () {
                                    oP.show("成功领取，立即申请享受奖励~");
                                    timer = setTimeout(function () {
                                        window.location.href = d.url;
                                    }, 1500)
                                }, 200);
                            }  else {
                                oP.show(d.msg || "出错请重试");
                            }
                        } else if (d.code == 1){
                            oP.show(d.msg || "出错请重试");
                        }
                    },
                    error:function(XMLHttpRequest, textStatus, errorThrown){
                        alert(XMLHttpRequest.status);
                        alert(XMLHttpRequest.readyState);
                        alert(textStatus);
                        alert(JSON.stringify(XMLHttpRequest));
                        alert(errorThrown);
                    }
                })
            });
        },
    }
    run.start();
})