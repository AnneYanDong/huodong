<?php 
    $title = "千元免息任意抢"; // 配置标题的，必须
    include "../public/v2/header.php";
    $proName = "201709318"; // 配置文件的项目名
    $version = "v1";
    $obj = new Resource; // 实例化获取资源类
    $res = $obj->getResStr($proName,$version); // 获取指定的活动资源，返回数组，array("css"=> "..", "js"=>"。。")
    include "../public/v2/img_src.php";    
?>
    <link rel="stylesheet" href="<?php echo $res['css'] ?>">
    <style>
        /* 加载动画颜色配置 */
        .loading-bg-color {
            background: #1f85f5;
        }
        .loading-ele-color:after, .loading-ele-color:before {
            background: #0d0d0d !important;
        }
    </style>
    <script>
        // 埋点后缀用
        var projectName = "<?php echo $proName ?>";
    </script>
    </head>
    <body>
      <div class="wp hide">
        <div class="wp-inner">
          <div class="content">
            <div class="bg"></div>
            <div class="main-content">
              
            </div>
            <transition name="scale">
              <template v-if="ruleStatus">
                <div class="rule zm-customer-confirm">
                  <h6>活动规则</h6>
                  <ul>
                    <li><span>1.</span>领取提现奖励券，并在此之后申请[金e贷]且成功放款即可获得该奖励</li>
                    <li><span>2.</span>现金红包将于用户放款后10天内打入用户的支付宝，请及时绑定提现。已经有金e贷优惠券的用户优先享受前者的优惠，不再享受该奖励。</li>
                    <li><span>3.</span>有任何问题请咨询官方客服热线4008635151。</li>
                    <li><span>4.</span>本商品由51公积金管家提供，与设备生产商Apple Inc.公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利</li>
                  </ul>
                  <div class="close-btn" @click="showRule()"></div>
                </div> 
              </template>
            </transition>
            <transition name="fade-slow">
                <template v-if="maskStatus">
                    <div class="mask"></div>
                </template>
            </transition>            
          </div>
        </div>
      </div>         
    <div class="vue-pre-loading loading-bg-color"><p class="vue-pre-loading-des">Waiting For Loading...</p><div class="vue-pre-loading-ele loading-ele-color"></div></div>    
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    </body>
</html>