<?php 
	$title = "奖品详情";
	include "../public/v1/header.php";
	$obj = new Resource;
	$res = $obj->getResStr("activity");
 ?>
 <?php 
 	echo $res['css'];
  ?>
  <?php 
	echo $res['js'];
 ?>
</head>
<body>
	<div id="app">
		<div v-show="!ajaxStatus" class="wrap wrap-detail" :class="{'has-receiver-info': shippingInfo.length > 0}" style="margin: 0 auto; max-width: 1024px; min-width: 320px;">
			<div class="detail-banner">
				<div class="banner-pic">
					<ul class="banner-list">
						<li v-for="(item,index) in detailInfo.imgList">
							<img :src="item">
						</li>
					</ul>
					<div class="banner-nav" v-show="prizeBanner.length > 1">
						<span v-for="(item,index) in detailInfo.imgList"></span>
					</div>
				</div>
			</div>
			<div class="info">
				<div class="receiver-wrap" v-show="shippingInfo.name">
					<div class="receiver-info">
						<h6 class="main-title">收货人信息</h6>
						<p v-show="shippingInfo.name"><span class="subtitle">姓名：</span><span class="name val" v-text="shippingInfo.name"></span></p>
						<p v-show="shippingInfo.alipay"><span class="subtitle">支付宝账号：</span><span class="alipay val" v-text="shippingInfo.alipay"></span></p>
						<p v-show="shippingInfo.phone"><span class="subtitle">手机号码：</span><span class="phone val" v-text="shippingInfo.phone"></span></p>
						<p v-show="shippingInfo.address"><span class="subtitle">收货地址：</span><span class="phone val" v-text="shippingInfo.address"></span></p>
						<!-- <button class="modify" @click="openPrizeForm">修改收货信息</button> -->
					</div>
				</div>
				<div class="detailinfo-wrap">
					<div class="detailinfo">
						<h6 class="main-title">详细介绍</h6>
						<p class="detailinfo-txt">{{detailinfoTxt}}</p>
						<p class="from">{{detailInfo.from | from}}</p>
					</div>
				</div>
				<div class="notice">
					<p>51公积金管家积分商城由51公积金管家提供</p>
					<p>兑换规则和最终解释权由51公积金管家负责</p>
					<p>客服热线：400-863-5151</p>
					<p>客服邮箱：app@jianbing.com</p>
				</div>
			</div>
			<prize-form ref="childPrizeForm" :prize-show="prizeShow" :single-prize="singlePrize" v-on:closeparentprizeform="closePrizeForm"></prize-form>
		</div>
		<div class="main-bottom-btn">
			<button v-show="buttonInfo.confirmInfoButton" v-text="buttonInfo.confirmInfoButton" :class="buttonStatus" @click="openPrizeForm"></button>
		</div>
		<loading-anim :ajax-status="ajaxStatus"></loading-anim>
		<my-mask :mask-status="maskStatus"></my-mask>
	</div>
 <script type="text/x-template" id="getForm">
	<transition name="scale">
	<div class="prize-form-wrap" v-if="prizeShow" @click.self="closeparentprizeform">
		<div class="getPrizePrompt" v-show="userInfo.got">
			<div class="prompt-header">
				<!-- <span class="close" @click="closeparentprizeform"></span> -->
			</div>
			<div class="form">
				<input class="form-input" v-model="userInfo.name" placeholder="请填写您的姓名">
				<input class="form-input" v-model="userInfo.phone" placeholder="请填写您的手机号码" v-show="singlePrize.confirmInfoType !== 1">
				<input class="form-input" v-model="userInfo.alipay" placeholder="请填写您的支付宝账号" v-show="singlePrize.confirmInfoType === 1">
				<input class="form-input" v-model="userInfo.address" placeholder="请填写您的收货地址"  v-show="singlePrize.confirmInfoType === 3">
				<button class="form-sure" @click="gotrender">确认</button>
			</div>
		</div>		
	</div>
	</transition>
</script>
<script type="text/x-template" id="loadingAnim">
	<transition name="fade">
		<div class="load-anim-wrap" v-if="ajaxStatus">
			<div class="load-anim-ele"></div>
		</div>
	</transition>
</script>
<script type="text/x-template" id="oMask">
	<transition name="fade-slow">
		<div class="mask" v-show="maskStatus"></div>
	</transition>
</script>
 <script>
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(document.body);
        }, false);
    }
 	init.prizeDetail();
 </script>
</body>
</html>