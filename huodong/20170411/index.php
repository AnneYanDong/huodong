<?php 
    $title = "极速放款慢了赔钱"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170411"; // 配置图片的，必须
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
            background: #0e0123;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #0e0123 !important;
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
                    <img data-src="<?php echo $imgUrl; ?>slow2.png" alt="">
                    <div class="btn_sub" bp="lijilingquan" title="lijilingquan"></div>
                    <div class="rule-btn"></div>
                </div>   
        </div>
        <div class="mask hide"></div>
    </div>
    <div class="rule zm-customer-confirm hide">
        <h6>活动规则</h6>
        <ul>
            <li><span>1.</span>即日起，申请金安贷24小时内不放款即可获得50元现金。</li>
            <li><span>2.</span>仅限领券用户参加，未领券、未获得金安贷放款用户无法获得奖励。</li>
            <li><span>3.</span>在24小时内获得放款无法获得奖励，且红包券失效。</li>
            <li><span>4.</span>每位用户只能领取1次奖励，最多可获得50元。</li>
            <li><span>5.</span>先领券再申请金安贷才能获得奖励，申请金安贷之后才领券无法获得奖励。</li>
            <li><span>6.</span>我们将在3个工作日内打款，为确保现金及时到账，请在活动结束前完善您的支付宝信息，过期失效。</li>
            <li><span>7.</span>有疑问或需要帮助可致电客服4008635151。</li>
            <li><span>8.</span>本商品由51公积金管家提供，与设备生产商Apple Inc公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。</li>
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