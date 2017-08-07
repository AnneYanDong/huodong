<?php 
    $title = "解析你的公积金"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170807"; // 配置图片的，必须
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
            background: #1f1f2f;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #1f1f2f !important;
        }
    </style>
    <script>
        // 埋点后缀用
        var projectName = "<?php echo $actDate ?>";
    </script>
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    </head>
    <body>
    <div class="wp hide">
        <div class="wp-inner">
            <div class="page page1">
                <div class="content">
                    <div>111</div>
                </div>
            </div>
           <div class="page page2">
                <div class="content">
                    
                </div>
            </div>
            <div class="page page3">
               <div class="content">
                   
               </div>
            </div>
            <div class="page page4">
                <div class="content">
                    
                </div>
            </div>
            <div class="page page5">
                <div class="content">
                    
                </div>
            </div>
        </div>
        <div class="mask hide"></div>
    </div>
    <script>
        var indexData = {
            ajaxUrl: "<?php echo 'test.php'; ?>"
        };
    </script>

<!-- 贷款信息开始 -->
    <script type="text/template" id="tpl-loan-name">
        <span>${name}</span>
    </script>
    <script type="text/template" id="tpl-loan-match">
        匹配度&nbsp;${match_rate}%<span></span>
    </script>
    <script type="text/template" id="tpl-loan-amount">
        额度&nbsp;&nbsp;<span>${max_amount}</span>
    </script>
    <script type="text/template" id="tpl-day-rate">
        日费率&nbsp;<span>${day_rate}</span>
    </script>
    <script type="text/template" id="tpl-release-time">
        放款时间&nbsp;<span>${loan_time}</span>
    </script>
<!-- 贷款信息结束 -->

    <script>
        var indexFn = function (data) {
            return Number(data) + 1;
        }
    </script>
    </body>
</html>
