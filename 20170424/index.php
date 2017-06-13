<?php 
    $title = "兴业专场"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170424"; // 配置图片的，必须
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
            background: #222246;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #222246 !important;
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
            <div class="apply1" bp="悠系列立即申请" title="悠系列立即申请"></div>
            <div class="apply2" bp="精英系列立即申请" title="精英系列立即申请"></div>  
            <div class="rule-btn"></div>
        </div>
    </div>
    <div class="mask hide"></div>
</div>
<div class="rule zm-customer-confirm hide">
    <h6>活动规则</h6>
    <ul>
        <li><span>1.</span>4月24日-4月30日活动期间，通过活动页面完成申请业立享悠系列或精英系列的用户即视为参加本次活动；</li>
        <li><span>2.</span>前1000名成功申请的用户可获50元话费奖励（完成开卡后话费自动充值至银行预留手机号）；</li>
        <li><span>3.</span>额度最高的用户，获批额度将享受12%超高利率7天收益（四舍五入取整），用户完成开卡即可领取权益（例如：用户获批额度100000，则可领取100000*12%／365*7=230元）；</li>
        <li><span>4.</span>如最高额度有多名用户，则按申请时间取最早提交的那位；</li>
        <li><span>5.</span>本活动仅限未在平台成功申请过任意兴业卡片的用户，且活动权益同一用户仅限领取一次；</li>
        <li><span>6.</span>现金权益将在活动结束后发放至“我的奖品”中，届时请及时前往填写支付宝信息领取奖励，超时7天未填写奖品将自动失效；</li>
        <li><span>7.</span>有任何疑问或者帮助可联系客服4008635151；</li>
        <li><span>8.</span>活动最终解释权归杭州煎饼网络技术有限公司所有。</li>
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