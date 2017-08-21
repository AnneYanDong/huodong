<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=1.0, minimum-scale=1.0, maximum-scale=1.0, width=device-width">
    <meta name="format-detection" content="telephone=no">
    <title>你的公积金有多少钱？除了买房还能干啥？</title>
    <link rel="stylesheet" href="css/public.css">
    <style>
        .user-info{
            position: relative;
            background: #fff;
            padding: .4rem 0;
        }
        .user-info input{
            border: none;
            outline: none;
        }
        .input-wrap{
            height: .9rem;
            width: 6rem;
            text-align: center;
            padding: 0 10px;
            background: #fff;
            border: 1px solid #c7c7c7;
            margin: 0 auto;
        }
        .input-wrap:first-child{
            border-radius: 5px 5px 0 0;
            border-bottom: 0;
        }
        .input-wrap+.input-wrap{
            border-radius:  0 0 5px 5px;
            border-top: 0;
        }
        .input-wrap input{
            width: 100%;
            height: 95%;
            margin: 0 auto;
        }
        .code{
            position: relative;
            overflow: hidden;
        }
        .code:before{
            position: absolute;
            content: "";
            display: block;
            width: 80%;
            height: 2px;
            background: #bfbfbf;
            top: 0;
            left: 4%;
        }
        .code .get-code {
            position: absolute;
            top: 0rem;
            right: 0;
            width: 1.9rem;
            height: 0.92rem;
            line-height: 0.92rem;
            z-index: 2;
            background: #ff8700;
            color: #fff;
            text-align: center;
            font-size: 13px;
            border-radius: 0 0 5px 0;
        }

        .code .code-mark {
            position: absolute;
            top: 0;
            right: 0;
            width: 2.2rem;
            height: 0.9rem;
            z-index: 3;
            background: transparent;
        }

        .search-btn{
            background: #fece02;
            width: 86%;
            height: 1rem;
            margin: .4rem auto;
            border-radius: 5px;
            text-align: center;
            line-height: 1rem;
            color: #5c3701;
        }
        .prompt{
            color: #9c9c9c;
            padding: 0 .4rem;
        }
        .prompt a{
            color: #028efd;
        }
        .bottom-float{
            width: 80%;
            height: 1.28rem;
            position: absolute;
            top: 9.4rem;
            left: 50%;
            transform: translateX(-50%);
            -webkit-transform: translateX(-50%);
            background: transparent;            
        }
        .bottom-float a{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
    </style>
    <script src="https://r.51gjj.com/act/release/js/lib/jQuery.min.js"></script>
    <script>
        var setFontSize = {
            debounce: function(Fn, context, interval) {
                var timer = null;
                interval = interval || 500;
                context = context || this;
                return function() {
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        Fn.call(context)
                    }, interval)
                }
            },

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

            setFont: function(){
                var oHtml = document.getElementsByTagName("html")[0];
                var oWrap = document.getElementsByClassName("container")[0];
                var rate = 7.5;
                var viewPort = this.viewPortInfo();
                viewPort.w = viewPort.w > 768 ? 768 : viewPort.w;
                document.getElementsByTagName("html")[0].style.fontSize = viewPort.w / rate + "px";     
            },
        }
        setFontSize.setFont();
        window.addEventListener("resize", setFontSize.debounce(setFontSize.setFont));
    </script>
</head>
<body style="background-color: #fff8dc;">
    <div class="container" style="max-width: 768px; margin: 0 auto;">
        <div class="box">
            <div class="section section-one">
                <div class="banner-part-one">
                    <img class="bg" src="//r.51gjj.com/act/images/20161028v2_2_bg1.jpg" alt="bg">
                </div>
                <div class="user-info">
                    <div class="phone input-wrap">
                        <input type="text" placeholder="请输入您的手机号" class="JS-phone" maxlength="11">
                    </div>
                    <div class="code input-wrap">
                        <input type="text" placeholder="请输入验证码" class="JS-code" maxlength="10">
                        <div class="get-code JS-get-code">获取验证码</div>
                    </div>
                    <div class="search-btn search-btn-not-active">
                        领取1000元免费借款
                    </div>
<!--                     <div class="prompt">
                        老用户请使用<a href="gjj51://">APP登录</a>
                    </div> -->
                </div>
                <div class="banner-part-two">
                    <img class="bg" src="//r.51gjj.com/act/images/20161028v2_1_bg2.jpg" alt="bg">
                    <div class="copyright" style="font-size: 11px; color:#333; background: #fff; text-align: center;">
                        <p style="padding: 5px 0;">杭州煎饼网络技术有限公司 浙ICP备12029872号-3</p>
                    </div>
                </div>
                <div class="cnzz">
                    浙ICP备12029872号©2014-2016&nbsp;&nbsp;51公积金管家
                    <script type="text/javascript">
                    var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
                    document.write(unescape("%3Cspan id='cnzz_stat_icon_1256135023'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s95.cnzz.com/z_stat.php%3Fid%3D1256135023%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));
                    </script>
                </div>
            </div>
            <div class="section section-two" style="background: #fff">
                <img src="//r.51gjj.com/act/images/20161028v2_2_bg2.jpg" alt="down_banner">
                <div class="bottom-float">
                    <a class="bottom-down-app" href="javascript:;" id="appAddr"></a>
                </div>
            </div>
        </div>
    </div>
    <script src="js/index20170807.js?v=1502334189"></script>
    <script>
        //判断渠道
        function is_weixn() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return true;
            } else {
                return false;
            }
        }
        function userAgent() {
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
        }
        // 页面埋点
       $.ajax({
           type: "POST",
           dataType: "JSON",
           url: "/act/request/activity",
           data: JSON.stringify({
               place_cid: userAgent().isGjj ? 1 : 0,
               tag: "进入页面index170815_z3.php"
           }),
           success: function (d) {
               if (d.success) {

               }
           }
       });
        var appAddr = document.getElementById('appAddr');
        if (is_weixn()) {
            var wxurl = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.balance6game.housingfund';
            appAddr.href = wxurl;
        } else {
            var place_name = window.location.search;
            if (place_name) {
                place_name = place_name.match(/[?&]p=([^&]+)/);
                if (place_name) {
                    place_name = decodeURIComponent(place_name[1]);
                }
            }
            if (!place_name) {
                place_name = window.location.hash;
                if (place_name) {
                    place_name = place_name.substr(1);
                }
            }
            if (!place_name) {
                place_name = 'jianbing';
            }
            var browser = {
                versions: function() {
                    var u = navigator.userAgent,
                        app = navigator.appVersion;
                    return { //移动终端浏览器版本信息
                        trident: u.indexOf('Trident') > -1, //IE内核
                        presto: u.indexOf('Presto') > -1, //opera内核
                        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                        mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                        iPad: u.indexOf('iPad') > -1, //是否iPad
                        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                    };
                }(),
                language: (navigator.browserLanguage || navigator.language).toLowerCase()
            };

            if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
                appAddr.href = "https://itunes.apple.com/app/apple-store/id908573399?pt=83635804&ct=" + place_name + "&mt=8";
            } else {
                appAddr.href = 'http://apk.51gjj.com/51gjj_' + place_name + '.apk';
            }
        }

        appAddr.onclick = function() {
            _czc.push(['_trackEvent', 'page', 'db', appAddr.href.substr(27, 20), '1', 'appAddr']);
            console.log("CNCC记录发送");
            return true;
        };
    </script>
    <script>
        //CNCC统计用
        var _czc = _czc || [];
        _czc.push(["_setAccount", "1256135023"]);
</script>
</body>
</html>
