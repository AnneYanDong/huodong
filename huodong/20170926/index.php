<?php 
    $title = "贺中秋迎国庆"; // 配置标题的，必须
    include "../public/v2/header.php";
    $proName = "20170926";
    $version = "v1";
?>
<?php
    $obj = new Resource; // 实例化获取资源类
    $res = $obj->getResStr($proName, $version); 
    $origin = $_SERVER['HTTP_HOST'];
    include "../public/v2/img_src.php";
?>
    <meta name="format-detection" content="telephone=no" />
    <link rel="stylesheet" href="<?php echo $res['css'] ?>">
    <style>
        /* 加载动画颜色配置 */
        .loading-bg-color {
            background: #f05559;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #f05559 !important;
        }
    </style>
    </head>
    <body>
<div class="wp hide">
    <div class="wp-inner">  
        <div class="content">
            <div class="logo"><img data-src="//r.51gjj.com/act/release/img/20170905_logo.png"></div>
            <div class="big-title">
                <img data-src="<?php echo $imgUrl;?>big_title.png">
            </div>
            <div class="act-date">活动时间：10月1日-10月8日</div>
            <div class="act-rate">
                <img data-src="<?php echo $imgUrl;?>rate.png">
                <a bp="20170926_1_1_0_立即抢购" href="/51wealthy/h5/member/invest_list.php?cid=10" class="btn-purchase"></a>
            </div>
            <div class="act-prize-text">活动期间，累计投资金额排名前8的金主可额外获得奖励金<span><具体规则></span></div>
            <div class="act-prize prize-1">
                <div class="act-rank-name"></div>
                <div class="act-rank-money"></div>
            </div>
            <div class="act-prize prize-2">
                <div class="act-rank-name"></div>
                <div class="act-rank-money"></div>
            </div>
            <div class="act-prize prize-3">
                <div class="act-rank-name"></div>
                <div class="act-rank-money"></div>
            </div>
            <div class="act-prize prize-4">
                <div class="act-rank-name"></div>
                <div class="act-rank-money"></div>
            </div>
            <div class="act-prize prize-5">
                <div class="act-rank-name"></div>
                <div class="act-rank-money"></div>
            </div>
            <div class="act-prize prize-6">
                <div class="act-rank-name"></div>
                <div class="act-rank-money"></div>
            </div>
            <div class="act-prize prize-7">
                <div class="act-rank-name"></div>
                <div class="act-rank-money"></div>
            </div>
            <div class="act-prize prize-8">
                <div class="act-rank-name"></div>
                <div class="act-rank-money"></div>
            </div>
            <div class="act-invest">
                <div class="personal-invest"></div>
                <a bp="20170926_1_2_0_赢取888元奖励金" href="/51wealthy" class="btn-receive"></a>
            </div>
        </div>
    </div>
</div>
<div class="rule zm-customer-confirm hide">
    <ul>
        <li  class="add-style-1"><span>活动时间：</span>10.1 00:00 - 10.8 23:59:59</li>
        <li><span>返现说明：</span>&nbsp;</li>
        <li><span>1.</span>在活动期间内累计投资金额排名前8的用户，可额外获得奖励金（投资金额一样，按照时间的先后顺序进行排名）</li>
        <li><span>2.</span>榜单上的明细和累计投资金额将实时更新，最终结果以10月8日 23:59:59截止时间为准</li>
        <li><span>3.</span>奖励发放：活动结束后7个工作日内发放到您的理财账户中，会有电话或短信通知您</li>
        <li class="add-style">*本活动所有解释权归51有钱所有*<br>
            客服热线：400-863-5151</li>
    </ul>
    <div class="btn-close"></div>
</div>
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    <script>
        var indexData = {
            ajaxUrl: "<?php echo 'test.php'; ?>"
        };
    </script>
    </body>
</html>