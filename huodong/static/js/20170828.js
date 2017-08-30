require.config(requireConfig);
require(["jquery", "fastClick", "FullPage", "ct", "bridge", "juicer", "marquee","dataStatistics"], function ($, fastClick, fullpage, ct, Bridge, juicer,dataStatistics) {
    var oMask = $(".mask");

    var oP = Object.create(ct.Prompt);
    oP.create().build();

    var oM = Object.create(ct.Mask);
    oM.create().build();

    var local = ct.Tool.local();
    var source = ct.Tool.userAgent().isGjj ? 1 : 0;
    ct.Tool.buryPoint_v2(source);
    // ct.Tool.share(82,"zmtkj");
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
        },

        init: function () {
            console.log("理财金活动");
            var _this = this;
            _this.openRule();
            _this.closeRule();
            _this.setNavAttr();
            _this.share();
            $(".wp").removeClass("hide");
            _this.PageBuryRequest();
            _this.getSingleInfo();
        },
        getSingleInfo: function() {
            var _this = this;
            $.ajax({
                type: "POST",
                dataType: "JSON",
                url: "test.php",
                // url: "/act/act170828/get_status",
                success: function (d) {
                    if (d.success) {
                        console.log("后台数据：",d);
                        _this.getLottery(d);
                        if (!d.ret.auth) {
                            _this.showDynamicLayout($("#tpl-have-doubled"),d);
                            _this.getNumberImage(d.ret.money);
                            // _this.hideFakeEle();
                            $(".dynamic-layout").on("click",".btn4",function(){
                                window.location.href = "https://b.jianbing.com/51wealthy/h5/account/index.php";
                            })
                        } else {
                            if (d.ret.is_weChat || d.ret.is_qq) {
                                _this.startIsImportedProcess(d);
                            } else {
                                if (!d.ret.login) {
                                    if (Bridge) {
                                        Bridge.action("login");
                                    }
                                } else {
                                    _this.startIsImportedProcess(d);
                                }
                            }
                        }
                    } else {
                        oP.show("出错了");
                    }
                }
            });
        },
        startIsImportedProcess: function(d) {
            var _this = this;
            if (!d.ret.import) {
                _this.showNotImportLayout(d);
            } else {
                _this.showImportedLayout(d);
                $(".tp").on("click",".deposite-btn",function(){
                    $(".dynamic-layout .tp").fadeOut();
                    window.location.href = "https://b.jianbing.com/51wealthy/h5/account/index.php";
                });
                $(".dynamic-layout").on("click",".tp",function(){
                    oM.hide();
                    $(".double").remove();
                    $(".multiple").remove();
                    $(".dynamic-layout").empty();
                    _this.showDynamicLayout($("#tpl-not-double"),d);
                    _this.getNumberImage(d.ret.money);
                    // _this.hideFakeEle();
                });
                $(".dynamic-layout").on("click",".btn3",function(){
                    window.location.href = "https://b.jianbing.com/51wealthy/h5/account/index.php";
                })
            }
        },
        showDynamicLayout: function(tpl,d) {
            var tplContent = tpl.html();
            var tplHtml = juicer(tplContent,d.ret);
            $(".dynamic-layout").append(tplHtml);
        },
        showNotImportLayout: function(d) {
            var _this = this;
            _this.showDynamicLayout($("#tpl-not-imported"),d);
            $(".dynamic-layout").on("click",".btn1",function(){
                oP.show("抱歉，您的公积金尚未查询，请先查询后再来领取哦。");
                setTimeout(function(){
                    window.location.href = "https://kaifa.jianbing.com/h5/?page=query";
                },1500);
            })
        },
        getTpContent: function(d) {
            $("<div class='double'></div>").appendTo($(".tp")).text(d.ret.money);
            $("<div class='multiple'></div>").appendTo($(".tp"));
            $("<span></span>").appendTo($(".tp .multiple")).text("已翻X");
            $("<span></span>").appendTo($(".tp .multiple")).text(d.ret.multiple);
        },
        showImportedLayout: function(d) {
            var _this = this;
            _this.showDynamicLayout($("#tpl-have-imported"),d);
            _this.getNumberImage(d.ret.base);
            // _this.hideFakeEle();

            $(".dynamic-layout").on("click",".btn2",function(){

                _this.showScrollPage(d);

                /*_this.getTpContent(d);
                oM.show();
                $(".dynamic-layout .tp").fadeIn();*/
            })
        },
        showScrollPage: function(d) {
            $(".provident2").addClass("dataStatistics");
            $(".provident2 div").addClass("digit_set");
            $(".provident2 .digit_set").each(function(index,item){
                $(item).empty();
            })
            $(".provident2 div:last").addClass("set_last");
            $('.dataStatistics').dataStatistics({min:0,max:d.ret.money,time:30000,len:d.ret.money.toString().length});
            // $(".provident2 div span").css("top","-1.7rem");
        },
        // hideFakeEle: function() {
        //     setTimeout(function(){
        //         $(".provident2 div span").append("<style>::before{display:none}</style>");
        //         $(".provident2 div span").append("<style>::after{display:none}</style>");
        //     },1000);
        // },
        getNumberImage: function(data) {
            var _this = this;
            var num = data.toString();
            $(".provident2").empty();
            var len = num.length;
            for(var i = 0;i < len; i++) {
                var OImg = new Image();
                OImg.src = "http://r.51gjj.com/act/release/img/20170828_number_bg.png";
                var ODivLi = $("<div>",{"class": "show-num"});
                ODivLi.append(OImg);
                $(".provident2").append(ODivLi);
                // for(var j = 0;j <= i; j++) {
                //     OImg.src = "http://r.51gjj.com/act/release/img/20170828_number_bg.png";
                //     $(".provident2").append(ODivLi);
                // }
                $(".provident2 div:eq("+ i +")").append('<span class="show-num-span">' + num.charAt(i) + '</span>');
            }
        },
        getLottery: function(d) {
            var info = d.ret.info;
            var singleInfo = $(".single-info");
            for (var i = 0; i < info.length; i++) {
                var oSpan = $("<span>");
                oSpan.text("恭喜用户" + info[i].name + "获得" + info[i].money + "元理财金");
                oSpan.appendTo(singleInfo);
            }
            singleInfo.liMarquee({
                hoverstop: false,
                drag: false,
                scrollamount: 30
            });
        },
        setNavAttr: function() {
            if (Bridge) {
                Bridge.action("setNavigationColor",{backgroundColor:"#fff",textColor:"#212226",iconType:"1"});
            }
        },
        PageBuryRequest: function () {
            $.ajax({
                type: "POST",
                dataType: "JSON",
                url: "/act/request/activity",
                data: JSON.stringify({
                    source: ct.Tool.userAgent().isGjj ? 1 : 0,
                    tag: "20170821_1_0_0_进入页面"
                }),
                success: function (d) {
                    if (d.success) {

                    }
                }
            });
        },
        openRule: function () {
            $(".wp-inner").on("click", ".rule-btn", function (event) {
                oM.show();
                var ruleTpl = $('#tpl-rule').html();
                var resRuleHtml = juicer(ruleTpl, ruleJson);
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
                            "title": "28888元理财金，人人有份",
                            'desc': "我们出本金，利息都归你",
                            "thumb": "https://r.51gjj.com/act/release/img/20170828_share.png",
                            "link": "https://" + host + "/act/home/huodong/20170828/index.php"
                        });
                    }
                })
            }
            return this;
        }
    }
    var ruleJson = {
        rule: [
            "活动时间：9月1号-9月15号；",
            "活动对象：已导入公积金的所有用户；",
            "活动页面中所有金额单位均为：元；",
            "导入多个公积金账户的用户，以距当前时间最近的导入账户为发放标准；",
            "成功领取理财金后，可点击理财Tab页—在首页找到新手体验标查看；",
            "发放时间：理财金的收益会在领取成功后的第2天发放到您的理财账户，收益可以操作提现，点击我的理财——可用余额——提现，可提现到银行卡；",
            "已经获得体验金，但未获得后续认证或投资体验金的用户，请在9月22日24点前完成实名认证，否则将失去领取后续体验金的资格；",
            "本活动仅限于未投资过51有钱的用户参加，同一个用户只能领取一次（同一个手机号码和身份证和银行卡视为同一用户）；",
            "有任何疑问或者帮助可联系客服4008635151。",
            "理财金由51公积金管家提供，与设备生产商Apple Inc公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。"
        ]
    }
    run.start();
})
