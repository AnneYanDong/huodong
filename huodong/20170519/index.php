<?php 
    $title = "端午出行专场"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170519"; // 配置图片的，必须
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
            background: #74ccbe;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #74ccbe !important;
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
            <div class="apply bank1" bp="光大一键领取" title="光大一键领取"></div>
            <div class="apply bank2" bp="兴业一键领取" title="兴业一键领取"></div>
            <div class="rule-btn"></div>
        </div>
    </div>
    <div class="mask hide"></div>
</div>
<div class="rule zm-customer-confirm hide">
    <h6>活动规则</h6>
    <ul>
        <li><span>1.</span>活动期间5月22日-5月31日，通过活动页面按钮申请活动业务即可获得相应权益，成功开卡后即可领取；</li>
        <li><span>2.</span>申请兴业精英系列的用户，成功开卡后可获*30元神秘现金奖励及50元话费，百位数字在发到奖品时可知，话费将自动充值至用户银行预留手机；</li>
        <li><span>3.</span>申请光大智能商务金卡的用户，成功开卡后可获30-300元随机现金券；</li>
        <li><span>4.</span>所有参与活动的用户需自主前往个人资料-收获信息中完成支付宝账号的填写，以免影响权益正常发放，活动将分批次进行及时打款；</li>
        <li><span>5.</span>已拥有本活动所推广业务的奖品，或已成功申请过本活动所推广业务通过本活动重复申请，均不可获得奖品，且同一用户不可重复领取同一奖励；</li>
        <li><span>6.</span>有任何疑问或者帮助可联系客服4008635151；</li>
        <li><span>7.</span>活动最终解释权归杭州煎饼网络技术有限公司所有。</li>
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