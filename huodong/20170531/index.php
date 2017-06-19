<?php 
    $title = "畅享生活"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170531"; // 配置图片的，必须
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
            background: #272c42;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #272c42 !important;
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
            <img data-src="<?php echo $imgUrl; ?>bg3.jpg" alt="">
            <div class="apply" bp="立即拥有" title="立即拥有"></div>
                <!--<div class="text location1">指定日特价手调饮品和挂耳咖啡</div>
                <div class="text location2">人均额度30万，尊享白金礼遇</div>
                <div class="text location3">无限次法律咨询</div>-->
                <div class="text location1">
                    <ul>
                        <li>酒店住两晚送一晚</li>
                        <li style="color:#ffe404">人均额度30万</li>
                        <li>尊享白金礼遇</li>
                        <!--<li>特价手调饮品和挂耳咖啡</li>
                        <li>机场1元停车</li>
                        <li>商场免费停车</li>
                        <li>环球旅行及医疗救援服务</li>
                        <li>无限次法律咨询</li>
                        <li>奕欧来畅购有“礼”</li>-->
                    </ul>
                </div>
                <div class="text location2">
                    <ul>
                        <!--<li>酒店住两晚送一晚</li>
                        <li>人均额度30万</li>
                        <li>尊享白金礼遇</li>-->
                        <li>特价手调饮品和挂耳咖啡</li>
                        <li>机场1元停车</li>
                        <li style="color:#ffe404">商场免费停车</li>
                        <!--<li>环球旅行及医疗救援服务</li>
                        <li>无限次法律咨询</li>
                        <li>奕欧来畅购有“礼”</li>-->
                    </ul>
                </div>
                <div class="text location3">
                    <ul>
                        <!--<li>酒店住两晚送一晚</li>
                        <li>人均额度30万</li>
                        <li>尊享白金礼遇</li>
                        <li>特价手调饮品和挂耳咖啡</li>
                        <li>机场1元停车</li>
                        <li>商场免费停车</li>-->
                        <li>环球旅行及医疗救援服务</li>
                        <li>无限次法律咨询</li>
                        <li>奕欧来畅购有“礼”</li>
                    </ul>
                </div>
            <div class="rule-btn"></div>
        </div>
    </div>
    <div class="mask hide"></div>
</div>
<div class="rule zm-customer-confirm hide">
    <h6>活动规则</h6>
    <ul>
        <li><span>1.</span>活动期间（5月15日－奖品发完）完成申请可获得58元现金红包，成功激活信用卡可再得258元现金红包。为了您能够顺利拿到奖励，请申请业务后及时关注“我的奖品”；</li>
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