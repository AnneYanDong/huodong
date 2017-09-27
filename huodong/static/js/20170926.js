require.config(requireConfig);
require(["jquery", "fastClick",  "ct", "bridge", "juicer", "share"], function ($, fastClick,ct, Bridge, juicer, wx) {
    var oMask = $(".mask");

    var oP = Object.create(ct.Prompt);
    oP.create().build();

    var oM = Object.create(ct.Mask);
    oM.create().build();

    var local = ct.Tool.local();

    ct.Tool.buryPoint_v2(ct.Tool.userAgent().isGjj ? 1 : 0);

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
            // ct.Tool.handleBottomStatusBar();
            window.addEventListener("resize", ct.Tool.debounce(ct.Tool.setFont));
            window.addEventListener("resize", ct.Tool.debounce(ct.Tool.handleBottomStatusBar));

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
                url: ct.Tool.url("/act/request/activity"),
                data: JSON.stringify({
                    source: ct.Tool.userAgent().isGjj ? 1 : 0,
                    tag: "20170926_1_0_0_理财排行榜活动"
                }),
                success: function (d) {
                    if (d.success == true) {}
                }
            })
        },

        init: function () {
            var _this = this;
            $(".wp").removeClass("hide");
            _this.render();
            _this.openRule();
            _this.closeRule();
            _this.share();
        },
        render: function () {
            $.ajax({
                type: "GET",
                dataType: "JSON",
                //url: "test.php",
                url: "/invest2/user/queryUser/tenderRank",
                success: function (d) {
                    if (d.resCode == 1) {
                        $.each(d.resData.topList, function (k, v) {
                            //v.mobilePhone = v.mobilePhone.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2");
                            $(".prize-" + v.rank + " .act-rank-name").text(v.mobilePhone);
                            $(".prize-" + v.rank + " .act-rank-money").text(v.sumTenderMoney);
                        })
                        $(".act-invest .personal-invest").text(d.resData.currentUserTenderMoney + "元");
                    } else {
                        oP.show(d.resMsg || "暂无数据");
                    }
                }
            })
        },
        // 打开规则
        openRule: function () {
            $(".content").on("click", ".act-prize-text span", function () {
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
        share: function () {
            var _this = this;
            var url = window.location.href.split('#')[0];
            var appid = /b.jianbing.com/g.test(host)? "wx90f7de7c9b73bf69":"wxb42d431526f1c17d";
            $.ajax({
                //获取分享的配置信息
                url: "/hs/wx/get_sign_package",
                type: 'GET',
                //data: 'url=' + encodeURIComponent(url) + '&appid=wxb42d431526f1c17d',
                data: 'url=' + encodeURIComponent(url) + '&appid='+ appid,
                dataType: 'JSON',
                success: function (r) {
                    _this.share_callback(r);
                }
            })
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
                            "title": "国庆嗨翻天，全民加息至9.5%，还送888元奖励金",
                            'desc': "双节同庆加息至9.5%，新网银行存管，一起赚起来！",
                            "thumb": "https://r.51gjj.com/act/release/img/20170926_wxshare.png",
                            "link": "https://" + host + "/act/home/huodong/20170926/index.php?mode=local"
                        });
                    }
                })
            }
            return this;
        },
        share_callback: function (r) {
            var host = window.location.host;
            wx.config({
                debug: false,
                appId: r.data.appId, //配置的微信服务号订阅号的APPID
                timestamp: r.data.timestamp,
                nonceStr: r.data.nonceStr,
                signature: r.data.signature,
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
            });
            wx.ready(function () {
                var share_data = {
                    title: "国庆嗨翻天，全民加息至9.5%，还送888元奖励金", //默认头信息
                    link: "https://" + host + "/act/home/huodong/20170926/", //当前链接
                    imgUrl: "https://r.51gjj.com/act/release/img/20170926_wxshare.png", //默认链接
                    desc: "双节同庆加息至9.5%，新网银行存管，一起赚起来！",
                    success: function () {
                        console.log(share_data.imgUrl);
                    }
                };
                wx.onMenuShareTimeline(share_data);
                wx.onMenuShareAppMessage(share_data);
                wx.onMenuShareQQ(share_data);
                wx.onMenuShareWeibo(share_data);
                wx.onMenuShareQZone(share_data);
            });
        }
    }
    run.start();
})