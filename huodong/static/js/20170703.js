require.config(requireConfig);
require(["jquery", "fastClick", "lucky-card", "ct", "bridge", "juicer", "marquee"], function ($, fastClick, LuckyCard, ct, Bridge, juicer, liMarquee) {
    var oMask = $(".mask");

    var oP = Object.create(ct.Prompt);
    oP.create().build();

    var oM = Object.create(ct.Mask);
    oM.create().build();

    var local = ct.Tool.local();

    ct.Tool.buryPoint();

    var myDay = new Date().getDay();

    var imgSrc = "//r.51gjj.com/act/release/img/20170703_";
    // var imgSrc = "../static/img/20170703_";
    var oUrl;
    var oGiftCode;

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
            $.ajax({
                type: "POST",
                dataType: "JSON",
                url: ct.Tool.url("/app/request/activity"),
                data: JSON.stringify({
                    place_cid: ct.Tool.userAgent().isGjj ? 1 : 0,
                    tag: "进入页面" + projectName
                }),
                success: function (d) {
                    if (d.success == true) {

                    }
                }
            })
            var list = $(".list ul");
            // $(".list ul").css("max-height", "200px");
            $.ajax({
                type: "POST",
                dataType: "JSON",
                url: "/act/act170406/get_status",
                // url: "test.php",
                data: JSON.stringify({
                    action: "status"
                }),
                success: function (d) {
                    console.log("滚动条*************************")
                    oUrl = d.ret.url;

                    if (d.success == true) {
                        console.log(111)
                        if (d.ret.info) {
                            var info = d.ret.info;
                            for (var i = 0; i < info.length; i++) {
                                var oSpan = $("<li>");
                                oSpan.text(info[i]);
                                oSpan.appendTo(list);
                            }
                            $(".list").liMarquee({
                                hoverstop: false,
                                drag: false,
                                scrollamount: 30,
                                direction: 'up',
                                runshort: true
                            });

                        }
                    } else {
                        _this.status.msg = d.msg || "出错请重试";
                        oP.show(d.msg || "出错请重试");
                    }
                },
                error: function (jqXHR) {
                    alert(jqXHR)
                }
            })
        },

        init: function () {
            var _this = this;
            $(".wp").removeClass("hide");
            _this.openRule();
            _this.closeRule();
            _this.timeDown();
            _this.render();
            _this.robTicket();
            _this.skipLoan();
            _this.close_tip();
            _this.apply();
            _this.lookTicket();
            _this.share();
            // _this.skipPage();
        },

        render: function () {
            var _this = this;
            var singleInfo = $(".single-info");
            var awardsInfo = $(".awards-info");


            $.ajax({
                url: "/act/act170406/get_status",
                // url: "test.php",
                type: "POST",
                dataType: "json",
                data: JSON.stringify({
                    action: "render"
                }),
                success: function (d) {
                    console.log(1111);

                    if (d.success == true) {
                        if (d.isLogin == false) {
                            if (Bridge) {
                                Bridge.action("login");
                            }
                        }
                        var d = d.ret;
                        if (d.UserTicket) {
                            if (d.UserTicket == 1) {
                                $(".rob200").addClass("grey");
                                $(".rob200").text("").text("已领取");
                                $(".ticketMoney:nth-child(1)").append('<img src="http://r.51gjj.com/act/release/img/20170703_seal.png" class="seal">');
                                $(".ticketMoney:nth-child(2)").addClass("grayscale");
                                $(".ticketMoney:nth-child(3)").addClass("grayscale");
                                if (d.ticketStatus_100) {
                                    $(".rob100").addClass("grey");
                                } else {
                                    $(".rob100").addClass("grey");
                                    $(".rob100").text("").text("抢完");
                                }
                                if (d.ticketStatus_50) {
                                    $(".rob50").addClass("grey");
                                } else {
                                    $(".rob50").addClass("grey");
                                    $(".rob50").text("").text("抢完");
                                }
                                //显示中奖弹框200元
                                oM.show();
                                $(".ticket_50").html("<img src='" + imgSrc + "ticket_200.png'><div class='ticket_close'></div><div class='skip' bp='200元去申请' title='200元去申请'></div>");
                                $(".ticket_50").fadeIn();
                            } else if (d.UserTicket == 2) {
                                $(".rob100").addClass("grey");
                                $(".rob100").text("").text("已领取");
                                $(".ticketMoney:nth-child(2)").append('<img src="http://r.51gjj.com/act/release/img/20170703_seal.png" class="seal">');
                                $(".ticketMoney:nth-child(1)").addClass("grayscale");
                                $(".ticketMoney:nth-child(3)").addClass("grayscale");
                                if (d.ticketStatus_200) {
                                    $(".rob200").addClass("grey");
                                } else {
                                    $(".rob200").addClass("grey");
                                    $(".rob200").text("").text("抢完");
                                }
                                if (d.ticketStatus_50) {
                                    $(".rob50").addClass("grey");
                                } else {
                                    $(".rob50").addClass("grey");
                                    $(".rob50").text("").text("抢完");
                                }
                                //显示中奖弹框100元
                                oM.show();
                                $(".ticket_50").html("<img src='" + imgSrc + "ticket_100.png'><div class='ticket_close'></div><div class='skip' bp='100元去申请' title='100元去申请'></div>");
                                $(".ticket_50").fadeIn();
                            } else if (d.UserTicket == 3) {
                                $(".rob50").addClass("grey");
                                $(".rob50").text("").text("已领取");
                                $(".ticketMoney:nth-child(3)").append('<img src="http://r.51gjj.com/act/release/img/20170703_seal.png" class="seal">');
                                $(".ticketMoney:nth-child(1)").addClass("grayscale");
                                $(".ticketMoney:nth-child(2)").addClass("grayscale");
                                if (d.ticketStatus_200) {
                                    $(".rob200").addClass("grey");
                                } else {
                                    $(".rob200").addClass("grey");
                                    $(".rob200").text("").text("抢完");
                                }
                                if (d.ticketStatus_100) {
                                    $(".rob100").addClass("grey");
                                } else {
                                    $(".rob100").addClass("grey");
                                    $(".rob100").text("").text("抢完");
                                }
                                //显示中奖弹框50元
                                oM.show();
                                $(".ticket_50").html("<img src='" + imgSrc + "ticket_50.png'><div class='ticket_close'></div><div class='skip' bp='50元去申请' title='50元去申请'></div>");
                                $(".ticket_50").fadeIn();
                            } else {
                                if (d.ticketStatus_50) {
                                    console.log("有50元券")
                                } else {
                                    $(".rob50").addClass("grey");
                                    $(".rob50").text("").text("抢完");
                                    $(".ticketMoney:nth-child(3)").addClass("grayscale");
                                }
                                if (d.ticketStatus_100) {} else {
                                    $(".rob100").addClass("grey");
                                    $(".rob100").text("").text("抢完");
                                    $(".ticketMoney:nth-child(2)").addClass("grayscale");
                                }
                                if (d.ticketStatus_200) {} else {
                                    $(".rob200").addClass("grey");
                                    $(".rob200").text("").text("抢完");
                                    $(".ticketMoney:nth-child(1)").addClass("grayscale");
                                }
                            }
                        }
                    } else {
                        oP.show(d.msg || "获取不到中奖信息")
                    }
                },
                error: function (jqXHR) {
                    console.log(jqXHR);
                }
            })
        },

        robTicket: function () {
            var _this = this;
            $(".tickets .ticketMoney:nth-child(1)").on("click", function () {
                console.log("200元")
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "/act/act170406/get_rob",
                    // url: "test.php",
                    data: JSON.stringify({
                        "type": 1
                    }),
                    success: function (d) {
                        if (d.success == true) {
                            var d = d.ret;
                            console.debug("条件", d.UserTicket)
                            if (d.UserTicket === 4) {
                                oM.show();
                                $(".ticket_50").html("<img src='" + imgSrc + "ticket_200.png'><div class='ticket_close'></div><div class='skip' bp='200元去申请' title='200元去申请'></div>");
                                $(".ticket_50").fadeIn();
                                _this.render();
                            } else {
                                oP.show(d.msg || "出错请重试");
                            }
                        } else if (d.code == 1) {
                            oP.show(d.msg);
                        } else {
                            oP.show(d.msg || "出错请重试");
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(XMLHttpRequest.status);
                        alert(XMLHttpRequest.readyState);
                        alert(textStatus);
                        alert(JSON.stringify(XMLHttpRequest));
                        alert(errorThrown);
                    }
                })
            })
            $(".tickets .ticketMoney:nth-child(2)").on("click", function () {
                console.log("100元")
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "/act/act170406/get_rob",
                    // url: "test.php",
                    data: JSON.stringify({
                        "type": 2
                    }),
                    success: function (d) {
                        if (d.success == true) {
                            var d = d.ret;
                            console.debug("条件", d.UserTicket)
                            if (d.UserTicket === 4) {
                                oM.show();
                                $(".ticket_50").html("<img src='" + imgSrc + "ticket_100.png'><div class='ticket_close'></div><div class='skip' bp='100元去申请' title='100元去申请'></div>");
                                $(".ticket_50").fadeIn();
                                _this.render();
                            } else {
                                oP.show(d.msg || "出错请重试");
                            }
                        } else if (d.code == 1) {
                            oP.show(d.msg);
                        } else {
                            oP.show(d.msg || "出错请重试");
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    }
                })
            })
            $(".tickets .ticketMoney:nth-child(3)").on("click", function () {
                console.log("50元")
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "/act/act170406/get_rob",
                    // url: "test.php",
                    data: JSON.stringify({
                        "type": 3
                    }),
                    success: function (d) {
                        if (d.success == true) {
                            var d = d.ret;
                            console.debug("条件",d.UserTicket)
                            if (d.UserTicket === 4) {
                                oM.show();
                                $(".ticket_50").html("<img src='" + imgSrc + "ticket_50.png'><div class='ticket_close'></div><div class='skip' bp='50元去申请' title='50元去申请'></div>");
                                $(".ticket_50").fadeIn();
                                _this.render();
                            } else {
                                oP.show(d.msg || "出错请重试");
                            }
                        } else if (d.code == 1) {
                            oP.show(d.msg);
                        } else {
                            oP.show(d.msg || "出错请重试");
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    }
                })
            })
        },

        //随机跳转金鑫贷或金盈贷
        skipLoan: function () {
            $(".ticket_50").on("click", ".skip", function () {
                console.debug("点击随机跳转")
                window.location.href = oUrl;
            });
        },

        // 走后台跳转申请
        apply: function () {
            $(".apply1").on("click", function () {
                var data = {
                    "type": "1"
                };
                console.log("data", JSON.stringify(data));
                data = JSON.stringify(data);
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    // url: "https://b.jianbing.com/act/act/act170406/get_url",
                    url: "/act/act170406/get_url",
                    // url: "test.php",
                    data: JSON.stringify({
                        "type": 1
                    }),
                    success: function (d) {
                        if (d.success == true) {
                            window.location.href = d.ret.url;
                        } else if (d.code == 1) {
                            oP.show(d.msg);
                        } else {
                            oP.show(d.msg || "出错请重试");
                        }
                    }
                })
            })
            $(".apply2").on("click", function () {
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    // url: "https://b.jianbing.com/act/act/act170406/get_url",
                    url: "/act/act170406/get_url",
                    data: JSON.stringify({
                        "type": 2
                    }),
                    success: function (d) {
                        if (d.success == true) {
                            window.location.href = d.ret.url;
                        } else if (d.code == 1) {
                            oP.show(d.msg);
                        } else {
                            oP.show(d.msg || "出错请重试");
                        }
                    }
                })
            })
            $(".apply3").on("click", function () {
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    // url: "https://b.jianbing.com/act/act/act170406/get_url",
                    url: "/act/act170406/get_url",
                    data: JSON.stringify({
                        "type": 3
                    }),
                    success: function (d) {
                        if (d.success == true) {
                            window.location.href = d.ret.url;
                        } else if (d.code == 1) {
                            oP.show(d.msg);
                        } else {
                            oP.show(d.msg || "出错请重试");
                        }
                    }
                })
            })
        },
        close_tip: function () {
            $(".ticket_50").on("click", ".ticket_close", function () {
                $(".ticket_50").fadeOut(function () {
                    oM.hide();
                })
            })
        },
        // 打开规则
        openRule: function () {
            $(".content").on("click", ".rule-btn", function () {
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

        //我的优惠券
        lookTicket: function () {
            $(".myTicket").on("click", "span", function () {
                var type = $(this).data("link");
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    // url: "https://b.jianbing.com/act/act/act170406/get_url",
                    url: "/act/act170406/get_url",
                    data: JSON.stringify({
                        "type": 4
                    }),
                    success: function (d) {
                        if (d.success == true) {
                            window.location.href = d.ret.url;
                        } else {
                            oP.show(d.msg || "出错请重试");
                        }
                    }
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
                            "title": "我获得了200元还款金！",
                            'desc': "公积金定制贷款，今天申请立减200元还款金。",
                            "thumb": "https://r.51gjj.com/act/release/img/20170523_share.png",
                            "link": "https://" + host + "/act/home/huodong/20170703/"
                        });
                    }
                })
            }
            return this;
        },

        timeDown: function () {
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
                setInterval(function () {
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

                    $(".timeClock .nowTime").html("");
                    $(".timeClock .nowTime").append(clock);

                }, 1000);
            }
            if (myDay === 2 || myDay === 3) {
                if (myDay === 2) {
                    countdown(new Date());
                    // $(".clockTime").html("<span class='clockTip'>距离活动开始还有：</span><img src='" + imgSrc + "clock.png'><span class='nowTime'></span>");
                    $(".clockTip").text("距开始");
                } else if (myDay === 3) {
                    $(".clockTip").text("距结束");
                }
                countdown(new Date());
            } else {
                $(".clockTip").text("活动时间为每周三");
                $(".timeClock img").remove();
            }
        }
    }
    run.start();
})