<?php 
    $title = "51公积金管家"; // 配置标题的，必须
    include "../public/v3/header.php";
    $proName = "20170925invitation"; // 配置文件的项目名
    $version = "appdown";
    $obj = new Resource; // 实例化获取资源类
    $res = $obj->getResStr($proName,$version); // 获取指定的活动资源，返回数组，array("css"=> "..", "js"=>"。。")
    include "../public/v3/img_src.php";    
?>
<link rel="stylesheet" href="<?php echo $res['css'] ?>">
</head>

<body>
  <div class="wp" :class="{'show': init}">
    <div class="content">
      <div class="title">
        <img src="//r.51gjj.com/act/release/img/20170925invitation_regist_bg.jpg" alt="">
      </div>
      <div class="loan">精选借款</div>
      <div class="loan-item">
        <a href="https://b.jianbing.com/business/home/h5/wolaidai/index.php"><img src="//r.51gjj.com/act/release/img/20170925invitation_loan1.jpg" alt="" bp="91_3_1_0_我来贷"></a>
      </div>
      <div class="loan-item">
        <a href="https://b.jianbing.com/business/home/h5/zhongtengxin/index.php" bp="91_3_2_0_中腾信">
          <img src="//r.51gjj.com/act/release/img/20170925invitation_loan2.jpg" alt="">
        </a>
      </div>
      <div class="loan-item">
        <a href="https://b.jianbing.com/business/home/h5/xiaohua/index.php" bp="91_3_3_0_小花">
          <img src="//r.51gjj.com/act/release/img/20170925invitation_loan3.jpg" alt="">
        </a>
      </div>
      <div class="appdown">
        <p class="button" @click="appdown" bp="91_3_4_0_下载APP"><span class="txt">更多借款，前往APP申请</span><span class="icon"></span></p>
      </div>
    </div>
  </div>
  <div class="vue-loading-wrap">
    <div class="vue-loading-ele"></div>
  </div>
  <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
</body>

</html>