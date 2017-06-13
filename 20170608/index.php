<?php 
    $title = "广发鑫秒贷8折大优惠"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170608"; // 配置图片的，必须
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
            background: #fcebd1;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #fcebd1 !important;
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
            <div class="loan input-1">
                <span>借款 :</span>
                <input type="tel" placeholder="最高300000" maxlength="6" />
                <span>元</span>
            </div>
            <div class="loan input-2">
                <span>期数 :</span>
                <input type="tel" placeholder="1-36个月" maxlength="2" />
                <span>月</span>
            </div>
            <div class="result interest"></div>
            <div class="result money"></div>
            <div class="receive" bp="立即领取" title="立即领取"></div>
            <div class="rule-btn"></div>
        </div>
    </div>
    <!--<div class="prize"></div>-->
    <div class="mask hide"></div>
</div>
<div class="rule zm-customer-confirm hide">
    <h6>活动规则</h6>
    <ul>
        <li><span>1.</span>即日起至9月30日首次完成51鑫秒贷申请且审批通过即可享受８折利息折扣优惠；</li>
        <li><span>2.</span>活动之前已成功申请或已签约的用户无法享受此次利息优惠；</li>
        <li><span>3.</span>8折利息折扣券在贷款审批通过线下签约时直接生效使用；</li>
        <!--<li><span>4.</span>折扣券存在有效期，自获得日起若15个自然日未完成签约放款，则该优惠券失效；</li>-->
        <li><span>4.</span>关于活动有任何疑问请咨询官方客服热线4008635151；</li>
        <li><span>5.</span>本商品由51公积金管家提供，与设备生产商Apple Inc.公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。</li>
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