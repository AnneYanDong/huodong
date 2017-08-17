<?php 
    $title = "解析你的公积金"; // 配置标题的，必须
    include "../public/v2/header.php";
    $proName = "20170807"; // 配置文件的项目名
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
            <div class="page page1">
                <div class="content">
                    <div class="title"><img data-src="<?php echo $imgUrl; ?>page1_title.png" alt="title"></div>
                    <div class="img-gold"><img data-src="<?php echo $imgUrl; ?>page1_$.png" alt="$"></div>
                    <!-- 按钮 -->
                    <div class="img-btn"><img data-src="<?php echo $imgUrl; ?>page1_btn.png" alt="btn"></div>
                    <div class="climb climbing"></div>
                    <div class="letter lettering"></div>
                    <div class="gold scrolling"><img data-src="<?php echo $imgUrl; ?>dynamic_gold.png" alt="gold"></div>
                </div>
            </div>
           <div class="page page2">
                <div class="content">
                    <img class="quickmark" data-src="<?php echo $imgUrl; ?>page2_quickmark.png" alt="quickmark">
                    <div class="portrait"></div>
                    <div class="circle"></div>
                    <div class="detail1">
                        <span><!-- 孙俪的公积金在上海市排名为 --></span>
                        <span></span>
                        <span>名</span>
                    </div>
                    <div class="gif-container">
                        <img class="pg" data-src="<?php echo $imgUrl; ?>page2_pg.png" alt="pg">
                        <div class="gjj_number">
                            <div><span><!-- 上海缴纳公积金人口基数 --></span></div>
                            <div>为<span>1233</span>万人</div>
                        </div>
                        <div class="gif"></div>
                    </div>
                    <div class="detail2">
                        <span>超过</span>
                        <span><!-- 75.4% --></span>
                        <span><!-- 的上海人 --></span>
                    </div>
                    <!-- 按钮 -->
                    <div class="next"><img data-src="<?php echo $imgUrl; ?>page2_next.png" alt="next"></div>
                </div>
            </div>
            <div class="page page3">
               <div class="content">
                   <img class="quickmark" data-src="<?php echo $imgUrl; ?>page2_quickmark.png" alt="quickmark">
                   <div class="detail3">
                       <div>
                            <span>从</span><span class="font-style">2010</span><span class="font-color">年</span><span class="font-style">5</span><span class="font-color">月</span>
                       </div>
                       <div><span><!-- 孙俪第一次缴纳公积金 --></span></div>
                       <div><span>至今已经</span><span class="diff-year font-style"><!-- 5 --></span><span>年了</span></div>
                   </div>
                   <div class="detail4">
                       <div>
                           <span>现在在</span><span class="font-color">北京</span><span>的你</span>
                       </div>
                       <div><span>还记得当年的那座城</span></div>
                       <div><span>那个初出茅庐的你么？</span></div>
                   </div>
                   <img class="page3-pg" data-src="<?php echo $imgUrl; ?>page3_pg.png" alt="pg">
                    <div class="thinking-gif"></div>
                    <!-- 按钮 -->
                   <div class="next"><img data-src="<?php echo $imgUrl; ?>page2_next.png" alt="next"></div>
               </div>
            </div>
            <div class="page page4">
                <div class="content">
                    <img class="quickmark" data-src="<?php echo $imgUrl; ?>page2_quickmark.png" alt="quickmark">
                    <div class="detail5">
                        <div>
                            <div><span>身为一枚</span></div>
                            <div class="age-container"><span>金光闪闪的</span><span class="age font-style"></span></div>
                        </div>
                        <div>
                            <div><span class="name"><!-- 孙俪 --></span></div>
                            <div><span>同比</span><span class="female-ranking font-style"></span><span class="gender"><!-- 的女性 --></span></div>
                            <div><span>更“有财”</span></div>
                        </div>
                    </div>
                    <img class="loading" data-src="<?php echo $imgUrl; ?>page4_loading.png" alt="loading">
                    <img class="page4-pg" data-src="<?php echo $imgUrl; ?>page4_pg.png" alt="pg">
                    <div class="glass"><img data-src="<?php echo $imgUrl; ?>page4_glass.png" alt="glass"></div>
                    <div class="detail6">
                        <div><span>另外，实力也远超了</span></div>
                        <div><span class="male-ranking font-style"></span><span class="gender"><!-- 的男性 --></span></div>
                    </div>
                    <!-- 按钮 -->
                    <div class="next"><img data-src="<?php echo $imgUrl; ?>page2_next.png" alt="next"></div>
                </div>
            </div>
            <div class="page page5">
                <div class="content">
                    <img class="quickmark" data-src="<?php echo $imgUrl; ?>page2_quickmark.png" alt="quickmark">
                    <img class="people1" data-src="<?php echo $imgUrl; ?>page5_people1.png" alt="people1">
                    <div class="detail10">
                        <div><span>奋斗的这些年</span></div>
                        <div>
                            <span>共有超过</span>
                            <span class="company_count"></span>
                            <span>家企业</span>
                        </div>
                        <div><span class="name"><!-- 争着为孙俪缴公积金 --></span></div>
                    </div>
                    <div class="star-gif"></div>
                    <div class="people-gif"></div>
                    <div class="detail11">
                        <div>这么抢手</div>
                        <div>你家里人知道吗</div>
                    </div>
                    <img class="people2" data-src="<?php echo $imgUrl; ?>page5_people1.png" alt="people2">
                    <!-- 按钮 -->
                    <div class="next"><img data-src="<?php echo $imgUrl; ?>page2_next.png" alt="next"></div>
                </div>
            </div>
            <div class="page page6">
                <div class="content">
                    <img class="quickmark" data-src="<?php echo $imgUrl; ?>page2_quickmark.png" alt="quickmark">
                    <div class="detail7">
                        <div class="detail7-1">
                            <div><span>说到买房...</span></div>
                            <div><span class="name"><!-- 孙俪的公积金可以 --></span></div>
                            <div class="text1"></div>
                            <div class="text2"></div>
                            <div class="text3"></div>
                            <div class="text4"></div>
                        </div>
                        <div class="detail7-2">
                            <div class="text5"></div>
                            <div class="text6"></div>
                            <div class="text7"></div>
                        </div>
                    </div>
                    <div class="bc-box">
                        <img class="building" data-src="<?php echo $imgUrl; ?>page6_building.png" alt="building">
                        <img class="cloud" data-src="<?php echo $imgUrl; ?>page6_cloud.png" alt="cloud">
                    </div>
                    <!-- 按钮 -->
                    <div class="next"><img data-src="<?php echo $imgUrl; ?>page2_next.png" alt="next"></div>
                </div>
            </div>
            <div class="page page7">
                <div class="content">
                    <img class="quickmark" data-src="<?php echo $imgUrl; ?>page2_quickmark.png" alt="quickmark">
                    <img class="title" data-src="<?php echo $imgUrl; ?>page7_title.png" alt="title">
                    <div class="detail8"><span class="loan-amount"><!-- 1500000 --></span><span>元</span></div>
                    <div class="detail9"><span>身价这种事儿，还是低调，低调。</span></div>
                    <img class="people" data-src="<?php echo $imgUrl; ?>page7_people.png" alt="people">
                    <!-- 按钮 -->
                    <div class="next"><img data-src="<?php echo $imgUrl; ?>page2_next.png" alt="next"></div>
                </div>
            </div>
            <div class="page page8">
                <div class="content">
                    <img class="share" data-src="<?php echo $imgUrl; ?>page8_share.png" alt="share"/>
                    <img class="quickmark" data-src="<?php echo $imgUrl; ?>page8_quickmark.png" alt="quickmark"/>
                    <img class="detail" data-src="<?php echo $imgUrl; ?>page8_detail.png" alt="detail"/>
                    <img class="img-btn" data-src="<?php echo $imgUrl; ?>page8_btn.png" alt="btn"/>
                </div>
            </div>
        </div>
    </div>
    <script>
        var indexData = {
            ajaxUrl: "<?php echo 'test.php'; ?>"
        };
    </script>

    <script>
        var indexFn = function (data) {
            return Number(data) + 1;
        }
    </script>

    <div class="tp-analyzing hide"></div>
    <img class="sweat hide" data-src="<?php echo $imgUrl; ?>page1_tp.png" alt="tp">
    </body>
</html>
