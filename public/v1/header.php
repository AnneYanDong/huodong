<?php 
    require str_replace('v1','',str_replace('public','',dirname(__FILE__))) . "/Get_Resource.php";
 ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?php echo $title; ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <link rel="stylesheet" href="//r.51gjj.com/act/css/normalize.min.css">
    <script>
        var requireConfig = {
            "baseUrl": "../../",
            "paths": {
                "jquery": ["//r.51gjj.com/act/release/js/lib/jQuery.min", "lib/jQuery.min"],
                "zepto": ["//r.51gjj.com/act/release/js/lib/zepto.min", "lib/zepto.min"],
                "bridge": ["//r.51gjj.com/act/release/js/lib/bridge", "lib/bridge"],
                "FullPage": ["//r.51gjj.com/act/release/js/lib/js.fullpage", "lib/js.fullpage"],
                "qrcode": ["//r.51gjj.com/act/release/js/lib/qrcode.min", "lib/qrcode.min"], //二维码生成
                "lucky-card": ["//r.51gjj.com/act/release/js/lib/lucky-card.min", "lib/lucky-card.min"], //刮刮卡 内置AMD规范写法
                "imgLoader": ["//r.51gjj.com/act/release/js/lib/imgLoader.min","lib/imgLoader"], //图片预加载
                "animateColor": ["//r.51gjj.com/act/release/js/lib/jquery.animate-colors-min", "lib/jquery.animate-colors-min"],
                "snow": ["//r.51gjj.com/act/release/js/lib/jquery.fallingsnowTransform.min", "lib/jquery.fallingsnowTransform.min"],
                "jQueryRotate": ["//r.51gjj.com/act/release/js/lib/jQueryRotate.min", "lib/jQueryRotate.min"],
                "fastClick": ["//r.51gjj.com/act/release/js/lib/fastclick.min","lib/fastclick.min"],
                "juicer": ["//r.51gjj.com/act/release/js/lib/juicer-min","lib/juicer-min"],
                "dataStatistics": ["//r.51gjj.com/act/release/js/lib/jquery.dataStatistics","lib/jquery.dataStatistics"],
                "ct": ["./business_act/static/js/ct"],
                "marquee": ["//r.51gjj.com/act/release/js/lib/jquery.liMarquee.min", "lib/jquery.liMarquee"],
                "Vue-dev": ["//r.51gjj.com/act/release/js/lib/vue2.2.6", "lib/vue2.2.6"],
                "Vue": ["//r.51gjj.com/act/release/js/lib/vue2.2.6.min", "lib/vue2.2.6.min"],
                "Vue-build": ["//r.51gjj.com/act/release/js/lib/vue2.2.6.min", "lib/vue2.2.6.min"],
                "axios": ["//r.51gjj.com/act/release/js/lib/axios.min","lib/axios.min"]
            },

            "shim": {
                "qrcode": {
                    "deps": ["jquery"]
                },
                "bridge": {
                    "exports": "Bridge"
                },
                "FullPage": {
                    "exports": "fullpage"
                },
                "animateColor": {
                    "deps": ["jquery"]
                },
                "jQueryRotate": {
                    "deps": ["jquery"]
                },
                "snow": {
                    "deps": ["jquery"]
                },
                "juicer":{
                    "exports": "juicer"
                },
                "dataStatistics":{
                    "deps": ["jquery"]
                },
                "ct":{
                    "deps": ["jquery"]
                },
                "marquee":{
                    "deps": ["jquery"]
                }
            }
        }
    </script>
    <script type="text/javascript">
        window['installShare'] && installShare({
            success: function () {
            }
        });
    </script>
    <script type='text/javascript'>
        var _vds = _vds || [];
        window._vds = _vds;
        (function () {
            _vds.push(['enableHT', true])
            _vds.push(['setAccountId', '87eba2bdbd60ebd7']);
            (function () {
                var vds = document.createElement('script');
                vds.type = 'text/javascript';
                vds.async = true;
                vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(vds, s);
            })();
        })();
    </script>

