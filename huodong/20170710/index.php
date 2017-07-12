<?php 
    $title = "这个节日我赞助"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170710"; // 配置图片的，必须
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
            background: #0f0d0d;
        }

        .loading-ele-color:after,
        .loading-ele-color:before {
            background: #0f0d0d !important;
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
                <div class="page page1 hide">
                    <div class="content">
                        <img class="bgImg" data-src="<?php echo $imgUrl; ?>love_bg_one.jpg" alt="">
                    </div>
                </div>
                <div class="page page2 hide">
                    <div class="content">
                        <!--<div class="redPackets"><img data-src="<?php echo $imgUrl; ?>redPackets.png"></div>-->
                        <img data-src="<?php echo $imgUrl; ?>love_bg_two2.jpg" alt="">
                        <div class="looking" bp="查看红包" title="查看红包"></div>
                        <div class="apply" bp="牵手兴业拿红包" title="牵手兴业拿红包"></div>
                        <div class="rule-btn">规则</div>
                    </div>
                </div>
            </div>
            <div class="mask hide"></div>
            <div class="rule zm-customer-confirm hide">
                <h6>活动规则</h6>
                <ul>
                    <li><span>1.</span>活动期间7月14日-7月20日，通过活动页面按钮申请兴业精英系列即可获得相应权益；</li>
                    <li><span>2.</span>拆开红包后点击“收下”，奖品即发放至您的账户，完成申请并开卡后即可领取；</li>
                    <li><span>3.</span>开卡后，请尽快通过活动页面“查看红包”找到对应奖品填写支付宝和姓名；</li>
                    <li><span>4.</span>本次活动仅限之前未成功申请过该业务的用户，且同一用户不可重复领取同一奖励，如您的账户中还有该业务未失效的同类型奖品，则本次活动不予发奖；</li>
                    <li><span>5.</span>活动权益需在8月10日24时前完成领取，过期自动失效；</li>
                    <li><span>6.</span>有任何疑问或者帮助可联系客服4008635151；</li>
                    <li><span>7.</span>活动最终解释权归杭州煎饼网络技术有限公司所有。</li>
                </ul>
                <div class="btn-close"></div>
            </div>
        </div>
    </body>

    </html>