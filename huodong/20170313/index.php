<?php 
    $title = "信用卡定制"; // 配置标题的，必须
    include "../public/v2/header.php";
    $proName = "20170313"; // 配置文件的项目名
    $version = "v2";
    $obj = new Resource; // 实例化获取资源类
    $res = $obj->getResStr($proName,$version); // 获取指定的活动资源，返回数组，array("css"=> "..", "js"=>"。。")
    include "../public/v2/img_src.php";    
?>
    <link rel="stylesheet" href="<?php echo $res['css'] ?>">
    <style>
        /* 加载动画颜色配置 */
        .loading-bg-color {
            background: #0d0d0d;
        }
        .loading-ele-color:after, .loading-ele-color:before {
            background: #0d0d0d !important;
        }
    </style>
    <script>
        // 埋点后缀用
        var projectName = "<?php echo $proName ?>";
    </script>
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    </head>
    <body>
    <div class="wp hide">
        <div class="wp-inner">
            <div class="page page1">
                <div class="content">
                    <h1 class="t1"><img data-src="<?php echo $imgUrl; ?>page1_title.png" alt=""></h1>
                    <h6 class="t2">我们与各家银行联合推出信用卡定制服务</h6>
                    <ul class="t3">
                        <li>纯公积金授信</li>
                        <li>最高额度50万</li>
                        <li>N多权益 超长免息期</li>
                    </ul>
                    <div class="btn" title="kaiqidingzhi" bp="kaiqidingzhi">开启定制</div>
                    <div class="process" title="bankajindu" bp="bankajindu">办卡进度<span class="icon-process"></span></div>
                </div>
            </div>
            <div class="page page2">
                <div class="content">
                    <h6 class="t1">选择信用卡额度</h6>
                    <ul class="choose">
                        <li class="grayscale animated" data-loan-type="1" title="OneToFive" bp="OneToFive">
                            <div class="left">1~5万</div>
                            <div class="right"><span class="choose-icon"></span></div>
                        </li>
                        <li class="grayscale animated" data-loan-type="2" title="SixToThirty" bp="SixToThrity">
                            <div class="left">6~30万</div>
                            <div class="right"><span class="choose-icon"></span></div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="page page3">
                <div class="content">
                    <h6 class="t1">选择信用卡发卡行</h6>
                    <ul class="choose">
                        <li class="grayscale animated" data-card-type="1" title="pufa" bp="pufa">
                            <div class="left">
                                <span class="credit-card-icon icon-pufa"></span>
                            </div>
                            <div class="right"><span class="choose-icon"></span></div>
                        </li>
                        <li class="grayscale animated" data-card-type="2" title="guangda" bp="guangda">
                            <div class="left">
                                <span class="credit-card-icon icon-guangda"></span>
                            </div>
                            <div class="right"><span class="choose-icon"></span></div>
                        </li>
                        <li class="grayscale animated" data-card-type="3" title="xingye" bp="xingye">
                            <div class="left">
                                <span class="credit-card-icon icon-xingye"></span>
                            </div>
                            <div class="right"><span class="choose-icon"></span></div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="page page4">
                <div class="content">
                </div>
            </div>
            <div class="page page5">
                <div class="content">
                </div>
            </div>
        </div>
        <div class="mask hide"></div>
    </div>
    <script>
        var indexData = {
            ajaxUrl: "<?php echo 'test.php'; ?>"
        };
    </script>
    <script type="text/template" id="tpl-choose-gd">
        <div class="next">
            <h6 class="t1">选择您的公积金缴存基数</h6>
            <p class="title-des">（即月工资）</p>
            <ul class="choose">
                <li class="grayscale" data-pay="1" title="Up2500" bp="Up2500">
                    <div class="left">2500以上</div>
                    <div class="right"><span class="choose-icon"></span></div>
                </li>
                <li class="grayscale" data-pay="2" title="Down2500" bp="Down2500">
                    <div class="left">2500以下</div>
                    <div class="right"><span class="choose-icon"></span></div>
                </li>
            </ul>
        </div>
    </script>
    <script type="text/template" id="tpl-choose-pf">
        <div class="next">
            <h6 class="t1">选择您的公积金缴存基数</h6>
            <p class="title-des">（即月工资）</p>
            <ul class="choose">
                <li class="grayscale" data-pay="1" title="Up4000" bp="Up4000">
                    <div class="left">4000以上</div>
                    <div class="right"><span class="choose-icon"></span></div>
                </li>
                <li class="grayscale" data-pay="2" title="Down4000" bp="Down4000">
                    <div class="left">4000以下</div>
                    <div class="right"><span class="choose-icon"></span></div>
                </li>
            </ul>
        </div>
    </script>
    <script type="text/template" id="tpl-card">
        <div class="card-show">
            <div class="card">
                <p class="title">${title}</p>
                <div class="image"><img src="<?php echo $imgUrl; ?>${img}" alt=""></div>
                <div class="feature">
                    <h6 class="fea-title right">权益</h6>
                    <ul>
                        {@each qy as item}
                        <li><span>·</span>${item}</li>
                        {@/each}
                    </ul>
                </div>
                <div class="feature">
                    <h6 class="fea-title activity">活动</h6>
                    <ul>
                        {@each hd as item}
                        <li class="orange"><span>·</span>${item}</li>
                        {@/each}
                    </ul>
                </div>
            </div>
        </div>
        <div class="btn apply" data-link="${cardApply}">立即申请</div>
        <div class="rule-btn">活动规则<span class="icon-process"></span></div>
    </script>
    <script type="text/template" id="tpl-rule">
        <div class="rule hide">
            <h6>活动规则</h6>
            <ul>
                {@each rule as item,index}
                <li><span>${index|index_add}、</span>${item}</li>
                {@/each}
            </ul>
            <div class="btn-close"></div>
        </div>
    </script>
    <script>
        var indexFn = function (data) {
            return Number(data) + 1;
        }
    </script>
    </body>
</html>