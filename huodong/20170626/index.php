<?php
    $title = "鑫福贷-高温补贴活动"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170626"; // 配置图片的，必须
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
            background: #46b8ff;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #46b8ff !important;
        }
    </style>
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
                    <div class="rule-btn" bp="规则" title="规则">规则</div>
            </div>
            <div class="mask hide"></div>
        </div>
    </body>
    <script type="text/template" id="tpl-rule">
            <div class="rule">
                <h6>活动规则</h6>
                <ul>
                    {@each rule as item,index}
                    <li><span>${Number(index)+1}、</span>${item}</li>
                    {@/each}
                </ul>
                <div class="btn-close"></div>
            </div>
    </script>
</html>