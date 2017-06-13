<?php 
    $title = "财神送福利，全额免息天天有"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170413"; // 配置图片的，必须
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
            background: #ca2435;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #ca2435 !important;
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
            <img data-src="<?php echo $imgUrl; ?>bg1.png" alt="">
            <div id="status" class="status"></div>
            <div class="lot addMove">
                <img id="imgId" data-src="<?php echo $imgUrl; ?>alert1.png" alt="" />
                <div class="apply" bp="shenqingnamianxi" title="shenqingnamianxi"></div>
            </div>
            <div class="alreadyApply">
                <img data-src="<?php echo $imgUrl; ?>already.png" alt="" />           
                <div class="alreadyBtn" bp="qushishi" title="qushishi"></div>
            </div>
            <div class="btn_sub" bp="shijinyao" title="shijinyao">
                <div class="shake_icon addShake"><img data-src="<?php echo $imgUrl; ?>shakeHand.png" alt="" /></div>
            </div>
            <div class="rule-btn"></div>
        </div>
    </div>
    <div class="mask hide"></div>
</div>
<div class="rule zm-customer-confirm hide">
    <h6>活动规则</h6>
    <ul>
        <li><span>1.</span>通过活动页面首次申请金薪贷业务可以得到抵息券一张。已经申请/已经放款用户无法参与本活动。</li>
        <li><span>2.</span>抵息券为全额免息、1年免息、3个月免息、100元免息任意一种，100%有奖。</li>
        <li><span>3.</span>每个用户只有1次免息优惠，优惠不可重复。活动结束后，未领取状态下的红包券自动失效。</li>
        <li><span>4.</span>全额免息为还款期间所有利息减免，1年免息为第2年整年利息减免，3个月免息为第2年前3个月利息减免，100元为首月还款减免。用户如果中间出现逾期，则逾期之后的优惠失效。</li>
        <li><span>5.</span>有任何问题请咨询官方客服热线4008635151。</li>
        <li><span>6.</span>本商品由51公积金管家提供，与设备生产商Apple Inc.公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。</li>
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