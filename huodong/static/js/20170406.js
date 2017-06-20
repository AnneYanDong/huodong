require.config(requireConfig);
require(["jquery", "fastClick", "lucky-card", "ct", "bridge", "juicer", "marquee"], function($, fastClick, LuckyCard, ct, Bridge, juicer, liMarquee) {
    var oMask = $(".mask");

    var oP = Object.create(ct.Prompt);
    oP.create().build();

    var oM = Object.create(ct.Mask);
    oM.create().build();

    var local = ct.Tool.local();

    ct.Tool.buryPoint();

    var myDay = new Date().getDay();

    var imgSrc = "//r.51gjj.com/act/release/img/20170406_";
    var oUrl;
    var oGiftCode;

    var run = {
        status: {
            login: false,
            msg: ""
        },
        charge: {
            loan: null,
            type: null,
            pay: null
        },

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

            console.log("..222..")

            var oLottery = $("#lottery");
            oLottery[0].style.width = $(".content").width() + "px";
            var singleInfo = $(".single-info");
            var awardsInfo = $(".awards-info");
            $.ajax({
                type: "POST",
                dataType: "JSON",
                url: ct.Tool.url("/app/request/activity"),
                data: JSON.stringify({ place_cid: ct.Tool.userAgent().isGjj ? 1 : 0, tag: "进入页面" + projectName }),
                success: function(d) {
                    if (d.success == true) {

                    }
                }
            })
            $.ajax({
                type: "POST",
                dataType: "JSON",
                url: ct.Tool.url("/act/act170406/get_status"),
                // url: "test.php",
                data: JSON.stringify({ action: "status" }),
                success: function(d) {
                    oUrl = d.ret.url;
                    if (d.success == true) {
                        if (d.ret.info) {
                            var info = d.ret.info;
                            for (var i = 0; i < info.length; i++) {
                                var oSpan = $("<span>");
                                oSpan.text("恭喜：" + info[i].name + "抢到" + info[i].money + "元券");
                                oSpan.appendTo(singleInfo);
                            }
                            singleInfo.liMarquee({
                                hoverstop: false,
                                drag: false,
                                scrollamount: 30
                            });
                            $(".single-info").height($(".awards-info").height())
                        }
                    } else {
                        _this.status.msg = d.msg || "出错请重试";
                        oP.show(d.msg || "出错请重试");
                    }
                }
            })
        },

        init: function() {
            var _this = this;
            $(".wp").removeClass("hide");
            _this.apply();
            _this.openRule();
            _this.closeRule();
            _this.scratch();
            _this.render();
            _this.open1();
            _this.close_apply();
            _this.close_tip();
            _this.lookTicket();
            _this.timeDown();
            // _this.share();
            // _this.skipPage();
            _this.skipLoan();
        },

        render: function() {
            var _this = this;
            var singleInfo = $(".single-info");
            var awardsInfo = $(".awards-info");

            $.ajax({
                // url: "https://b.jianbing.com/act/act/act170406/get_status",
                url: ct.Tool.url("/act/act170406/get_status"),
                // url: "test.php",
                type: "POST",
                dataType: "json",
                data: JSON.stringify({ action: "render" }),
                success: function(d) {
                    console.log(1111);
                    if (d.success == true) {
                        // 跑马灯信息
                        // if (d.ret.info) {
                        //     var info = d.ret.info;
                        //     for (var i = 0; i < info.length; i++) {
                        //         var oSpan = $("<span>");
                        //         oSpan.text("恭喜：" + info[i].name + "抢到" + info[i].money + "元券");
                        //         oSpan.appendTo(singleInfo);
                        //     }
                        //     singleInfo.liMarquee({
                        //         hoverstop: false,
                        //         drag: false,
                        //         scrollamount: 30
                        //     });
                        //     $(".single-info").height($(".awards-info").height())
                        // }
                        //优惠券状态
                        var d = d.ret;
                        if (d.UserTicket) {
                            if (d.UserTicket == 1) {
                                $("#imgId_200").attr('src', imgSrc + 'done.png');
                                //显示中奖弹框
                                oM.show();
                                $(".ticket_50").html("<img src='" + imgSrc + "ticket_200.png'><div class='ticket_close'></div><div id='skip'></div>");
                                $(".ticket_50").fadeIn();
                                if(d.$ticketStatus_100) {
                                    $("#imgId_100").attr('src', imgSrc + 'doGrey.png');
                                } else {
                                    $("#imgId_100").attr('src', imgSrc + 'none.png');
                                }
                                if(d.$ticketStatus_50) {
                                    $("#imgId_50").attr('src', imgSrc + 'doGrey.png');
                                } else {
                                    $("#imgId_50").attr('src', imgSrc + 'none.png');
                                }
                            } else if (d.UserTicket == 2) {
                                //显示中奖弹框
                                oM.show();
                                $(".ticket_50").html("<img src='" + imgSrc + "ticket_100.png'><div class='ticket_close'></div><div id='skip'></div>");
                                $(".ticket_50").fadeIn();
                                $("#imgId_100").attr('src', imgSrc + 'done.png');
                                if(d.$ticketStatus_200) {
                                    $("#imgId_200").attr('src', imgSrc + 'doGrey.png');
                                } else {
                                    $("#imgId_200").attr('src', imgSrc + 'none.png');
                                }
                                if(d.$ticketStatus_50) {
                                    $("#imgId_50").attr('src', imgSrc + 'doGrey.png');
                                } else {
                                    $("#imgId_50").attr('src', imgSrc + 'none.png');
                                }
                            } else if (d.UserTicket == 3) {
                                //显示中奖弹框
                                oM.show();
                                $(".ticket_50").html("<img src='" + imgSrc + "ticket_50.png'><div class='ticket_close'></div><div id='skip'></div>");
                                $(".ticket_50").fadeIn();
                                $("#imgId_50").attr('src', imgSrc + 'done.png');
                                if(d.$ticketStatus_200) {
                                    $("#imgId_200").attr('src', imgSrc + 'doGrey.png');
                                } else {
                                    $("#imgId_200").attr('src', imgSrc + 'none.png');
                                }
                                if(d.$ticketStatus_100) {
                                    $("#imgId_100").attr('src', imgSrc + 'doGrey.png');
                                } else {
                                    $("#imgId_100").attr('src', imgSrc + 'none.png');
                                }
                                
                            } else {
                                if (d.$ticketStatus_50) {
                                    $("#imgId_50").attr('src', imgSrc + 'do.png');
                                } else {
                                    $("#imgId_50").attr('src', imgSrc + 'none.png');
                                }
                                if (d.$ticketStatus_100) {
                                    $("#imgId_100").attr('src', imgSrc + 'do.png');
                                } else {
                                    $("#imgId_100").attr('src', imgSrc + 'none.png');
                                }
                                if (d.$ticketStatus_200) {
                                    $("#imgId_200").attr('src', imgSrc + 'do.png');
                                } else {
                                    $("#imgId_200").attr('src', imgSrc + 'none.png');
                                }
                            }
                        }
                        // if (d.ticketStatus_200) {
                        //     if (d.ticketStatus_200 === 2) {
                        //         console.debug(d.ticketStatus_200)
                        //         $("#imgId_200").attr('src', imgSrc + 'done.png');
                        //     } else if (d.ticketStatus_200 === 3) {
                        //         $("#imgId_200").attr('src', imgSrc + 'none.png');
                        //     } else {
                        //         $("#imgId_200").attr('src', imgSrc + 'do.png');
                        //     }
                        //     console.log(1)
                        // }
                        // if (d.ticketStatus_100) {
                        //     if (d.ticketStatus_100 === 2) {
                        //         $("#imgId_100").attr('src', imgSrc + 'done.png');
                        //     } else if (d.ticketStatus_100 === 3) {
                        //         $("#imgId_100").attr('src', imgSrc + 'none.png');
                        //     } else {
                        //         $("#imgId_100").attr('src', imgSrc + 'do.png');
                        //     }

                        //     console.log(2)
                        // }
                        // if (d.ticketStatus_50) {
                        //     if (d.ticketStatus_50 === 2) {
                        //         console.debug(d.ticketStatus_50)
                        //         $("#imgId_50").attr('src', imgSrc + 'done.png');
                        //     } else if (d.ticketStatus_50 === 3) {
                        //         $("#imgId_50").attr('src', imgSrc + 'none.png');
                        //     } else {
                        //         $("#imgId_50").attr('src', imgSrc + 'do.png');
                        //     }

                        //     console.log(3)
                        // }
                        console.log("44")
                    } else {
                        console.log(d.msg || "获取不到中奖信息")
                    }
                },
                error: function(jqXHR) {
                    console.log(jqXHR);
                }
            })
        },

        // 走后台跳转申请
        apply: function() {
            $(".apply1").on("click", function() {
                var data = { "type": "1" };
                console.log("data", JSON.stringify(data))
                data = JSON.stringify(data);
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    // url: "https://b.jianbing.com/act/act/act170406/get_url",
                    url: ct.Tool.url("/act/act170406/get_url"),
                    data: JSON.stringify({ "type": 1 }),
                    success: function(d) {
                        if (d.success == true) {
                            window.location.href = d.ret.url;
                        } else {
                            oP.show(d.msg || "出错请重试");
                        }
                    }
                })
            })
            $(".apply2").on("click", function() {
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    // url: "https://b.jianbing.com/act/act/act170406/get_url",
                    url: ct.Tool.url("/act/act170406/get_url"),
                    data: JSON.stringify({ "type": 2 }),
                    success: function(d) {
                        if (d.success == true) {
                            window.location.href = d.ret.url;
                        } else {
                            oP.show(d.msg || "出错请重试");
                        }
                    }
                })
            })
            $(".apply3").on("click", function() {
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    // url: "https://b.jianbing.com/act/act/act170406/get_url",
                    url: ct.Tool.url("/act/act170406/get_url"),
                    data: JSON.stringify({ "type": 3 }),
                    success: function(d) {
                        if (d.success == true) {
                            window.location.href = d.ret.url;
                        } else {
                            oP.show(d.msg || "出错请重试");
                        }
                    }
                })
            })
        },

        changeState: function(page) {
            window.history.pushState && window.history.pushState({
                title: page
            }, page, "index.php#page=" + page); // 塞入新的历史
        },

        // 打开规则
        openRule: function() {
            $(".wrap").on("click", ".ruleTop", function() {
                oM.show();
                $(".rule").fadeIn();
            })
        },

        // 关闭规则
        closeRule: function() {
            $("body").on("click", ".btn-close", function() {
                $(".rule").fadeOut(function() {
                    oM.hide();
                })
            })
        },

        //我的优惠券
        lookTicket: function() {
            $(".myTicket").on("click", function() {
                var type = $(this).data("link");
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    // url: "https://b.jianbing.com/act/act/act170406/get_url",
                    url: ct.Tool.url("/act/act170406/get_url"),
                    data: JSON.stringify({ "type": 4 }),
                    success: function(d) {
                        if (d.success == true) {
                            window.location.href = d.ret.url;
                        } else {
                            oP.show(d.msg || "出错请重试");
                        }
                    }
                })
            })
        },

        open1: function() {
            var _this = this;
            $(".ticket").on("click", function() {
                var index = $(this).index();
                var indexNum = index - 3;
                // var d = { "type": indexNum };
                // console.debug("抢券前", d);

                // if ("application/x-www-form-urlencoded" == contentType) {
                //     var content = typeof data === 'string'?data:serializeParams(data);
                //     request.send(content);
                // }else if ("application/json" == contentType) {
                //     var content = typeof data === 'string'?data:JSON.stringify(data);
                //     request.send(content);
                // }
                $.ajax({
                        type: "POST",
                        dataType: "json",
                        // url: "https://b.jianbing.com/act/act/act170406/get_rob",
                        url: ct.Tool.url("/act/act170406/get_rob"),
                        // url: "test1.php",
                        data: JSON.stringify({ "type": indexNum }),
                        success: function(d) {
                            if (d.success == true) {
                                var d = d.ret;console.debug("条件",d.allowRob,d.UserTicket)
                                if (d.allowRob == true && d.UserTicket === 4) {
                                    if (index === 4) {
                                        oM.show();
                                        $(".ticket_50").html("<img src='" + imgSrc + "ticket_200.png'><div class='ticket_close'></div><div id='skip'></div>");
                                        $(".ticket_50").fadeIn();
                                    } else if (index === 5) {
                                        oM.show();
                                        $(".ticket_50").html("<img src='" + imgSrc + "ticket_100.png'><div class='ticket_close'></div><div id='skip'></div>");
                                        $(".ticket_50").fadeIn();
                                    } else if (index === 6) {
                                        oM.show();
                                        $(".ticket_50").html("<img src='" + imgSrc + "ticket_50.png'><div class='ticket_close'></div><div id='skip'></div>");
                                        $(".ticket_50").fadeIn();
                                    }
                                    _this.render();
                                    console.debug("index值:" + index);
                                } else {
                                    oP.show(d.msg || "出错请重试");
                                }
                            } else {
                                oP.show(d.msg || "出错请重试");
                            }
                        }
                    })
                    // if (index === 4) {
                    //     oM.show();
                    //     $(".ticket_50").html("<img src='" + imgSrc + "ticket_200.png'><a href='#div1'></a><div class='ticket_close'></div>");
                    //     $(".ticket_50").fadeIn();
                    // } else if (index === 5) {
                    //     oM.show();
                    //     $(".ticket_50").html("<img src='" + imgSrc + "ticket_100.png'><a href='#div1'></a><div class='ticket_close'></div>");
                    //     $(".ticket_50").fadeIn();
                    // } else if (index === 6) {
                    //     oM.show();
                    //     $(".ticket_50").html("<img src='" + imgSrc + "ticket_50.png'><a href='#div1'></a><div class='ticket_close'></div>");
                    //     $(".ticket_50").fadeIn();
                    // }
                    // console.debug("index值:" + index);
            })
        },
        close_apply: function() {
            $(".ticket_50").on("click", "a", function() {
                $(".ticket_50").fadeOut(function() {
                    oM.hide();
                })
            })
        },
        close_tip: function() {
            $(".ticket_50").on("click", ".ticket_close", function() {
                $(".ticket_50").fadeOut(function() {
                    oM.hide();
                })
            })
        },
        close1: function() {
            $(".ticket_50").on("click", "a", function() {
                $(".ticket_50").fadeOut(function() {
                    oM.hide();
                })
            })
        },
        //刮刮卡
        scratch: function() {
            var _this = this;
            var oStart = $("#start");
            oStart.on("click", function() {
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    // url: "https://b.jianbing.com/act/act/act170406/get_shave",
                    url: ct.Tool.url("/act/act170406/get_shave"),
                    // url: "test2.php",
                    data: JSON.stringify({ action: "scratch" }),
                    success: function(d) {
                        if (d.success) {
                            oGiftCode = d.ret.giftCode;
                            if (d.ret.allowShave) {
                                oStart.remove();
                                if (d.ret.giftCode != 9) {
                                    console.debug("中奖信息：", d.ret.giftCode)
                                    var ohtml1 = "<div class='scratchM'><img src='" + imgSrc + "scratch_" + d.ret.giftCode + ".png'></div>";
                                    $("#card").html(ohtml1);
                                    LuckyCard.case({
                                        ratio: .5,
                                        strokes: 30,
                                        coverImg: '../static/img/20170406_before.png',
                                        callback: function() {
                                            this.clearCover();
                                            $("#cover").remove();
                                        }
                                    });
                                } else if (d.ret.giftCode === 9) {
                                    var ohtml1 = "<div class='scratchM'><img src='" + imgSrc + "again.png'></div>";
                                    $("#card").html(ohtml1);
                                    LuckyCard.case({
                                        ratio: .5,
                                        strokes: 30,
                                        coverImg: '../static/img/20170406_before.png',
                                        callback: function() {
                                            this.clearCover();
                                            $("#cover").remove();
                                            var timer = null;
                                            clearTimeout(timer);
                                            timer = setTimeout(function() {
                                                $("#scratch").children().remove();
                                                $("#scratch").append("<div id='card' bp='guajiang2' title='guajiang2'></div><div id='start' bp='guajiang1' title='guajiang1'></div>")
                                                _this.scratch();
                                            },2000)
                                        }
                                    });
                                }
                            } else {
                                oP.show(d.msg || "出错请重试");
                            }
                        } else {
                            var ohtml1 = "<div class='scratchM'><img src='../static/img/20170406_before.png'></div>";
                            $("#card").html(ohtml1);
                            oP.show(d.msg || "出错请重试");
                            console.log("33333");
                        }
                    }
                })
            })
        },

        // 跳转
        skipPage: function() {
            var oTop = $("#div1").offset().top;
            console.log(oTop);

            $(document).on("click", ".ticket_50", function() {

                $("body").scrollTop(300);
                $(".ticket_50").fadeOut(function() {
                    oM.hide();
                })
            })
            $(document).on("click", ".scratchM", function() {
                $("body").scrollTop(oTop);
            })
        },

        //随机跳转金鑫贷或金盈贷
        skipLoan: function() {
            $(".ticket_50").on("click","#skip",function(){console.debug("点击随机跳转")
                window.location.href = oUrl;
            });
            $(document).on("click", ".scratchM", function() {
                if (oGiftCode != 9) {
                     window.location.href = oUrl;
                } 
            })
        },

        //分享按钮：
        share: function() {
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
                    onclick: function() {
                        Bridge.action('ShareTimeline', {
                            "title": "抵息券X元 ",
                            'desc': "领券后完成活动页面任一业务申请并放款，还款时可直接抵扣，不可提前还款。【金薪贷】首月还款减免。【金花贷】首月还款减免，100元券借款5000元及以上可用，200元券借款10000元及以上可用。【金盈贷】分月减免，50元券分3个月减免，100元券、200元券分4个月减免。",
                            "thumb": "https://r.51gjj.com/act/release/img/20170406_share.png",
                            "link": "https://" + host + "/hd/20170406/"
                        });
                    }
                })
            }
            return this;
        },
        timeDown: function() {
            function countdown(now) {
                var time = new Array();
                time[0] = now.getHours(); // 时
                time[1] = now.getMinutes(); // 分
                time[2] = now.getSeconds(); // 秒
                // time[0] = 0;
                // time[1] = 0;
                // time[2] = 0;
                var totleSecord = time[0] * 60 * 60 + time[1] * 60 + time[2];
                var nowSecord = 86400 - totleSecord;
                var time_new = new Array();
                time_new[0] = parseInt(nowSecord / 3600);
                console.log("小时", time_new[0])
                time_new[1] = parseInt((nowSecord - time_new[0] * 60 * 60) / 60);
                console.log("分钟", time_new[1])
                time_new[2] = nowSecord - time_new[0] * 60 * 60 - time_new[1] * 60;
                console.log("秒", time_new[2])
                    // 启动倒计时
                setInterval(function() {
                    if (time_new[2] > 0) {
                        time_new[2]--;
                    } else {
                        time_new[2] = 59;
                        if (time_new[1] > 0) {
                            time_new[1]--;
                        } else {
                            time_new[1] = 59;
                            if (time_new[0] > 0) {
                                time_new[0]--;
                            } else {
                                time_new[0] = 23;
                            }
                        }
                    }
                    var timeStr = new Array();
                    for (var i = 0; i < 3; ++i) {
                        timeStr[i] = String(time_new[i]);
                        if (time_new[i] < 10) {
                            timeStr[i] = "0" + timeStr[i];
                        }
                    }
                    var clock = timeStr[0] + ":" + timeStr[1] + ":" + timeStr[2];

                    $(".clockTime .nowTime").html("");
                    $(".clockTime .nowTime").append(clock);

                }, 1000);
            }
            if (myDay === 2 || myDay === 3) {
                if (myDay === 2) {
                    countdown(new Date());
                    // $(".clockTime").html("<span class='clockTip'>距离活动开始还有：</span><img src='" + imgSrc + "clock.png'><span class='nowTime'></span>");
                    $(".clockTip").text("距离活动开始还有：");
                } else if (myDay === 3) {
                    $(".clockTip").text("距离活动结束还有：");
                }
                countdown(new Date());
            } else {
                $(".clockTip").text("活动时间为每周三：");
                $(".nowTime").text("0~24点");
            }
        }
    }
    run.start();
})
