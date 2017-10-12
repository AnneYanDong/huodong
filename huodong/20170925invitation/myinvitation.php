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
    <div class="content" v-if="page && page.info">
      <div class="banner-wrap">
        <img src="//r.51gjj.com/act/release/img/20170925invitation_myinvitation_bg.jpg" alt="">
        <div class="money-wrap">
          <span class="desc">已获返佣奖金</span>
          <h6>{{page.info.current_reward}}<span class="unit"> 元</span></h6>
        </div>
        <div class="drawing" bp="91_4_1_0_立即提现" @click="withdraw">立即提现</div>
      </div>
      <p class="drawed" v-if="page.info && page.info.total_reward > 0">已提现金额{{page.info.total_reward}}</p>      
      <div class="invitation" ref="invitation">
        <ul class="invitation-list" ref="list">
          <li class="item" @click="active" v-for="item in page.info.data">
            <span class="arrow"></span>
            <p class="desc">{{item.phone}}用户已接受你的邀请</p>
            <p class="time">{{item.log_time}}</p>
            <div class="detail">
              <div class="decoration"></div>
              <p class="detail-desc">{{item.phone}}用户放款成功返佣奖金{{item.reward}}元将于次月15日发放至您的账户中</p>
              <!-- <p class="detail-time">2017-09-20 05:32:20</p> -->
            </div>
          </li>
        </ul>      
      </div>
      <div class="invite" @click="invite" bp="91_4_2_0_去赚奖金">继续去赚奖金</div>
      <transition name="opacity">
        <div class="line" ref="line" v-if="scrollShow">
          <span class="process" ref="process"></span>
        </div>      
      </transition>
    </div>
    <template v-if="maskShow">
      <my-mask :show="maskShow"></my-mask>
    </template>
    <transition name="opacity">
      <template v-if="draw">
        <div class="rule">
          <div class="title">奖励说明</div>
          <div class="close-btn" @click="toggleRule"></div>
          <div class="input-wrap">
            <input type="text" class="name" placeholder="请输入姓名" v-model="username">
            <input type="text" class="alipay" placeholder="请输入支付宝账号" v-model="useralipay"> 
            <div class="enter-alipay" @click="enterAlipay" bp="91_4_3_0_确认淘宝账号">确认</div>  
            <p class="prompt">提现金额将于次月15日发放到您所填写的支付宝账号。</p>         
          </div>
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