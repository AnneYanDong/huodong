// define(["jquery"], function($) {
//     /* 通用方法 */
//     var Common = {
//         isObject: function(obj) {
//             return Object.prototype.toString.call(obj) == "[object Object]";
//         },

//         isFunction: function(fn) {
//             return Object.prototype.toString.call(fn) == "[object Function]";
//         },

//         isArray: function(arr) {
//             return Object.prototype.toString.call(arr) == "[object Array]";
//         },

//         isString: function(str) {
//             return Object.prototype.toString.call(arr) == "[object String]";
//         },

//         isNumber: function(num) {
//             return Object.prototype.toString.call(arr) == "[object Number]";
//         },

//         isRegExp: function(re) {
//             return Object.prototype.toString.call(re) == "[object RegExp]";
//         },

//         extend: function(out) { // 浅复制
//             out = out || {};
//             for (var i = 1; i < arguments.length; i++) {
//                 if (!arguments[i]) {
//                     continue;
//                 }
//                 for (var k in arguments[i]) {
//                     if (arguments[i].hasOwnProperty(k)) {
//                         out[k] = arguments[i][k];
//                     }
//                 }
//             }
//             return out;
//         },

//         debounce: function(Fn, context, interval) {
//             var timer = null;
//             interval = interval || 500;
//             context = context || this;
//             return function() {
//                 clearTimeout(timer);
//                 timer = setTimeout(function() {
//                     Fn.call(context)
//                 }, interval)
//             }
//         },

//         hintLog: function(txt) {
//             console.log("%c" + "提示：" + txt, "color: #439ef9");
//         },

//         errLog: function(errTxt) {
//             console.log("%c" + "错误：" + errTxt, "color: #ea6262");
//         },

//         viewPortInfo: function() {
//             var deviceWidth, deviceHeight;
//             if (window.innerWidth == undefined) { // IE6,7,8 没有innerWidth
//                 deviceWidth = document.documentElement.clientWidth;
//                 deviceHeight = document.documentElement.clientHeight;
//             } else {
//                 deviceWidth = window.innerWidth;
//                 deviceHeight = window.innerHeight;
//             }
//             return {
//                 w: deviceWidth,
//                 h: deviceHeight
//             }
//         },

//         trimspace: function(str, type) {
//             if (str && this.isString(str)) {
//                 if (type == "left") {
//                     return str.replace(new RegExp("^\\s+"), "");
//                 } else if (type == "right") {
//                     return str.replace(new RegExp("\\s+$"), "");
//                 } else {
//                     return str.replace(new RegExp("^\\s+\|\\s+$", "g"), "");
//                 }
//             }
//         }
//     }

//     /* 常用功能类的 */
//     // 通用方法对外暴露这个
//     var Tool = Object.create(Common);
//     // 移动端自适应用， 通常在加载页面最开始用，不然会出现布局以后出现变动的情况。
//     Tool.setFont = function() {
//         var rate = 7.5;
//         var viewPort = this.viewPortInfo();
//         viewPort.w > 1024 ? 1024 : viewPort.w;

//         $("html")[0].style.fontSize = viewPort.w / rate + "px";
//     }

//     // 处理QQ或者华为等底部有底部控制栏占据可视窗口高度的的问题，重新设置
//     // 以Iphone7 下微信显示宽高比作为参照。
//     Tool.handleBottomStatusBar = function(wrap) {
//         // 获取内容部分区域
//         var aWrap = document.getElementsByClassName(wrap || "content");

//         // 理想状态下的宽高比
//         var idealW = 375;
//         var idealH = 603;
//         var rate = idealW / idealH;

//         var viewPort = this.viewPortInfo();
//         // 实际宽高，期望宽度
//         var realW = viewPort.w;
//         var realH = viewPort.h;

//         var supportW = realH * rate;

//         if ((realW - supportW) > 10) {
//             // 真实宽度大于期望宽度，有底部状态栏，需要重新设置宽度
//             for (var i = 0; i < aWrap.length; i++) {
//                 aWrap[i].style.height = realH + "px";
//                 aWrap[i].style.width = supportW + "px";
//                 aWrap[i].style.margin = "auto";
//             }
//             $("html")[0].style.fontSize = supportW / 7.5 + "px";
//         } else {
//             for (var i = 0; i < aWrap.length; i++) {
//                 aWrap[i].style.height = realH + "px";
//                 aWrap[i].style.width = realW + "px";
//                 aWrap[i].style.margin = "auto";
//             }
//             $("html")[0].style.fontSize = realW / 7.5 + "px";
//         }
//     }

//     // 图片预加载
//     Tool.imgPreLoad = function(obj) {
//         var _this = this;

//         var imgArr = [];
//         $("img").each(function(i, ele) {
//             imgArr.push($(ele).data("src"));
//         })

//         if (!this.isObject(obj)) {
//             this.errLog("参数需要传入一个JSON对象，含有图片数组imgArr和加载完成后的回调函数callback")
//             return false;
//         }

//         // if (!obj.imgArr || !this.isArray(obj.imgArr)) {
//         //     this.errLog("需要传入图片数组")
//         //     return false;
//         // } else {
//         //     var imgArr = obj.imgArr;
//         // }

//         if (!obj.callback || !this.isFunction(obj.callback)) {
//             this.errLog("需要传入图片加载完成后的回调函数")
//             return false;
//         } else {
//             var callback = obj.callback;
//         }
//         var timer = null;
//         var imgNum = imgArr.length;
//         if (imgNum > 0) {
//             var loaded = 0;
//             var finished = function() {
//                 if (imgNum == loaded) {
//                     clearTimeout(timer);
//                     $("img").each(function(i, ele) {
//                         ele.src = $(this).data("src")
//                     })
//                     callback.call(_this); // 定时器内部this指向window.因此需要显示绑定this
//                 }
//             }

//             for (var i = 0; i < imgArr.length; i++) {
//                 var imgObj = new Image();
//                 imgObj.src = imgArr[i];
//                 imgObj.onload = imgObj.onerror = function() {
//                     loaded++;
//                     _this.hintLog("加载完第" + loaded + "张图片")
//                     finished();
//                 }
//             }
//             clearTimeout(timer);
//             timer = setTimeout(function() {
//                 if (loaded < imgNum) {
//                     loaded = imgNum;
//                     finished();
//                 }
//             }, 3000 * imgNum)
//         } else {
//             callback.call(_this);
//         }
//         return this;
//     }

//     // 统计点击情况
//     Tool.buryPoint = function(url) {
//         $("body").on("click", "[bp]", function() {
//             var event = $(this).attr("bp");
//             Ajax.do({
//                 url: url,
//                 data: {
//                     action: "spm",
//                     event: event
//                 },
//                 success: function(d) {
//                     console.log("记录事件：" + event)
//                 },
//                 fail: function() {
//                     console.log("记录失败：" + event)
//                 }
//             })
//         })
//     }

//     // 获取地址栏某个参数
//     Tool.getUrlData = function(search) {
//         var _this = this;
//         var obj = {};
//         var dataArr = window.location.search.slice(1).split("&");
//         // var dataArr = window.location.href.replace(/^.*\?|#.*$/g, "1"); // window.location.search.slice(1)
//         dataArr.forEach(function(ele, index) {
//             try {
//                 var arr = ele.split("=");
//                 obj[arr[0]] = arr[1];
//             } catch (e) {
//                 Common.errLog.call(Tool, e) // 这么写着玩。。
//             }
//         })
//         if (search) {
//             return obj[search];
//         } else {
//             return obj;
//         }
//     }

//     // userAgent
//     Tool.userAgent = function() {
//         var u = window.navigator.userAgent;
//         var app = {
//             mobile: !!u.match(/AppleWebKit.*Mobile.*/),
//             isAndroid: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1 || u.indexOf("android") > -1,
//             isiOS: /[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(u),
//             webApp: -1 == u.indexOf("Safari"),
//             weixin: u.indexOf("MicroMessenger") > -1,
//             isGjj: /^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(u) || /^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(u),
//             isAndroidGjj: /^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(u),
//             isiOSGjj: /^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(u),
//             isGjjFdjsq: /^android\/[\w\W]+client\/[\w\W]+category\/51fdjsq$/.test(u)
//         };
//         return app;
//     }

//     // 域名获取
//     Tool.local = function() {
//         var local = window.location;
//         return {
//             protocol: local.protocol + "//",
//             host: local.host,
//             origin: local.origin + "/"
//         }
//     }


//     /* 常用的UI组件 */
//     // 组件对象，Widget的[[Prototype]]关联到Common（父类）
//     var Widget = Object.create(Common);
//     Widget.init = function() {
//         this.ele = null;
//     }
//     Widget.insertDom = function(where) {
//         var where = where || $("body");
//         if (this.ele) {
//             this.ele.appendTo(where);
//         }
//     }
//     Widget.showAnim = function(t, callback) {
//         var ele = this.ele;
//         if (ele.is(":animated")) {
//             return;
//         } else {
//             ele.fadeIn(t, callback);
//         }
//     }
//     Widget.hideAnim = function(t, callback) {
//         var ele = this.ele;
//         if (ele.is(":animated")) {
//             return;
//         } else {
//             ele.fadeOut(t, callback);
//         }
//     }
//     Widget.removeEle = function() {
//         if (this.ele) {
//             this.ele.remove();
//         }
//     }


//     // 提示框对象
//     var Prompt = Object.create(Widget);
//     Prompt.timer = null;
//     Prompt.create = function() {
//         this.init();
//         if ($(".mt-prompt").length > 0) {
//             this.ele = $(".mt-prompt");
//         } else {
//             this.ele = $("<div class='mt-prompt hide'></div>");
//         }
//         return this;
//     }
//     Prompt.build = function(where) {
//         this.insertDom(where);
//         return this;
//     }
//     Prompt.show = function(txt, promptConfig) {
//         var _this = this;
//         if (!txt) {
//             this.errLog("请输入提示文案");
//         } else {
//             this.ele.text(txt);
//         }
//         if (promptConfig && this.isObject(promptConfig)) {
//             var duration = promptConfig.duration;
//             var animClass = promptConfig.animClass;
//             var callback = this.isFunction(promptConfig.callback) ? promptConfig.callback : null;
//             if (!duration) {
//                 duration = 2000;
//             }
//             if (animClass) {
//                 this.ele.removeClass("hide").addClass("anim-conf anim-init");
//                 setTimeout(function() {
//                     _this.ele.addClass(animClass);
//                 }, 100)
//                 clearTimeout(this.timer);
//                 this.timer = setTimeout(function() {
//                     _this.ele.addClass("hide").removeClass(animClass);
//                     if (callback) {
//                         callback();
//                     }
//                 }, duration)
//             } else {
//                 this.showAnim();
//                 clearTimeout(this.timer);
//                 this.timer = setTimeout(function() {
//                     _this.hideAnim();
//                     if (callback) {
//                         callback();
//                     }
//                 }, duration)
//             }
//         } else if (!promptConfig) {
//             this.showAnim();
//             clearTimeout(this.timer);
//             this.timer = setTimeout(function() {
//                 _this.hideAnim();
//                 if (callback) {
//                     callback();
//                 }
//             }, 2000)
//         } else {
//             this.errLog("Prompt.show()的参数配置错误")
//         }
//         return this;
//     }


//     // 确认框
//     var Confirm = Object.create(Widget);
//     Confirm.create = function(config) {
//         var _this = this;
//         this.init();
//         if (config.txt) {
//             config.title = config.title ? config.title : "注意";
//             var oMtConfirm = $("<div class='mt-confirm hide'><h6 class='mt-confirm-title'>" + config.title + "</h6><p class='mt-confirm-p'>" + config.txt + "</p></div>");
//         } else {
//             this.errLog("没有确认框txt或title")
//         }
//         this.ele = oMtConfirm;

//         // 按钮部分
//         var btnArea = $("<div class='mt-button-area'></div>");
//         btnArea.appendTo(oMtConfirm);
//         if (config.btnArr && this.isArray(config.btnArr)) {
//             var flag = config.btnArr.every(function(item, index, array) {
//                 return _this.isObject(item)
//             })
//             if (flag) {
//                 var btnLength = config.btnArr.length;
//                 for (var i = 0; i < btnLength; i++) {
//                     var oBtn;
//                     if (config.btnArr[i].btnTxt) {
//                         oBtn = $("<div class='mt-btn'>" + config.btnArr[i].btnTxt + "</div>");
//                     } else {
//                         this.errLog("按钮名称未定义");
//                     }

//                     if (config.btnArr[i].btnFn) {
//                         oBtn.on("click", config.btnArr[i].btnFn);
//                     } else {
//                         this.errLog("未给按钮定义Fn");
//                     }

//                     if (config.btnArr[i].btnCls) {
//                         oBtn.addClass(config.btnArr[i].btnCls);
//                     } else {
//                         this.hintLog("开发者自己选择是否需要给按钮增加特殊class")
//                     }

//                     oBtn.appendTo(btnArea);
//                 }

//                 // 按钮个数不同，对应不同Class样式
//                 if (btnLength == 1) {
//                     return;
//                 } else if (btnLength == 2) {
//                     btnArea.addClass("mt-btn-num-2")
//                 } else if (btnLength == 3) {
//                     btnArea.addClass("mt-btn-num-3")
//                 } else {
//                     this.errLog("3个按钮还不够你玩？自己写Class吧")
//                 }
//             } else {
//                 this.errLog("按钮配置格式错误，请检查是否是[{},{},...]");
//             }
//         } else {
//             $("<div class='mt-btn'>关闭</div>").appendTo(btnArea).on("click", function() {
//                 this.hideAnim(function() {
//                     if ($(".mt-mask").length > 0) {
//                         $(".mt-mask").hide();
//                     }
//                 });

//             }.bind(this));
//             // 原生bind(this) 这里的this就是confirm的委托对象（实例）
//         }

//         return this;
//     }

//     Confirm.build = function(where) {
//         this.insertDom(where);
//         return this;
//     }

//     Confirm.show = function() {
//         this.showAnim();
//     }

//     // 遮罩层
//     var Mask = Object.create(Widget);
//     Mask.create = function() {
//         this.init();
//         if ($(".mt-mask").length != 0) {
//             this.ele = $(".mt-mask");
//         } else {
//             this.ele = $("<div class='mt-mask hide'></div>");
//         }
//         return this;
//     }
//     Mask.build = function(where) {
//         this.insertDom(where);
//         return this;
//     }
//     Mask.show = function() {
//         this.ele.show();
//         return this;
//     }
//     Mask.hide = function() {
//         this.ele.hide();
//         return this;
//     }
//     Mask.customFn = function(fn) {
//         fn();
//         return this;
//     }

//     // ajax请求加载的遮罩层，继承普通遮罩层
//     var ajaxMask = Object.create(Mask);
//     ajaxMask.create = function(color) {
//             this.init();
//             if ($(".mt-ajax-mask").length != 0) {
//                 this.ele = $(".mt-ajax-mask");
//             } else {
//                 var animWrap = $("<div class='mt-ajax-ele-wrap'></div>");
//                 var ajaxMask = $("<div class='mt-ajax-mask hide'></div>");
//                 for (var i = 0; i < 3; i++) {
//                     $("<span>", {
//                         class: "mt-ajax-anim-ball" + (i + 1)
//                     }).css({
//                         backgroundColor: color || "#439df8"
//                     }).appendTo(animWrap);
//                 }
//                 animWrap.appendTo(ajaxMask);
//                 this.ele = ajaxMask;
//             }
//             return this;
//         }
//         // show,hide,bulid方法均省略,可调用原型上的，调用原型链上Mask

//     ajaxMask.anim = function() {
//         this.ele.find("span").addClass("mt-ajax-anim-conf");
//         return this;
//     }

//     ajaxMask.stopAnim = function() {
//         this.ele.find("span").removeClass("mt-ajax-anim-conf");
//         return this;
//     }

//     // 资源预加载动画，H5活动页经常会用到
//     var preLodingUi = Object.create(Widget);
//     preLodingUi.create = function(loadingCls) {
//         this.init();
//         var loadingContainer = $("<div class='mt-pre-loading'><p class='mt-pre-loading-des'>Waiting For Loading...</p></div>");
//         var loadingEle = $("<div class='mt-pre-loading-ele'></div>");
//         loadingEle.appendTo(loadingContainer);
//         this.ele = loadingContainer;
//         if (loadingCls) {
//             loadingContainer.addClass(loadingCls.preLoadingCls);
//             loadingEle.addClass(loadingCls.loadingEleCls);
//         }
//         return this;
//     }
//     preLodingUi.build = function(where) {
//         this.insertDom(where);
//         return this;
//     }
//     preLodingUi.hide = function(showContent) {
//         var _this = this;
//         var showContent = showContent || ".wrap";
//         this.hideAnim(300, function() {
//             _this.ele.remove();
//             $(showContent).show();
//         });
//         return this;
//     }

//     var Ajax = Object.create(Common);
//     // 创建XMLHttpRequest对象
//     Ajax.createXhrObj = function() {
//         this.xhr = null;
//         if (window.XMLHttpRequest) {
//             this.xhr = new XMLHttpRequest();
//         } else {
//             this.xhr = new ActiveXObject();
//         }
//         return this;
//     }
//     Ajax.setConfig = function(option) {
//         var config = {
//             method: "POST",
//             type: "JSON",
//             async: true,
//             data: {},
//             before: function() {},
//             success: function() {},
//             fail: function() {}
//         }
//         this.config = this.extend({}, config, option);
//         this.config.method = this.config.method.toUpperCase();
//         this.config.type = this.config.type.toUpperCase();
//         return this;
//     }
//     Ajax.do = function(option) {
//         var _this = this;
//         this.createXhrObj();
//         this.setConfig(option);
//         var xhr = this.xhr;
//         var config = this.config;
//         if (config.before && this.isFunction(config.before)) {
//             config.before();
//         }
//         var timestamp = new Date().getTime(); // 防止ajax请求缓存
//         if (config.method == "GET") {
//             xhr.open("GET", config.url + "?" + this.formateData(config.data) + "&timestamp=" + timestamp, config.async);
//             xhr.send();
//         } else {
//             xhr.open("POST", config.url + "?timestamp=" + timestamp, config.async);
//             xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//             xhr.send(this.formateData(config.data));
//         }
//         xhr.onreadystatechange = function() {
//             if (xhr.readyState == 4) {
//                 if (xhr.status == 200) {
//                     switch (_this.config.type) {
//                         case "JSON":
//                             var d = JSON.parse(xhr.responseText);
//                             config.success(d);
//                             break;
//                         case "XML":
//                             var d = xhr.responseXML;
//                             config.success(d);
//                             break;
//                         default:
//                             var d = xhr.responseText;
//                             config.success(d);
//                             break;
//                     }
//                 } else {
//                     config.fail && config.fail(status);
//                 }
//             }
//         }
//     }
//     Ajax.formateData = function(data) {
//         var dataArr = [];
//         for (var k in data) {
//             var val = data[k];
//             dataArr.push(k + "=" + val);
//         }
//         return dataArr.join("&");
//     }

//     var Cookie = Object.create(Common);
//     Cookie.originCookies = function() {
//         return document.cookie;
//     }
//     Cookie.get = function(obj) {
//         var obj = obj || {};
//         if (this.isObject(obj)) {

//         }
//     }
// })

window.ct = {
    isObject: function(obj) {
        return Object.prototype.toString.call(obj) == "[object Object]";
    },

    isFunction: function(fn) {
        return Object.prototype.toString.call(fn) == "[object Function]";
    },

    isArray: function(arr) {
        return Object.prototype.toString.call(arr) == "[object Array]";
    },

    isString: function(str) {
        return Object.prototype.toString.call(str) == "[object String]";
    },

    isNumber: function(num) {
        return Object.prototype.toString.call(num) == "[object Number]";
    },

    isRegExp: function(re) {
        return Object.prototype.toString.call(re) == "[object RegExp]";
    },

    /**
     * @str  {[需要去除空格的字符串]}
     * @type  {[左边还是右边，默认是两边]}
     * @return {[去除空格后的字符串]}
     */
    trimspace: function(str, type) {
        if (str && this.isString(str)) {
            if (type == "left") {
                return str.replace(new RegExp("^\\s+"), "");
            } else if (type == "right") {
                return str.replace(new RegExp("\\s+$"), "");
            } else {
                return str.replace(new RegExp("^\\s+\|\\s+$", "g"), "");
            }
        }
    },

    /**
     * @return {obj，显示区域宽高}
     */
    viewPortInfo: function() {
        var deviceWidth, deviceHeight;
        if (window.innerWidth == undefined) { // IE6,7,8 没有innerWidth
            deviceWidth = document.documentElement.clientWidth;
            deviceHeight = document.documentElement.clientHeight;
        } else {
            deviceWidth = window.innerWidth;
            deviceHeight = window.innerHeight;
        }
        return {
            w: deviceWidth,
            h: deviceHeight
        }
    },

    setFont: function() {
        var rate = 7.5;
        var viewPort = this.viewPortInfo();
        viewPort.w > 1024 ? 1024 : viewPort.w;
        $("html")[0].style.fontSize = viewPort.w / rate + "px";
    },

    handleBottomStatusBar: function(wrap) {
        // 获取内容部分区域
        var aWrap = document.getElementsByClassName(wrap || "content");

        // 理想状态下的宽高比
        var idealW = 375;
        var idealH = 603;
        var rate = idealW / idealH;

        var viewPort = this.viewPortInfo();
        // 实际宽高，期望宽度
        var realW = viewPort.w;
        var realH = viewPort.h;

        var supportW = realH * rate;

        if ((realW - supportW) > 10) {
            // 真实宽度大于期望宽度，有底部状态栏，需要重新设置宽度
            for (var i = 0; i < aWrap.length; i++) {
                aWrap[i].style.height = realH + "px";
                aWrap[i].style.width = supportW + "px";
                aWrap[i].style.margin = "auto";
            }
            $("html")[0].style.fontSize = supportW / 7.5 + "px";
        } else {
            for (var i = 0; i < aWrap.length; i++) {
                aWrap[i].style.height = realH + "px";
                aWrap[i].style.width = realW + "px";
                aWrap[i].style.margin = "auto";
            }
            $("html")[0].style.fontSize = realW / 7.5 + "px";
        }
    },

    local: function() {
        var local = window.location;
        return {
            protocol: local.protocol + "//",
            host: local.host,
            origin: local.origin + "/"
        }
    },

    // 拿完整的域名
    appHost: function() {
        var host = this.local().host;
        var appHost = '';
        if (/b.jianbing.com/g.test(host)) {
            appHost = "https://b.jianbing.com";
        } else if (/test.jianbing.com/g.test(host)) {
            appHost = "https://test.jianbing.com";
        } else {
            appHost = "https://kaifa.jianbing.com";
        }
        return appHost;
    },

    // 包装URL
    packingUrl: function(url, local) {
        var appHost = this.appHost();
        var newUrl = appHost + url;
        if (local) {
            return "http://127.0.0.1" + url;
        }
        return newUrl;
    },

    // 包装当前URL(包含已有参数)+自定义参数
    extendUrl: function(obj) {
        var url = this.trimspace(obj.url) || this.trimspace(window.location.href);
        var str;
        if (obj.query) {
            var obj = obj.query;
            str = '&';
            for (var k in obj) {
                str += k + "=" + obj[k];
            }
        } else {
            str = '';
        }
        return url + str;
    },

    // 获取地址栏的某个参数
    getUrlData: function(search) {
        var _this = this;
        var obj = {};
        var dataArr = window.location.search.slice(1).split("&");
        // var dataArr = window.location.href.replace(/^.*\?|#.*$/g, "1"); // window.location.search.slice(1)
        dataArr.forEach(function(ele, index) {
            var arr = ele.split("=");
            obj[arr[0]] = arr[1];
        })
        if (search) {
            return obj[search];
        } else {
            return obj;
        }
    },

    // userAgent
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

    prompt: function(option) {
        var _this = this;
        if (!this.isObject(option)) {
            console.log("配置不存在");
            return;
        }
        var timer;
        var txt = option.txt || "提示文案配置了吗?";
        var duration = option.duration || 2000;
        var callback = option.callback || null;
        if ($(".mt-prompt").length > 0) {
            $(".mt-prompt").remove();
        }
        var ele = $("<div class='mt-prompt'>" + txt + "</div>");
        $("body").append(ele);
        clearTimeout(timer);
        timer = setTimeout(function() {
            ele.remove();
            if (callback && _this.isFunction(callback)) {
                callback();
            }
        }, duration);
    }
}
