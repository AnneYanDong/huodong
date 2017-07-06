<?php
    $title = "一起来抢红包雨"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170705"; // 配置图片的，必须
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
            background: #8619a4;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #8619a4 !important;
        }
    </style>
     <script>
        //加载test.php假接口
        var indexData = {
            ajaxUrl: "<?php echo 'test.php'; ?>"
        };
    </script>
    <script>
       var projectName = "<?php echo $actDate ?>";
    </script>
    <!-- 引入require.js和设置文件js的入口 -->
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    </head>
    <body>
        <div class="wp hide">
            <div class="wp-inner">
                <div class="content">
                    <!-- <?php echo $imgUrl; ?>后面图片的命名必须是20170705_jhd_bg.jpg -->
                    <img class="bonus-bg" data-src="<?php echo $imgUrl; ?>jyd_nobonus_bg.png" alt="bg" />
                    <img class="bonus-shake" data-src="<?php echo $imgUrl; ?>shake_hand_03.png" alt="摇红包" />
                    <img class="bonus1" data-src="<?php echo $imgUrl; ?>bonus1.png" alt="红包1" />
                    <img class="bonus2" data-src="<?php echo $imgUrl; ?>bonus2.png" alt="红包2" />
                    <img class="bonus3" data-src="<?php echo $imgUrl; ?>bonus3.png" alt="红包3" />
                    <div class="bonus-rain">
                        <img class="bonus-rain1 hide" data-src="<?php echo $imgUrl; ?>bonus_rain.png" alt="红包雨" />
                        <img class="bonus-rain2 hide" data-src="<?php echo $imgUrl; ?>bonus_rain.png" alt="红包雨" />
                        <img class="bonus-rain3 hide" data-src="<?php echo $imgUrl; ?>bonus_rain.png" alt="红包雨" />
                        <img class="bonus-rain4 hide" data-src="<?php echo $imgUrl; ?>bonus_rain.png" alt="红包雨" />
                    </div>
                    <div class="tp-img-container hide"></div>
                    <div class="btn" bp="马上领取" title="马上领取"></div>
                    <div class="rule-btn" bp="规则" title="规则"></div>
                    <div class="tp-apply hide"></div>
                </div>
                <div class="mask hide"></div>
            </div>
        </div>
    </body>
    <script type="text/template" id="tpl-rule">
            <div class="rule">
                <h6>活动规则</h6>
                <ul>
                    {@each rule as item,index}
                    <li><span>${Number(index)+1}、</span>${item}</li>
                    {@/each}
                </ul>
                <div class="btn-close"></div>
            </div>
    </script>
</html>