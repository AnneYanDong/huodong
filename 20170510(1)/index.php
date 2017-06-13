<?php 
    $title = "为足球喝彩"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170510"; // 配置图片的，必须
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
            background: #0b2d0c;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #0b2d0c !important;
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
            <img data-src="<?php echo $imgUrl; ?>bg.jpg" alt="">
            <div class="apply" bp="一起喝彩" title="一起喝彩"></div>
            <div class="rule-btn"></div>
        </div>
    </div>
    <div class="mask hide"></div>
</div>
<div class="rule zm-customer-confirm hide">
    <h6>活动规则</h6>
    <ul>
        <li><span>1.</span>活动期间完成申请可获得58元现金红包，成功激活信用卡可再得258元现金红包。为了您能够顺利拿到奖励，请申请业务后及时关注“我的奖品”；</li>
        <li><span>2.</span>活动之前已成功申请且已激活卡片的用户无法获得该活动奖励；</li>
        <li><span>3.</span>若活动之前已领取过浦发业务的318红包券，则不可获得本活动的红包券；</li>
        <li><span>4.</span>奖品存在有效期，自获得日起58元的现金红包5天后失效，258元的现金红包10天后失效，请尽快领取；</li>
        <li><span>5.</span>现金将在7个工作日内发放到您的支付宝账户，请在“我的-我的奖品”中及时完善支付宝信息；</li>
        <li><span>6.</span>关于活动有任何疑问请咨询官方客服热线4008635151；</li>
        <li><span>7.</span>本商品由51公积金管家提供，与设备生产商Apple Inc.公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。</li>
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