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

    var imgSrc = "//r.51gjj.com/act/release/img/20170406_";

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

            // $.ajax({
            //     url: indexData.ajaxUrl || "test.php",
            //     data: {
            //         action: "status"
            //     },
            //     success: function (d) {
            //         if (d.errcode == 0) {
            //             _this.status.login = true;
            //         } else {
            //             _this.status.msg = d.errmsg || "出错请重试";
            //             oP.show(d.errmsg || "出错请重试");
            //         }
            //     }
            // })
        },

        init: function () {
            var _this = this;
            $(".wp").removeClass("hide");
            _this.apply();
            _this.openRule();
            _this.closeRule();
        },
        // 走后台跳转申请
        apply: function () {
            $(".btn_sub").on("click", function () {
                console.log("...")
                var data = JSON.stringify({
                    "type": 1
                });
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    // url: "https://kaifa.jianbing.com/act/act170411/get_url",
                    url: ct.Tool.url("/act/act170411/get_url"),
                    data: data,
                    success: function (d) {
                        if (d.success == true) {
                            if (d.ret.msgType == 1) {
                                oP.show("恭喜您领券成功！立享极速放款");
                            } else if (d.ret.msgType == 2) {
                                oP.show("您已领券，直接体验极速放款");
                            } else if (d.ret.msgType == 3) {
                                oP.show("在APP里面申请体验更佳！")
                            } else {
                                oP.show("出错请重试");
                            }
                            var timer;
                            clearTimeout(timer);
                            timer = setTimeout(function () {
                                window.location.href = d.ret.url;
                            }, 2000)
                        } else if (d.code == 403) {
                            oP.show("请先登录哦...");
                        } else {
                            oP.show(d.msg || "出错请重试");
                        }
                    }
                })
            })
        },

        changeState: function (page) {
            window.history.pushState && window.history.pushState({
                title: page
            }, page, "index.php#page=" + page); // 塞入新的历史
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
    }
    run.start();
})