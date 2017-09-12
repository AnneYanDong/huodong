<?php 
    $title = "抽奖"; // 配置标题的，必须
    include "../public/v2/header.php";
    $proName = "20170909";
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
            <div class="yq-logo"><img data-src="//127.0.0.1/business_act/huodong/static/img/20170909_logo.png"></div>
            <div class="prize-img"><img data-src="<?php echo $imgUrl;?>prize_img.png"></div>
            <div class="wrap-lottery">
                <div class="lottery-bg">
                    <!-- <img data-src="<?php echo $imgUrl;?>lottery_bg.png"> -->
                    <div id="lottery">
                        <div class="lottery-box lottery-box-0"></div>
                        <div class="lottery-box lottery-box-1"></div>
                        <div class="lottery-box lottery-box-2"></div>
                        <div class="lottery-box lottery-box-7"></div>
                        <div class="lottery-start">
                            <div class="lottery-text">抽奖</div>
                            <div class="lottery-change">您有<span>0</span>次抽奖</div>
                        </div>
                        <div class="lottery-box lottery-box-3"></div>
                        <div class="lottery-box lottery-box-6"></div>
                        <div class="lottery-box lottery-box-5"></div>
                        <div class="lottery-box lottery-box-4"></div>
                    </div>
                </div>
            </div>
            <div class="btn-rule-1">
                <p>一次抽奖=投资每满5000或每邀1位好友投满1000</p>
                <p><span class="btn-lottery-rule">具体规则>></span></p>
            </div>
            <div class="wrap-button">
                <div class="btn-change"><img data-src="<?php echo $imgUrl;?>btn_change.png"></div>
                <div class="btn-prize"><img data-src="<?php echo $imgUrl;?>btn_prize.png"></div>
            </div>
            <div class="money-prize"><img data-src="<?php echo $imgUrl;?>money.png"></div>
            <div class="btn-rule-2">活动规则>></div>
            <div class="toPurchase">立即抢购</div>
            <div class="btn-tips">您当前累计投资14天标<span>999.999</span>元</div>
            <div class="wrap-bottom">
                <p>*本活动所有解释权归51有钱所有，与苹果公司无关*</p>
                <p>客服热线：400-863-5151</p>
            </div>
        </div>
    </div>
</div>
<!-- <div class="mask hide">
    <div class="prize-box"></div>
</div> -->
<div class="mask hide"></div>
            <div class="rule zm-customer-confirm hide">
                <h6>活动规则</h6>
                <ul>
                    <li><span>1.</span>获得条件：完成注册即可获得理财金；</li>
                    <li><span>2.</span>发放时间：理财金的收益会在领取成功后的第2天发放到您的理财账户；</li>
                    <li><span>3.</span>已经获取体验金，但未获得后续认证或投资体验金的用户，请在绑定关系内的15日内实名认证，
                                        否则将失去领取后续体验金的资格。</li>
                </ul>
                <div class="btn-close"></div>
            </div>
    </div>
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    <script>
    </script>
    </body>
</html>