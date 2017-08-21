<?php 
    $title = "周末提款机"; // 配置标题的，必须
    include "../public/v2/header.php";
    $proName = "20170821"; // 配置文件的项目名
    $version = "v1";
    $obj = new Resource; // 实例化获取资源类
    $res = $obj->getResStr($proName,$version); // 获取指定的活动资源，返回数组，array("css"=> "..", "js"=>"。。")
    include "../public/v2/img_src.php";
?>
    <link rel="stylesheet" href="<?php echo $res['css'] ?>">
    <style>
        /* 加载动画颜色配置 */
        .loading-bg-color {
            background: #f56817;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #f56817 !important;
        }
    </style>
    <!-- <script>
        // 埋点后缀用
        var projectName = "<?php echo $actDate ?>";
    </script> -->
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    </head>
    <body>
    <div class="wp hide">
        <div class="wp-inner">
            <div class="content">
                <img class="title" data-src="<?php echo $imgUrl; ?>title.png" alt="title">
                <div class="money"></div>
                <!-- <div class="rule-btn" bp="规则" title="规则">活动规则</div> -->
            </div>
        </div>
    </div>
    <script>
        var indexData = {
            ajaxUrl: "<?php echo 'test.php'; ?>"
        };
    </script>
    <script type="text/template" id="tpl-rule">
            <div class="rule">
                <h6>提款规则</h6>
                <ul>
                    {@each rule as item,index}
                    <li><span>${Number(index)+1}、</span>${item}</li>
                    {@/each}
                </ul>
                <div class="btn-close"></div>
            </div>
    </script>
    </body>
</html>
