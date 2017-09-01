<?php 
    $title = "公积金也能赚收益"; // 配置标题的，必须
    include "../public/v2/header.php";
    $proName = "20170828"; // 配置文件的项目名
    $version = "v1";
    $obj = new Resource; // 实例化获取资源类
    $res = $obj->getResStr($proName,$version); // 获取指定的活动资源，返回数组，array("css"=> "..", "js"=>"。。")
    include "../public/v2/img_src.php";
?>
    <link rel="stylesheet" href="<?php echo $res['css'] ?>">
    <style>
        /* 加载动画颜色配置 */
        .loading-bg-color {
            background: #e33d3b;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #e33d3b !important;
        }
    </style>
    <!-- <script>
        // 埋点后缀用
        var projectName = "<?php echo $actDate ?>";
    </script> -->
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    </head>
    <body>
    <div class="wp hide">
        <div class="wp-inner">
            <div class="content">
                <div id="lottery">
                    <div class="single-info"></div>
                </div>
                <div class="title-container"></div>
                <div class="building-left"></div>
                <div class="building-right"></div>
                <div class="dynamic-layout">
                    <div class="tp hide">
                        <img data-src="<?php echo $imgUrl; ?>tp.png" alt="tp">
                        <div class="deposite-btn" bp="84_1_5_0_弹屏按钮"></div>
                    </div>
                </div>
                <div class="rule-btn" bp="84_1_6_0_活动规则">活动规则</div>
            </div>
        </div>
    </div>

    <script type="text/template" id="tpl-not-imported">
        <div class="dynamic-title"><span>您的公积金月缴额为</span></div>
        <div class="provident1">
            <img class="not-imported" src="http://r.51gjj.com/act/release/img/20170828_not_imported.png" alt="not-img">
        </div>
        <div class="act-detail">
            <div><span>*根据月缴情况</span><span style="color: #f26315;">翻倍赠送</span><span>理财金</span></div>
            <div><span>不影响公积金余额</span></div>
        </div>
        <div class="dynamic-btn btn1" bp="84_1_1_0_测测我能赚多少">测测我能赚多少</div>
    </script>

    <script type="text/template" id="tpl-have-imported">
        <div class="dynamic-title"><span>您的公积金月缴额为</span></div>
        <div class="provident2"></div>
        <div class="act-detail">
            <div><span>*根据月缴情况</span><span style="color: #f26315;">翻倍赠送</span><span>理财金</span></div>
            <div><span>不影响公积金余额</span></div>
        </div>
        <div class="dynamic-btn btn2" bp="84_1_2_0_一键领取理财金">一键领取理财金</div>
    </script>

    <script type="text/template" id="tpl-not-double">
        <div class="dynamic-title"><span>您的翻倍理财金</span></div>
        <div class="provident2"></div>
        <div class="act-detail">
            <div><span>*根据月缴情况</span><span style="color: #f26315;">翻倍赠送</span><span>理财金</span></div>
            <div><span>不影响公积金余额</span></div>
        </div>
        <div class="dynamic-btn btn3" bp="84_1_3_0_存入理财账户">存入理财账户</div>
    </script>

    <script type="text/template" id="tpl-have-doubled">
        <div class="dynamic-title"><span>您已领取翻倍理财金</span></div>
        <div class="provident2"></div>
        <div class="act-detail">
            <div><span>*根据月缴情况</span><span style="color: #f26315;">翻倍赠送</span><span>理财金</span></div>
            <div><span>不影响公积金余额</span></div>
        </div>
        <div class="dynamic-btn btn4" bp="84_1_4_0_查看收益">查看收益</div>
    </script>

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

    </body>
</html>
