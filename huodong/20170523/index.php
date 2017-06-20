<?php 
    $title = "周三限免活动"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170523"; // 配置图片的，必须
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
            background: #0378d5;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #0378d5 !important;
        }
    </style>
    <script>
       var projectName = "<?php echo $actDate ?>";
    </script>
    </head>
    <body>
        <div class="wrap hide">
            <div class="content">
                <div id="lottery">
                    <div class="awards-info">
                        <p class="single-info"></p>
                    </div>
                </div>
                <img id="bgImg" data-src="<?php echo $imgUrl; ?>bg.jpg">
                <div class="ruleTop"></div>
                <!--<div id="clockTips" class="clockTip">
                </div>-->
                <div class="clockTime" id="clockTime">
                    <span class='clockTip'></span>
                    <img data-src="<?php echo $imgUrl ?>clock.png">
                    <span class='nowTime'></span>
                </div>
                <div class="ticket left1">
                     <div class="ticketTop Img200"><img data-src="<?php echo $imgUrl ?>ticketTop_200_new.png"></div>
                     <img id="imgId_200" bp="200yuan" title="200yuan" data-src="<?php echo $imgUrl ?>do_200.png">
                </div> 
                <div class="ticket left2">
                     <div class="ticketTop Img200"><img data-src="<?php echo $imgUrl ?>ticketTop_100_new.png"></div>
                     <img id="imgId_100" bp="100yuan" title="100yuan" data-src="<?php echo $imgUrl ?>do_100.png">
                </div> 
                <div class="ticket left3">
                     <div class="ticketTop Img200"><img data-src="<?php echo $imgUrl ?>ticketTop_50_new.png"></div>
                     <img id="imgId_50" bp="50yuan" title="50yuan" data-src="<?php echo $imgUrl ?>do_50.png">
                </div>  
                <div id="div1" class="apply apply1" bp="lixizuidi" title="lixizuidi"></div>
                <div class="apply apply2" bp="menkanzuidi" title="menkanzuidi"></div>
                <div class="apply apply3" bp="fangkuanzuikuai" title="fangkuanzuikuai"></div>
                <div class="myTicket" bp="wodeyouhuiquan"  title="wodeyouhuiquan"></div>
            </div>
        </div>
        <div class="rule zm-customer-confirm hide">
            <h6>活动规则</h6>
            <ul>
                <li><span>1.</span>活动为周三00：00-24：00全天举行，秒券10点开始，秒完即止，券可用于活动全场业务。</li>
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