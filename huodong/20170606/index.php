<?php 
    $title = "有公积金，1个月白用钱"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170606"; // 配置图片的，必须
    $obj = new Resource; // 实例化获取资源类
    $res = $obj->getResStr($actDate); // 获取指定的活动资源，返回数组，array("css"=> "..", "js"=>"。。")
    $origin = $_SERVER['HTTP_HOST'];
    if (preg_match('/b\.jianbing\.com/', $origin) || preg_match('/kaifa\.jianbing\.com/', $origin)) {
        $imgUrl = '//r.51gjj.com/act/release/img/' . $actDate . '_';
    } else {
        $imgUrl = '../static/img/' . $actDate . '_';
    };
?>
    <link rel="stylesheet" href="<?php echo $res['css'] ?>?v=222">
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
            <img data-src="<?php echo $imgUrl; ?>bg.png" alt="">
            <div class="loan">
                <input type="tel" placeholder="填入2~9整数" maxlength="1" />
            </div>
            <div class="result"></div>
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
        <li><span>1.</span>通过活动页面首次申请金薪贷业务并且完成放款即可获得1个月的全额免息（次年首月的利息全免）。</li>
        <li><span>2.</span>每个用户只有1次免息优惠，已经有金薪贷抵息券的用户不可享受该奖励。</li>
        <li><span>3.</span>首年（前12期）提前还款或逾期还款，将无法享受此优惠。</li>
        <li><span>4.</span>有任何问题请咨询官方客服热线4008635151。</li>
        <li><span>5.</span>本商品由51公积金管家提供，与设备生产商Apple Inc.公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。</li>
    </ul>
    <div class="btn-close"></div>
</div>
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>?v=111"></script>
    <script>
        var indexData = {
            ajaxUrl: "<?php echo 'test.php'; ?>"
        };
    </script>
    </body>
</html>