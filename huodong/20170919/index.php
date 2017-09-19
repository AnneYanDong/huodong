<?php 
    $title = "限时加息"; // 配置标题的，必须
    include "../public/v2/header.php";
    $proName = "20170919"; // 配置文件的项目名
    $version = "v1";
    $obj = new Resource; // 实例化获取资源类
    $res = $obj->getResStr($proName,$version); // 获取指定的活动资源，返回数组，array("css"=> "..", "js"=>"。。")
    include "../public/v2/img_src.php";    
?>
    <link rel="stylesheet" href="<?php echo $res['css'] ?>">
    <style>
        /* 加载动画颜色配置 */
        .loading-bg-color {
            background: #1c1713;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #1c1713 !important;
        }
    </style>
    <script>
       var projectName = "<?php echo $proName ?>"; 
    </script>
    </head>
    <body>
        <div class="wp hide">
            <div class="wp-inner">
                <div class="content">
                    <img data-src="<?php echo $imgUrl; ?>bg.jpg" alt="">
                    <div class="share-btn"></div>
                    <div bp="20170919_1_1_0_领取18888元体验金 class="skip-btn"></div>
                </div>
            </div>
        </div>
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    <script>
        var indexData = {
            ajaxUrl: "<?php echo 'test.php'; ?>"
        };
    </script>
    </body>
</html>
