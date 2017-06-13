<?php
    $title = "金卡贷活动"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170614"; // 配置图片的，必须
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
            background: #ffefa9;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #ffefa9 !important;
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
                    <div class="msg"></div>
                    <div class="rule-btn">规则</div>
                    <div class="apply-wrap">
                        <div class="apply"><span>申请就送，机会人人有</span></div>
                        <div class="withdraw">立即提款</div></div>
                    </div>
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