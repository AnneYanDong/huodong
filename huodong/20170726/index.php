<?php 
    $title = "活动中心"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170726"; // 配置图片的，必须
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
            background: #ffe200;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #ffe200 !important;
        }
    </style>
    <script>
       var projectName = "<?php echo $actDate ?>";
    </script>
    </head>
    <body>
<div class="wp hide">
    <div class="wp-inner">
        <img data-src="<?php echo $imgUrl?>bg_pattern_top.png">
        <img class="pattern-bottom" data-src="<?php echo $imgUrl?>bg_pattern_bottom.png">
        <div class="content">
            <img class="rule-btn" data-src="<?php echo $imgUrl?>rule_btn.png">
            <img class="main-title" data-src="<?php echo $imgUrl?>main_title.png">
            <div class="act-time">活动时间：<span class="time-day">8.1<div class="time-hour"><div class="time-second">00:00</div></div><span>-</span>8.10</span><div class="time-hour"><div class="time-second">23:59</div></div></div>
            <img class="add-interest" data-src="<?php echo $imgUrl?>interest.png">
            <div class="list-wrap">
                <img class="list-bg" data-src="<?php echo $imgUrl?>list_bg.png">
            </div>
            <div class="total-money">您当前累计投资金额：<span class="money-red">2000</span>元</div>
            
            <img class="invest-btn" data-src="<?php echo $imgUrl?>go_btn.png">
        </div>
    </div>
</div>
        <div class="rule zm-customer-confirm hide">
            <img data-src="<?php echo $imgUrl?>rule_img.png">
            <div class="btn-close"></div>
            <ul>
                <li><span class="add-style">活动时间：</span>8月1日00:00——8月10日 23:59</li>
                <li><span>活动对象：</span>所有理财用户</li>
                <li><span>返现说明：</span></li>
                <li><span>1.</span>在活动期间内累计投资金额排名前5的用户，可额外获得返现奖励（投资金额一样，按照时间的先后顺序进行排名）</li>
                <li><span>2.</span>榜单上的明细和累积投资金额将每小时更新一次，最终结果以8月10号23:59分截止时间为准</li>
                <li><span>3.</span>奖励发放：活动结束后7个工作日内发放到您的理财账户中，会有电话或短信通知您</li>
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