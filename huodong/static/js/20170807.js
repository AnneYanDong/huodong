require.config(requireConfig);
require(["jquery", "fastClick", "FullPage", "ct", "bridge", "juicer"], function ($, fastClick, fullpage, ct, Bridge, juicer) {
    var oMask = $(".mask");

    var oP = Object.create(ct.Prompt);
    oP.create().build();

    var oM = Object.create(ct.Mask);
    oM.create().build();

    var local = ct.Tool.local();
    var source = ct.Tool.userAgent().isGjj ? 1 : 0;
    ct.Tool.buryPoint_v2(0);
    var dataObj = null;
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
            console.log("解析你的公积金活动");
            var _this = this;
            _this.setNavAttr();
            $(".wp").removeClass("hide");
            _this.fullPageObj = _this.fullpage();
            _this.getAnalysisData();
        },
        setNavAttr: function() {
            if (Bridge) {
                Bridge.action("setNavigationColor",{backgroundColor:"#e33d3b",textColor:"#fff",iconType:"1"});
            }
        },
        PageBuryRequest: function (now) {
            console.log("埋点：", now);
            var page = now.substring(4);
            $.ajax({
                type: "POST",
                dataType: "JSON",
                url: "/act/request/activity",
                data: JSON.stringify({
                    source: ct.Tool.userAgent().isGjj ? 1 : 0,
                    tag: "20170807_" + page + "_0_0_进入页面" + now + ""
                }),
                success: function (d) {
                    if (d.success) {

                    }
                }
            });
        },
        createPortrait: function (d) {
            var image = new Image();
            var male = ["http://r.51gjj.com/act/release/img/20170807_page2_portrait4.png",
                "http://r.51gjj.com/act/release/img/20170807_page2_portrait5.png",
                "http://r.51gjj.com/act/release/img/20170807_page2_portrait6.png"
            ];
            var female = ["http://r.51gjj.com/act/release/img/20170807_page2_portrait1.png",
                "http://r.51gjj.com/act/release/img/20170807_page2_portrait2.png",
                "http://r.51gjj.com/act/release/img/20170807_page2_portrait3.png"
            ];
            if (d.analyze1.gender == "男") {
                image.src = male[Math.floor(Math.random() * male.length)];
            } else {
                image.src = female[Math.floor(Math.random() * female.length)];
            }
            $(".portrait").append(image);
        },
        getNumberImage: function(data,page) {
            var rankingStr = data.toString();
            for(var i = 0;len1 = rankingStr.length,i < len1; i++) {
                var OImg = new Image();
                var ODivLi = $("<div class='img-wrap"+ i +"'></div>");
                ODivLi.append(OImg);
                for(var j = 0;j <= i; j++) {
                    OImg.src = "http://r.51gjj.com/act/release/img/" + rankingStr[j] + "_new.png";
                    $("."+ page +" .div-container").append(ODivLi);
                }
            }
            if (page == "page2" || page == "page7") {
                $(".div-container div img").css({
                    "width":".42rem",
                    "height":".68rem",
                    "padding":".02rem"
                });
            } else {
                $(".div-container div img").css({
                    "width":".27rem",
                    "height":".42rem",
                });
            }
            if (page == "page2") {
                $(".page2 .div-container").append("<span class='ming'>名</span>");
            }
            if (page == "page7") {
                $(".page7 .div-container").append("<span class='ming'>元</span>");
            }
        },
        showData: function(d) {
            var dataObj = {
                ele: [".page2 .detail1 span:first-child",
                      ".page2 .gjj_number div:first-child span",
                      ".page2 .detail2 span:nth-child(2)",
                      ".page2 .detail2 span:nth-child(3)",
                      ".page3 .detail3 > div:first-child span:nth-child(2)",
                      ".page3 .detail3 > div:nth-child(2) span",
                      ".page3 .detail3 span:nth-child(4)",
                      ".page3 .detail3 .diff-year",
                      ".page3 .detail4 span:nth-child(2)",
                      ".page4 .detail5 .name",
                      ".page4 .detail5 .gender",
                      ".page4 .detail6 .gender",
                      ".page4 .detail5 .female-ranking",
                      ".page4 .detail6 .male-ranking",
                      ".page5 .detail10 .company_count",
                      ".page5 .detail10 .name",
                      ".page6 .detail7-1 .name",
                      ".page7 .detail8 div:first-child span",
                      ".page4 .detail5 .age"
                      ],
                data: [d.name + "的公积金在" + d.analyze1.city + "市排名为",
                       d.analyze1.city + "缴纳公积金人口基数",
                       d.analyze1.ranking_p + "%",
                       "的" + d.analyze1.city + "人",
                       d.analyze2.year,
                       d.name + "第一次缴纳公积金",
                       d.analyze2.month,
                       d.analyze2.diff_year,
                       d.analyze2.city,
                       d.name,
                       "的" + d.analyze3.gender + "性",
                       "的" + d.analyze3.gender + "性",
                       d.analyze3.ranking_p_female + "%",
                       d.analyze3.ranking_p_male + "%",
                       d.analyze4.company_count,
                       "争着为" + d.name + "缴公积金",
                       d.name + "的公积金可以",
                       d.name + "的公积金可以拥有",
                       d.analyze3.age
                       ]
            }
            for(var i = 0; i < dataObj.ele.length; i++) {
                $(dataObj.ele[i]).text(dataObj.data[i]);
            }
            if (d.analyze3.age == null || d.analyze3.age == false) {
                $(".page4 .detail5 .age").text("社会人");
            } else {
                $(dataObj.ele[".page4 .detail5 .age"]).text(dataObj.data[d.analyze3.age]);
                $(".page4 .detail5 .age").after($("<span>后</span>"));
            }
        },
        getAnalyzingData: function(d) {
            var _this = this;
            _this.showData(d);
            _this.getNumberImage(d.analyze1.ranking,"page2");
            _this.getPage6Text(d.analyze5.text);
            _this.getNumberImage(d.analyze6.loanable_amount,"page7");
        },
        getPage6Text: function(text) {
            var _this = this;
            var arrText = text.split("|");
            console.log(arrText);
            for(var i = 0; len = arrText.length,i < len; i ++) {
                $(".page6 .text"+ (i+1) +"").text(arrText[i].match(/\S+/));
            }
        },
        getAnalysisData: function () {
            var _this = this;
            $.ajax({
                type: "POST",
                dataType: "JSON",
                url: "test.php",
                // url: "/act/analyze/get_analyze",
                success: function (d) {
                    dataObj = d;
                    if (d.success) {
                        console.log("后台数据：",d);
                        if (d.ret.show) {
                            _this.createPortrait(d.ret);
                            _this.getAnalyzingData(d.ret);
                        } else {
                            window.location.href = d.url;
                        }
                    }
                }
            });
        },

        fullpage: function () {
            var _this = this;
            var fullpage = document.getElementsByClassName("wp-inner")[0].fullpage({
                start: 0,  //默认第一页开始
                beforeChange: function(e) {
                    var now = "page" + (e.next + 1); //页面在改变之前获取当前页面
                    console.log("now", now);
                    _this.changeState(now); //把当前页面在改变之前塞入浏览器历史
                },
                afterChange: function (e) {
                    var timer = null;
                    clearTimeout(timer);
                    _this.fullPageObj.stop();
                    var now = "page" + (e.cur + 1);

                    if (now == "page1") {
                        _this.PageBuryRequest(now);
                        $(".page1").on("click", ".img-btn", function () {
                            $.ajax({
                                type: "POST",
                                dataType: "JSON",
                                url: "test.php",
                                // url: "/act/analyze/get_analyze",
                                success: function (d) {
                                    if (d.success) {
                                        console.log("后台数据：", d);
                                        if (d.login == false) {
                                            oP.show("想解析公积金，先登录APP啦！");
                                            if (Bridge) {
                                                Bridge.action("login");
                                            }
                                        } else {
                                            if (!d.ret.show) {
                                                oP.show("查询公积金后，才能解析你的公积金秘密噢~");
                                                setTimeout(function(){
                                                    window.location.href = d.ret.url;
                                                },1500);
                                            } else {
                                                oM.show();
                                                $(".tp-analyzing").fadeIn();
                                                $(".sweat").fadeIn();
                                                console.log(_this.fullPageObj);
                                                setTimeout(function(){
                                                    oM.hide();
                                                    $(".tp-analyzing").fadeOut();
                                                    $(".sweat").fadeOut();
                                                    _this.fullPageObj.moveTo(1,true);
                                                },2000);
                                            }
                                        }
                                    }
                                }
                            });
                        })
                        _this.respondState(now);
                    }

                    if (now == "page2") {
                        _this.PageBuryRequest(now);
                        $(".page2").on("click", ".next", function () {
                            _this.fullPageObj.moveTo(2, true);
                        })
                        _this.respondState(now, 0, true, function () {
                            console.log("返回第一页");
                        });
                    }

                    if (now == "page3") {
                        _this.PageBuryRequest(now);
                        $(".page3").on("click", ".next", function () {
                            _this.fullPageObj.moveTo(3, true);
                        })
                        _this.respondState(now, 1, true, function () {
                            console.log("返回第二页");
                        });
                    }

                    if (now == "page4") {
                        _this.PageBuryRequest(now);
                        $(".page4").on("click", ".next", function () {
                            _this.fullPageObj.moveTo(4, true);
                        })
                        _this.respondState(now, 2, true, function () {
                            console.log("返回第三页");
                        });
                    }

                    if (now == "page5") {
                        _this.PageBuryRequest(now);
                        $(".page5").on("click", ".next", function () {
                            _this.fullPageObj.moveTo(5, true);
                        })
                        _this.respondState(now, 3, true, function () {
                            console.log("返回第四页");

                        });

                    };

                    if (now == "page6") {
                        _this.PageBuryRequest(now);
                        $(".page6").on("click", ".next", function () {
                            _this.fullPageObj.moveTo(6, true);
                        })
                        _this.respondState(now, 4, true, function () {
                            console.log("返回第五页");

                        });

                    };

                    if (now == "page7") {
                        _this.PageBuryRequest(now);
                        $(".page7").on("click", ".next", function () {
                            _this.fullPageObj.moveTo(7, true);
                        })
                        _this.respondState(now, 5, true, function () {
                            console.log("返回第六页");
                        });

                    };

                    if (now == "page8") {
                        _this.PageBuryRequest(now);
                        $(".page8").on("click", ".img-btn", function () {
                            _this.share();
                        })
                        _this.respondState(now, 6, true, function () {
                            console.log("返回第七页");
                        });

                    };
                }
            });
            return fullpage;
        },

        changeState: function (page,id) {
            window.history.pushState && window.history.pushState({
                title: page
            }, page, "index.php#page=" + page); // 塞入新的历史
        },

        // 返回。
        respondState: function (page, to, isAnim, fn) {
            var _this = this;
            var app = ct.Tool.userAgent();
            if (Bridge && app.isGjj) {
                Bridge.onBack(function () {
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
                window.onpopstate = function () {
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
        share: function (unionid) {
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
                    "link": "https://" + host + "/act/wechat/act_analyzes?=" + unionid
                });
                //     }
                // })
            }
            return this;
        }
    }
    run.start();
})
