require.config(requireConfig);
require(["jquery", "fastClick", "FullPage", "ct", "bridge", "juicer","swiper"], function ($, fastClick, fullpage, ct, Bridge, juicer,swiper) {
    var oMask = $(".mask");

    var oP = Object.create(ct.Prompt);
    oP.create().build();

    var oM = Object.create(ct.Mask);
    oM.create().build();

    var local = ct.Tool.local();
    var source = ct.Tool.userAgent().isGjj ? 1 : 0;
    ct.Tool.buryPoint_v2(source);
    ct.Tool.share(85,"jiexigjj831");
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
                    },500)
                }
            })
            $.ajax({
                type: "POST",
                dataType: "JSON",
                url: "/act/request/activity",
                data: JSON.stringify({
                    source: ct.Tool.userAgent().isGjj ? 1 : 0,
                    tag: "85_1_0_0_进入页面page1"
                }),
                success: function (d) {
                    if (d.success) {

                    }
                }
            });
        },

        init: function () {
            console.log("解析你的公积金活动");
            var _this = this;

            var args = _this.getQueryStringArgs();
            unionid = args["unionid"];
            shareid = args["shareid"];
            _this.share();
            _this.setNavAttr();
            $(".wp").removeClass("hide");
            _this.mySwiper = _this.useSwiper();
        },
        pagePaginationBuryRequest: function() {
            if ($(".swiper-pagination-bullet").hasClass("swiper-pagination-bullet-active")) {
                var num = Number($(".swiper-pagination-bullet-active").text()) + 1;
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    url: "/act/request/activity",
                    data: JSON.stringify({
                        source: ct.Tool.userAgent().isGjj ? 1 : 0,
                        tag: "85_1_0_0_进入页面page" + num
                    }),
                    success: function (d) {
                        if (d.success) {

                        }
                    }
                });
            }
        },
        useSwiper: function() {
            var _this = this;
            var swiper = new Swiper('.swiper-container', {
                direction: 'vertical',
                pagination : '.swiper-pagination',
                onTouchEnd:function(swiper){
                    var swiperIndex=swiper.activeIndex;//获取当前活动块的索引值
                    _this.changeState(swiperIndex+2);
                    _this.swiperPageBuryRequest(swiperIndex);
                    _this.pagePaginationBuryRequest();
                    switch (swiperIndex){
                        case 0://第一屏
                        $.ajax({
                            type: "POST",
                            dataType: "JSON",
                            data: JSON.stringify({"unionid": unionid,"shareid": shareid}),
                            // url: "test.php",
                            url: "/act/analyze/get_analyze",
                            success: function (d) {
                                if (d.success) {
                                    newShareId = d.ret.shareid;
                                    console.log("newShareId = ",newShareId);
                                    if (d.ret.is_weChat) {
                                        $(".share").addClass("hide");
                                        $("#weChat-detail").show();
                                        $(".img-btn").show();
                                        $(".weChat-finger").show();
                                        if (d.ret.play) {
                                            $(".page8").on("click", ".img-btn", function () {
                                                window.location.href = "/act/wechat/act_analyzes";
                                            })
                                        }
                                        _this.swiperHandleProcess(d);
                                    } else{
                                        if (d.ret.login == false) {
                                            // swiper.detachEvents();
                                            oP.show("想解析公积金，先登录APP啦！");
                                            $(".page1").addClass("swiper-no-swiping");
                                            $(".page2").remove();
                                            $(".page3").remove();
                                            $(".page4").remove();
                                            $(".page5").remove();
                                            $(".page6").remove();
                                            $(".page7").remove();
                                            $(".page8").remove();
                                            $(".page9").remove();
                                            if (Bridge) {
                                                Bridge.action("login");
                                            }
                                        } else {
                                            setInterval(function(){
                                                $(".page8 .share").addClass("bounce-out");
                                                setTimeout(function(){
                                                    $(".page8 .share").removeClass("bounce-out");
                                                },200);
                                            },1500);
                                            $("#app-detail").show();
                                            _this.swiperHandleProcess(d);
                                        }
                                    }
                                } else {
                                    oP.show(d.msg || "出错了请重试");
                                }
                            }
                        });
                        break;
                    }
                }
            });
            return swiper;
        },
        setNavAttr: function() {
            if (Bridge) {
                Bridge.action("setNavigationColor",{backgroundColor:"#e33d3b",textColor:"#fff",iconType:"1"});
            }
        },
        swiperPageBuryRequest: function (now) {
            console.log("第"+(now+1) + "个页面滑动的埋点记录：page", now + 1);
            $.ajax({
                type: "POST",
                dataType: "JSON",
                url: "/act/request/activity",
                data: JSON.stringify({
                    source: ct.Tool.userAgent().isGjj ? 1 : 0,
                    tag: "85_" + (now + 1) + "_0_0_滑动页面" + (now + 1) + ""
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
                $(".portrait").empty();
                image.src = male[Math.floor(Math.random() * male.length)];
            } else {
                $(".portrait").empty();
                image.src = female[Math.floor(Math.random() * female.length)];
            }
            $(".portrait").append(image);
        },
        getNumberImage: function(data,page) {
            var rankingStr = data.toString();
            $("."+ page +" .div-container").empty();
            for(var i = 0;len1 = rankingStr.length,i < len1; i++) {
                var OImg = new Image();
                var ODivLi = $("<div class='img-wrap"+ i +"'></div>");
                ODivLi.append(OImg);
                for(var j = 0;j <= i; j++) {
                    OImg.src = "http://r.51gjj.com/act/release/img/" + rankingStr[j] + "_new.png";
                    $("."+ page +" .div-container").append(ODivLi);
                }
            }
            $(".div-container div img").css({
                "width":".42rem",
                "height":".68rem",
                "padding":".02rem"
            });
            $(".page7 .div-container").append("<span class='ming'>元</span>");
        },
        showData: function(d) {
            var dataObj = {
                ele: [
                      ".page2 .gjj_number div:first-child span",
                      ".page2 .detail2 span:nth-child(2)",
                      ".page2 .detail2 span:last-child",
                      ".page2 .dynamic-text span",
                      ".page3 .detail3 > div:first-child span:nth-child(2)",
                      ".page3 .detail3 > div:nth-child(2) span",
                      ".page3 .detail3 span:nth-child(4)",
                      ".page3 .detail3 .diff-year",
                      ".page3 .detail4 span:nth-child(2)",
                      ".page4 .detail5 .name",
                      ".page4 .detail5 .gender",
                      // ".page4 .detail6 .gender",
                      ".page4 .detail5 .female-ranking",
                      ".page4 .detail6 .male-ranking",
                      ".page5 .detail10 .company_count",
                      ".page5 .detail10 .name",
                      ".page6 .detail7-1 .name",
                      ".page7 .detail8 div:first-child span",
                      ".page4 .detail5 .age"
                      ],
                data: [
                       d.analyze1.city + "缴纳公积金人口基数",
                       d.analyze1.ranking_p + "%",
                       d.analyze1.city + "人",
                       d.analyze1.text,
                       d.analyze2.year,
                       d.name + "第一次缴纳公积金",
                       d.analyze2.month,
                       d.analyze2.diff_month,
                       d.analyze2.city,
                       d.name,
                       "的" + d.analyze3.gender + "性",
                       // "的" + d.analyze3.gender + "性",
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
                $(dataObj.ele[i]).html("");
                $(dataObj.ele[i]).text(dataObj.data[i]);
            }
            if (d.analyze3.age == null || d.analyze3.age == false) {
                $(".page4 .detail5 .age").text("");
                $(".page4 .detail5 .age").text("社会人");
            } else {
                $(dataObj.ele[".page4 .detail5 .age"]).text(dataObj.data[d.analyze3.age]);
                var spans = $(".page4 .hou");
                $(".page4 .detail5 .age").after($("<span class='hou'>后</span>"));
                if (spans.length >= 1) {
                    $(".page4 .detail5 .age").siblings().not(":first").remove();
                    $(".page4 .detail5 .age").after($("<span class='hou'>后</span>"));
                }
            }
            //判断性别
            if (d.analyze3.gender === "女") {
                $(".page4 .detail6 .gender").text("的男性");
            } else {
                $(".page4 .detail6 .gender").text("的女性");
            }

            //第二页的
            if (ct.Tool.userAgent().isGjj === true) {
                console.log("ct.Tool.userAgent().isGjj == ",ct.Tool.userAgent().isGjj);
                $(".page2 .detail1 span:first-child").text("你的公积金");
            } else {
                console.log("ct.Tool.userAgent().isGjj == ",ct.Tool.userAgent().isGjj);
                $(".page2 .detail1 span:first-child").text(d.name + "的公积金");
            }
        },
        getAnalyzingData: function(d) {
            var _this = this;
            _this.showData(d);
            _this.getNumberImage(d.analyze6.loanable_amount,"page7");
            _this.getPage6Text(d.analyze5.text);
        },
        getPage6Text: function(text) {
            var _this = this;
            var arrText = text.split("|");
            for(var i = 0; len = arrText.length,i < len; i ++) {
                $(".page6 .text"+ (i+1) +"").text(arrText[i].match(/\S+/));
            }
        },
        getQueryStringArgs: function() {
            var qs = location.search.length > 0 ? location.search.substring(1) : 0;
            var items = qs.length > 0 ? qs.split("&") : [];
            var item = null,
                name = null,
                value = null,
                len = items.length;
            var args = {};
            for(var i = 0; i < len; i ++) {
                item = items[i].split("=");
                name = decodeURIComponent(item[0]);
                value = decodeURIComponent(item[1]);

                if(name.length) {
                    args[name] = value;
                }
            }
            return args;
        },
        getAnalysisData: function (d) {
            var _this = this;
            _this.createPortrait(d.ret);
            _this.getAnalyzingData(d.ret);
        },
        handleProcess: function(d) {
            var _this = this;
            if (d.ret.show == false) {
                oP.show("查询公积金后，才能解析你的公积金秘密噢~");
                setTimeout(function(){
                    window.location.href = d.ret.url + "?page=query";
                },1500);
            } else {
                oM.show();
                $(".tp-analyzing").fadeIn();
                $(".sweat").fadeIn();
                setTimeout(function(){
                    oM.hide();
                    $(".tp-analyzing").fadeOut();
                    $(".sweat").fadeOut();
                    _this.getAnalysisData(d);
                    _this.fullPageObj.moveTo(1,true);
                },1000);
            }
        },
        swiperHandleProcess: function(d) {
            var _this = this;
            if (d.ret.show == false) {
                oP.show("查询公积金后，才能解析你的公积金秘密噢~");
                setTimeout(function(){
                    window.location.href = d.ret.url + "?page=query";
                },1500);
            } else {
                oM.show();
                $(".tp-analyzing").fadeIn();
                $(".sweat").fadeIn();
                setTimeout(function(){
                    oM.hide();
                    $(".tp-analyzing").fadeOut();
                    $(".sweat").fadeOut();
                    _this.getAnalysisData(d);
                    _this.mySwiper.slideTo(1,true);
                },1000);
            }
        },

        changeState: function (page,id) {
            var _this = this;
                window.history.pushState && window.history.pushState({
                    title: page
                }, page, "index.php?unionid="+unionid+"&shareid="+shareid+"#page=page" + page); // 塞入新的历史
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
        //分享按钮：只有在测试app或者正式app才能正确调用
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
                    thumb: "https://r.51gjj.com/image/static/ico_title_share_white.png",
                    onclick: function () {
                        Bridge.action('ShareTimeline', {
                            "title": "要不是和你铁，这份公积金档案也不会发给你！",
                            'desc': "点击查看我的公积金秘密。",
                            "thumb": "https://r.51gjj.com/act/release/img/20170807_new_share.png",
                            "link": "https://" + host + "/act/home/huodong/20170807/index.php?shareid=" + newShareId
                        });
                    }
                })
            }
            return this;
        }
        // share2: function () {
        //     var u = navigator.userAgent;
        //     var app = {
        //         mobile: !!u.match(/AppleWebKit.*Mobile.*/),
        //         isAndroid: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1 || u.indexOf("android") > -1,
        //         isiOS: /[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(u),
        //         webApp: -1 == u.indexOf("Safari"),
        //         weixin: u.indexOf("MicroMessenger") > -1,
        //         isGjj: /^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(u) || /^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(u),
        //         isAndroidGjj: /^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(u),
        //         isiOSGjj: /^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(u),
        //         isGjjFdjsq: /^android\/[\w\W]+client\/[\w\W]+category\/51fdjsq$/.test(u)
        //     };
        //     var host = window.location.host;
        //     if (app.isGjj && Bridge) {
        //         // Bridge.action('quickIcon', {
        //         //     thumb: "https://r.51gjj.com/image/static/ico_title_share_dark.png",
        //             // onclick: function () {
        //         Bridge.action('ShareTimeline', {
        //             "title": "要不是和你铁，这份公积金档案也不会发给你！",
        //             'desc': "点击查看我的公积金秘密。",
        //             "thumb": "https://r.51gjj.com/act/release/img/20170807_new_share.png",
        //             "link": "https://" + host + "/act/home/huodong/20170824/index.php?shareid=" + newShareId
        //         });
        //         //     }
        //         // })
        //     }
        //     return this;
        // }
    }
    run.start();
})
