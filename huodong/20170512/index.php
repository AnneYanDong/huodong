<?php 
    $title = "光大信用卡专场"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170512"; // 配置图片的，必须
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
    <link rel="stylesheet" type="text/css" href="//r.51gjj.com/act/static/css/goDownload.css">
    <style>
        /* 加载动画颜色配置 */
        .loading-bg-color {
            background: #15122f;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #15122f !important;
        }
    </style>
    <script>
       var projectName = "<?php echo $actDate ?>"; 
    </script>
    <script src="//r.51gjj.com/act/static/js/lib/callApp.js"></script>
    </head>
    <body>
<div class="wp hide">
   <!--  <div class="left-side"><img data-src="<?php echo $imgUrl; ?>left_side_02.png" alt="left_side"></div>
    <div class="right-side"><img data-src="<?php echo $imgUrl; ?>right_side_03.png" alt="right_side"></div> -->
    <div class="wp-inner">
        <div class="content">
            <img data-src="<?php echo $imgUrl; ?>update_bg.png" alt="">
            <div class="btnWrap">
                <div class="apply" id="gold" bp="光大金金卡" title="光大金金卡"></div>
            </div>
            <div class="btnWrap right">
                <div class="apply" id="platinum" bp="光大白金卡" title="光大白金卡"></div>
            </div>
        </div>
    </div>
    <div class="mask hide"></div>
</div>
<div class="rule zm-customer-confirm hide">
    <h6>活动规则</h6>
    <ul>
       
    </ul>
    <div class="btn-close"></div>
</div>
<div class="ticket_50 zm-customer-confirm hide">
    <div class="ticket_close"></div>
</div>
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    <script>
        var indexData = {
            ajaxUrl: "<?php echo 'test.php'; ?>"
        };
    </script>
    </body>
</html>
