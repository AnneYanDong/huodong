<?php 
    $title = "邀请好友"; // 配置标题的，必须
    include "../public/v2/header.php";
    $proName = "20170905";
    $version = "v1";
?>
<?php
    $obj = new Resource; // 实例化获取资源类
    $res = $obj->getResStr($proName, $version); // 获取指定的活动资源，返回数组，array("css"=> "..", "js"=>"。。")
    $origin = $_SERVER['HTTP_HOST'];
    include "../public/v2/img_src.php";
?>
    <link rel="stylesheet" href="<?php echo $res['css'] ?>">
    <style>
        /* 加载动画颜色配置 */
        .loading-bg-color {
            background: #f95547;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #f95547 !important;
        }
    </style>
    <script src="//kaifa.jianbing.com/hd/p2p/qrcode.js"></script>
    </head>
    <body>
<div class="wp hide">
    <div class="wp-inner">
        <div class="content">
            <div class="yq-logo"><img data-src="<?php echo $imgUrl;?>logo.png"></div>
            <div class="invite-text"><img data-src="<?php echo $imgUrl;?>invite_text.png"></div>
            <div class="act-date"><img data-src="<?php echo $imgUrl;?>act_date_v2.png"></div>
            <div class="wrap-prize">
                <img data-src="<?php echo $imgUrl;?>prize_v2.png">
                <div class="invite-record-btn" bp="20170905_1_1_0_邀请记录"></div>
            </div>
            <div class="wrap-money"><img data-src="<?php echo $imgUrl;?>money.png"></div>
            <div class="wrap-tips">
                <p>*本活动最终解释权归51有钱所有*</p>
                <p>客服电话： 400-863-5151</p>
            </div>
            <!-- <div class="wrap-btn">
                <img id="qrcode-show" class="qrcode_btn" data-src="<?php echo $imgUrl;?>qrcode.png">
                <img class="invite_btn" data-src="<?php echo $imgUrl;?>invite_btn.png">
            </div> -->
        </div>
        <div class="code-show" id="JS-code-show">
            <div class="code-cont">
                <span class="code-close" id="JS-code-close"></span>
                <div class="code-box">
                    <div class="img-code" id="qrcodeBig"></div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="wrap-btn">
    <img id="qrcode-show" bp="20170905_1_2_0_面对面扫码邀请" class="qrcode_btn" data-src="<?php echo $imgUrl;?>qrcode.png">
    <img class="invite_btn" bp="20170905_1_3_0_立即邀请拿奖励" data-src="<?php echo $imgUrl;?>invite_btn_v2.png">
</div>
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    <script>
        window.onload = function (){

        }

    </script>
    </body>
</html>