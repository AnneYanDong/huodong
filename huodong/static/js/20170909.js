require.config(requireConfig);
require(["jquery", "fastClick", "FullPage", "ct", "bridge", "juicer", "qrcode"], function ($, fastClick, fullpage, ct, Bridge, juicer,qrcode) {
    var oMask = $(".mask");

    var oP = Object.create(ct.Prompt);
    oP.create().build();

    var oM = Object.create(ct.Mask);
    oM.create().build();

    var local = ct.Tool.local();
    var host = window.location.host

    ct.Tool.buryPoint_v2(0);

    var run = {

        start: function () {
            var _this = this;

            /*解决移动端click点击300延迟*/
            fastClick.attach(document.body);

            /*设置HTML的font-size*/
            ct.Tool.setFont();
            window.addEventListener("resize", ct.Tool.debounce(ct.Tool.setFont));
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
                url: ct.Tool.url("/act/request/activity"),
                data: JSON.stringify({
                    source: ct.Tool.userAgent().isGjj ? 1 : 0,
                    tag: "20170901_1_0_0_进入页面"
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
            _this.openRule1();
            // _this.openRule2();
            _this.closeRule1();
            // _this.closeRule2();
            _this.pageload();
        },
        openRule1: function () {
            $(".btn-lottery-rule").on("click", function () {
                oM.show();
                $(".rule").fadeIn();
            })
        },
        closeRule1: function () {
            $("body").on("click", ".btn-close", function () {
                $(".rule").fadeOut(function () {
                    oM.hide();
                })
            })
        },
        pageload: function() {
            var oMask = $(".mask");
            var oNoChance = $(".no-chance");
            var lottery = {
                index: 0, //当前转动到哪个位置，起点位置
                count: 0, //总共有多少个位置
                timer: 0, //setTimeout的ID，用clearTimeout清除
                speed: 20, //初始转动速度
                times: 0, //转动次数
                cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
                prize: -1, //中奖位置
                init: function (id) {
                    if ($("#" + id).find(".lottery-box").length > 0) {
                        $lottery = $("#" + id);
                        $units = $lottery.find(".lottery-box");
                        this.obj = $lottery;
                        this.count = $units.length;
                        $lottery.find(".lottery-box-" + this.index).addClass("lottery-active");
                    }
                    ;
                },
                roll: function () {
                    var index = this.index;
                    var count = this.count;
                    var lottery = this.obj;
                    $(lottery).find(".lottery-box-" + index).removeClass("lottery-active");
                    index += 1;
                    if (index > count - 1) {
                        index = 0;
                    }
                    ;
                    $(lottery).find(".lottery-box-" + index).addClass("lottery-active");
                    this.index = index;
                    return false;
                },
                stop: function (index) {
                    this.prize = index;
                    return false;
                }
            };
    
            function roll(forward) {
                lottery.times += 1;
                lottery.roll(); //转动过程调用的是lottery的roll方法，这里是第一次调用初始化
                if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
                    clearTimeout(lottery.timer);
                    oMask.removeClass("hide");
                    setTimeout(function () {
                        switch (lottery.prize) {
                            case 0:
                            case 4:
                                oPrize300jifen.removeClass("hide");
                                break;
                            case 2:
                            case 6:
                                oPrize100jifen.removeClass("hide");
                                break;
                            case 3:
                                oPrize10yuan.removeClass("hide");
                                break;
                        }
                        lottery.prize = -1;
                        lottery.times = 0;
                        click = false;
                    }, 250)
                } else {
                    if (lottery.times < lottery.cycle) {
                        lottery.speed -= 10;
                    } else if (lottery.times == lottery.cycle) {
    
                    } else {
                        if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
                            lottery.speed += 110;
                        } else {
                            lottery.speed += 20;
                        }
                    }
                    if (lottery.speed < 40) {
                        lottery.speed = 40;
                    }
                    ;
                    lottery.timer = setTimeout(roll, lottery.speed); //循环调用
                }
                return false;
            }
    
            var click = false;
            lottery.init('lottery');
            $(".lottery-start").click(function () {
                if (click) { //click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
                    return false;
                } else {
                    $.ajax({
                        // url: "g.php",
                        url: "test.php",
                        type: "POST",
                        dataType: "json",
                        data: {
                            action: "lottery"
                        },
                        success: function (d) {
                            if (d.resCode == 1) {
                                // if (d.chance && d.allowLottery) {
                                    // initFn.getChance();
                                    var giftCode = d.resData.type;
                                    var prize = null;
                                    switch (giftCode) {
                                        case 1:
                                            prize = 1;
                                            break;
                                        case 2:
                                            prize = 7;
                                            break;
                                        case 3:
                                            prize = 3;
                                            break;
                                        case 4:
                                            prize = 6;
                                            break;
                                        case 5:
                                            prize = 0;
                                            break;
                                        case 6:
                                            prize = 2;
                                            break;
                                        case 7:
                                            prize = 4;
                                            break;
                                        case 8:
                                            prize = 5;
                                            break;
                                    }
                                    lottery.stop(prize);console.log("****,",prize)
                                    lottery.speed = 100;
                                    roll(); //转圈过程不响应click事件，会将click置为false
                                    click = true; //一次抽奖完成后，设置click为true，可继续抽奖
                                    return false;
                                // } else {
                                //     oMask.removeClass("hide");
                                //     oNoChance.removeClass("hide");
                                // }
                            } else {
                                alert(d.errmsg || "出错，请重试", 2000);
                            }
                        },
                        error: function (jqXHR) {
                            alert(jqXHR, 2000);
                        }
                    })
                }
            });
        },
    }


    run.start();
})
