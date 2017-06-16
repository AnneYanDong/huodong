<?php 
    $title = "父亲节"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170615"; // 配置图片的，必须
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
            background: #15164c;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #15164c !important;
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
                  <img class="bgImg" data-src="<?php echo $imgUrl; ?>bg_one.jpg" alt="">
                  <div class="gift" bp="拆礼包" title="拆礼包"></div>
                </div>
            </div>
            <div class="page page2">
                <div class="content">
                    <h6 class="t1">选择信用卡额度</h6>
                    <ul class="choose">
                        <li class="grayscale animated" data-loan-type="1" title="OneToFive" bp="OneToFive">
                            <div class="left">1~5万</div>
                            <div class="right"><span class="choose-icon"></span></div>
                        </li>
                        <li class="grayscale animated" data-loan-type="2" title="SixToThirty" bp="SixToThrity">
                            <div class="left">6~30万</div>
                            <div class="right"><span class="choose-icon"></span></div>
                        </li>
                    </ul>
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
    <script>
        var indexFn = function (data) {
            return Number(data) + 1;
        }
    </script>
    </body>
</html>