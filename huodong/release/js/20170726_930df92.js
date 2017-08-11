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

    var imgSrc = "//r.51gjj.com/act/release/img/20170703_";
    // var imgSrc = "../static/img/20170703_";
    var oUrl;
    var oGiftCode;

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

    function getCookie(cookie_name) {
        var allcookies = document.cookie;
        var cookie_pos = allcookies.indexOf(cookie_name); //索引的长度
        if (cookie_pos != -1) {
            cookie_pos += cookie_name.length + 1;
            var cookie_end = allcookies.indexOf(";", cookie_pos);

            if (cookie_end == -1) {
                cookie_end = allcookies.length;
            }
            var value = unescape(allcookies.substring(cookie_pos, cookie_end));
        }
        return value;
    }
    var invest_uid = getCookie("invest_uid");
    console.log(invest_uid);
    var invest_token = getCookie("invest_token");
    console.log(invest_token);

    var run = {
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
        },

        init: function () {
            var _this = this;
            $(".wp").removeClass("hide");
            _this.render();
            _this.openRule();
            _this.closeRule();
        },
        render: function () {
            $.ajax({
                type: "POST",
                dataType: "JSON",
                url: "/invest2/user/queryUser/tenderRank",
                success: function (d) {
                    if (d.resCode == 1) {
                        $.each(d.resData.topList, function (k, v) {
                            $(".num-" + v.rank + " .phone").text(v.mobilePhone.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2"));
                            $(".num-" + v.rank + " .invest-money").text(v.sumTenderMoney);
                        })
                        $(".money-red").text(d.resData.currentUserTenderMoney);
                    } else if (10100 <= d.resCode < 10200) {
                        if (app.isGjj && Bridge) {
                            Bridge.action("login");
                        } else {
                            window.location.href = "/hs/appgjj/login?return_url=/app/invest/";
                        }
                    } else {
                        oP.show(d.resMsg || 暂无数据);
                    }
                }
            })
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