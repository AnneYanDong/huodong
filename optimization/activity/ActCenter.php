<?php 
	$title = "";
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
		<div class="wrap wrap-center">
<!-- 			<div class="menu">
				<div class="back" @click="back"></div>
				<ul class="router">
					<li v-for="(item,index) in menu" :class="{active: index === menuActive}" @click="menuChange(index)">
						<span v-text="item"></span>
					</li>
				</ul>
			</div> -->
			<!-- <template v-if="menuActive===0"> -->
				<div class="menu-act" v-show="menuActive===0">
					<div class="act-banner">
						<div class="banner-pic">
							<ul class="banner-list">
								<li v-for="(item,index) in bannerList">
									<a :href="item.url">
										<img :src="item.image" :alt="item.description">
									</a>
								</li>
							</ul>
							<div class="banner-nav">
								<span v-for="(item,index) in bannerList" :href="item.url"></span>
							</div>
						</div>
					</div>
					<div class="act-type" v-if="actType.length > 0">
						<ul class="type-list">
							<li v-for="(item,index) in actType.slice(0,4)" class="type-item" :categoryId=item.category_id @click="goList(item.category_id)">
								<div class="type-img">
									<img :src="item.icon" alt="">
								</div>
								<p class="type-des" v-text=item.title></p>
							</li>
						</ul>
						<ul class="type-list">
							<li v-for="(item,index) in actType.slice(4)" class="type-item" @click="goList(item.category_id)">
								<div class="type-img">
									<img :src="item.icon" alt="">
								</div>
								<p class="type-des" v-text=item.title></p>
							</li>
						</ul>
					</div>
					<div class="act-recommend">
						<h6 class="recommend-title">热门推荐</h6>
						<ul class="recommend-list clearfix">
							<li class="recommend-item" v-for="(item,index) in hotList.slice(0,5)" :class="[index % 5 === 0 ? 'recommend-hot' : 'recommend-normal']">
								<a :href="item.url"><img :src="item.image" :alt="item.description"></a>
							</li>
						</ul>	
					</div>
					<div class="act-recommend" v-if="recommendList.length > 0" v-for="(item,index) in recommendList">
						<h6 class="recommend-title" v-text="item[0].location_title"></h6>
						<ul class="recommend-list clearfix">
							<li class="recommend-item" v-for="(itemSon,indexSon) in item" :class="[indexSon % 5 === 0 ? 'recommend-hot' : 'recommend-normal']">
								<a :href="itemSon.url"><img :src="itemSon.image" :alt="itemSon.description"></a>
							</li>
						</ul>	
					</div>
					<div class="no-more">
						<span>没有更多了</span>
					</div>
				</div>				
			<!-- </template> -->
			<!-- <template v-else-if="menuActive===1"> -->
				<div class="menu-prize" v-show="menuActive===1">
					<template v-if="prizeList.length <= 0">
						<div class="no-prize">
							<div class="no-prize-icon"></div>
							<div class="des">
								<p>暂无奖品, 快去参加活动领取吧~</p>
								<a class="join font-blue" @click="tab1">立即参加</a>
							</div>
							<a class="history" style="margin-top: 2.4rem;" :class="{'looking-record': showRecord}" @click="showRecord = !showRecord">{{recordTextChange}}</a>	
						</div>					
					</template>
					<template v-else>
						<ul class="prize-list">
							<li v-for="(item,index) in prizeList" class="prize-item">
								<div class="l-sawtooth"></div>
								<div class="ticket">
									<div class="ticket-left" @click="goDetail(item.url)">
										<div class="ticket-info">
											<h6 class="name" v-text="item.head_title"></h6>
											<p class="des" v-text="item.foot_title"></p>
										</div>
										<div class="decoration-circle top-circle"></div>
										<div class="decoration-circle bottom-circle"></div>
									</div>
									<div class="ticket-middle" @click="goDetail(item.url)">
										<div class="ticket-des">
											<ul class="detail">
												<li v-for="(tag,tagIndex) in item.gift_tag">
													<em>·</em>
													<span v-text="tag"></span>
												</li>
												<template v-if="item.is_countdown === 1">
													<li class="date-line font-orange">
														<em>·</em>
														<span>{{item.due_data | dateLineDes(item.is_countdown)}}</span>
													</li>
												</template>
												<template v-else="item.is_countdown !== 1">
													<li class="date-line" class="font-orange">
														<em>·</em>
														<span>{{item.due_data | dateLineDes(item.is_countdown)}}</span>
													</li>
												</template>
											</ul>
										</div>
									</div>
									<div class="ticket-right" @click="openPrizeForm(item)">
										<template v-if="item.button">
											<div class="status" :class="{'font-blue': item.button.confirmInfoType !== 9 || item.button.confirmInfoType !== 5, 'font-orange': item.button.confirmInfoType === 5}">
												<div class="font-wrap">
													<template v-if='item.button.confirmInfoButton != null'>
														<span v-for="(font,fontIndex) in item.button.confirmInfoButton.split('')" v-text="font"></span>	
													</template>
												</div>
											</div>	
										</template>
									</div>
								</div>
								<div class="r-sawtooth"></div>
							</li>
						</ul>
						<a class="history" :class="{'looking-record': showRecord}" @click="showRecord = !showRecord">{{recordTextChange}}</a>						
					</template>
					<template v-if="showRecord">
						<div class="prize-record-drop-wrap">
							<ul class="prize-record">
								<li v-for="(item,index) in prizeRecord" class="prize-item record-grey" :class="{'valid': item.is_valid === 0}">
									<div class="l-sawtooth"></div>
									<div class="ticket">
										<div class="ticket-left" @click="goDetail(item.url)">
											<div class="ticket-info">
												<h6 class="name" v-text="item.head_title"></h6>
												<p class="des" v-text="item.foot_title"></p>
											</div>	
											<div class="decoration-circle top-circle"></div>
										</div>
										<div class="ticket-middle" @click="goDetail(item.url)">
											<div class="ticket-des">
												<ul class="detail">
													<li v-for="(tag,index) in item.gift_tag">
														<em>·</em>
														<span v-text="tag"></span>
													</li>
													<template v-if="item.is_countdown === 1">
														<li class="date-line font-orange">
															<em>·</em>
															<span>{{item.due_data | dateLineDes(item.is_countdown)}}</span>
														</li>
													</template>
													<template v-else="item.is_countdown !== 1">
														<li class="date-line" class="font-orange">
															<em>·</em>
															<span>{{item.due_data | dateLineDes(item.is_countdown)}}</span>
														</li>
													</template>
												</ul>
											</div>
										</div>	
										<div class="ticket-right">
											<div class="status" :class="{'font-blue': item.button.confirmInfoType !== 9}">
												<div class="font-wrap">
													<span v-for="(font,fontIndex) in item.button.confirmInfoButton.split('')" v-text="font"></span>
												</div>
											</div>
										</div>
									</div>
									<div class="r-sawtooth"></div>
								</li>
							</ul>
						</div>
					</template>
				</div>
			<!-- </template> -->
			<prize-form ref="childPrizeForm" :prize-show="prizeShow" :single-prize="singlePrize" v-on:closeparentprizeform="closePrizeForm" v-on:gotrender="renderGetPrize"></prize-form>
		</div>
		<loading-anim :ajax-status="ajaxStatus"></loading-anim>
		<my-mask :mask-status="maskStatus"></my-mask>
	</div>
<script type="text/x-template" id="getForm">
	<transition name="scale">
	<div class="prize-form-wrap" v-if="prizeShow" @click.self="closeparentprizeform">
		<div class="getPrizePrompt" v-show="userInfo.got">
			<div class="prompt-header">
				<!-- <span class="close"></span> -->
			</div>
			<div class="form">
				<input class="form-input" v-model="userInfo.name" placeholder="请填写您的姓名"><input class="form-input" v-model="userInfo.phone" placeholder="请填写您的手机号码" v-show="singlePrize.button.confirmInfoType !== 1"><input class="form-input" v-model="userInfo.alipay" placeholder="请填写您的支付宝账号" v-show="singlePrize.button.confirmInfoType === 1"><input class="form-input" v-model="userInfo.address" placeholder="请填写您的收货地址"  v-show="singlePrize.button.confirmInfoType === 3">
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
init.actCenter();

var defaultmenu = ct.getUrlData("defaultmenu");
if (defaultmenu == "0") {
	defaultmenu = "1";
}else if(defaultmenu == "1"){
	defaultmenu = "0";
}else {
	defaultmenu = "1";
}

if (Bridge && ct.userAgent().isGjj) {
	Bridge.action("setWebTab",{"title":"红包/奖品,活动","tab": defaultmenu,"tabFun":"centerVm.tab2,centerVm.tab1"});
}

window.onload = function(){
	$("body").on("click",".join",function(){
		if (Bridge && ct.userAgent().isGjj) {
		    Bridge.action("setWebTab", { "title": "红包/奖品,活动", "tab": "1", "tabFun": "centerVm.tab2,centerVm.tab1" });
		}		
	})
}

</script>
</body>
</html>