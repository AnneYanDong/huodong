<?php 
    $title = "51公积金管家"; // 配置标题的，必须
    include "../public/v3/header.php";
    $proName = "20170925invitation"; // 配置文件的项目名
    $version = "regist";
    $obj = new Resource; // 实例化获取资源类
    $res = $obj->getResStr($proName,$version); // 获取指定的活动资源，返回数组，array("css"=> "..", "js"=>"。。")
    include "../public/v3/img_src.php";    
?>
<link rel="stylesheet" href="<?php echo $res['css'] ?>">
</head>

<body>
  <div class="wp" :class="{'show': init}">
    <div class="content">
      <div class="page-one">
        <div class="title">
          <img src="regist_bg.jpg" alt="">
        </div>
        <div class="input-wrap">
          <input type="number" maxlength="11" class="phone" placeholder="请输入您的手机号">
        </div>
        <div class="input-wrap">
          <my-phonecode stylecls="my-phonecode-style" codetime="3" :codeurl="getCodeUrl"></my-phonecode>
        </div>
        <div class="accept-button">接受邀请</div>
        <div class="from-who-invite">好友<span class="invite-phone">{{phone | phonenumber}}</span>邀请你来借款</div>
        <div class="prize-banner"><img src="prize-banner.jpg" alt=""></div>
        <div class="footer">*本活动最终解释权归51公积金管家所有*</div>
      </div>
    </div>
  </div>
  <div class="vue-loading-wrap">
    <div class="vue-loading-ele"></div>
  </div>
  <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
</body>

</html>