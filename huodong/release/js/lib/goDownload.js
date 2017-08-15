define(["jquery"], function ($) {
    var weChat = {
        start: function (url) {
            var _this = this;
            var url = url;
            _this.goLogin();
            _this.render();
            _this.getCode();
            _this.closeBtn();
            _this.getLogin();
            _this.use(url);
        },
        goLogin: function () {
            var appAddr = $("#appAddr");
            $("#appAddr").on("click", function () {
                window.location.href = "gjj51://";
                callApp.onElement(appAddr);
            });
        },
        render: function () {
            var result = '<div class="wrap-info"><div class="close-btn"><img src="../static/img/go_close.png"></div><div class="wrap-title">验证手机号码</div>'
            result += '<div class="user-info"><div class="phone"><input class="JS-phone" type="tel" placeholder="请输入手机号码" maxlength="11"><div class="get-code" bp="获取验证码" title="获取验证码">获取验证码</div></div>'
            result += '<div class="code"><input type="tel" class="JS-code" placeholder="请输入验证码" maxlength="6"></div></div>'
            result += '<div class="validate" bp="立即验证" title="立即验证">立即验证</div></div>'
            $(".mt-mask").removeClass("hide");
            $("body").append(result);
        },
        closeBtn: function () {
            $(document).on("click", ".close-btn", function () {
                $(".wrap-info").remove();
                $(".mt-mask").addClass("hide");
            })
        },
        getCode: function () {
            var _this = this;
            $(document).on("click", ".get-code", function () {
                if (_this.checkPhone()) {
                    var phone = $(".JS-phone").val();
                    console.log(phone)
                    $.ajax({
                        type: "POST",
                        dataType: "JSON",
                        url: "/act/Currency/get_verification_code",
                        data: JSON.stringify({
                            "phone": phone
                        }),
                        success: function (d) {
                            if (d.success == true) {
                                _this.timeDown($(".get-code"), 60);
                                $(".wrap-title").text("").text(d.msg ||"验证码已成功发送！");
                            } else if (d.code == 512){
                                $(".wrap-title").text("").css("font-size", "0.28rem");;
                                $(".wrap-title").append("<span>" + d.msg + "</span>");
                                setTimeout(function () {
                                    $(".wrap-info").children().remove();
                                    var succTxt = '<div class="close-btn"><img src="../static/img/go_close.png"></div><div class="succTip"><img src="../static/img/go_succ_tip.png">验证成功！</div>'
                                    succTxt += '<div class="congra">恭喜！您的红包领取成功，申请可立即使用！</div>'
                                    succTxt += '<input class="apply" value="立即申请" type="button" bp="立即申请" tiltle="立即申请">'
                                    $(".wrap-info").append(succTxt);
                                },1000)
                            } else {
                                $(".wrap-title").children().remove();
                                $(".wrap-title").text("").append("<span></span>");
                                $(".wrap-title span").text(d.msg);
                            }
                        }
                    })
                }
            })
        },
        getLogin: function () {
            var _this = this;
            $(document).on("click", ".validate", function () {
                if (_this.checkPhone() && _this.checkCode()) {
                    var phone = $(".JS-phone").val();
                    var code = $(".JS-code").val();
                    console.log(phone, code);
                    $.ajax({
                        type: "POST",
                        dataType: "JSON",
                        url: "/act/Currency/get_register",
                        data: JSON.stringify({
                            "phone": phone,
                            "code": code
                        }),
                        success: function (d) {
                            if (d.success) {
                                //验证成功
                                $(".wrap-info").children().remove();
                                var succTxt = '<div class="close-btn"><img src="../static/img/go_close.png"></div><div class="succTip"><img src="../static/img/go_succ_tip.png">验证成功！</div>'
                                succTxt += '<div class="congra">恭喜！您的红包领取成功，申请可立即使用！</div>'
                                succTxt += '<input class="apply" value="立即申请" type="button" bp="立即申请" title="立即申请">'
                                $(".wrap-info").append(succTxt);
                            } else {
                                $(".wrap-title").text("").css("font-size", "0.28rem");;
                                $(".wrap-title").append("<span>" + d.msg + "</span>");
                            }
                        }
                    })
                }
            })
        },
        use: function (url) {
            $(document).on("click", ".apply", function () {
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    url: url,
                    success: function (d) {
                        if (d.success) {
                            window.location.href = d.ret.url;
                        } else {
                            $(".succTip").text("").children().remove();
                            $(".congra").remove();
                            $(".succTip").append('<div class="wrap-title"><span>'+ d.msg +'</span></div>');
                        }
                    }
                })
            })
        },
        checkPhone: function () {
            var _this = this;
            var re = /^1\d{10}$/;
            var phone = $(".JS-phone").val();
            if (re.test(phone)) {
                $(".wrap-title").text("").css("font-size", "0.35rem").text("验证手机号码");
                return true;
            } else {
                console.log("手机号错误");
                $(".wrap-title").text("").css("font-size", "0.28rem");
                $(".wrap-title").text("抱歉，您输入的手机号码或验证码错误，请");
                $(".wrap-title").append("<span>重新输入。</span>");
                return false;
            }
        },
        checkCode: function () {
            var _this = this;
            var code = $(".JS-code").val();
            if (code == "") {
                $(".wrap-title").text("").css("font-size", "0.28rem");
                $(".wrap-title").text("抱歉，您输入的手机号码或验证码错误，请");
                $(".wrap-title").append("<span>重新输入。</span>");
                return false;
            } else {
                return true;
            }
        },
        timeDown: function (ele, howTime) {
            if (ele.hasClass("timing")) {
                return false;
            } else {
                clearInterval(timer);
                ele.text("");
                ele.append("<span></span>秒后重发")
                ele.children().text(howTime);
                ele.addClass("timing");
                ele.parent().append($("<div class='code-mark'></div>"))
                var howTime = howTime - 1;
                var timer = setInterval(function () {
                    // ele.text(howTime + "秒后重发");
                    ele.text("");
                    ele.append("<span></span>秒后重发");
                    ele.children().text(howTime);
                    howTime--;
                    if (howTime < 0) {
                        clearInterval(timer);
                        $(".code-mark").remove();
                        ele.removeClass("timing");
                        ele.text("获取验证码");
                    };
                }, 1000);
            }
        },
    }
    var goApp = {
        start: function () {
            var res = '<div class="bottom-wrap"><a href="gjj51://" id="appAddr">在APP内参与</a></div>';
            $("body").append(res);
        }
    }
    return {
        WeChat: weChat,
        goApp: goApp
    }
})