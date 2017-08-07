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
                        <li bp="1万元以下" title="1万元以下" data-loan-total="1万元以下" class="">
                            <img data-src="<?php echo $imgUrl; ?>A.png" alt="1万元以下">
                            <span>1万元以下</span>
                        </li>
                        <li bp="1~3万" title="1~3万" data-loan-total="1-3万">
                            <img data-src="<?php echo $imgUrl; ?>B.png" alt="1~3万">
                            <span>1-3万元</span>
                        </li>
                        <li bp="3万元以上" title="3万元以上" data-loan-total="3万元以上">
                            <img data-src="<?php echo $imgUrl; ?>C.png" alt="3万元以上">
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
                            <img data-src="<?php echo $imgUrl; ?>A.png" alt="30天以内">
                            <span>30天以内</span>
                        </li>
                        <li bp="1年以内" title="1年以内" data-loan-time="1年以内">
                            <img data-src="<?php echo $imgUrl; ?>B.png" alt="1年以内">
                            <span>1年以内</span>
                        </li>
                        <li bp="1年以上" title="1年以上" data-loan-time="1年以上">
                            <img data-src="<?php echo $imgUrl; ?>C.png" alt="1年以上">
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
                           <img data-src="<?php echo $imgUrl; ?>A.png" alt="1天以内">
                           <span>1天以内</span>
                       </li>
                       <li bp="1-3天" title="1-3天" data-loan-release="1-3天">
                           <img data-src="<?php echo $imgUrl; ?>B.png" alt="1-3天">
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
                    <div class="choose">
                        <div class="circle">
                            <div class="circle-A" data-loan-focus="放款额度高"><img data-src="<?php echo $imgUrl; ?>page4_circle.png" alt="A" bp="A" title="A"></div>
                            <div class="circle-B" data-loan-focus="审批快"><img data-src="<?php echo $imgUrl; ?>page4_circle.png" alt="B" bp="B" title="B"></div>
                            <div class="circle-C" data-loan-focus="利息低"><img data-src="<?php echo $imgUrl; ?>page4_circle.png" alt="C" bp="C" title="C"></div>
                            <div class="circle-D" data-loan-focus="每月还款少"><img data-src="<?php echo $imgUrl; ?>page4_circle.png" alt="D" bp="D" title="D"></div>
                        </div>
                        <img data-src="<?php echo $imgUrl; ?>page4_choose.png" alt="dial">
                    </div>
                    <div class="customization-tp hide">
                        <img class="tp" data-src="<?php echo $imgUrl; ?>page4_new_tp.png" alt="tp">
                        <img class="male" data-src="<?php echo $imgUrl; ?>page4_male.png" alt="male">
                        <img class="female hide" data-src="<?php echo $imgUrl; ?>page4_female.png" alt="female">
                        <img class="tp-circle circle-rotating2" data-src="<?php echo $imgUrl; ?>tp_circle.png" alt="tp-circle">
                        <div class="analyzing-title"><div><span>您的定制贷款正在分析中</span></div></div>
                        <div class="analyzing-process">
                            <div class="span0 hide"><span>标准化数据采集中</span></div>
                            <div class="span1 hide"><span>资料分析配置预备</span></div>
                            <div class="span2 hide"><span>用户精准分层设定匹配中</span></div>
                            <div class="span3 hide"><span>个性化定制推荐追踪</span></div>
                            <div class="span4 hide"><span>深层心理动机探知进行中</span></div>
                        </div>
                        <div class="scan scaning"><img data-src="<?php echo $imgUrl; ?>page4_new_scan.png" alt="scan"></div>
                    </div>
                    <div class="dial2"><img data-src="<?php echo $imgUrl; ?>page2_bottom.png" alt="dia2"></div>
                </div>
            </div>
            <div class="page page5">
                <div class="content">
                    <div class="test-result">
                        <img data-src="<?php echo $imgUrl; ?>page5_test_result.png" alt="test_result">
                        <!-- 挂icon列表 -->
                        <ul class="icon-box">
                        </ul>
                    </div>
                    <div class="final-loan" bp="立即提款" title="立即提款">
                        <img class="final-loan" data-src="<?php echo $imgUrl; ?>page5_final_loan.png" alt="final_loan">
                        <div class="loan-name"></div>
                        <div class="loan-match"></div>
                        <div class="loan-amount"></div>
                        <div class="withdraw"><span>立即</span><span>提款</span></div>
                        <div class="finger-box" bp="立即提款" title="立即提款">
                            <img class="rectangle" data-src="<?php echo $imgUrl; ?>page5_rectangle.png" alt="矩形"/>
                            <img class="finger move" data-src="<?php echo $imgUrl; ?>page5_finger.png" alt="手指"/>
                            <img class="finger-scan hide" data-src="<?php echo $imgUrl; ?>finger_scan.png" alt="扫描"/>

                            <img class="fingerprint hide" data-src="<?php echo $imgUrl; ?>page5_fingerprint.png" alt="指纹"/>
                        </div>
                        <div class="info-box">
                            <div class="day-rate"></div>
                            <div class="release-time"></div>
                        </div>
                    </div>
                    <div class="test-btn" bp="重新测试" title="重新测试"><span>重新测试</span></div>
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

<!-- 贷款信息开始 -->
    <script type="text/template" id="tpl-loan-name">
        <span>${name}</span>
    </script>
    <script type="text/template" id="tpl-loan-match">
        匹配度&nbsp;${match_rate}%<span></span>
    </script>
    <script type="text/template" id="tpl-loan-amount">
        额度&nbsp;&nbsp;<span>${max_amount}</span>
    </script>
    <script type="text/template" id="tpl-day-rate">
        日费率&nbsp;<span>${day_rate}</span>
    </script>
    <script type="text/template" id="tpl-release-time">
        放款时间&nbsp;<span>${loan_time}</span>
    </script>
<!-- 贷款信息结束 -->

    <script>
        var indexFn = function (data) {
            return Number(data) + 1;
        }
    </script>
    </body>
</html>
