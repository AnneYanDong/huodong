<?php 
    $title = "大节难逃 领“拦路红包”"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170601"; // 配置图片的，必须
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
            background: #873eff;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #873eff !important;
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
            <img data-src="<?php echo $imgUrl; ?>bg5.jpg" alt="">
            <div class="redEnvelope addMove"></div>
            <div class="apply" bp="申请即获100元京东E卡" title="申请即获100元京东E卡"></div>
            <div class="look" bp="查看我的红包" title="查看我的红包"></div>
            <div class="rule-btn"></div>
        </div>
    </div>
    <div class="mask hide"></div>
</div>
<div class="rule zm-customer-confirm hide">
    <h6>活动规则</h6>
    <ul>
        <li><span>1.</span>活动期间6月6日-6月20日，通过活动页面按钮申请兴业精英系列即可获得相应权益；</li>
        <li><span>2.</span>18元福利金完成申请后可领取（该权益与信用卡定制活动权益不可重复领取）,100元京东卡需完成开卡后领取；</li>
        <li><span>3.</span>完成申请后，请尽快通过活动页面“查看红包”找到对应奖品填写支付宝和手机号；</li>
        <li><span>4.</span>本次活动仅限之前未成功申请过该业务的用户，且同一用户不可重复领取同一奖励，活动权益需在7月10日24时前完成领取，过期自动失效；</li>
        <li><span>5.</span>有任何疑问或者帮助可联系客服4008635151；</li>
        <li><span>6.</span>活动最终解释权归杭州煎饼网络技术有限公司所有。</li>
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
