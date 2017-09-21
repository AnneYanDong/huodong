<?php 
    $title = "邀请好友"; // 配置标题的，必须
    include "../public/v2/header.php";
    $proName = "20170905";
    $version = "v2";
?>
<?php
    $obj = new Resource; // 实例化获取资源类
    $res = $obj->getResStr($proName, $version); // 获取指定的活动资源，返回数组，array("css"=> "..", "js"=>"。。")
    $origin = $_SERVER['HTTP_HOST'];
    include "../public/v2/img_src.php";
?>
    <link rel="stylesheet" href="<?php echo $res['css'] ?>">
    <style>
        /* 加载动画颜色配置 */
        .loading-bg-color {
            background: #f95547;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #f95547 !important;
        }
    </style>
    </head>
    <body>
<div class="wp hide">
    <div class="wp-inner">
        <div class="content">
           <ul class="wrap-title">
               <li data-type="1" class="invite-record-btn yellow">我的邀请记录</li>
               <li data-type="2" class="prize-detail-btn">邀请奖励明细</li>
           </ul>
           <div class="wrap-tab">
                <ul class="record-on">
                    <li><span>已邀好友</span><span>邀请时间</span><span>15日内累计投资14天标金额/元</span></li>
                    <div class="wrap-scroll">
                        <!-- <li class="record-list"><span>余**</span><span>2017/07/09 18:00</span><span>100,000.00</span></li> -->
                        <!-- <li class="record-list"><span>余**</span><span>2017/07/09 18:00</span><span>100,000.00</span></li>
                        <li class="record-list"><span>余**</span><span>2017/07/09 18:00</span><span>100,000.00</span></li>
                        <li class="record-list"><span>余**</span><span>2017/07/09 18:00</span><span>100,000.00</span></li> -->
                    </div>

                </ul>
                <ul class="cur">
                    <li><span>结算时间</span><span>奖金金额</span><span>来源</span></li>
                    <div class="wrap-scroll">
                        <!-- <li class="record-list"><span>2017-10.15</span><span>100</span><span>余**</span></li> -->
                    </div>
                </ul>
           </div>
        </div>
    </div>
</div>
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    <script>
        window.onload = function (){

        }

    </script>
    </body>
</html>