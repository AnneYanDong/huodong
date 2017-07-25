<?php 
    $title = "周三限免活动"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170703"; // 配置图片的，必须
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
            background: #0d91ee;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #0d91ee !important;
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
            <img data-src="<?php echo $imgUrl; ?>bg2.jpg" alt="">
            <div class="rule-btn"></div>
            <div class="oneDay">仅此一天</div>
            <div class="timeClock">
                <span class="clockTip"></span>
                <img data-src="<?php echo $imgUrl?>clock.png">
                <span class="nowTime"></span>
            </div>
            <div class="tickets">
                <div class="ticketMoney">
                    <img data-src="<?php echo $imgUrl ?>ticket200.png">
                    <div class="rob rob200" bp="200秒抢" title="200秒抢">秒抢</div>
                </div>
                <div class="ticketMoney">
                    <img data-src="<?php echo $imgUrl ?>ticket100.png">
                    <div class="rob rob100" bp="100秒抢" title="100秒抢">秒抢</div>
                </div>
                <div class="ticketMoney">
                    <img data-src="<?php echo $imgUrl ?>ticket50.png">
                    <div class="rob rob50" bp="50秒抢" title="50秒抢">秒抢</div>
                </div>
            </div>
            <div class="list">
                <ul>
                </ul>
            </div>
            <div class="apply apply1" bp="利息最低" title="利息最低"></div>
            <div class="apply apply2" bp="门槛最低" title="门槛最低"></div>
            <div class="apply apply3" bp="放款最快" title="放款最快"></div>
            <div class="myTicket" bp="我的优惠券" title="我的优惠券"><span>我的优惠券</span></div>
        </div>
    </div>
</div>
        <div class="rule zm-customer-confirm hide">
            <h6>活动规则</h6>
            <ul>
                <li><span>1.</span>活动为周三00：00-24：00全天举行，秒完即止，券可用于活动全场业务。</li>
                <li><span>2.</span>全场通用券使用明细：【金薪贷】首月还款减免。【金花贷】首月还款减免，100元券借款5000元及以上可用，200元券借款10000元及以上可用。【金盈贷】50元券首月还款立减，100元券分2个月减免，200元券分4个月减免。提前还款不享受优惠。</li>
                <li><span>3.</span>当日通过活动页面申请的前100名用户可额外获得价值30元的腾讯视频会员一个月。奖品将于3日内发放到用户账户中。</li>
                <li><span>4.</span>每人限抢1张大额券，只可用于未申请或未完成申请过的业务。抢到的优惠券会发放到“我的奖品”中。请及时关注并在有效期7天内使用。若您已有金薪贷、金盈贷、金花贷业务优惠券，则不能享受此次优惠。</li>
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