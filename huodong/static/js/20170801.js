require.config(requireConfig);
require(["jquery", "fastClick", "FullPage", "ct", "bridge", "juicer"], function($, fastClick, fullpage, ct, Bridge, juicer) {
    var oMask = $(".mask");

    var oP = Object.create(ct.Prompt);
    oP.create().build();

    var oM = Object.create(ct.Mask);
    oM.create().build();

    var local = ct.Tool.local();

    ct.Tool.buryPoint();
    var loan = [];
    var total = [];
    var loanTotal = [];
    var time = null;
    var loanTime = [];
    var release = null;
    var loanRelease = [];
    var focus = null;
    var loanFocus = [];
    var data;
    var run = {
        iconName: [],

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
            console.log("私人订制活动");
            var _this = this;
            $(".wp").removeClass("hide");
            // _this.isRetest();
            _this.fullPageObj = _this.fullpage();
        },
        BuryRequest: function(now) {
            console.log("页面埋点：",now);
            var page = now;
            $.ajax({
                type: "POST",
                dataType: "JSON",
                url: ct.Tool.url("/app/request/activity"),
                data: JSON.stringify({
                    place_cid: ct.Tool.userAgent().isGjj ? 1 : 0,
                    tag: "进入页面" + page + projectName
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
                    _this.fullPageObj.stop();
                    var now = "page" + (e.cur + 1);
                    if (now == "page1") {
                        _this.BuryRequest(now);
                        //加载到当前页的时候去掉之前加上的动画
                        $(".page1 li").removeClass("bounce-out");
                        $(".page1 li").unbind().on("click", function() {
                            var ele = $(this);
                            ele.attr("disabled","disabled");
                            total = ele.data("loan-total");
                            loanTotal.length = 0;
                            loanTotal.push(total);
                            console.log("loanTotal",loanTotal);
                            var timer = null;
                            clearTimeout(timer);
                            timer = setTimeout(function() {
                                // ele.addClass("rotating");
                                ele.addClass("bounce-out");
                                clearTimeout(timer);
                                timer = setTimeout(function() {
                                    _this.fullPageObj.moveTo(1, true);
                                    ele.removeAttr("disabled");
                                }, 800);
                            }, 200);
                        });
                        _this.respondState(now);
                    }

                    if (now == "page2") {
                        _this.BuryRequest(now);
                        $(".page1 li").removeClass("bounce-out").removeAttr("disabled");;
                        $(".page2 li").unbind().on("click", function() {
                            var ele = $(this);
                            ele.attr("disabled","disabled");
                            var timer = null;
                            clearTimeout(timer);
                            timer = setTimeout(function() {
                                // ele.addClass("rotating");
                                ele.addClass("bounce-out");
                                clearTimeout(timer);
                                timer = setTimeout(function() {
                                    _this.fullPageObj.moveTo(2, true);
                                }, 800)
                            }, 200);
                            //把li元素的data属性push到对应数组
                            time = ele.data("loan-time");
                            loanTime.length = 0;
                            loanTime.push(time);
                            console.log("点击时time:",loanTime);
                        })
                        _this.respondState(now, 0, true,function(){
                            console.log("返回第一页");
                            $(".page1 li").removeClass("bounce-out");
                            loanTotal.length = 0;
                            total = null;
                            console.log("返回时loanTotal:",loanTotal);
                        });
                    }

                    if (now == "page3") {
                        _this.BuryRequest(now);
                        $(".page3 li").unbind().on("click", function() {
                            var ele = $(this);
                            ele.attr("disabled","disabled");
                            var timer = null;
                            clearTimeout(timer);
                            timer = setTimeout(function() {
                                // ele.addClass("rotating");
                                ele.addClass("bounce-out");
                                clearTimeout(timer);
                                timer = setTimeout(function() {
                                    _this.fullPageObj.moveTo(3, true);
                                }, 800)
                            }, 200)
                            release = ele.data("loan-release");
                            loanRelease.length = 0;
                            loanRelease.push(release);
                        })
                        _this.respondState(now, 1, true, function() {
                            console.log("返回第二页");
                            $(".page2 li").removeClass("bounce-out").removeAttr("disabled");
                            loanTime.length = 0;
                            time = null;
                        });
                    }

                    if (now == "page4") {
                        _this.BuryRequest(now);
                        $(".page4 .circle div").unbind().on("click", function() {
                            var ele = $(this);
                            ele.attr("disabled","disabled");
                            focus = ele.data("loan-focus");
                            loanFocus.length = 0;
                            loanFocus.push(focus);
                            loan.length = 0;
                            loan.push(loanTotal,loanTime,loanRelease,loanFocus);

                            var timer = null;
                            clearTimeout(timer);
                            timer = setTimeout(function() {
                                ele.addClass("circle-rotating");
                                clearTimeout(timer);
                                timer = setTimeout(function() {
                                    _this.getAnalysisData(now);
                                }, 800)
                            }, 200)
                        })
                        _this.respondState(now, 2, true,function(){
                            console.log("返回第三页");
                            $(".page3 li").removeClass("bounce-out").removeAttr("disabled");
                            $(".page4 .analyzing-process div").removeClass("analyzing").addClass("hide");
                            loanRelease.length = 0;
                            release = null;
                        });
                    }

                    if (now == "page5") {
                        _this.BuryRequest(now);
                        var dataObj = data;
                        $(".page5 .loan-match span").addClass("progress");
                        $(".page5 .final-loan").unbind().on("click",".final-loan,.finger-box",function(){
                            $(".page5 .final-loan").attr("bp",dataObj.name);
                            $(".page5 .final-loan").attr("title",dataObj.name);
                            $(this).attr("disabled","disabled");
                            $(".page5 .finger").addClass("hide").removeClass("move");
                            $(".page5 .fingerprint").removeClass("hide");
                            $(".page5 .finger-scan").removeClass("hide").addClass("finger-scaning");
                            setTimeout(function(){
                                console.log("dataObj",dataObj);
                                window.location.href = dataObj.url;
                                $(".page5 .fingerprint").addClass("hide");
                                $(".page5 .finger-scan").addClass("hide").removeClass("finger-scaning");
                            },1000);
                        });
                        $(".page5 .content").unbind().on("click",".test-btn",function(){
                            $(".page5 .content .test-btn").attr("disabled","disabled");
                            timer = setTimeout(function() {
                                _this.fullPageObj.moveTo(0, true);
                                $(".page5 .content .test-btn").removeAttr("disabled");
                                //清空所有数据
                                loanTotal.length = 0;
                                total = null;
                                loanTime.length = 0;
                                time = null;
                                loanRelease.length = 0;
                                release = null;
                                loanFocus.length = 0;
                                focus = null;
                                loan.length = 0;
                                //清空样式
                                $(".page1 li").removeClass("bounce-out");
                                $(".page2 li").removeClass("bounce-out");
                                $(".page3 li").removeClass("bounce-out");
                                $(".page4 .circle div").removeClass("circle-rotating");
                                $(".page4 .customization-tp").hide();
                                $(".page5 .loan-match span").removeClass("progress");
                                $(".page5 .icon-box").html("");
                                $(".page5 .loan-name").html("");
                                $(".page5 .loan-match").html("");
                                $(".page5 .loan-amount").html("");
                                $(".page5 .day-rate").html("");
                                $(".page5 .release-time").html("");
                                $(".page5 .finger").removeClass("hide").addClass("move");
                                $(".page5 .fingerprint").addClass("hide");
                                $(".page5 .finger-scan").addClass("hide").removeClass("finger-scaning");
                            }, 500);

                        });
                        _this.respondState(now, 3, true,function(){
                            console.log("返回第四页");
                            $(".page4 .circle div").removeClass("circle-rotating").removeAttr("disabled");
                            $(".page5 .loan-match span").removeClass("progress");
                            $(".page5 .finger").removeClass("hide").addClass("move");
                            $(".page5 .fingerprint").addClass("hide");
                            $(".page5 .finger-scan").addClass("hide").removeClass("finger-scaning");
                            loanFocus.length = 0;
                            focus = null;
                            loan.length = 0;
                            $(".page4 .customization-tp").hide();
                            $(".page4 .analyzing-process div").removeClass("analyzing").addClass("hide");
                        });
                    }
                }
            });
            return fullpage;
        },
        // isRetest: function() {
        //     var _this = this;
        //     $.ajax({
        //         type: "POST",
        //         dataType: "JSON",
        //         url: "test.php",
        //         // url: "/act/act170801/get_status",
        //         success: function(d) {
        //             console.log("初始化时发送的请求：",d);
        //             var display = d.display;
        //             console.log(display);
        //             if (display == false) {
        //                 return;
        //             } else {
        //                 $(".page5 .test-btn").show();
        //                 _this.fullPageObj.moveTo(4, true);
        //             }
        //         }
        //     });
        // },
        showAnalyzeProcess: function(counter) {
            var _this = this;
            $(".page4 .analyzing-process div.span" + counter).removeClass("hide").addClass("analyzing");
            console.log("counter:",counter);
            if(counter < 5) {
                var timer = null;
                clearTimeout(timer);
                timer = setTimeout(function() {
                    _this.showAnalyzeProcess(counter + 1);
                }, 500);
            }
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
                          // $(".page4 .customization-tp").fadeIn();
                          // _this.showAnalyzeProcess(0);
                          //动态展示icon
                          _this.showIcon();
                          //定制贷款信息
                          _this.getLoanInfo();
                          setTimeout(function(){
                            _this.fullPageObj.moveTo(4, true);
                            $(".page4 .customization-tp").fadeOut();
                            $(".page4 .analyzing-process div").removeClass("analyzing").addClass("hide");
                          },500);
                       }
                       if (data.sex == 2) {
                        //弹屏女
                            // $(".page4 .customization-tp .male").hide();
                            // $(".page4 .customization-tp").fadeIn();
                            // $(".page4 .customization-tp .female").show();
                            // _this.showAnalyzeProcess(0);
                            //动态展示icon
                            _this.showIcon();
                            //定制贷款信息
                            _this.getLoanInfo();
                            setTimeout(function(){
                               _this.fullPageObj.moveTo(4, true);
                               $(".page4 .customization-tp").fadeOut();
                               $(".page4 .analyzing-process div").removeClass("analyzing").addClass("hide");
                            },5000);
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

        showIcon: function() {
            var len = data.show.length;
            console.log("len->",len);
            $(".page5 .icon-box").html("");
            for(var i = 0; i < len; i++) {
              var oLi = document.createElement("li");
              var oImg = document.createElement("img");
              var oSpan = document.createElement("span");
              oLi.append(oImg);
              oLi.append(oSpan);
              $(".icon-box").append(oLi);
              oSpan.innerHTML = data.show[i];
              if (oSpan.innerHTML == "小额度") {
                  oImg.src = "http://r.51gjj.com/act/release/img/20170801_xed.png";
              }
              if (oSpan.innerHTML == "放款快") {
                  oImg.src = "http://r.51gjj.com/act/release/img/20170801_fkk.png";
              }
              if (oSpan.innerHTML == "分期长") {
                  oImg.src = "http://r.51gjj.com/act/release/img/20170801_fqc.png";
              }
              if (oSpan.innerHTML == "急用钱") {
                  oImg.src = "http://r.51gjj.com/act/release/img/20170801_jyq.png";
              }
              if (oSpan.innerHTML == "精明派") {
                  oImg.src = "http://r.51gjj.com/act/release/img/20170801_jmp.png";
              }
              if (oSpan.innerHTML == "大额度") {
                  oImg.src = "http://r.51gjj.com/act/release/img/20170801_ded.png";
              }
            }
        },
        getLoanInfo: function() {
            // loan-name
            var loanNameTpl = $("#tpl-loan-name").html();
            var loanNameHtml = juicer(loanNameTpl,data);
            $(".page5 .loan-name").html("");
            $(".page5 .loan-name").append(loanNameHtml);
            // loan-match
            var loanMatchTpl = $("#tpl-loan-match").html();
            var loanMatchHtml = juicer(loanMatchTpl,data);
            $(".page5 .loan-match").html("");
            $(".page5 .loan-match").append(loanMatchHtml);
            // loan-amount
            var loanAmountTpl = $("#tpl-loan-amount").html();
            var loanAmountHtml = juicer(loanAmountTpl,data);
            $(".page5 .loan-amount").html("");
            $(".page5 .loan-amount").append(loanAmountHtml);
            // day-rate
            var dayRateTpl = $("#tpl-day-rate").html();
            var dayRateHtml = juicer(dayRateTpl,data);
            $(".page5 .day-rate").html("");
            $(".page5 .day-rate").append(dayRateHtml);
            // release-time
            var releaseTimeTpl = $("#tpl-release-time").html();
            var releaseTimeHtml = juicer(releaseTimeTpl,data);
            $(".page5 .release-time").html("");
            $(".page5 .release-time").append(releaseTimeHtml);
        }
    }

    run.start();
})
