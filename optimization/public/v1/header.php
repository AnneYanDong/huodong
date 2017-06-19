<?php 
    require str_replace('v1','',str_replace('public','',dirname(__FILE__))) . "/Get_Resource.php";
 ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?php echo $title; ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
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
                var oWrap = document.getElementsByClassName("wrap")[0];
                var rate = 7.5;
                var viewPort = this.viewPortInfo();
                viewPort.w = viewPort.w > 1024 ? 1024 : viewPort.w;
                document.getElementsByTagName("html")[0].style.fontSize = viewPort.w / rate + "px";     
            },
        }
        setFontSize.setFont();
        window.addEventListener("resize", setFontSize.debounce(setFontSize.setFont));
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

