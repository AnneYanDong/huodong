<?php 
    $title = "父亲节"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170615"; // 配置图片的，必须
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
            background: #15164c;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #15164c !important;
        }
    </style>
    <script>
        // 埋点后缀用
        var projectName = "<?php echo $actDate ?>";
    </script>
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    </head>
    <body>
    <div class="wp hide">
        <div class="wp-inner">
            <div class="page page1">
                <div class="content">
                  <img class="bgImg" data-src="<?php echo $imgUrl; ?>bg_one.jpg" alt="">
                  <div class="gift" bp="拆礼包" title="拆礼包"></div>
                  <div class="rule-btn"></div>
                </div>
            </div>
            <div class="page page2 hide">
                <div class="content">
                   <img data-src="<?php echo $imgUrl; ?>bg_two.jpg" alt="">
                   <div class="looking" bp="查看红包" title="查看红包"></div>
                   <div class="apply" bp="立即申请" title="立即申请"></div>
                   <div class="rule-btn"></div>
                </div>
            </div>
        </div>
        <div class="mask hide"></div>
        <div class="rule zm-customer-confirm hide">
    <h6>活动规则</h6>
    <ul>
        <li><span>1.</span>活动期间6月16日-6月18日，通过活动页面按钮申请光大智能商务金卡即可获得88、188、288随机现金（该权益与信用卡定制活动权益不可重复领取）；</li>
        <li><span>2.</span>审批通过后请尽快前往网点完成面签，获得卡片后通过电话完成激活，即可通过活动页面“查看红包”找到对应奖品，填写支付宝和手机号以领取；</li>
        <li><span>3.</span>本次活动仅限之前未成功申请过该业务的用户，且同一用户不可重复领取同一奖励，活动权益需在7月12日24时前完成领取，过期自动失效；</li>
        <li><span>4.</span>有任何疑问或者帮助可联系客服4008635151；</li>
        <li><span>5.</span>活动最终解释权归杭州煎饼网络技术有限公司所有。</li>
    </ul>
    <div class="btn-close"></div>
</div>
    </div>
    <script>
        var indexData = {
            ajaxUrl: "<?php echo 'test.php'; ?>"
        };
    </script>
    <script>
        var indexFn = function (data) {
            return Number(data) + 1;
        }
    </script>
    </body>
</html>