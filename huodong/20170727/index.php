<?php 
    $title = "银行存管"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170727"; // 配置图片的，必须
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
            background: #fcebd1;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #fcebd1 !important;
        }
    </style>
    <script>
       var projectName = "<?php echo $actDate ?>"; 
    </script>
    </head>
    <body>
<div class="wp hide">
    <div class="wp-inner">
        <div class="wrap-top">
            <img data-src="<?php echo $imgUrl?>logo.png">
        </div>
        <!--<div class="content">-->
            <div class="model-text">
                <img data-src="<?php echo $imgUrl?>model_text.png">
            </div>
            <div class="relation">
                <img data-src="<?php echo $imgUrl?>relation.png">
            </div>
            <div class="advantage"></div>
            <div class="choose"><img data-src="<?php echo $imgUrl?>why_choose.png"></div>
            <div class="choose-text">新网银行是中国银监会批准成立的银行，注册资金为30亿，由新希望集团、小米、红旗连锁等股东发起设立。
                是继腾讯微众银行、阿里网商银行之后，全国第三家互联网银行，同时也是中西部首家互联网银行。</div>
            <div class="three-logo"><img data-src="<?php echo $imgUrl?>three_logo.png"></div>
            
        <!--</div>-->
        <div class="about-us">
            <div class="about-title"><img data-src="<?php echo $imgUrl?>about_us_title.png"></div>
            <div class="about-body">
                <p>51有钱是51公积金品牌旗下专注为投资人提供专业金融服务的<span>投资理财平台。</span></p>
                <p>51有钱管理团队结合多年的资产管理服务和风险控制经验，专注于为理财用户提供优质个人小额消费信贷债权、真实透明的银行级风控模型，竭诚为用户提供多元化、个性化的普惠金融服务。</p>
            </div>
        </div>
        <div class="question"><img data-src="<?php echo $imgUrl?>question_title.png"></div>
        <div class="question-title"><img data-src="<?php echo $imgUrl?>icon.png">问：什么是银行存管？</div>
        <div class="answer">答：“银行存管”即网络借贷信息中介平台在银行业金融单独设立资金存管专用账户，将用户资金存入该资金存管专用账户，并由银行业金融机构根据出借人、借款人发出的指令和合同约定，对该资金的使用、划付进行管理和监督。</div>
        <div class="question-title"><img data-src="<?php echo $imgUrl?>icon.png">问：存管对投资人有什么意义？
        存不存管的区别在哪里？</div>
        <div class="answer">答：核心意义在于投资人的资金出账全部被新网银行监管，51有钱不得在未经客户
            授权的情况下使用用户资金。
        </div>
        <div class="question-title"><img data-src="<?php echo $imgUrl?>icon.png">问：存管是不是每个注册用户都有专属账户？</div>
        <div class="answer">答：只有通过身份认证的用户会开存管专户。
        </div>
        <div class="question-title"><img data-src="<?php echo $imgUrl?>icon.png">问：存管费用需要用户来承担吗？</div>
        <div class="answer">答：开通存管账户无需管理费，所有费用由51有钱帮你承担。</div>
        <div class="bg-bottom">
            <img data-src="<?php echo $imgUrl?>qrcode.png">
            <div class="scan">扫描上面二维码 关注更多资讯</div>
            <img data-src="<?php echo $imgUrl?>phone.png">
        </div>
    </div>
    <div class="mask hide"></div>
</div>
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    </body>
</html>