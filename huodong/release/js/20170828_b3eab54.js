require.config(requireConfig),require(["jquery","fastClick","FullPage","ct","bridge","juicer"],function(e,t,i,o,n,a){var c=(e(".mask"),Object.create(o.Prompt));c.create().build();var r=Object.create(o.Mask);r.create().build();var s=(o.Tool.local(),o.Tool.userAgent().isGjj?1:0);o.Tool.buryPoint_v2(s);var l={start:function(){var e=this;t.attach(document.body),o.Tool.setFont(),o.Tool.handleBottomStatusBar(),window.addEventListener("resize",o.Tool.debounce(o.Tool.setFont)),window.addEventListener("resize",o.Tool.debounce(o.Tool.handleBottomStatusBar));var i=Object.create(o.PreLodingUi);i.create({preLoadingCls:"loading-bg-color",loadingEleCls:"loading-ele-color"}).build(),o.Tool.imgPreLoad({callback:function(){this.hintLog("图片加载完成");var t=null;clearTimeout(t),t=setTimeout(function(){i.hide(),e.init()},500)}})},init:function(){console.log("理财金活动");var t=this;t.openRule(),t.closeRule(),t.setNavAttr(),t.share(),e(".wp").removeClass("hide"),t.PageBuryRequest()},getAmount:function(){e.ajax({type:"POST",dataType:"JSON",url:"test.php",success:function(e){console.log("后台数据：",e)}})},setNavAttr:function(){n&&n.action("setNavigationColor",{backgroundColor:"#212226",textColor:"#fff",iconType:"1"})},PageBuryRequest:function(){e.ajax({type:"POST",dataType:"JSON",url:"/act/request/activity",data:JSON.stringify({source:o.Tool.userAgent().isGjj?1:0,tag:"20170821_1_0_0_进入页面"}),success:function(e){e.success}})},openRule:function(){e(".wp-inner").on("click",".rule-btn",function(){r.show();var t=e("#tpl-rule").html(),i=a(t,u);e("body").append(i),e(".rule").fadeIn()})},closeRule:function(){e("body").on("click",".btn-close",function(){e(".rule").fadeOut(function(){r.hide()})})},share:function(){var e=navigator.userAgent,t={mobile:!!e.match(/AppleWebKit.*Mobile.*/),isAndroid:e.indexOf("Android")>-1||e.indexOf("Linux")>-1||e.indexOf("android")>-1,isiOS:/[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),webApp:-1==e.indexOf("Safari"),weixin:e.indexOf("MicroMessenger")>-1,isGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(e)||/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),isAndroidGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(e),isiOSGjj:/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),isGjjFdjsq:/^android\/[\w\W]+client\/[\w\W]+category\/51fdjsq$/.test(e)},i=window.location.host;return t.isGjj&&n&&n.action("quickIcon",{thumb:"https://r.51gjj.com/image/static/ico_title_share_dark.png",onclick:function(){n.action("ShareTimeline",{title:"抢个红包过周末",desc:"利息5折、现金、实物...",thumb:"https://r.51gjj.com/act/release/img/20170824_share.png",link:"https://"+i+"/act/home/huodong/20170824/index.php"})}}),this}},u={rule:["领券后，通过活动页面完成申请或放款将获得特定奖励，同个业务奖励只能领取一次。","领券后申请金优贷，每日前100名将获得精美定制笔记本一份；领券后申请金卡贷并放款，享受当月利息下调50%；领券后申请金安贷24小时未放款，获得超时赔付50元现金；领券后申请金花贷并放款，获得50元无门槛抵息券。","此活动针对从未申请过金花贷、金优贷、金卡贷、金安贷业务的新用户，一个用户至多领取到这4个业务对应的奖励。","抵息券将在首月还款直接减免，逾期、提前还款将不享受此优惠；现金/实物奖励将在用户信息完整后7个工作日内打款/寄出，请确认收款/收货信息准确性。","有任何疑问或者帮助可联系客服4008635151。","本商品由51公积金管家提供，与设备生产商Apple Inc.公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。"]};l.start()});