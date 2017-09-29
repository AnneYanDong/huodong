<?php 
    $title = "51公积金管家"; // 配置标题的，必须
    include "../public/v3/header.php";
    $proName = "20170925invitation"; // 配置文件的项目名
    $version = "invite";
    $obj = new Resource; // 实例化获取资源类
    $res = $obj->getResStr($proName,$version); // 获取指定的活动资源，返回数组，array("css"=> "..", "js"=>"。。")
    include "../public/v3/img_src.php";    
?>
<link rel="stylesheet" href="<?php echo $res['css'] ?>">
</head>

<body>
  <div class="wp" :class="{'show': init}">
    <div class="content">
      <div class="banner-wrap">
        <img src="//r.51gjj.com/act/release/img/20170925invitation_invite_bg.jpg" alt="">
        <div class="instruction award-desc" @click="toggleRule">奖励说明</div>
        <div class="instruction invite-process">邀请进度</div>
      </div>
      <div class="money">
        <div class="desc">你的返佣奖金</div>
        <div class="val">{{commission}}<span> 元</span></div>
      </div>
      <div class="forecast-wrap">
        <div class="range">
          <span class="desc">好友放款金额</span>
          <span class="val" v-text="moneyDesc"></span>
        </div>
      </div>
      <div class="nstSlider-wrap customer">
        <div class="nstSlider" data-range_min="0" data-range_max="201000" data-cur_min="10000" data-cur_max="0">
          <div class="bar"></div>
          <div class="leftGrip"></div>
        </div>
        <div class="leftLabel" v-text="moneyAmount"></div>        
      </div>
      <div class="footer">
        <img src="//r.51gjj.com/act/release/img/20170925invitation_invite_bottom.jpg" alt="">
        <div class="button">立即去赚奖金</div>
      </div>
    </div>
    <template v-if="maskShow">
      <my-mask :show="maskShow"></my-mask>
    </template>
    <transition name="opacity">
      <template v-if="ruleShow">
        <div class="rule">
          <div class="title">奖励说明</div>
          <div class="close-btn" @click="toggleRule"></div>
          <ul>
            <li class="item"><span>1.</span>所有返佣奖金将于次月15日发放到各自的账户中，届时自行提取。</li>
            <li class="item"><span>2.</span>邀请进度可在进度查询页中查看。</li>
            <li class="item"><span>3.</span>返佣奖金以现金形式发放。</li>
            <li class="item"><span>4.</span>返佣奖金奖励发放仅限被邀请用户首次贷款。</li>
            <li class="item"><span>5.</span>奖励金额参照奖励梯度。</li>
          </ul>
        </div>     
      </template>   
    </transition>
  </div>
  <div class="vue-loading-wrap">
    <div class="vue-loading-ele"></div>
  </div>
  <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
</body>

</html>