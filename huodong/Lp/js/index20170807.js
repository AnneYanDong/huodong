var init = {
    fn: function() {
        this.searchClick();
        this.getCode();
        this.isInputEnter();
    },
 
    //点击获取验证码
    getCode: function() {
        var skipTimer = null;
        // var oUrl = "test.php";

        var oUrl = "/act/market/get_verification_code";
        var _this = this;
        $(".JS-get-code").on("click", function() {
            if (_this.checkPhone($(".JS-phone"))) {
                var phoneNum = $(".JS-phone").val();
                $.ajax({
                    url: oUrl,
                    type: "POST",
                    dataType: "JSON",
                    data:
                        JSON.stringify({"phone": phoneNum})
                    ,
                    success: function(d) {
                        if (d.success === true) {
                            _this.alertBox("短信验证码已发送，请注意查收",2000);
                            _this.timeDown($(".JS-get-code"), 60)
                        } else if(d.code == 512){
                        	_this.alertBox("您已注册，参与活动吧",3000);
                        	skipTimer = setTimeout(function(){
                                $(".section").addClass("slideTop");
                            },3000)
                        } else{
                        	$(".JS-get-code").removeClass("timing");
                        	_this.alertBox(d.errmsg || "出错了，请重试",2000)
                        }
                    },
                    error: function(xhr){
                    	$(".JS-get-code").removeClass("timing");
                    	_this.alertBox("发生错误" + xhr + "，请重试",2000);
                    }
                })
            }
        })
    },
    //点击查询
    searchClick: function() {
        var _this = this;
        var skipTimer = null;
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
	                        "place": "market_register"
                     	}),
                    success: function(d) {
                        if (d.success === true) { //手机号码验证码都正确，跳转到H5查询
                        	$(".section").addClass("slideTop");
                        }else if (d.code == 512){
                        	_this.alertBox("您已注册，直接参与活动吧",3000);
                        	clearTimeout(skipTimer);
                            skipTimer = setTimeout(function(){
                                $(".section").addClass("slideTop");
                            },3000)
                        }else{
                        	_this.alertBox(d.errmsg || "出错了，请重试",2000)
                        }
                    },
                    error: function(xhr) {
                        _this.alertBox("发生错误" + xhr + "，请重试",2000);
                    }
                })
            } else {

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
