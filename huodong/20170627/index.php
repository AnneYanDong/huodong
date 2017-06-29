<?php 
    $title = "步步惊喜"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170627"; // 配置图片的，必须
    $obj = new Resource; // 实例化获取资源类
    $res = $obj->getResStr($actDate); // 获取指定的活动资源，返回数组，array("css"=> "..", "js"=>"。。")
    $origin = $_SERVER['HTTP_HOST'];
    // if (preg_match('/b\.jianbing\.com/', $origin) || preg_match('/kaifa\.jianbing\.com/', $origin)) {
    //     $imgUrl = '//r.51gjj.com/act/release/img/' . $actDate . '_';
    // } else {
        $imgUrl = '../static/img/' . $actDate . '_';
    // };
?>
    <link rel="stylesheet" href="<?php echo $res['css'] ?>">
    <style>
        /* 加载动画颜色配置 */
        .loading-bg-color {
            background: #191343;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #191343 !important;
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
            <div class="data timer count-title" id="count-number" data-from="999" data-to="150" data-speed="1000"></div>
            <div class="prize money30"><span>+</span>30</div>
            <div class="prize money50"><span>+</span>50</div>
            <div class="prize money70"><span>+</span>70</div>
            <div class="receive" bp="立即领钱" title="立即领钱"></div>
            <div class="rule-btn"></div>
        </div>
    </div>
    <div class="mask hide"></div>
</div>
<div class="rule zm-customer-confirm hide">
    <h6>活动规则</h6>
    <ul>
        <li><span>1.</span>通过活动页面，完成指定步骤可以获得相应金额，金额在放款后一次性抵扣；</li>
        <li><span>2.</span>每个用户只有1次免息优惠，已经有金e贷拒必赔券的用户不可享受该奖励；</li>
        <li><span>3.</span>有任何问题请咨询官方客服热线4008635151；</li>
        <li><span>4.</span>本商品由51公积金管家提供，与设备生产商Apple Inc.公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。</li>
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