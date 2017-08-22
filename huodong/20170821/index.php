<?php 
    $title = "周末放款专区"; // 配置标题的，必须
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
    <div class="wp-outer hide">
        <div class="wp-inner">
            <div class="content">
                <img class="title" data-src="<?php echo $imgUrl; ?>title.png" alt="title">
                <div class="money"></div>
                <img class="static-money" data-src="<?php echo $imgUrl; ?>static_money.png" alt="static-money">
                <img class="btn-group" data-src="<?php echo $imgUrl; ?>btn_group3.png" alt="btn_group3">
                <div class="btn1" bp="20170821_1_1_0_利息最低贷"></div>
                <div class="btn2" bp="20170821_1_2_0_审批最快贷"></div>
                <div class="btn3" bp="20170821_1_3_0_门槛最低贷"></div>
                <div class="btn4" bp="20170821_1_4_0_急用首选贷"></div>
                <div class="rule-btn" bp="20170821_1_5_0_规则">活动规则</div>
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
