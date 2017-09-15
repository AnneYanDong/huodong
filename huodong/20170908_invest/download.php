<?php 
    $title = "邀请好友"; // 配置标题的，必须
    include "../public/v2/header.php";
    $proName = "20170908_invest";
    $version = "v2";
?>
<?php
    $obj = new Resource; // 实例化获取资源类
    $res = $obj->getResStr($proName, $version); // 获取指定的活动资源，返回数组，array("css"=> "..", "js"=>"。。")
    $origin = $_SERVER['HTTP_HOST'];
    include "../public/v2/img_src.php";
    $imgUrl_1 = "//r.51gjj.com/act/release/img/20170908_"
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
    <script src="//kaifa.jianbing.com/hd/p2p/qrcode.js"></script>
    </head>
    <body>
<div class="wp hide">
    <div class="wp-inner">
        <div class="content">
            <div class="btn-download"></div>
        </div>
        <div class="yqBottom">
            <img class="yqLogo" data-src="//r.51gjj.com/act/release/img/20170515_yq_logo.png">
            <div class="wrapTxt">
                <span class="txt1">下载51公积金管家</span>
                <span class="txt2">激活你的财富</span>
            </div>
            <img class="yqBtn" data-src="//r.51gjj.com/act/release/img/20170515_yq_btn.png">
        </div>
    </div>
</div>
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    </body>
</html>