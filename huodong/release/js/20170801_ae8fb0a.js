require.config(requireConfig);
require(["jquery", "fastClick", "FullPage", "ct", "bridge", "juicer"], function($, fastClick, fullpage, ct, Bridge, juicer) {
    var oMask = $(".mask");

    var oP = Object.create(ct.Prompt);
    oP.create().build();

    var oM = Object.create(ct.Mask);
    oM.create().build();

    var local = ct.Tool.local();

    ct.Tool.buryPoint();
    // var counter = 0;
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

            $.ajax({
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
            });
        },

        init: function() {
            console.log("私人订制活动");
            var _this = this;
            $(".wp").removeClass("hide");
            _this.fullPageObj = _this.fullpage();
        },

        fullpage: function() {
            var _this = this;
            var loan = [];
            var total = null;
            var loanTotal = [];
            var time = null;
            var loanTime = [];
            var release = null;
            var loanRelease = [];
            var focus = null;
            var loanFocus = [];
            var fullpage = document.getElementsByClassName("wp-inner")[0].fullpage({
                start: 0,  //默认第一页开始
                beforeChange: function(e) {
                    console.log("e",e);
                    console.log("e.next",e.next);
                    var now = "page" + (e.next + 1); //页面在改变之前获取当前页面
                    console.log("now",now);
                    _this.changeState(now); //把当前页面在改变之前塞入浏览器历史
                },
                afterChange: function(e) {
                    _this.fullPageObj.stop();
                    var now = "page" + (e.cur + 1);
                    if (now == "page1") {
                        //加载到当前页的时候去掉之前加上的动画
                        $(".page1 li").removeClass("rotating");
                        $(".page1 li").unbind().on("click", function() {
                            var ele = $(this);
                            var timer = null;
                            clearTimeout(timer);
                            timer = setTimeout(function() {
                                ele.addClass("rotating"); //当前li元素添加动画
                                clearTimeout(timer);
                                timer = setTimeout(function() {
                                    _this.fullPageObj.moveTo(1, true);
                                }, 1200);
                            }, 200);
                            total = ele.data("loan-total");
                            console.log("push语句之前",loanTotal);
                            loanTotal.push(total);
                            console.log("点击时loanTotal:",loanTotal);
                        });
                        _this.respondState(now);
                    }

                    if (now == "page2") {
                        $(".page2 li").unbind().on("click", function() {
                            var ele = $(this);
                                var timer = null;
                                clearTimeout(timer);
                                timer = setTimeout(function() {
                                    ele.addClass("rotating"); //当前li元素添加动画
                                    clearTimeout(timer);
                                    timer = setTimeout(function() {
                                        _this.fullPageObj.moveTo(2, true);
                                        // oMask.hide();
                                    }, 1200)
                                }, 200);
                            //把li元素的data属性push到对应数组
                            time = ele.data("loan-time");
                            loanTime.push(time);
                            console.log("点击时time:",loanTime);
                        })
                        _this.respondState(now, 0, true,function(){
                            console.log("返回第一页");
                            $(".page1 li").removeClass("rotating");
                            loanTotal = [];
                            total = null;
                            console.log("返回时loanTotal:",loanTotal);
                        });  //app点击返回箭头执行的函数
                    }

                    if (now == "page3") {
                        $(".page3 li").unbind().on("click", function() {
                            var ele = $(this);
                            var timer = null;
                            clearTimeout(timer);
                            timer = setTimeout(function() {
                                ele.addClass("rotating");
                                clearTimeout(timer);
                                timer = setTimeout(function() {
                                    _this.fullPageObj.moveTo(3, true);
                                }, 1200)
                            }, 200)
                            release = ele.data("loan-release");
                            loanRelease.push(release);
                            console.log("点击时loanRelease:",loanRelease);
                        })
                        _this.respondState(now, 1, true, function() {
                            console.log("返回第二页");
                            $(".page2 li").removeClass("rotating");
                            loanTime.length = 0;
                            time = null;
                            console.log("返回时loanTime:",loanTime);
                        });
                    }

                    if (now == "page4") {
                        console.log(_this);
                        $(".page4 .circle div").unbind().on("click", function() {
                            var ele = $(this);
                            focus = ele.data("loan-focus");
                            loanFocus.push(focus);
                            loan.push(loanTotal,loanTime,loanRelease,loanFocus);
                            console.log("点击时loanFocus:",loanFocus);
                            console.log("loan:",loan);

                            var timer = null;
                            clearTimeout(timer);
                            timer = setTimeout(function() {
                                ele.addClass("circle-rotating");
                                clearTimeout(timer);
                                timer = setTimeout(function() {
                                    _this.getAnalysisData(loan);
                                }, 1200)
                            }, 200)
                        })
                        _this.respondState(now, 2, true,function(){
                            console.log("返回第三页");
                            $(".page3 li").removeClass("rotating");
                            loanRelease.length = 0;
                            release = null;
                            console.log("返回时loanRelease:",loanRelease);
                        });
                    }

                    if (now == "page5") {
                        //展示分析的頁面
                        console.log("page5",data);
                        //动态展示icon
                        var len = data.show.length;
                        console.log("len->",len);
                        for(var i = 0; i < len; i++) {
                            var oLi = document.createElement("li");
                            var oImg = document.createElement("img");
                            var oSpan = document.createElement("span");
                            oLi.append(oImg);
                            oLi.append(oSpan);
                            $(".icon-box").append(oLi);
                            oSpan.innerHTML = data.show[i];
                            if (oSpan.innerHTML == "小额度") {
                                oImg.dataset.src = "<?php echo $imgUrl; ?>page5_xed_icon.png";
                                oImg.src = "http://r.51gjj.com/act/release/img/20170801_page5_xed_icon.png";
                            }
                            if (oSpan.innerHTML == "放款快") {
                                oImg.dataset.src = "<?php echo $imgUrl; ?>page5_fkk_icon.png";
                                oImg.src = "http://r.51gjj.com/act/release/img/20170801_page5_fkk_icon.png";
                            }
                            if (oSpan.innerHTML == "分期长") {
                                oImg.dataset.src = "<?php echo $imgUrl; ?>page5_fqc_icon.png";
                                oImg.src = "http://r.51gjj.com/act/release/img/20170801_page5_fqc_icon.png";
                            }
                            if (oSpan.innerHTML == "急用钱") {
                                oImg.dataset.src = "<?php echo $imgUrl; ?>page5_jyq_icon.png";
                                oImg.src = "http://r.51gjj.com/act/release/img/20170801_page5_jyq_icon.png";
                            }
                            if (oSpan.innerHTML == "精明派") {
                                oImg.dataset.src = "<?php echo $imgUrl; ?>page5_jmp_icon.png";
                                oImg.src = "http://r.51gjj.com/act/release/img/20170801_page5_jmp_icon.png";
                            }
                            if (oSpan.innerHTML == "大额度") {
                                oImg.dataset.src = "<?php echo $imgUrl; ?>page5_ded_icon.png";
                                oImg.src = "http://r.51gjj.com/act/release/img/20170801_page5_ded_icon.png";
                            }
                        }


                        //定制贷款信息
                        // loan-name
                        var loanNameTpl = $("#tpl-loan-name").html();
                        var loanNameHtml = juicer(loanNameTpl,data);
                        $(".page5 .loan-name").append(loanNameHtml);
                        // loan-match
                        var loanMatchTpl = $("#tpl-loan-match").html();
                        var loanMatchHtml = juicer(loanMatchTpl,data);
                        $(".page5 .loan-match").append(loanMatchHtml);
                        $(".page5 .loan-match span").addClass("progress");
                        // loan-amount
                        var loanAmountTpl = $("#tpl-loan-amount").html();
                        var loanAmountHtml = juicer(loanAmountTpl,data);
                        $(".page5 .loan-amount").append(loanAmountHtml);
                        // day-rate
                        var dayRateTpl = $("#tpl-day-rate").html();
                        var dayRateHtml = juicer(dayRateTpl,data);
                        $(".page5 .day-rate").append(dayRateHtml);
                        // release-time
                        var releaseTimeTpl = $("#tpl-release-time").html();
                        var releaseTimeHtml = juicer(releaseTimeTpl,data);
                        $(".page5 .release-time").append(releaseTimeHtml);


                        _this.respondState(now, 3, true,function(){
                            console.log("返回第四页");
                            $(".page4 .circle div").removeClass("circle-rotating");
                            $(".page5 .loan-match span").removeClass("progress");
                            loanFocus.length = 0;
                            focus = null;
                            loan.length = 0;
                            console.log("返回时loanFocus:",loanFocus);
                            $(".page4 .customization-tp").hide();
                        });
                    }
                }
            });
            return fullpage;
        },
        showAnalyzeProcess: function(counter) {
            var _this = this;
            $(".page4 .analyzing-process div.span" + counter).removeClass("hide").addClass("analyzing");
            console.log("counter:",counter);
            if(counter < 5) {
                setTimeout(function() {
                    _this.showAnalyzeProcess(counter + 1);
                }, 500);
            }
        },

        // 走后台跳转申请
        getAnalysisData: function(loan) {
            var _this = this;
            console.log("请求：",loan);
            $.ajax({
                type: "POST",
                dataType: "JSON",
                data: JSON.stringify({loan}),
                url: "test.php",
                // url: "/act/act170725/get_button",
                success: function(d){
                    if (d.success) {
                        data = d.ret.data;
                        console.log("data->",data);
                       if (data.sex == 1) {
                         // oM.show();
                         //弹屏男
                          $(".page4 .customization-tp").fadeIn();
                          _this.showAnalyzeProcess(0);
                          setTimeout(function(){
                             _this.fullPageObj.moveTo(4, true);
                              $(".page4 .analyzing-process div").removeClass("analyzing").addClass("hide");
                          },5000);
                       }
                       if (data.sex == 2) {
                        //弹屏女
                            $(".page4 .customization-tp .male").hide();
                            $(".page4 .customization-tp").fadeIn();
                            $(".page4 .customization-tp .female").show();
                            _this.showAnalyzeProcess(0);
                            setTimeout(function(){
                               _this.fullPageObj.moveTo(4, true);
                               $(".page4 .analyzing-process div").removeClass("analyzing").addClass("hide");
                            },5000);
                       }

                       //显示测试结果
                       
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

        getIconName: function(arr) {
            var len = arr.length;
            for(var i = 0; i < len; i++) {
                if (arr[i] == "小额度") {
                    return "xed";
                }
            }
        },
    }

    var iconJson = {
        "xed": {
            title: "小额度",
            img: "xed",
        },
        "fkk": {
            title: "放款快",
            img: "fkk",
        },
        "fqc": {
            title: "分期长",
            img: "fqc",
        },
        "yjq": {
            title: "急用钱",
            img: "jyq",
        },
        "jmp": {
            title: "精明派",
            img: "jmp",
        },
        "ded": {
            title: "大额度",
            img: "ded",
        }
    }

    run.start();
})
