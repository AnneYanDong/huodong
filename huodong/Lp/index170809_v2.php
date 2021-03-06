<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=1.0, minimum-scale=1.0, maximum-scale=1.0, width=device-width">
    <meta name="format-detection" content="telephone=no">
    <title>51公积金管家</title>
    <link rel="stylesheet" href="css/public.css">
    <style>
        .slideTop {
            transform: translateY(-100%);
            -ms-transform: translateY(-100%);
            -moz-transform: translateY(-100%);
            -webkit-transform: translateY(-100%);
        }
        .user-info{
            position: relative;
            background: #ffffff;
            padding: .4rem 0;
        }
        .user-info input{
            border: none;
            outline: none;
        }
        .input-wrap{
            height: 1.35rem;
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
            height: 100%;
            margin: 0 auto;
        }
        .code{
            position: relative;
            /*overflow: hidden;*/
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
            /*top: 0rem;*/
            bottom: 0;
            right: 0;
            width: 1.9rem;
            height: 1.35rem;
            line-height: 1.35rem;
            z-index: 2;
            background: #fc615f;
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
            background: #fc615f;
            width: 86%;
            height: 1.08rem;
            margin: .4rem auto;
            border-radius: 5px;
            text-align: center;
            line-height: 1.08rem;
            color: #fff;
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
            top: 8.2rem;
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
        function setFont(d, c) {
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
        }
        setFont(750, 100);
    </script>
</head>
<body>
    <div class="container">
        <div class="box">
            <div class="section section-one">
                <div class="banner-part-one">
                    <img class="bg" src="https://r.51gjj.com/act/images/shichang/20170428bg4.gif" alt="bg">
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
                        免费申请
                    </div>
<!--                     <div class="prompt">
                        老用户请使用<a href="gjj51://">APP登录</a>
                    </div> -->
                </div>
                <div class="banner-part-two">
                    <img class="bg" src="https://r.51gjj.com/act/images/shichang/20170810_bg.png" alt="bg">
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
                <img src="https://r.51gjj.com/act/images/shichang/20170428bg6.jpg" alt="down_banner">
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
        //获得查询字符串
        function getQueryStringArgs() {
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
        }
        var appAddr = document.getElementById('appAddr');
        if (is_weixn()) {
            var wxurl = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.balance6game.housingfund';
            appAddr.href = wxurl;
        } else {

            // var place_name = window.location.search;
            // if (place_name) {
            //     place_name = place_name.match(/[?&]p=([^&]+)/);
            //     if (place_name) {
            //         place_name = decodeURIComponent(place_name[1]);
            //     }
            // }
            // if (!place_name) {
            //     place_name = window.location.hash;
            //     if (place_name) {
            //         place_name = place_name.substr(1);
            //     }
            // }
            // if (!place_name) {
            //     place_name = 'jianbing';
            // }
            // var links = [];
            var args = getQueryStringArgs();
            var place_name = args["p"];
            var links_param = args["t"];
            console.log("place_name=",place_name);
            console.log("links_param=",links_param);
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
                    if (place_name == "xhhuichuan5" && links_param == "xuhang5") {
                        appAddr.href = "https://lnk0.com/o8UB9o";
                    }
                    if (place_name == "xhhuichuan4" && links_param == "xuhang4") {
                        appAddr.href = "https://lnk0.com/9QhQRd";
                    }
                    if (place_name == "xhhuichuan3" && links_param == "xuhang3") {
                        appAddr.href = "https://lnk0.com/hIpso4";
                    }
                    if (place_name == "xhhuichuan2" && links_param == "xuhang2") {
                        appAddr.href = "https://lnk0.com/UNFRp4";
                    }
                    if (place_name == "xhhuichuan1" && links_param == "xuhang1") {
                        appAddr.href = "https://lnk0.com/QJZNBh";
                    }
                    if (place_name == "jmtoutiao1" && links_param == "toutiao41") {
                        appAddr.href = "https://lnk0.com/wBxJ1c";
                    }
                    if (place_name == "jmtoutiao2" && links_param == "toutiao40") {
                        appAddr.href = "https://lnk0.com/YhcIhs";
                    }
                    if (place_name == "jmtoutiao3" && links_param == "toutiao39") {
                        appAddr.href = "https://lnk0.com/VxVhQ5";
                    }
                    if (place_name == "jmtoutiao4" && links_param == "toutiao38") {
                        appAddr.href = "https://lnk0.com/RlgIB9";
                    }
                    if (place_name == "fhxw1" && links_param == "fhxinwen1") {
                        appAddr.href = "https://lnk0.com/M1IBBd";
                    }
                    if (place_name == "fhxw2" && links_param == "fhxinwen2") {
                        appAddr.href = "https://lnk0.com/10IZx9";
                    }
                    if (place_name == "fhxw3" && links_param == "fhxinwen3") {
                        appAddr.href = "https://lnk0.com/dgQpco";
                    }
                    if (place_name == "fhxw4" && links_param == "fhxinwen4") {
                        appAddr.href = "https://lnk0.com/9cApQt";
                    }
                    if (place_name == "fhxw5" && links_param == "fhxinwen5") {
                        appAddr.href = "https://lnk0.com/lUJNNt";
                    }
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
