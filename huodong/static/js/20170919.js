require.config(requireConfig);
require(["jquery", "fastClick", "lucky-card", "ct", "bridge", "juicer", "marquee", "share"], function ($, fastClick, LuckyCard, ct, Bridge, juicer, liMarquee, wx) {
    var oMask = $(".mask");

    var oP = Object.create(ct.Prompt);
    oP.create().build();

    var oM = Object.create(ct.Mask);
    oM.create().build();

    var local = ct.Tool.local();

    ct.Tool.buryPoint_v2(ct.Tool.userAgent().isGjj ? 1 : 0);
    // id type
    // ct.Tool.share(64, "xingyezhuanxiang618");

    var myDay = new Date().getDay();
    var app = null;
    var oUrl_1 = null;
    var oUrl_2 = null;
    var run = {
        status: {
            weChat: false,
            login: false,
            code: "",
            msg: ""
        },
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
                url: ct.Tool.url("/act/request/activity"),
                data: JSON.stringify({
                    source: ct.Tool.userAgent().isGjj ? 1 : 0,
                    tag: "20170919_1_0_0_限时加息"
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
            _this.share();
            _this.skip();
        },

        render: function () {
            var _this = this;
            if (_this.isWeiXin() || _this.isqq()) {
                var res = '<div class="yqBottom"><img class="yqLogo" src="//r.51gjj.com/act/release/img/20170515_yq_logo.png"><div class="wrapTxt"><span class="txt1">51公积金旗下自营理财项目</span><span class="txt2">上客户端 领更多好礼</span></div><img class="yqBtn" src="//r.51gjj.com/act/release/img/20170515_yq_btn.png"></div>';
                $("body").append(res);
            }

            var url = window.location.href.split('#')[0];
            $.ajax({
                //获取分享的配置信息
                url: "/hs/wx/get_sign_package",
                type: 'GET',
                //data: 'url=' + encodeURIComponent(url) + '&appid=wxb42d431526f1c17d',
                data: 'url=' + encodeURIComponent(url) + '&appid=wx90f7de7c9b73bf69',
                dataType: 'JSON',
                success: function (r) {
                    _this.share_callback(r);
                }
            })
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
                    title: "限时加息2%，2W存14天收益70元，厉害了！", //默认头信息
                    link: "https://" + host + "/act/home/huodong/20170919/", //当前链接
                    imgUrl: "https://r.51gjj.com/act/release/img/20170919_share_wx.png", //默认链接
                    desc: "收益高达9%，新网银行存管，一起赚起来！",
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
        },
        isWeiXin: function () {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        },
        isqq: function () {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/QQ/i) == "qq") {
                return true;
            } else {
                return false;
            }
        },
        skip: function () {
            $(".content").on("click", ".skip-btn", function () {
                window.location.href = "/51wealthy/h5/member/invest_list.php?cid=10";
            })
            $(".yqBtn").on("click", function () {
                window.location.href = "//d.51gjj.com/";
            });
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
            $(".content").on("click", ".share-btn", function () {
                if (app.isGjj && Bridge) {
                    // Bridge.action('quickIcon', {
                    //     thumb: "https://r.51gjj.com/image/static/ico_title_share_dark.png",
                    //     onclick: function () {
                    Bridge.action('ShareTimeline', {
                        "title": "限时加息2%，2W存14天收益70元，厉害了！",
                        'desc': "收益高达9%，新网银行存管，一起赚起来！",
                        "thumb": "https://r.51gjj.com/act/release/img/20170919_share_wx.png",
                        "link": "https://" + host + "/act/home/huodong/20170919/"
                    });
                    //     }
                    // })
                }
            })
            return this;
        },
    }
    run.start();
})