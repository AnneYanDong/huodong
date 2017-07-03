<?php
    $title = "宜人贷"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170629"; // 配置图片的，必须
    $obj = new Resource; // 实例化获取资源类
    $res = $obj->getResStr($actDate); // 获取指定的活动资源，返回数组，array("css"=> "..", "js"=>"。。")
    $origin = $_SERVER['HTTP_HOST'];
    if (preg_match('/b\.jianbing\.com/', $origin) || preg_match('/kaifa\.jianbing\.com/', $origin)) {
        $imgUrl = '//r.51gjj.com/act/release/img/' . $actDate . '_';
    } else {
        $imgUrl = '../static/img/' . $actDate . '_';
    };
?>
    <link rel="stylesheet" href="<?php echo $res['css'] ?>">
    <style>
        /* 加载动画颜色配置 */
        .loading-bg-color {
            background: #001356;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #001356 !important;
        }
    </style>
     <script>
        //加载test.php假接口
        var indexData = {
            ajaxUrl: "<?php echo 'test.php'; ?>"
        };
    </script>
    <script>
       var projectName = "<?php echo $actDate ?>";
    </script>
    <!-- 引入require.js和设置文件js的入口 -->
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    </head>
    <body>
        <div class="wp hide">
            <div class="wp-inner">
                <div class="content">
                    <img data-src="<?php echo $imgUrl; ?>yrd_bg_02.jpg" alt="bg" />
                    <div class="btn" bp="马上领取" title="马上领取">马上领取</div>
                </div>
            <div class="mask hide"></div>
            </div>
        </div>
    </body>
</html>