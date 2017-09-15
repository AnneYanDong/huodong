<?php 
    $title = "信用卡定制"; // 配置标题的，必须
    include "../public/v2/header.php";
    $proName = "20170913"; // 配置文件的项目名
    $version = "v1";
    $obj = new Resource; // 实例化获取资源类
    $res = $obj->getResStr($proName,$version); // 获取指定的活动资源，返回数组，array("css"=> "..", "js"=>"。。")
    include "../public/v2/img_src.php";    
?>
    <link rel="stylesheet" href="<?php echo $res['css'] ?>">
    <style>
        /* 加载动画颜色配置 */
        .loading-bg-color {
            background: #0d0d0d;
        }
        .loading-ele-color:after, .loading-ele-color:before {
            background: #0d0d0d !important;
        }
    </style>
    <link href="https://cdn.bootcss.com/animate.css/3.5.2/animate.css" rel="stylesheet">
    <script>
        // 埋点后缀用
        var projectName = "<?php echo $proName ?>";
    </script>
    </head>
    <body>
    <div class="wp" v-if="wpShow">
      <div class="wp-inner" ref="wpinner">
        <div class="page page1">
          <div class="content">
            <div class="angle-mark">权益
              <br>新升级</div>
            <div class="bg-circle"></div>
            <div class="bg-money"></div>
            <transition enter-active-class="animated flipInY">
              <div v-if="pageOneshow" class="title"></div>
            </transition>
            <transition enter-active-class="animated bounceInRight">
              <div v-if="pageOneshow" class="card" style="animation-delay: 0.4s;"></div>
            </transition>
            <transition-group enter-active-class="animated zoomIn" class="feature" tag="div">
              <div v-if="pageOneshow" class="item f-one" key="f-one" style="animation-delay: .4s; -webkit-animation-delay: .4s; animation-duration: .5s; -webkit-animation-duration: .5s;">
                <span class="icon"></span>
                <p>公积金授信</p>
              </div>
              <div v-if="pageOneshow" class="item f-two" key="f-two" style="animation-delay: .5s; -webkit-animation-delay: .4s; animation-duration: .5s; -webkit-animation-duration: .5s;">
                <span class="icon"></span>
                <p>最高50万</p>
              </div>
              <div v-if="pageOneshow" class="item f-three" key="f-three" style="animation-delay: .6s; -webkit-animation-delay: .4s; animation-duration: .5s; -webkit-animation-duration: .5s;">
                <span class="icon"></span>
                <p>超长免息期</p>
              </div>
            </transition-group>
            <div @click="startMake(1)" class="button">
              <span class="light light-animted"></span>立即定制
            </div>
            <div class="process" @click="process"><span>办卡进度</span><span class="arrow"></span></div>
          </div>
        </div>
        <div class="page page2">
          <div class="content">
            <div class="title">选择信用卡额度</div>
            <div class="choose-wrap">
              <transition enter-active-class="animated fadeInLeft">
                <div v-if="pageTwoshow" class="item" :class="{'grayscale': choose.cardAmount != 1}" @click="next('cardAmount', 1, 2)">
                  <p>1~5万</p>
                </div>
              </transition>
              <transition enter-active-class="animated fadeInRight">
                <div v-if="pageTwoshow" class="item" :class="{'grayscale': choose.cardAmount != 2}"  @click="next('cardAmount', 2, 2)">
                  <p>6~50万</p>
                </div>
              </transition>
            </div>
          </div>
        </div>
        <div class="page page3">
          <div class="content">
            <div class="title">选择信用卡发卡行</div>
            <div class="choose-wrap">
              <transition enter-active-class="animated fadeInLeft">
                <div v-if="pageThreeshow" class="item" :class="{'grayscale': choose.bank != 1}" @click="next('bank', 1, 3)">
                  <span class="bank pufa"></span>
                </div>
              </transition>
              <transition enter-active-class="animated fadeInRight">
                <div v-if="pageThreeshow" class="item" :class="{'grayscale': choose.bank != 2}" @click="next('bank', 2, 4)">
                  <span class="bank xingye"></span>
                </div>
              </transition>
            </div>
          </div>
        </div>
        <div class="page page4">
          <div class="content">
            <div class="title">
              <p>选择您的公积金缴存基数</p>
              <p class="complement">(即月工资)</p>
            </div>
            <div class="choose-wrap">
              <transition enter-active-class="animated fadeInLeft">
                <div v-if="pageFourshow" class="item" :class="{'grayscale': choose.base != 1}" @click="next('base', 1, 4)">
                  <p>4000
                    <br>以下</p>
                </div>
              </transition>
              <transition enter-active-class="animated fadeInRight">
                <div v-if="pageFourshow" class="item" :class="{'grayscale': choose.base != 2}" @click="next('base', 2, 4)">
                  <p>4000
                    <br>以上</p>
                </div>
              </transition>
            </div>
          </div>
        </div>
        <div class="page page5">
          <div class="content">
            <template v-if="page.show && pageFiveshow">
              <div class="recommend-card">
                <div class="introduction">
                  <h6 class="card-title" v-text="page.show.title"></h6>
                  <div class="line"></div>
                  <div class="card">
                    <img :src="page.show.img">
                  </div>
                  <div class="desc interests">
                    <h6 class="area-title"><span class="logo hg"></span>权益</h6>
                    <ul class="desc-list">
                      <li v-for="item in page.show.interests"><span class="point">·</span><p v-text="item"></p></li>
                    </ul>
                  </div>
                  <div class="desc activity">
                    <h6 class="area-title"><span class="logo hd"></span>活动</h6>
                    <ul class="desc-list">
                      <li v-for="item in page.show.activity"><span class="point">·</span><p v-text="item"></p></li>
                    </ul>
                  </div>
                </div>
                <div class="apply" @click="apply(page.show.url)">立即申请</div>
              </div>
              <div class="rule">
                <span @click.self="showRule">活动规则</span>
              </div>              
            </template>
          </div>
        </div>
      </div>
      <transition name="scale">
        <template v-if="ruleStatus">
          <div class="rule zm-customer-confirm">
            <h6>活动规则</h6>
            <ul>
              <li><span>1.</span>即日起到10月31日，通过活动完成浦发／兴业银行任意信用卡申请，即可获得88888理财金1份</li>
              <li><span>2.</span>申请巴萨卡完成开卡后可额外获得298元现金红包</li>
              <li><span>3.</span>理财金仅限平台理财新用户体验使用，且仅限领取一次，不可重复体验</li>
              <li><span>4.</span>如您为平台理财老用户，我们将折算成等值现金发放至您的账户</li>
              <li><span>5.</span>有任何疑问或者帮助可联系客服4008635151</li>
              <li><span>6.</span>本商品由51公积金管家提供，与设备生产商Apple Inc公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利</li>
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
    <div class="vue-pre-loading loading-bg-color"><p class="vue-pre-loading-des">Waiting For Loading...</p><div class="vue-pre-loading-ele loading-ele-color"></div></div>    
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    </body>
</html>