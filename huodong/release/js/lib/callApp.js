var callApp = {
    isWeixin: function() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    },
    setUrl: function() {
        var _this = this;
        var url;
        if (_this.isWeixin()) {
            url = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.balance6game.housingfund';
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
                url = "https://itunes.apple.com/app/apple-store/id908573399?pt=83635804&ct=" + place_name + "&mt=8";
            } else {
                url = 'http://apk.51gjj.com/51gjj_' + place_name + '.apk';
            };
            console.log(url)
        }
        return url;
    },

    callapp: function(agreement) {
        var _this = this;
        window.open(agreement || "gjj51://");
        var clickedAt = +new Date;
        var goLoad = document.getElementById('appAddr');
        setTimeout(function() {
            !window.document.webkitHidden && setTimeout(function() {
                if (+new Date - clickedAt < 2000) {
                    window.location = _this.setUrl();
                }
            }, 500);
        }, 500)
    },

    onElement: function(ele,isCnzz){
        var _this = this;
        // ele.onclick = function(){
            _this.callapp();
            if (isCnzz) {
                _czc.push(['_trackEvent', 'page', 'db', appAddr.href.substr(27, 20), '1', 'appAddr']);
            }
        // }
    }
}
