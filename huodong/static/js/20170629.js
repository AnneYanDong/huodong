//引入配置对象
require.config(requireConfig);
require(["jquery", "fastClick", "FullPage", "ct", "bridge", "juicer"], function ($, fastClick, fullpage, ct, Bridge, juicer) {
    var oMask = $(".mask");
    /*oP和oM的作用是在body元素的最下方默认生成两个div，一个是提示框，一个是遮罩层*/
    var oP = Object.create(ct.Prompt); //提示框对象
    oP.create().build();

    var oM = Object.create(ct.Mask); //遮罩层
    oM.create().build();

    var local = ct.Tool.local(); //获取域名

    ct.Tool.buryPoint(); //统计点击情况

    var run = {
        start: function () {
            var _this = this;

            /*解决移动端click点击300延迟*/
            fastClick.attach(document.body);

            /*设置HTML的font-size*/
            ct.Tool.setFont();
            //这个是给content自动加上固定宽高
            ct.Tool.handleBottomStatusBar();
            window.addEventListener("resize", ct.Tool.debounce(ct.Tool.setFont));
            window.addEventListener("resize", ct.Tool.debounce(ct.Tool.handleBottomStatusBar));


            /*整体预加载动画*/
            var oPreLoading = Object.create(ct.PreLodingUi);
            oPreLoading.create({
                preLoadingCls: "loading-bg-color", // 自定义加载动画颜色
                loadingEleCls: "loading-ele-color"
            }).build();
            var timer = null;
            clearTimeout(timer);
            timer = setTimeout(function () {
                oPreLoading.hide();
                // _this.init();
            }, 500);
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
            }),
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
            });
        },


        init: function () {
            var _this = this;
            $('.wp').removeClass('hide');
            console.log("宜人贷活动！");

            _this.receive();
        },
         receive: function() {
            $('.content').on('click','.btn',function(event){

                //这个是模拟的假请求
                // ct.Ajax.do({
                //     url: indexData.ajaxUrl || "test.php",  //用test.php来模拟接口
                //     data: {},
                //     success: function (d) {
                //         console.log(d);
                //         //判断用户有没有领取补贴
                //         if (d.success == true) {
                //             var timer = null;
                //             clearTimeout(timer);
                //             if (d.ret.weChat == true) {
                //                 timer = setTimeout(function () {
                //                     oP.show("登录51公积金管家APP领取");
                //                     timer = setTimeout(function () {
                //                         window.location.href = d.ret.url;
                //                     }, 1500);
                //                 }, 200);
                //             } else {
                //                 if (d.ret.qq == true) {
                //                     timer = setTimeout(function () {
                //                         oP.show("登录51公积金管家APP领取");
                //                         timer = setTimeout(function () {
                //                             window.location.href = d.ret.url;
                //                         }, 1500);
                //                     }, 200);
                //                 } else {
                //                     if (d.ret.login == false) {
                //                         if (Bridge) {
                //                             Bridge.action("login");
                //                         }
                //                     } else {
                //                         if (d.ret.order == false) {
                //                             oP.show("您暂不符合活动参与条件,试试其它活动~");
                //                         } else {
                //                             timer = setTimeout(function () {
                //                                 timer = setTimeout(function () {
                //                                     window.location.href = d.ret.url;
                //                                 }, 1500)
                //                             }, 200);
                //                         }
                //                     }
                //                 }
                //             }
                //         }else {
                //             oP.show(d.msg || "出错了请重试");
                //         }
                //     }
                // });


                /*下面这个是真正的请求真接口，别删*/
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    // url: ct.Tool.url("/act/act170629/get_status"),
                    url: "/act/act170629/get_status",  //这个到时候换成鑫福贷活动的接口
                    success: function (d) {
                        console.log(d);
                        if (d.success == true) {
                            var timer = null;
                            clearTimeout(timer);
                            if (d.ret.weChat == true) {
                                timer = setTimeout(function () {
                                    oP.show("成功参加活动，立即享受优惠~");
                                    timer = setTimeout(function () {
                                        window.location.href = d.ret.url;
                                    }, 1500);
                                }, 200);
                            } else {
                                if (d.ret.qq == true) {
                                    console.log('qq');
                                    timer = setTimeout(function () {
                                        oP.show("成功参加活动，立即享受优惠~");
                                        timer = setTimeout(function () {
                                            window.location.href = d.ret.url;
                                        }, 1500);
                                    }, 200);
                                } else {
                                    if (d.ret.login == false) {
                                        if (Bridge) {
                                            Bridge.action("login");
                                        }
                                    } else {
                                        if (d.ret.order == false) {
                                            oP.show("您暂不符合活动参与条件,试试其它活动~");
                                        } else {
                                            timer = setTimeout(function () {
                                                oP.show("成功参加活动，立即享受优惠~");
                                                timer = setTimeout(function () {
                                                    window.location.href = d.ret.url;
                                                }, 1500)
                                            }, 200);
                                        }
                                    }
                                }
                            }
                        }else {
                            oP.show(d.msg || "出错请重试");
                        }
                    }
                });
            });
        },

    }

    run.start();

});