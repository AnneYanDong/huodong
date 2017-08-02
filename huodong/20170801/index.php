<?php 
    $title = "公积金定制贷款"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170801"; // 配置图片的，必须
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
            background: #1f1f2f;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #1f1f2f !important;
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
                    <h1 class="title1"><img data-src="<?php echo $imgUrl; ?>page1_title.png" alt="title1"></h1>
                    <h6 class="title2">为您推荐最适合的贷款</h6>
                    <ul class="title3">
                        <h5>您想借多少钱？</h5>
                        <li bp="1万元以下" title="1万元以下" data-loan-total="1万元以下">
                            <img data-src="<?php echo $imgUrl; ?>page1_loan1_02.png" alt="1万元以下">
                            <span>1万元以下</span>
                        </li>
                        <li bp="1~3万" title="1~3万" data-loan-total="1~3万">
                            <img data-src="<?php echo $imgUrl; ?>page1_loan2_02.png" alt="1~3万">
                            <span>1-3万元</span>
                        </li>
                        <li bp="3万元以上" title="3万元以上" data-loan-total="3万元以上">
                            <img data-src="<?php echo $imgUrl; ?>page1_loan3_02.png" alt="3万元以上">
                            <span>3万元以上</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="page page2">
                <div class="content">
                    <div class="dial1"><img data-src="<?php echo $imgUrl; ?>page2_top.png" alt="dial"></div>
                    <ul class="title3">
                        <h5>您想借多久？</h5>
                        <li bp="30天以内" title="30天以内" data-loan-time="30天以内">
                            <img data-src="<?php echo $imgUrl; ?>page1_loan1_02.png" alt="30天以内">
                            <span>30天以内</span>
                        </li>
                        <li bp="1年以内" title="1年以内" data-loan-time="1年以内">
                            <img data-src="<?php echo $imgUrl; ?>page1_loan2_02.png" alt="1年以内">
                            <span>1年以内</span>
                        </li>
                        <li bp="1年以上" title="1年以上" data-loan-time="1年以上">
                            <img data-src="<?php echo $imgUrl; ?>page1_loan3_02.png" alt="1年以上">
                            <span>1年以上</span>
                        </li>
                    </ul>
                    <div class="dial2"><img data-src="<?php echo $imgUrl; ?>page2_bottom.png" alt="dial"></div>
                </div>
            </div>
            <div class="page page3">
               <div class="content">
                   <div class="dial1"><img data-src="<?php echo $imgUrl; ?>page2_top.png" alt="dial"></div>
                   <ul class="title3">
                       <h5>可接受放款时间为？</h5>
                       <li bp="1天以内" title="1天以内" data-loan-release="1天以内">
                           <img data-src="<?php echo $imgUrl; ?>page1_loan1_02.png" alt="1天以内">
                           <span>1天以内</span>
                       </li>
                       <li bp="1-3天" title="1-3天" data-loan-release="1-3天">
                           <img data-src="<?php echo $imgUrl; ?>page1_loan2_02.png" alt="1-3天">
                           <span>1-3天</span>
                       </li>
                   </ul>
                   <div class="tips"><span>tips:申请额度与放款时间正相关哦！</span></div>
                   <div class="dial2"><img data-src="<?php echo $imgUrl; ?>page2_bottom.png" alt="dial"></div>
               </div>
            </div>
            <div class="page page4">
                <div class="content">
                    <div class="dial1"><img data-src="<?php echo $imgUrl; ?>page2_top.png" alt="dial"></div>
                    <div class="circle">
                        <div class="circle-A" data-loan-focus="放款额度高"><img data-src="<?php echo $imgUrl; ?>page4_circle.png" alt="A" bp="A" title="A"></div>
                        <div class="circle-B" data-loan-focus="审批快"><img data-src="<?php echo $imgUrl; ?>page4_circle.png" alt="B" bp="B" title="B"></div>
                        <div class="circle-C" data-loan-focus="利息低"><img data-src="<?php echo $imgUrl; ?>page4_circle.png" alt="C" bp="C" title="C"></div>
                        <div class="circle-D" data-loan-focus="每月还款少"><img data-src="<?php echo $imgUrl; ?>page4_circle.png" alt="D" bp="D" title="D"></div>
                    </div>
                    <div class="choose"><img data-src="<?php echo $imgUrl; ?>page4_choose.png" alt="dial"></div>
                    <div class="dial2"><img data-src="<?php echo $imgUrl; ?>page2_bottom.png" alt="dia2"></div>
                </div>
            </div>
            <div class="page page5">
                <div class="content">
                    <div class="test-result"><img data-src="<?php echo $imgUrl; ?>page5_test_result.png" alt="test_result"></div>
                    <div class="final-loan"><img data-src="<?php echo $imgUrl; ?>page5_final_loan.png" alt="final_loan"></div>
                    <div class="test-btn hide" bp="重新测试" title="重新测试"><span>重新测试</span></div>
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
    <script>
        var indexFn = function (data) {
            return Number(data) + 1;
        }
    </script>
    </body>
</html>
