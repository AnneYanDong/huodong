<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width">
    <meta name="format-detection" content="telephone=no">
    <title>51公积金管家</title>
    <link rel="stylesheet" href="css/style_v1.css">
    <style>
        .banner-part-one .btn-down{
            width: 2.8rem;
            height: .7rem;
            background: transparent;
            position: absolute;
            top: 10.76rem;
            left: 4.1rem;
        }
        .banner-part-one .btn-down a{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .bottom-float,.cnzz{
            display: none;
        }
        #other-down{
            position: absolute;
            width: 4.18rem;
            height: 1.1rem;
            top: 4rem;
            left: 50%;
            margin-left: -2.09rem;
        }

    </style>
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
    <script>
    var _czc = _czc || [];
    _czc.push(["_setAccount", "1256135023"]);
    </script>
</head>

<body>
    <div class="container">
        <div class="banner-part-one">
            <img class="bg" src="//r.51gjj.com/act/images/shichang/20170315_v1_new.jpg" alt="bg">
            <div class="btn-down">
                <a href="javascript:;" id="appAddr"></a>
            </div>
        </div>
        <div class="cnzz">
            浙ICP备12029872号©2014-2016&nbsp;&nbsp;51公积金借款
            <script type="text/javascript">
            var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
            document.write(unescape("%3Cspan id='cnzz_stat_icon_1256135023'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s95.cnzz.com/z_stat.php%3Fid%3D1256135023%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));
            </script>
        </div>
        <a id="other-down"></a>
    </div>
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
    var appAddr = document.getElementById('appAddr');
    var otherDown = document.getElementById("other-down");
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
            //https://itunes.apple.com/app/apple-store/id908573399?pt=83635804&ct=aaa&mt=8
            //"https://itunes.apple.com/us/app/51gong-ji-jin-guan-jia-zhu/id908573399?mt=8";
            appAddr.href = "https://lnk0.com/9ksw5c";
        } else {
            appAddr.href = "https://lnk0.com/EF9wJl";
        }
    }

    appAddr.onclick = function() {
        _czc.push(['_trackEvent', 'page', 'db', appAddr.href.substr(27, 20), '1', 'appAddr']);
        return true;
    };
    otherDown.onclick = function() {
        _czc.push(['_trackEvent', 'page', 'db', appAddr.href.substr(27, 20), '1', 'appAddr']);
        window.open(appAddr.href, '_self');
    }
    </script>
</body>

</html>
