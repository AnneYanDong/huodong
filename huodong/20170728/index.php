<?php 
    $title = "新手课堂"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170728"; // 配置图片的，必须
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
            background: #6b8afc;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #6b8afc !important;
        }
    </style>
    <script>
       var projectName = "<?php echo $actDate ?>"; 
    </script>
    </head>
    <body>
<div class="wp hide">
    <div class="wp-inner">
        <div class="content">
            <div class="figure">
            <img data-src="<?php echo $imgUrl?>figure.png">
            </div>
            <div class="illustrate">51有钱是51公积金旗下专注为投资人提供专业金融服务的投资理财平台。
                51有钱管理团队结合多年的资产管理服务和风险控制经验，专注于为理财用
                户提供优质个人小额消费信贷债权、真实透明的银行级风控模型，竭诚为用
                户提供多元化、个性化的普惠金融服务。
            </div>
            <div class="choose"><img data-src="<?php echo $imgUrl?>choose.png"></div>
            <div class="title"><img data-src="<?php echo $imgUrl?>new_hand_title.png"></div>
            <div class="one-step"><img data-src="<?php echo $imgUrl?>one_step.png"></div>
            <div class="one-step"><img data-src="<?php echo $imgUrl?>two_step.png"></div>
            <div class="one-step"><img data-src="<?php echo $imgUrl?>three_step.png"></div>
            <div class="one-step"><img data-src="<?php echo $imgUrl?>four_step.png"></div>
            <div class="bid"><img data-src="<?php echo $imgUrl?>bid.png"></div>
            <div class="question"><img data-src="<?php echo $imgUrl?>question.png"></div>
            <div class="qrcode"><img data-src="<?php echo $imgUrl?>qrcode.png"></div>
        </div>
    </div>
</div>
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    </body>
</html>