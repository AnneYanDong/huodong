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
            _this.openRule();
            _this.closeRule();
            _this.getCode();
            _this.searchClick();

        },
        openRule: function () {
            $(".btn-rule").on("click", "span",function () {
                oM.show();
                $(".rule").fadeIn();
            })
        },
        closeRule: function () {
            $("body").on("click", ".btn-close",function () {
                $(".rule").fadeOut(function () {
                    oM.hide();
                })
            })        
        },
        getCode: function () {
            _this = this;
            $(".JS-get-code").on("click", function() {
                if (_this.checkPhone($(".JS-phone"))) {
                    var phoneNum = $(".JS-phone").val();
                    $.ajax({
                        url: "/app",
                        type: "POST",
                        dataType: "JSON",
                        data:JSON.stringify({"phone": phoneNum,"place_name":place_name}),
                        success: function(d) {
                            if (d.success === true) {
                                oP.show("短信验证码已发送，请注意查收");
                                _this.timeDown($(".JS-get-code"), 60)
                            } else if(d.code == 512){
                                oP.show("您已注册，直接参与吧");
                                skipTimer = setTimeout(function(){
                                    $(".section").addClass("slideTop");
                                },1500)
                            } else{
                                $(".JS-get-code").removeClass("timing");
                                oP.show(d.msg || "出错了，请重试")
                            }
                        },
                        error: function(xhr){
                            $(".JS-get-code").removeClass("timing");
                            oP.show("发生错误" + xhr + "，请重试");
                        }
                    })
                }
            })
        },
        searchClick: function() {
            var _this = this;
            var skipTimer = null;
            var oUrl = "https://b.jianbing.com/act/market/get_register";
            $(".btn-submit").on("click", function() {
                if (_this.checkPhone($(".JS-phone")) && _this.checkCode($(".JS-code"))) {
                    var phoneNum = $(".JS-phone").val();
                    var codeNum = $(".JS-code").val();
                    $.ajax({
                        type: "POST",
                        url: oUrl,
                        dataType: "JSON",
                        data:
                             JSON.stringify({
                                 "phone": phoneNum,
                                "code": codeNum,
                                "place": place_name
                             }),
                        success: function(d) {
                            if (d.success === true) { //手机号码验证码都正确，跳转到H5查询
                            }else if (d.code == 512){
                                oP.show("您已注册，直接参与吧");
                                clearTimeout(skipTimer);
                                skipTimer = setTimeout(function(){
                                    $(".section").addClass("slideTop");
                                },1500)
                            }else{
                                oP.show(d.msg || "出错了，请重试")
                            }
                        },
                        error: function(xhr) {
                            oP.show("发生错误" + xhr + "，请重试");
                        }
                    })
                }
            })
        },
            //校验手机号和短信验证码的方法
    checkPhone: function(ele) {
        var _this = this;
        var reg = /^1\d{10}$/;
        var phoneNum = ele.val();
        if (reg.test(phoneNum)) {
            return true;
        } else {
            oP.show("请输入正确的手机号！")
        }
    },

    checkCode: function(ele) {
        var _this = this;
        var codeNum = ele.val();
        if (codeNum != "") {
            return true;
        } else {
            oP.show("验证码错误或未输入");
        }
    },
    
    //倒计时功能
    timeDown: function(ele, howTime) {
        if (ele.hasClass("timing")) {
            return false;
        } else {
            clearInterval(timer);
            ele.text(howTime + "s");
            ele.addClass("timing");
            ele.parent().append($("<div class='code-mark'></div>"))
            var howTime = howTime - 1;
            var timer = setInterval(function() {
                ele.text(howTime + "s");
                howTime--;
                if (howTime < 0) {
                    clearInterval(timer);
                    $(".code-mark").remove();
                    ele.removeClass("timing");
                    ele.text("获取验证码");
                }
            }, 1000)
        }
    },


    }


    run.start();
})
