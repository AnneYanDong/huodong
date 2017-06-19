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

    var imgSrc = "//r.51gjj.com/act/release/img/20170413_";

    var img = new Image();
    var imgR = new Image();
    //var imgsResult = ['//r.51gjj.com/act/release/img/20170413_tip1.png', '//r.51gjj.com/act/release/img/20170413_tip2.png', '//r.51gjj.com/act/release/img/20170413_3.png', '//r.51gjj.com/act/release/img/20170413_tip4.png'];
    var imgs = ['//r.51gjj.com/act/release/img/20170413_alert1.png', '//r.51gjj.com/act/release/img/20170413_alert2.png', '//r.51gjj.com/act/release/img/20170413_alert3.png'];
    var num = Math.floor(Math.random() * 2);
    img.src = imgs[num];
    //imgR.src = imgsResult[num];
    // $(".lot").append("<img src="+img.src+">");

    var oUrl = null;
    var type = null;
    var oHasPrize = null;
    var flag = null;
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
        },

        init: function () {
            var _this = this;
            $(".wp").removeClass("hide");
            _this.openRule();
            _this.closeRule();
            _this.shakeClick();
            _this.shake();
            _this.render();
            _this.close();
            _this.apply();
            _this.applypLot();
        },

        render: function () {
            var _this = this;
            $.ajax({
                // url: "https://kaifa.jianbing.com/act/act170413/get_status",
                url: ct.Tool.url("/act/act170413/get_status"),
                // url: "test.php",
                type: "POST",
                dataType: "json",
                success: function (d) {
                if (d.ret) {
                    oUrl = d.ret.url;
                    if (d.ret.hasPrize != null) {
                        oHasPrize = d.ret.hasPrize;
                    }
                    if (d.ret.type) {
                        type = d.ret.type;
                    }
                }   
                    if (d.success && d.ret.hasPrize) {
                        console.log("有奖品")
                        $(".lot").remove();
                        $(".status").css("display", "block");
                        $(".mt-mask").removeClass("hide");
                        $(".status").append("<img class='resultTip' src='//r.51gjj.com/act/release/img/20170413_giftCode" + d.ret.giftCode + ".png' /><div class='prizeDetail' bp='chakanjiangpinxiangqing' title='chakanjiangpinxiangqing'></div>");
                        $(".btn_sub .shake_icon").removeClass("addShake");console.debug(d.ret.giftCode)
                    } else if (d.ret && d.ret.hasPrize == false) {
                        // hasPrize = d.ret.hasPrize;
                        // type = d.ret.type;console.log("type",type)
                        if (d.ret.type == 1) {
                            $("#imgId").attr('src', img.src);
                            $(".mt-mask").removeClass("hide");
                            $(".btn_sub .shake_icon").removeClass("addShake");
                            $(".content .lot").css("display", "block");
                        } else if (d.ret.type == 2) {
                            $(".mt-mask").removeClass("hide");
                            $(".btn_sub .shake_icon").removeClass("addShake");
                            $(".content .alreadyApply").css("display", "block");
                            $(".content .alreadyApply").on("click", function () {
                                window.location.href = oUrl;    
                            })
                        }
                    } else if(d.code == 1){
                        oP.show(d.msg || "出错请重试");
                        $(".btn_sub .shake_icon").removeClass("addShake");
                        $(".btn_sub").unbind();
                        falg = false;  
                    }
                }
            })
        },



        //点击按钮触发
        shakeClick: function () {
            $(".btn_sub").on("click", function () {
                $("#imgId").attr('src', img.src);
                // $(".mt-mask").removeClass("hide");
                $(".mt-mask").css("display","block");
                $(".btn_sub .shake_icon").removeClass("addShake");
                $(".content .lot").css("display", "block");
            })

        },

        //申请拿免息
        applypLot: function () {
            $(".lot").on("click",".apply", function () {
                window.location.href = oUrl;
            })
        },

        shake: function () {
            flag = true;

            //运动事件监听
            if (window.DeviceMotionEvent) {
                window.addEventListener('devicemotion', deviceMotionHandler, false);
            }

            //获取加速度信息
            //通过监听上一步获取到的x, y, z 值在一定时间范围内的变化率，进行设备是否有进行晃动的判断。
            //而为了防止正常移动的误判，需要给该变化率设置一个合适的临界值。
            var SHAKE_THRESHOLD = 8000;
            var last_update = 0;
            var x, y, z, last_x = 0,
                last_y = 0,
                last_z = 0;

            function deviceMotionHandler(eventData) {
                var acceleration = eventData.accelerationIncludingGravity;
                var curTime = new Date().getTime();
                if ((curTime - last_update) > 10) {
                    var diffTime = curTime - last_update;
                    last_update = curTime;
                    x = acceleration.x;
                    y = acceleration.y;
                    z = acceleration.z;
                    var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
                    // alert(type);
                    if (speed > SHAKE_THRESHOLD && (type == 3 || type == 1)) {
                        // $.ajax({
                        //     url: ct.Tool.url("/act/act170413/get_status"),
                        //     success: function (d) {
                        //         if (d.success) {
                        //             if (d.ret.type == 3) {
                        //                 $("#imgId").attr('src', img.src);
                        //                 $(".mt-mask").removeClass("hide");
                        //                 $(".btn_sub .shake_icon").removeClass("addShake");
                        //                 $(".content .lot").css("display", "block");
                        //             }
                        //         }
                        //     }
                        // })

                        $("#imgId").attr('src', img.src);
                        // $(".mt-mask").removeClass("hide");
                        $(".mt-mask").css("display","block");
                        $(".btn_sub .shake_icon").removeClass("addShake");
                        $(".content .lot").css("display", "block");
                        $(".lot .apply").on("click", function () {
                            $(".apply").on("click", function () {
                                window.location.href = oUrl;
                            })
                        })
                        if(flag){
                            flag = false;
                            $.ajax({
                            type: "POST",
                            dataType: "JSON",
                            url: ct.Tool.url("/app/request/activity"),
                            data: JSON.stringify({
                                place_cid: ct.Tool.userAgent().isGjj ? 1 : 0,
                                tag: "shijinyao" + projectName
                            }),
                            success: function (d) {
                                if (d.success == true) {

                                }
                            }
                        })
                        }
                        
                    }
                    last_x = x;
                    last_y = y;
                    last_z = z;
                }
            }
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
    //关闭签
        close: function () {
                $("body").on("click",".mt-mask", function () { console.debug(oHasPrize);console.debug(type)
                    if (oHasPrize == false && (type == 1 || type == 3)) {
                        $(".lot").css("display", "none");
                        // $(".mt-mask").addClass("hide");
                        $(".mt-mask").css("display","none");
                    }
                    
                })
        },
//奖品详情
        apply: function () {
            $(".status").on("click",".prizeDetail",function () {
                console.debug(222)
                window.location.href = oUrl;
            })
        },
    }
    run.start();
})