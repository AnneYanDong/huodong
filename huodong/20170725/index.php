<?php
    $title = "周末提款机"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170725"; // 配置图片的，必须
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
            background: #f3de4a;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #f3de4a !important;
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
                    <img class="title1" data-src="<?php echo $imgUrl; ?>title1.png" alt="title" />
                    <img class="title2 hide" data-src="<?php echo $imgUrl; ?>title2.png" alt="title" />
                    <img class="title3" data-src="<?php echo $imgUrl; ?>title2_02.png" alt="title" />
                    <img class="gift2" data-src="<?php echo $imgUrl; ?>gift2.png" alt="gift2" />
                    <div class="tp-hide1 hide">
                        <div class="tp-apply-btn"></div>
                        <img class="tp-jy" data-src="<?php echo $imgUrl; ?>tp_jy.png" alt="tp_jy" />
                    </div>
                    <div class="tp-hide2 hide">
                        <div class="tp-apply-btn"></div>
                        <img class="tp-jh" data-src="<?php echo $imgUrl; ?>tp_jh.png" alt="tp_jh" />
                    </div>
                    <div class="tp-hide3 hide">
                        <div class="tp-apply-btn"></div>
                        <img class="tp-jk" data-src="<?php echo $imgUrl; ?>tp_jk.png" alt="tp_jk" />
                    </div>
                    <div class="tp-hide4 hide">
                        <div class="tp-apply-btn"></div>
                        <img class="tp-ja" data-src="<?php echo $imgUrl; ?>tp_ja.png" alt="tp_ja" />
                    </div>
                    <!-- <img class="tp-jh hide" data-src="<?php echo $imgUrl; ?>tp_jh.png" alt="tp_jh" />
                    <img class="tp-jk hide" data-src="<?php echo $imgUrl; ?>tp_jk.png" alt="tp_jk" />
                    <img class="tp-ja hide" data-src="<?php echo $imgUrl; ?>tp_ja.png" alt="tp_ja" /> -->
                    <div class="atm-group">
                        <img class="atm" data-src="<?php echo $imgUrl; ?>atm.png" alt="atm" />
                        <img class="worm" data-src="<?php echo $imgUrl; ?>worm.gif" alt="worm" />
                        <img class="star1" data-src="<?php echo $imgUrl; ?>star.png" alt="star" />
                        <img class="star2" data-src="<?php echo $imgUrl; ?>star.png" alt="star" />
                        <img class="gold-group" data-src="<?php echo $imgUrl; ?>gold.png" alt="gold-group" />
                        <div class="atm-title"><span>ATM</span></div>
                        <div class="atm-content">
                            <div class="atm-total">
                                <div class="atm-total-title"><span>-&nbsp;取款金额&nbsp;-</span></div>
                                <div class="atm-total-input"><input type="tel" placeholder="最高80000" maxlength=5/><span>元</span></div>
                            </div>
                            <div class="atm-usage">
                                <div class="atm-total-title2"><span>-&nbsp;用途&nbsp;-</span></div>
                                <ul>
                                    <div class="div div1"></div>
                                    <div class="div div2"></div>
                                    <div class="div div3"></div>
                                    <div class="div div4"></div>
                                    <li class="btn label-btn1" data-purpose="btn1">装修</li>
                                    <li class="btn label-btn2" data-purpose="btn2">旅游</li>
                                    <li class="btn label-btn3" data-purpose="btn3">消费</li>
                                    <li class="btn label-btn4" data-purpose="btn4">其他</li>
                                </ul>
                            </div>
                            <div class="shadow-box"></div>
                            <button class="withdraw-btn" bp="马上提取" title="马上提取">马上提取</button>
                            <div class="finger-box hide"><img class="finger" data-src="<?php echo $imgUrl; ?>finger.png" alt="finger" /></div>
                        </div>
                        <div class="output-money"></div>
                        <div class="dynamic-money">
                             <img class="money1 hide" data-src="<?php echo $imgUrl; ?>money.png" alt="money" />
                             <img class="money2 hide" data-src="<?php echo $imgUrl; ?>money.png" alt="money" />
                             <img class="money3 hide" data-src="<?php echo $imgUrl; ?>money.png" alt="money" />
                             <img class="money4 hide" data-src="<?php echo $imgUrl; ?>money.png" alt="money" />
                        </div>
                    </div>
                </div>

                <img class="eye2" data-src="<?php echo $imgUrl; ?>weired_eye.png" alt="eye2" />
                <img class="gift1" data-src="<?php echo $imgUrl; ?>gift1.png" alt="gift1" />
                <img class="eye" data-src="<?php echo $imgUrl; ?>weired_eye.png" alt="eye" />
                <img class="light" data-src="<?php echo $imgUrl; ?>rule_light.png" alt="light" />
                <div class="rule-btn" bp="规则" title="规则">提现规则</div>
                <div class="mask hide"></div>
            </div>
        </div>
    </body>
    <script type="text/template" id="tpl-rule">
            <div class="rule">
                <h6>提款规则</h6>
                <ul>
                    {@each rule as item,index}
                    <li><span>${Number(index)+1}、</span>${item}</li>
                    {@/each}
                </ul>
                <div class="btn-close"></div>
            </div>
    </script>
</html>
