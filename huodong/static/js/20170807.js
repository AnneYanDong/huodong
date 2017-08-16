require.config(requireConfig);
require(["jquery", "fastClick", "FullPage", "ct", "bridge", "juicer"], function($, fastClick, fullpage, ct, Bridge, juicer) {
    var oMask = $(".mask");

    var oP = Object.create(ct.Prompt);
    oP.create().build();

    var oM = Object.create(ct.Mask);
    oM.create().build();

    var local = ct.Tool.local();

    ct.Tool.buryPoint();
    var run = {
        start: function() {
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
                callback: function() {
                    this.hintLog("图片加载完成");
                    var timer = null;
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        oPreLoading.hide();
                        _this.init();
                    }, 500)
                }
            })

         /*   $.ajax({
                type: "POST",
                dataType: "JSON",
                url: ct.Tool.url("/app/request/activity"),
                data: JSON.stringify({
                    place_cid: ct.Tool.userAgent().isGjj ? 1 : 0,
                    tag: "进入页面" + projectName
                }),
                success: function (d) {
                    if (d.success) {

                    }
                }
            });*/
        },

        init: function() {
            console.log("解析你的公积金活动");
            var _this = this;
            $(".wp").removeClass("hide");
            _this.fullPageObj = _this.fullpage();
            _this.getAnalysisData();
        },
        BuryRequest: function(now) {
            console.log("埋点：",now);
            var page = now;
            $.ajax({
                type: "POST",
                dataType: "JSON",
                url: "/app/request/activity",
                data: JSON.stringify({
                    source: ct.Tool.userAgent().isGjj ? 1 : 0,
                    tag: "20170807_"+ page + "_1_0_next"
                }),
                success: function (d) {
                    if (d.success) {

                    }
                }
            });
        },
        createPortrait: function(d) {
            var image = new Image();
            var male = ["http://r.51gjj.com/act/release/img/20170807_page2_portrait4.png",
                        "http://r.51gjj.com/act/release/img/20170807_page2_portrait5.png",
                        "http://r.51gjj.com/act/release/img/20170807_page2_portrait6.png"];
            var female = ["http://r.51gjj.com/act/release/img/20170807_page2_portrait1.png",
                         "http://r.51gjj.com/act/release/img/20170807_page2_portrait2.png",
                         "http://r.51gjj.com/act/release/img/20170807_page2_portrait3.png"];
            if(d.analyze1.gender == "男") {
                image.src = male[Math.floor(Math.random()*male.length)];
            } else {
                image.src = female[Math.floor(Math.random()*female.length)];
            }
            $(".portrait").append(image);
        },
        getAnalyzeData: function(d) {
            $(".page2 .detail1 span:nth-child(2)").text(d.analyze1.ranking);
            $(".page2 .detail2 span:nth-child(2)").text(d.analyze1.ranking_p + "%");
            $(".page3 .detail3 > div:first-child span:nth-child(2)").text(d.analyze2.year);
            $(".page3 .detail3 span:nth-child(4)").text(d.analyze2.month);
            $(".page3 .detail4 span:nth-child(2)").text(d.analyze2.city);
            $(".page4 .detail5 .age").text(d.analyze3.age);
            $(".page4 .detail5 .female-ranking").text(d.analyze3.ranking_p_female + "%");
            $(".page4 .detail6 .male-ranking").text(d.analyze3.ranking_p_male + "%");
            $(".page5 .detail10 .company_count").text(d.analyze4.company_count);
        },
        getAnalysisData: function() {
            var _this = this;
            $.ajax({
                type: "POST",
                dataType: "JSON",
                url: "test.php",
                // url: "/act/analyze/get_analyze",
                success: function (d) {
                    if (d.success) {
                        console.log("后台数据：",d);
                        var d = d.ret;
                        _this.createPortrait(d);
                        _this.getAnalyzeData(d);
                    }
                }
            });
        },

        fullpage: function() {
            var _this = this;
            var fullpage = document.getElementsByClassName("wp-inner")[0].fullpage({
                start: 0,  //默认第一页开始
                beforeChange: function(e) {
                    var now = "page" + (e.next + 1); //页面在改变之前获取当前页面
                    console.log("now",now);
                    _this.changeState(now); //把当前页面在改变之前塞入浏览器历史
                },
                afterChange: function(e) {
                    var timer = null;
                    clearTimeout(timer);
                    _this.fullPageObj.stop();
                    var now = "page" + (e.cur + 1);

                    if (now == "page1") {
                        $(".page1").on("click",".img-btn",function(){
                            $.ajax({
                                type: "POST",
                                dataType: "JSON",
                                url: ct.Tool.url("/app/request/activity"),
                                data: JSON.stringify({
                                    source: ct.Tool.userAgent().isGjj ? 1 : 0,
                                    tag: "20170807_page1_1_0_开始解析"
                                }),
                                success: function (d) {
                                    if (d.success) {

                                    }
                                }
                            });
                            oM.show();
                            $(".tp-analyzing").fadeIn();
                            $(".sweat").fadeIn();
                            timer = setTimeout(function(){
                                oM.hide();
                                $(".tp-analyzing").fadeOut();
                                $(".sweat").fadeOut();
                                _this.fullPageObj.moveTo(1,true);
                            },3000);
                        })
                        _this.respondState(now);
                    }

                    if (now == "page2") {
                        $(".page2").on("click",".next",function(){
                            _this.BuryRequest(now); //页面埋点更换
                            _this.fullPageObj.moveTo(2,true);
                        })
                        _this.respondState(now, 0, true,function(){
                            console.log("返回第一页");
                        });
                    }

                    if (now == "page3") {
                        $(".page3").on("click",".next",function(){

                            _this.BuryRequest(now);
                            _this.fullPageObj.moveTo(3,true);
                        })
                        _this.respondState(now, 1, true, function() {
                            console.log("返回第二页");
                        });
                    }

                    if (now == "page4") {
                        $(".page4").on("click",".next",function(){
                            _this.BuryRequest(now);
                            _this.fullPageObj.moveTo(4,true);
                        })
                        _this.respondState(now, 2, true,function(){
                            console.log("返回第三页");
                        });
                    }

                    if (now == "page5") {
                        $(".page5").on("click",".next",function(){
                            _this.BuryRequest(now);
                            _this.fullPageObj.moveTo(5,true);
                        })
                        _this.respondState(now, 3, true,function(){
                            console.log("返回第四页");
                            
                        });

                    };

                    if (now == "page6") {
                        $(".page6").on("click",".next",function(){
                            _this.BuryRequest(now);
                            _this.fullPageObj.moveTo(6,true);
                        })
                        _this.respondState(now, 4, true,function(){
                            console.log("返回第五页");
                            
                        });

                    };

                    if (now == "page7") {
                        $(".page7").on("click",".next",function(){
                            _this.BuryRequest(now);
                            _this.fullPageObj.moveTo(7,true);
                        })
                        _this.respondState(now, 5, true,function(){
                            console.log("返回第六页");
                        });

                    };

                    if (now == "page8") {
                        $(".page8").on("click",".img-btn",function(){
                            $.ajax({
                                type: "POST",
                                dataType: "JSON",
                                url: ct.Tool.url("/app/request/activity"),
                                data: JSON.stringify({
                                    source: ct.Tool.userAgent().isGjj ? 1 : 0,
                                    tag: "20170807_"+ now + "_1_0_低调分享"
                                }),
                                success: function (d) {
                                    if (d.success) {

                                    }
                                }
                            });
                            _this.share();
                        })
                        _this.respondState(now, 6, true,function(){
                            console.log("返回第七页");
                        });

                    };
                }
            });
            return fullpage;
        },

        changeState: function(page) {
            window.history.pushState && window.history.pushState({
                title: page
            }, page, "index.php#page=" + page); // 塞入新的历史
        },

        // 返回。
        respondState: function(page, to, isAnim, fn) {
            var _this = this;
            var app = ct.Tool.userAgent();
            if (Bridge && app.isGjj) {
                Bridge.onBack(function() {
                    if (page == "page1") {
                        return false;
                    } else {
                        if (isAnim) {
                            _this.fullPageObj.moveTo(to, true);
                        } else {
                            _this.fullPageObj.moveTo(to);
                        }
                        if (fn) {
                            fn();
                        }
                        return true;
                    }
                })
            } else {
                window.onpopstate = function() {
                    if (isAnim) {
                        console.log(_this.fullPageObj)
                        _this.fullPageObj.moveTo(to, true);
                    } else {
                        _this.fullPageObj.moveTo(to);
                    }
                    if (fn) {
                        fn();
                    }
                }
            }
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
                // Bridge.action('quickIcon', {
                //     thumb: "https://r.51gjj.com/image/static/ico_title_share_dark.png",
                //     onclick: function () {
                        Bridge.action('ShareTimeline', {
                            "title": "转盘抽奖",
                            'desc': "查公积金送积分",
                            "thumb": "https://r.51gjj.com/act/release/img/20170721_share.png",
                            "link": "https://" + host + "/hd/20160714/invite_out_v2.php?c=" + invitation_code
                        });
                //     }
                // })
            }
            return this;
        }
    }
    run.start();
})
