<?php 
    $title = "51公积金管家"; // 配置标题的，必须
    include "../public/v3/header.php";
    $proName = "20170925invitation"; // 配置文件的项目名
    $version = "myinvitation";
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
        <img src="//r.51gjj.com/act/release/img/20170925invitation_myinvitation_bg.jpg" alt="">
        <div class="money-wrap">
          <span class="desc">已获返佣奖金</span>
          <h6>800<span class="unit"> 元</span></h6>
        </div>
        <div class="drawing">立即提现</div>
      </div>
      <div class="invitation" ref="invitation">
        <ul class="invitation-list" ref="list">
          <li class="item" @click="active">
            <span class="arrow"></span>
            <p class="desc">13756412646用户已接受你的邀请</p>
            <p class="time">2017-09-19 21:32:20</p>
            <div class="detail">
              <div class="decoration"></div>
              <p class="detail-desc">13756412646用户放款成功返佣奖金XX元将于次月15日发放至您的账户中</p>
              <p class="detail-time">2017-09-20 05:32:20</p>
            </div>
          </li>
          <li class="item" @click="active">
            <span class="arrow"></span>
            <p class="desc">13756412646用户已接受你的邀请</p>
            <p class="time">2017-09-19 21:32:20</p>
            <div class="detail">
              <p class="detail-desc">13756412646用户放款成功返佣奖金XX元将于次月15日发放至您的账户中</p>
              <p class="detail-time">2017-09-20 05:32:20</p>
            </div>
          </li>
          <li class="item" @click="active">
            <span class="arrow"></span>
            <p class="desc">13756412646用户已接受你的邀请</p>
            <p class="time">2017-09-19 21:32:20</p>
            <div class="detail">
              <p class="detail-desc">13756412646用户放款成功返佣奖金XX元将于次月15日发放至您的账户中</p>
              <p class="detail-time">2017-09-20 05:32:20</p>
            </div>
          </li>
        </ul>      
      </div>
      <div class="invite">继续去赚奖金</div>
      <transition name="opacity">
        <div class="line" ref="line" v-if="scrollShow">
          <span class="process" ref="process"></span>
        </div>      
      </transition>
    </div>
  </div>
  <div class="vue-loading-wrap">
    <div class="vue-loading-ele"></div>
  </div>
  <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
</body>

</html>