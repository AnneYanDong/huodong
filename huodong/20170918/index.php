<?php 
    $title = "抢千元免息"; // 配置标题的，必须
    include "../public/v2/header.php";
    $proName = "20170918"; // 配置文件的项目名
    $version = "v1";
    $obj = new Resource; // 实例化获取资源类
    $res = $obj->getResStr($proName,$version); // 获取指定的活动资源，返回数组，array("css"=> "..", "js"=>"。。")
    include "../public/v2/img_src.php";    
?>
    <link rel="stylesheet" href="<?php echo $res['css'] ?>">
    <link href="https://cdn.bootcss.com/animate.css/3.5.2/animate.css" rel="stylesheet">
    <style>
        /* 加载动画颜色配置 */
        .loading-bg-color {
            background: #1f85f5;
        }
        .loading-ele-color:after, .loading-ele-color:before {
            background: #1f85f5 !important;
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
          <div class="main-content">
            <div class="rule-btn" @click="showRule" bp="88_1_1_0_立即定制">活动说明</div>
            <div class="main-title"></div>
            <div class="sub-title"></div>
            <div key="ball1" v-if="pageShow" class="balloon-1" :class="{'balloon-1-anim': pageShow}"></div>
            <div key="ball2" v-if="pageShow" class="balloon-2" :class="{'balloon-2-anim': pageShow}"></div>
            <div key="ball3" v-if="pageShow" class="balloon-3" :class="{'balloon-3-anim': pageShow}"></div>
            <div key="ball4" v-if="pageShow" class="balloon-4" :class="{'balloon-4-anim': pageShow}"></div>              
            <div class="card-wrap">
              <div class="card-title">我的首月免息额度<span class="ball"></span></div>
              <div class="card-panel">
                <div class="card-count-wrap">
                  <div class="count-item init-anim"></div>
                  <div class="count-item init-anim"></div>
                  <div class="count-item"></div>
                  <div class="count-item"></div>
                </div>
                <div class="count-prompt">— 该额度可免一个月利息 —</div>
              </div>
              <div class="card-panel-shadow"></div>
            </div>
            <div class="button-apply" @click="startAnim">马上抢</div>
          </div>
          <transition name="fade-slow">
            <template v-if="ruleStatus">
              <div class="rule zm-customer-confirm">
                <h6>活动规则</h6>
                <ul>
                  <li><span>1.</span>即日起，通过活动页面完成申请并放款，首月还款可直接减免最高1000元借款额度产生的利息，提前还款、借款失败、逾期等将无法享受该优惠。</li>
                  <li><span>2.</span>本活动致力于回馈金盈贷新老用户，未申请过金盈贷用户与之前审批通过未放款用户都可参与此活动。</li>
                  <li><span>3.</span>同一用户仅能领取一次，活动结束前还未完成放款，奖券将自动失效。</li>
                  <li><span>4.</span>有任何疑问或者帮助可联系客服4008635151。</li>
                  <li><span>5.</span>本商品由51公积金管家提供，与设备生产商Apple Inc公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。</li>
                </ul>
                <div class="close-btn" @click="showRule()"></div>
              </div> 
            </template>
          </transition>
          <transition name="fade-slow">
            <template v-if="giftStatus">
               <div class="gift-wrap">
                 <div class="gift-level">
                   <div class="left" :class="giftImg"></div>
                   <div class="right"></div>
                 </div>
                 <div class="getPrize" @click="goUrl">立即领取</div>
               </div>
            </template>
          </transition>          
          <transition name="fade-slow">
              <template v-if="maskStatus">
                  <div class="mask" @click.self="closeGift"></div>
              </template>
          </transition>            
        </div>
      </div>         
    <div class="vue-pre-loading loading-bg-color"><p class="vue-pre-loading-des">Waiting For Loading...</p><div class="vue-pre-loading-ele loading-ele-color"></div></div>    
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    </body>
</html>