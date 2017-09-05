<?php 
    $title = "邀请好友"; // 配置标题的，必须
    include "../public/v2/header.php";
    $proName = "20170905";
    $version = "v1";
?>
<?php
    $obj = new Resource; // 实例化获取资源类
    $res = $obj->getResStr($proName, $version); // 获取指定的活动资源，返回数组，array("css"=> "..", "js"=>"。。")
    $origin = $_SERVER['HTTP_HOST'];
    include "../public/v2/img_src.php";
?>
    <link rel="stylesheet" href="<?php echo $res['css'] ?>">
    <style>
        /* 加载动画颜色配置 */
        .loading-bg-color {
            background: #f95547;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #f95547 !important;
        }
    </style>
    </head>
    <body>
<div class="wp hide">
    <div class="wp-inner">
        <div class="content">
           <div class="top-title"><img data-src="<?php echo $imgUrl; ?>title.png"></div>
           <div class="middle-info"><img data-src="<?php echo $imgUrl; ?>number.png"></div>
           <div class="act-table"><img data-src="<?php echo $imgUrl; ?>table.png"></div>
           <div class="act-rule"><img data-src="<?php echo $imgUrl; ?>rule_1.png"></div>
           <div class="xw-bottom"><img data-src="<?php echo $imgUrl; ?>xw_logo.png"></div>
        </div>
    </div>
</div>
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    </body>
</html>