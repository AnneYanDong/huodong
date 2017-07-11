<?php 
    $title = "申请有礼 提款免息"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170605"; // 配置图片的，必须
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
            background: #fa3058;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #fa3058 !important;
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
            <img class="title" data-src="<?php echo $imgUrl; ?>jhd2_title.png" alt="title">
            <img class="tv" data-src="<?php echo $imgUrl; ?>jhd2_tv.png" alt="title">
            <div class="wrap-apply">
                <img class="gif" data-src="<?php echo $imgUrl; ?>jhd2_tv.gif" alt="gif">
                <div class="apply apply1" bp="申请成功" title="申请成功"></div>
                <div class="apply apply2" bp="提款成功" title="提款成功"></div>
            </div>
            <div class="receive" bp="立即领取" title="立即领取">
                <div class=" circle circle1"></div>
                立即领取
                <div class="circle circle2"></div>
            </div>
            <div class="rule-btn gradient">规则</div>
        </div>
    </div>
    <div class="mask hide"></div>
</div>
<div class="rule zm-customer-confirm hide">
    <h6>活动规则</h6>
    <ul>
        <li><span>1.</span>即日起至7月31日，申请即送40元现金礼包，提款即送50元抵息券（首期还款立减，提前还款无法享受此优惠）；</li>
        <li><span>2.</span>本活动致力于回馈金花贷新老用户，同一用户至多获得申请与提款2大福利；</li>
        <li><span>3.</span>IOS系统的用户请前往“我的-头像-收货信息”处填写支付宝信息，安卓系统的用户请升级至最新版本，前往“红包奖品”处填写支付宝信息；</li>
        <li><span>4.</span>现金红包会在成功申请金花贷后3个工作日内打款，请在活动结束前完善您的支付宝信息，过期失效；爱奇艺黄金会员月卡兑换码将在活动结束后15个工作日内发送至您的注册手机号，请及时兑换；</li>
        <li><span>5.</span>有任何疑问或者帮助可联系客服4008635151；</li>
        <li><span>6.</span>本商品由51公积金管家提供，与设备生产商Apple Inc公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。</li>
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