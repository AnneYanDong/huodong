<?php 
    $title = "解析你的公积金"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170807"; // 配置图片的，必须
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
            background: #e33d3b;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #e33d3b !important;
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
                    <div class="title"><img data-src="<?php echo $imgUrl; ?>page1_title.png" alt="title"></div>
                    <div class="img-gold"><img data-src="<?php echo $imgUrl; ?>page1_$.png" alt="$"></div>
                    <div class="img-btn"><img data-src="<?php echo $imgUrl; ?>page1_btn.png" alt="btn"></div>
                    <div class="climb climbing"></div>
                    <div class="letter lettering"></div>
                    <div class="gold scrolling"><img data-src="<?php echo $imgUrl; ?>dynamic_gold.png" alt="btn"></div>
                </div>
            </div>
           <div class="page page2">
                <div class="content">
                    <img class="quickmark" data-src="<?php echo $imgUrl; ?>page2_quickmark.png" alt="quickmark">
                    <div class="portrait"><img data-src="<?php echo $imgUrl; ?>page2_portrait6.png" alt="portrait1"></div>
                    <div class="circle"></div>
                    <div class="detail1">
                        <span>孙俪的公积金在上海市排名为</span>
                        <span>3475</span>
                        <span>名</span>
                    </div>
                    <div class="gif-container">
                        <img class="pg" data-src="<?php echo $imgUrl; ?>page2_pg.png" alt="pg">
                        <div class="gif"></div>
                    </div>
                    <div class="detail2">
                        <span>超过</span>
                        <span>75.4%</span>
                        <span>的上海人</span>
                    </div>
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
                       <div><span>孙俪第一次缴纳公积金</span></div>
                       <div><span>至今已经</span><span class="font-style">5</span><span>年了</span></div>
                   </div>
                   <div class="detail4">
                       <div>
                           <span>那一年,孙俪在</span><span class="font-color">北京</span>
                       </div>
                       <div><span>多少人来人去你还记不记得</span></div>
                   </div>
                   <img class="page3-pg" data-src="<?php echo $imgUrl; ?>page3_pg.png" alt="pg">
                    <div class="thinking-gif"></div>
                   <div class="next"><img data-src="<?php echo $imgUrl; ?>page2_next.png" alt="next"></div>
               </div>
            </div>
            <div class="page page4">
                <div class="content">
                    <img class="quickmark" data-src="<?php echo $imgUrl; ?>page2_quickmark.png" alt="quickmark">
                    <div class="detail5">
                        <div>
                            <div><span>身为一枚</span></div>
                            <div><span>金光闪闪的</span><span class="font-style">80</span>后</div>
                        </div>
                        <div>
                            <div><span>孙俪</span></div>
                            <div><span>同比</span><span class="font-style">56.2%</span><span>的女性</span></div>
                            <div><span>更“有财”</span></div>
                        </div>
                    </div>
                    <img class="loading" data-src="<?php echo $imgUrl; ?>page4_loading.png" alt="loading">
                    <img class="page4-pg" data-src="<?php echo $imgUrl; ?>page4_pg.png" alt="pg">
                    <div class="detail6">
                        <div><span>另外，实力也远超了</span></div>
                        <div><span class="font-style">42.5%</span><span>的男性</span></div>
                    </div>
                    <div class="next"><img data-src="<?php echo $imgUrl; ?>page2_next.png" alt="next"></div>
                </div>
            </div>
            <div class="page page5">
                <div class="content">
                    待定。。。
                </div>
            </div>
            <div class="page page6">
                <div class="content">
                    <img class="quickmark" data-src="<?php echo $imgUrl; ?>page2_quickmark.png" alt="quickmark">
                    <div class="detail7">
                        <div class="detail7-1">
                            <div><span>说到买房...</span></div>
                            <div><span>孙俪的公积金可以</span></div>
                            <div>在<span>上海</span>买半个<span>卫生间</span></div>
                            <div>在<span>厦门</span>买一个<span>带阳台的主卧</span></div>
                            <div>...</div>
                            <div>在<span>大兴安岭...</span></div>
                        </div>
                        <div class="detail7-2">
                            <div>买啥单元楼啊！</div>
                            <div>白桦林开道别墅来两栋！</div>
                            <div>现金全款啊！</div>
                        </div>
                    </div>
                    <div class="next"><img data-src="<?php echo $imgUrl; ?>page2_next.png" alt="next"></div>
                </div>
            </div>
            <div class="page page7">
                <div class="content">
                    待定。。。
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
