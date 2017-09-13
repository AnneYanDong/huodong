<?php 
    $title = "邀请好友"; // 配置标题的，必须
    include "../public/v2/header.php";
    $proName = "20170908_invest";
    $version = "v1";
?>
<?php
    $obj = new Resource; // 实例化获取资源类
    $res = $obj->getResStr($proName, $version); // 获取指定的活动资源，返回数组，array("css"=> "..", "js"=>"。。")
    $origin = $_SERVER['HTTP_HOST'];
    include "../public/v2/img_src.php";
    $imgUrl_1 = "//r.51gjj.com/act/release/img/20170908_"
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
    <script src="//kaifa.jianbing.com/hd/p2p/qrcode.js"></script>
    </head>
    <body>
<div class="wp hide">
    <div class="wp-inner">
        <div class="content">
            <div class="yq-logo"><img data-src="<?php echo $imgUrl_1;?>invest_logo.png"></div>
            <div class="yq-out-money"><img data-src="<?php echo $imgUrl_1;?>money.png"></div>
            <div class="user-info">
                <div class="input-wrap">
                    <input class="JS-phone" type="tel" placeholder="请输入您的手机号" maxlength="11">
                </div>
                <div class="input-wrap get-code">
                    <input class="JS-code" type="tel" placeholder="请输入验证码" maxlength="6">
                    <div class="code-btn JS-get-code">获取验证码</div>
                </div>
                <input class="btn-submit" value="领取18888元体验金" type="button">
            </div>
            <div class="tips-phone">
                <p>好友<span></span>邀请你来51有钱理财</p>
                <p>下载51公积金管家app, 在“理财业务”使用</p>
            </div>
            <div class="btn-rule"><span>活动规则>></span></div>
            <div class="introduce"><img data-src="<?php echo $imgUrl_1?>introduce.png"></div>
            <div class="bottom-tips">
                <p>*本活动最终解释权归51有钱所有*</p>
                <p>客服电话： 400-863-5151</p>
            </div>
        </div>
    </div>
</div>
<div class="rule zm-customer-confirm hide">
    <h6>活动规则</h6>
    <ul>
        <li><span>1.</span>获得条件：完完成注册后，下载51公积金管家app，在“理财业务”找到新手体验标领取；</li>
        <li><span>2.</span>发放时间：体验金的收益会在领取成功后的第2天发放到您的理财账户；</li>
        <li><span>3.</span>请在接受邀请的15日内领取体验金，过期失效，尽快领取。</li>
    </ul>
    <div class="btn-close"></div>
</div>

    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    </body>
</html>