<?php 
    $title = "公积金也能办信用卡啦"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170526"; // 配置图片的，必须
    $actDate1 = "20170313";
    $obj = new Resource; // 实例化获取资源类
    $res = $obj->getResStr($actDate); // 获取指定的活动资源，返回数组，array("css"=> "..", "js"=>"。。")
    $origin = $_SERVER['HTTP_HOST'];
    if (preg_match('/b\.jianbing\.com/', $origin) || preg_match('/kaifa\.jianbing\.com/', $origin)) {
        $imgUrl = '//r.51gjj.com/act/release/img/' . $actDate . '_';
    } else {
        $imgUrl = '../static/img/' . $actDate . '_';
    };
    if (preg_match('/b\.jianbing\.com/', $origin) || preg_match('/kaifa\.jianbing\.com/', $origin)) {
        $imgUrl1 = '//r.51gjj.com/act/release/img/' . $actDate1 . '_';
    } else {
        $imgUrl1 = '../static/img/' . $actDate1 . '_';
    };
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
        var projectName = "<?php echo $actDate ?>";
    </script>
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    </head>
    <body>
    <div class="wp hide">
        <div class="wp-inner">
            <div class="page page1">
                <div class="content">
                    <h1 class="t1"><img data-src="<?php echo $imgUrl; ?>page1_title.png" alt=""></h1>
                    <!--<h6 class="t2">我们与各家银行联合推出信用卡定制服务</h6>-->
                    <ul class="t3">
                        <li>纯公积金授信</li>
                        <li>最高额度50万</li>
                        <li>N多权益 超长免息期</li>
                    </ul>
                    <div class="btn" title="开启定制" bp="开启定制">开启定制</div>
                    <div class="process" title="办卡进度" bp="办卡进度">办卡进度<span class="icon-process"></span></div>
                </div>
            </div>
            <div class="page page2">
                <div class="content">
                    <h6 class="t1">选择信用卡额度</h6>
                    <ul class="choose">
                        <li class="grayscale animated" data-loan-type="1" title="1~5万" bp="1~5万">
                            <div class="left">1~5万</div>
                            <div class="right"><span class="choose-icon"></span></div>
                        </li>
                        <li class="grayscale animated" data-loan-type="2" title="6~50万" bp="6~50万">
                            <div class="left">6~50万</div>
                            <div class="right"><span class="choose-icon"></span></div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="page page3">
                <div class="content">
                    <h6 class="t1">选择信用卡发卡行</h6>
                    <ul class="choose">
                        <li class="grayscale animated" data-card-type="1" title="浦发" bp="浦发">
                            <div class="left">
                                <span class="credit-card-icon icon-pufa"></span>
                            </div>
                            <div class="right"><span class="choose-icon"></span></div>
                        </li>
                        <li class="grayscale animated" data-card-type="2" title="光大" bp="光大">
                            <div class="left">
                                <span class="credit-card-icon icon-guangda"></span>
                            </div>
                            <div class="right"><span class="choose-icon"></span></div>
                        </li>
                        <li class="grayscale animated" data-card-type="3" title="兴业" bp="兴业">
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
                <li class="grayscale" data-pay="1" title="4000以上" bp="4000以上">
                    <div class="left">4000以上</div>
                    <div class="right"><span class="choose-icon"></span></div>
                </li>
                <li class="grayscale" data-pay="2" title="4000以下" bp="4000以下">
                    <div class="left">4000以下</div>
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
                <li class="grayscale" data-pay="1" title="4000以上" bp="4000以上">
                    <div class="left">4000以上</div>
                    <div class="right"><span class="choose-icon"></span></div>
                </li>
                <li class="grayscale" data-pay="2" title="4000以下" bp="4000以下">
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
                <div class="image">
                    {@if title=="浦发巴萨分期白金卡"}
                        <img src="<?php echo $imgUrl; ?>${img}" alt="">
                    {@else}
                        <img src="<?php echo $imgUrl1; ?>${img}" alt="">
                    {@/if}
                </div>
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
                        <li class="red"><span>·</span>${item}</li>
                        {@/each}
                    </ul>
                </div>
            </div>
        </div>
        <div class="btn apply" data-link="${cardApply}" bp="${title}立即申请" title="${title}立即申请">立即申请</div>
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