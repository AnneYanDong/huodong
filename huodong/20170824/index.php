<?php 
    $title = "七夕活动"; // 配置标题的，必须
    include "../public/v2/header.php";
    $proName = "20170824"; // 配置文件的项目名
    $version = "v1";
    $obj = new Resource; // 实例化获取资源类
    $res = $obj->getResStr($proName,$version); // 获取指定的活动资源，返回数组，array("css"=> "..", "js"=>"。。")
    include "../public/v2/img_src.php";
?>
    <link rel="stylesheet" href="<?php echo $res['css'] ?>">
    <style>
        /* 加载动画颜色配置 */
        .loading-bg-color {
            background: #653bb3;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #653bb3 !important;
        }
    </style>
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    </head>
    <body>
        <div class="outer-wp">
            <div class="inner-wp">
                <div class="content">
                    <div class="bg"><img data-src="<?php echo $imgUrl; ?>new_bg.png" alt="bg"></div>
                    <div class="amount">
                        <span>您当前累计投资14天标</span>
                        <span class="total-amount"></span>
                        <span>元</span>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
