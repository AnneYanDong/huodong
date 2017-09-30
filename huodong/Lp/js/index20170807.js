var init = {
    fn: function() {
        this.searchClick();
        this.getCode();
        this.isInputEnter();
        this.btnBuryPoint();
        this.PageBuryRequest();
        this.setFont(750,100);
    },
    //获得查询字符串
    getQueryStringArgs: function() {
        var qs = location.search.length > 0 ? location.search.substring(1) : 0;
        var items = qs.length > 0 ? qs.split("&") : [];
        var item = null,
            name = null,
            value = null,
            len = items.length;
        var args = {};
        for(var i = 0; i < len; i ++) {
            item = items[i].split("=");
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);

            if(name.length) {
                args[name] = value;
            }
        }
        return args;
    },
    //点击获取验证码
    getCode: function() {
        var skipTimer = null;
        // var oUrl = "test.php";

        var oUrl = "/act/market/get_verification_code";
        var _this = this;
        $(".JS-get-code").on("click", function() {
            console.log(".......");
            if (_this.checkPhone($(".JS-phone"))) {
                var phoneNum = $(".JS-phone").val();
                $.ajax({
                    url: oUrl,
                    type: "POST",
                    dataType: "JSON",
                    data:JSON.stringify({"phone": phoneNum,"place_name":place_name}),
                    success: function(d) {
                        if (d.success === true) {
                            _this.alertBox("短信验证码已发送，请注意查收",2000);
                            _this.timeDown($(".JS-get-code"), 60)
                        } else if(d.code == 512){
                        	_this.alertBox("您已注册，直接参与吧",1000);
                        	skipTimer = setTimeout(function(){
                                $(".section").addClass("slideTop");
                            },1500)
                        } else{
                        	$(".JS-get-code").removeClass("timing");
                        	_this.alertBox(d.msg || "出错了，请重试",1000)
                        }
                    },
                    error: function(xhr){
                    	$(".JS-get-code").removeClass("timing");
                    	_this.alertBox("发生错误" + xhr + "，请重试",1000);
                    }
                })
            }
        })
    },
    //点击查询
    searchClick: function() {
        var _this = this;
        var skipTimer = null;
        var args = _this.getQueryStringArgs(),
            place_name = args["p"];
            console.log("place_name=",place_name);
        // var oUrl = "test.php";
        var oUrl = "/act/market/get_register";
        $(".search-btn").on("click", function() {
            if (_this.checkPhone($(".phone input")) && _this.checkCode($(".msg-code input"))) {
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
                        	$(".section").addClass("slideTop");
                        }else if (d.code == 512){
                        	_this.alertBox("您已注册，直接参与吧",1000);
                        	clearTimeout(skipTimer);
                            skipTimer = setTimeout(function(){
                                $(".section").addClass("slideTop");
                            },1500)
                        }else{
                        	_this.alertBox(d.msg || "出错了，请重试",1000)
                        }
                    },
                    error: function(xhr) {
                        _this.alertBox("发生错误" + xhr + "，请重试",1000);
                    }
                })
            } else {

            }
        })
    },
    setFont: function(d, c) {
        var b = {},
            a = document,
            f;
        b.widthProportion = function() {
            var e = (a.body && a.body.clientWidth || a.getElementsByTagName("html")[0].offsetWidth || window.innerWidth) / d;
            // console.log(e);
            return e
        };
        b.changePage = function() {
            var f = b.widthProportion() * c,
                obj = a.getElementsByTagName("html")[0];
            obj.setAttribute("style", "font-size:" + f + "px !important");
            var style = null;
            if (window.getComputedStyle) {
                style = window.getComputedStyle(obj, null);
                font = style.fontSize;
                font = Number(font.replace("px", ""));
                if (font > f) {
                    var per = font / f;
                    obj.setAttribute("style", "font-size:" + f / per + "px !important");
                }
            }
        };
        b.changePage();
        addEventListener("resize", b.changePage, false);
    },
    userAgent: function() {
        var u = window.navigator.userAgent;
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
        return app;
    },
    btnBuryPoint: function() {
        var _this = this;
        $(document).on("click", "[bp]", function() {
          var event = $(this).attr("bp");
          var url = "/act/request/activity";
          $.ajax({
            url: url,
            data: {
              tag: event,
              source: _this.userAgent().isGjj ? 1 : 0
            },
            success: function(d) {
              console.debug("埋点记录成功：" + event)
            },
            fail: function() {
              console.debug("埋点记录失败：" + event)
            }
          })
        })
    },
    PageBuryRequest: function () {
        var _this = this;
        $.ajax({
            type: "POST",
            dataType: "JSON",
            url: "/act/request/activity",
            data: JSON.stringify({
                source: _this.userAgent().isGjj ? 1 : 0,
                tag: "进入页面"
            }),
            success: function (d) {
                if (d.success) {

                }
            }
        });
    },

    //校验手机号和短信验证码的方法
    checkPhone: function(ele) {
        var _this = this;
        var reg = /^1\d{10}$/;
        var phoneNum = ele.val();
        if (reg.test(phoneNum)) {
            return true;
        } else {
            _this.alertBox("请输入正确的手机号！",2000)
        }
    },

    checkCode: function(ele) {
        var _this = this;
        var codeNum = ele.val();
        if (codeNum != "") {
            return true;
        } else {
            _this.alertBox("验证码错误或未输入",2000);
        }
    },

    //弹窗
    alertBox: function(txt,howTime) {
        var alertTimer = null;
        var alertBox = $(".alert-box");
        clearTimeout(alertTimer);
        if (alertBox.length == 0) {
            $("body").append($("<div class='alert-box'>" + txt + "</div>"));
            alertTimer = setTimeout(function() {
                // $(".alert-box").hide();
                $(".alert-box").remove();
            }, howTime)
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

    //onchange事件检测输入情况，查询按钮变色
    isInputEnter: function(){
        var reg = /^1\d{10}$/;
        $(".JS-code").on("input",function(){
            var phoneNum = $(".JS-phone").val();
            if (reg.test(phoneNum) && $(".JS-code").val().length > 0) {
                $(".search-btn").removeClass("search-btn-not-active").addClass("search-btn-active");
            }else{
                $(".search-btn").removeClass("search-btn-active").addClass("search-btn-not-active");
            }
        })      
    }
}

window.onload = function() {
	init.fn();
}


function getURLParams(url) {
    var urlParts = url.split("?");
    var result = {};
    if (urlParts[1]) {
        urlParts[1] = urlParts[1].split("#")[0];
        var params = urlParts[1].split("&");

        for (var i = 0; i < params.length; ++i) {
            var item = params[i].split("=");
            var key = decodeURIComponent(item[0]);
            var val = decodeURIComponent(item[1]);
            result[key] = val;
        }
    }
    return result;
}
