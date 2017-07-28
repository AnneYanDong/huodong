<?php 
    $title = "查公积金  送积分"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170721"; // 配置图片的，必须
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
            background: #47daeb;
        }

        .loading-ele-color:after,
        .loading-ele-color:before {
            background: #47daeb !important;
        }
    </style>
    <script>
        // 埋点后缀用
        var projectName = "<?php echo $actDate ?>";
    </script>
    <!-- <script src="js/main.min.js"></script> -->
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    </head>

    <body>
        <div class="out-wrap hide">
            <div class="wp-inner">
                <div class="content">
                  <img class="bg" data-src="<?php echo $imgUrl; ?>update_bg.png" alt="title" />
                  <div class="btn1" bp="幸运转出来" title="幸运转出来">幸运转出来</div>
                  <div class="btn2" bp="邀请好友" title="邀请好友"></div>
                  <img class="turntable" bp="转盘箭头" title="转盘箭头" data-src="<?php echo $imgUrl; ?>turntable_03.png" alt="turntable" />
                  <div class="ellipse-shadow"></div>
                  <img class="arrow" bp="转盘箭头" title="转盘箭头" data-src="<?php echo $imgUrl; ?>arrow.png" alt="arrow" />
                </div>
            </div>
        </div>
    </body>

    </html>
