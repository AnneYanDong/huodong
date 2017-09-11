<?php 
    $title = "邀请好友"; // 配置标题的，必须
    include "../public/v2/header.php";
    $proName = "20170908";
    $version = "v1";
?>
<?php
    $obj = new Resource; // 实例化获取资源类
    $res = $obj->getResStr($proName, $version); // 获取指定的活动资源，返回数组，array("css"=> "..", "js"=>"。。")
    $origin = $_SERVER['HTTP_HOST'];
    include "../public/v2/img_src.php";
?>
    <link rel="stylesheet" href="<?php echo $res['css'] ?>">
    <style>
        /* 加载动画颜色配置 */
        .loading-bg-color {
            background: #f95547;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #f95547 !important;
        }
    </style>
    </head>
    <body>
      <div class="wp hide">
        <div class="wp-inner">
          <div class="content">
            <div class="bg"></div>
            <div class="main-content">
              <div class="rule-btn" @click="showRule">规则</div>
              <div class="title"></div>
              <div class="forecast">
                <p class="prompt">选择提现额度</p>
                <div class="slide-box">
                  <div class="line">
                    <div class="line-fill" :style="page.lineFillWidth"></div>
                    <div class="slide-bar" ref="slidebar">
                      <span class="purple"></span>
                    </div>
                    <template>
                      <span class="circle" :class="{'half-self': index !== (page.stepArr.length - 1), 'start': index == 0, 'end': index == (page.stepArr.length - 1)}" v-for="(item,index) in page.stepArr" :style="item.style"><em class="txt" v-text="item.txt"></em></span>
                    </template>
                  </div>
                </div>
                <div class="prize">
                  <div class="prize-show" :class='page.showAmount.class'>
                    <span class="amount" v-html="page.showAmount.amount + '<em> 元</em>'"></span>
                  </div>
                  <p class="prize-desc" v-text="page.showAmount.txt"></p>
                </div>
                <div class="btn" bp="87_1_1_33_提现拿奖励" @click="getPrize"><span>提现拿奖励</span></div>
                <p class="get-prize-prompt">*提现成功后奖励会发放到您的支付宝账户</p>
              </div>              
            </div>
            <transition name="scale">
              <template v-if="ruleStatus">
                <div class="rule zm-customer-confirm">
                  <h6>活动规则</h6>
                  <ul>
                    <li><span>1.</span>领取提现奖励券，并在此之后申请[金e贷]且成功放款即可获得该奖励</li>
                    <li><span>2.</span>现金红包将于用户放款后10天内打入用户的支付宝，请及时绑卡提现。已经有金e贷优惠券的用户优先享受前者的优惠，不再享受该奖励。</li>
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
      <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    </body>
</html>