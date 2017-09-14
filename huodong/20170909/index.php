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
            <div class="yq-logo"><img data-src="//r.51gjj.com/act/release/img/20170909_logo.png"></div>
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
                <div class="btn-change" bp="20170909_1_1_0_立即赚取机会"><img data-src="<?php echo $imgUrl;?>btn_change.png"></div>
                <div class="btn-prize" bp="20170909_1_2_0_我的奖品"><img data-src="<?php echo $imgUrl;?>btn_prize.png"></div>
            </div>
            <div class="money-prize"><img data-src="<?php echo $imgUrl;?>money.png"></div>
            <div class="btn-rule-2">活动规则>></div>
            <div class="toPurchase" bp="20170909_1_3_0_立即抢购">立即抢购</div>
            <div class="btn-tips">您当前累计投资14天标<span>999.999</span>元</div>
            <div class="wrap-bottom">
                <p>*本活动所有解释权归51有钱所有，与苹果公司无关*</p>
                <p>客服热线：400-863-5151</p>
            </div>
        </div>
    </div>
</div>
<div class="mask hide">
    <div class="prize-box-lottery  prize-box-0 hide">
        <div class="btn-close"></div>
    </div>
    <div class="prize-box-lottery  prize-box-1 hide">
        <div class="btn-close"></div>
    </div>
    <div class="prize-box-lottery  prize-box-2 hide">
        <div class="btn-close"></div>
    </div>
    <div class="prize-box-lottery  prize-box-3 hide">
        <div class="btn-close"></div>
    </div>
    <div class="prize-box-lottery  prize-box-4 hide">
        <div class="btn-close"></div>
    </div>
    <div class="prize-box-lottery no-prize prize-box-5 hide">
        <div class="btn-close no-prize-btn"></div>
    </div>
    <div class="prize-box-lottery  prize-box-6 hide">
        <div class="btn-close"></div>
    </div>
    <div class="prize-box-lottery  prize-box-7 hide">
        <div class="btn-close"></div>
    </div>
</div>
<div class="rule-1 rule zm-customer-confirm hide">
    <h6>抽奖条件</h6>
    <ul>
        <li><span>1.</span>活动期间内，投资每满5000元可获得1次抽奖机会，最多可获得5次抽奖机会；</li>
        <li><span>2.</span>活动期间内，每成功邀请一位好友注册并投资满1000元，可获得1次抽奖机会，最多可获得3次抽奖机会， （参考上一条，单人最高能获得8次抽奖机会）；
        </li>
    </ul>
    <h6>奖品发放</h6>
    <ul>
        <li>活动结束后10个工作日内发放。（iphone8中奖用户根据实际上市时间而定，我们会第一时间寄出）</li>
    </ul>
    <div class="btn-close"></div>
</div>
<div class="rule-2 rule zm-customer-confirm hide rule-2-bg">
    <h6>活动规则</h6>
    <ul>
        <li><span>1.</span>获得条件：活动期间内，投资14天产品累计金额达到奖励区间，即可获得相应奖励。</li>
        <li><span>2.</span>奖励发放: 活动结束后7个工作日内将发放到您的理财账户中，会有电话或短信通知您。
        </li>
    </ul>
    <div class="btn-close"></div>
</div>
<div class="prize-list hide">
            <!-- <div class="wrap-no-prize">
                <div class="no-prize-img"></div>
                <div class="null-text">还是空的，快去抽奖吧！</div>
            </div> -->
            <!-- <div class="has-prize">
                <div class="prize-icon"><img data-src="//r.51gjj.com/act/release/img/20170909_prize_list_7.png"></div>
                <div class="prize-text">5元现金</div>
            </div> -->
            <div class="btn-prize-conf"></div>
</div>
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    <script>
    </script>
    </body>
</html>