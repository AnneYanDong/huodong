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
        },
        BuryRequest: function(now) {
            console.log("埋点：",now);
            var page = now;
            $.ajax({
                type: "POST",
                dataType: "JSON",
                url: ct.Tool.url("/app/request/activity"),
                data: JSON.stringify({
                    source: ct.Tool.userAgent().isGjj ? 1 : 0,
                    tag: "20170807_page_1_0_next"
                }),
                success: function (d) {
                    if (d.success) {

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
                        _this.respondState(now, 3, true,function(){
                            console.log("返回第五页");
                            
                        });

                    };

                    if (now == "page7") {
                        _this.BuryRequest(now);
                        
                        _this.respondState(now, 3, true,function(){
                            console.log("返回第六页");
                            
                        });

                    };
                }
            });
            return fullpage;
        },

        // 走后台跳转申请
        getAnalysisData: function(now) {
            var _this = this;
            console.log("请求传递的数据：",loan);
            $.ajax({
                type: "POST",
                dataType: "JSON",
                data: JSON.stringify(loan),
                // url: "test.php",
                url: "/act/act170801/get_button",
                success: function(d){
                    if (d.success) {
                        data = d.ret.data;
                        console.log("data->",data);
                       if (data.sex == 1) {
                         //弹屏男
                          $(".page4 .customization-tp").fadeIn();
                          _this.showAnalyzeProcess(0);
                          //动态展示icon
                          _this.showIcon();
                          //定制贷款信息
                          _this.getLoanInfo();
                          setTimeout(function(){
                            _this.fullPageObj.moveTo(4, true);
                            $(".page4 .customization-tp").fadeOut();
                            $(".page4 .analyzing-process div").removeClass("analyzing").addClass("hide");
                          },2000);
                       }
                    }
                    else {
                        oP.show(d.msg || "出错了请重试");
                    }
                }
            });
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
    }
    run.start();
})
