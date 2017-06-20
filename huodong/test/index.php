<?php 
    require "../Get_Resource.php";
    $obj = new Resource;
    $res = $obj->getResStr('test');   
    var_dump($res);
 ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
    <link rel="stylesheet" href="<?php echo $res['css'] ?>">
    <script>
        var requireConfig = {
            "paths": {
                "jquery": ["//r.51gjj.com/act/js/jQuery.min", "jQuery.min"],
                "zepto": ["//r.51gjj.com/act/js/zepto.min", "zepto.min"],
                "bridge": ["//r.51gjj.com/act/js/bridge", "bridge"],
                "FullPage": ["//r.51gjj.com/act/js/js.fullpage.min", "js.fullpage.min"],
                "qrcode": ["//r.51gjj.com/act/js/qrcode.min", "qrcode.min"], //二维码生成
                "lucky-card": ["//r.51gjj.com/act/js/lucky-card.min", "lucky-card.min"], //刮刮卡 内置AMD规范写法
                "imgLoader": ["//r.51gjj.com/act/js/imgLoader.min","imgLoader"], //图片预加载
                "animateColor": ["//r.51gjj.com/act/js/jquery.animate-colors-min", "jquery.animate-colors-min"],
                "snow": ["//r.51gjj.com/act/js/jquery.fallingsnowTransform.min", "jquery.fallingsnowTransform.min"],
                "jQueryRotate": ["//r.51gjj.com/act/js/jQueryRotate.min", "jQueryRotate.min"],
                "fastClick": ["//r.51gjj.com/act/js/fastClick.min","fastClick.min"],
                "juicer": ["//r.51gjj.com/act/js/juicer-min","juicer-min"],
                "dataStatistics": ["//r.51gjj.com/act/js/jquery.dataStatistics","jquery.dataStatistics"]
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
                }
            }
        }
    </script>
</head>
<body>
	<div class="box"></div>
    <!-- <script src="require.min.js" data-main="http://r.51gjj.com/act/js/test_544abea.js"></script> -->
	<script src="require.min.js" data-main="<?php echo $res['js'] ?>"></script>
</body>
</html>