<?php 
    $title = "51公积金管家"; // 配置标题的，必须
    include "../public/v2/header.php";
    $proName = "20170925invitation"; // 配置文件的项目名
    $version = "regist";
    $obj = new Resource; // 实例化获取资源类
    $res = $obj->getResStr($proName,$version); // 获取指定的活动资源，返回数组，array("css"=> "..", "js"=>"。。")
    include "../public/v2/img_src.php";    
?>
    <link rel="stylesheet" href="<?php echo $res['css'] ?>">
    <link href="https://cdn.bootcss.com/animate.css/3.5.2/animate.css" rel="stylesheet">
    <style>
        /* 加载动画颜色配置 */
        .loading-bg-color {
            background: #446ff2;
        }
        .loading-ele-color:after, .loading-ele-color:before {
            background: #446ff2 !important;
        }
    </style>
    <script>
        // 埋点后缀用
        var projectName = "<?php echo $proName ?>";
    </script>
    </head>
    <body>
      <div class="wp">
        <div class="content">
         wid
        </div>
      </div>         
    <div class="vue-pre-loading loading-bg-color"><p class="vue-pre-loading-des">Waiting For Loading...</p><div class="vue-pre-loading-ele loading-ele-color"></div></div>    
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    </body>
</html>