<?php 
    $title = "尊享白金权益"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170531"; // 配置图片的，必须
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
            background: #c8c8c8;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #c8c8c8 !important;
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
            <img class="title" data-src="<?php echo $imgUrl; ?>bsk_title.png" alt="title" />
            <div class="bank-wrap">
                <img class="bank" data-src="<?php echo $imgUrl; ?>bsk_bank.png" alt="bank" />
                <div class="bank_bg1"></div>
                <div class="bank_bg2"></div>
            </div>
            <!-- 用来挂浮动文字 -->
            <div class="float-text">
               <ul>
                   <div class="location1">
                       <li><img data-src="<?php echo $imgUrl; ?>bsk_float_icon1.png"><span style="color: #ee6f42">1-5折随机商圈折扣</span></li>
                       <li><img data-src="<?php echo $imgUrl; ?>bsk_float_icon2.png"><span>外卖/团购立减</span></li>
                       <li><img data-src="<?php echo $imgUrl; ?>bsk_float_icon3.png"><span>人均额度30万</span></li>
                       <li><img data-src="<?php echo $imgUrl; ?>bsk_float_icon4.png"><span>酒店住两晚送一晚</span></li>
                       <li><img data-src="<?php echo $imgUrl; ?>bsk_float_icon5.png"><span>特价手调饮品</span></li>
                   </div>
                   <div class="location2">
                       <li><img data-src="<?php echo $imgUrl; ?>bsk_float_icon6.png"><span>商场免费停车</span></li>
                       <li><img data-src="<?php echo $imgUrl; ?>bsk_float_icon6.png"><span style="color: #ee6f42">机场1元停车</span></li>
                       <li><img data-src="<?php echo $imgUrl; ?>bsk_float_icon8.png"><span style="color: #ee6f42">10元看电影 30元看话剧</span></li>
                       <li><img data-src="<?php echo $imgUrl; ?>bsk_float_icon9.png"><span>消费获免费流量</span></li>
                   </div>
               </ul>
            </div>
            <div class="footer">
                <img class="gold" data-src="<?php echo $imgUrl; ?>bsk_gold.png" alt="免息金" />
                <div class="apply gradient" bp="立即拥有" title="立即拥有">立即拥有</div>
                <div class="rule-btn">活动规则</div>
            </div>
        </div>
    </div>
</div>
<div class="rule hide">
    <h6>活动规则</h6>
    <ul>
        <li><span>1.</span>活动期间（7月13日－奖品发完）完成申请可获得58元现金红包，成功激活信用卡可再得258元现金红包。为了您能够顺利拿到奖励，请申请业务后及时关注“我的奖品”；</li>
        <li><span>2.</span>活动之前已成功申请且已激活卡片的用户无法获得该活动奖励；</li>
        <li><span>3.</span>若活动之前已领取过浦发业务的其他红包券，则不可获得本活动的红包券；</li>
        <li><span>4.</span>奖品存在有效期，自获得日起15天后失效，请尽快申请并激活使用卡片；</li>
        <li><span>5.</span>现金将在10个工作日内发放到您的支付宝账户，请在“我的-我的奖品”中及时完善支付宝信息；</li>
        <li><span>6.</span>关于活动有任何疑问请咨询官方客服热线4008635151</li>
        <li><span>7.</span>本商品由51公积金管家提供，与设备生产商Apple Inc.公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。</li>
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