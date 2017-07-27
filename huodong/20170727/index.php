<?php 
    $title = "银行存管"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170727"; // 配置图片的，必须
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
            background: #fcebd1;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #fcebd1 !important;
        }
    </style>
    <script>
       var projectName = "<?php echo $actDate ?>"; 
    </script>
    </head>
    <body>
<div class="wp hide">
    <div class="wp-inner">
        <div class="wrap-top">
            <img data-src="<?php echo $imgUrl?>logo.png">
        </div>
        <div class="content">
            <div class="model-text">
                <img data-src="<?php echo $imgUrl?>model_text.png">
            </div>
            <div class="relation">
                <img data-src="<?php echo $imgUrl?>relation.png">
            </div>
            <div class="choose"><img data-src="<?php echo $imgUrl?>why_choose.png"></div>
            <div class="choose-text">新网银行是中国银监会批准成立的银行，注册资金为30亿，由新希望集团、小米、红旗连锁等股东发起设立。
                是继腾讯微众银行、阿里网商银行之后，全国第三家互联网银行，同时也是中西部首家互联网银行。</div>
            <div class="three-logo"><img data-src="<?php echo $imgUrl?>three_logo.png"></div>

        </div>
        <div class="advantage"></div>
        <div class="about-us">
            <div class="about-title"><img data-src="<?php echo $imgUrl?>about_us_title.png"></div>
        </div>
    </div>
    <div class="mask hide"></div>
</div>
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    </body>
</html>