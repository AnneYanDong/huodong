require.config(requireConfig),require(["jquery","fastClick","FullPage","ct","bridge","juicer"],function(e,t,o,i,n,a){var s=(e(".mask"),Object.create(i.Prompt));s.create().build();var c=Object.create(i.Mask);c.create().build();i.Tool.local();i.Tool.buryPoint();var r={start:function(){console.log("鑫福贷活动！");var o=this;t.attach(document.body),i.Tool.setFont(),i.Tool.handleBottomStatusBar(),window.addEventListener("resize",i.Tool.debounce(i.Tool.setFont)),window.addEventListener("resize",i.Tool.debounce(i.Tool.handleBottomStatusBar));var n=Object.create(i.PreLodingUi);n.create({preLoadingCls:"loading-bg-color",loadingEleCls:"loading-ele-color"}).build();var a=null;clearTimeout(a),a=setTimeout(function(){n.hide()},500),i.Tool.imgPreLoad({callback:function(){this.hintLog("图片加载完成");var e=null;clearTimeout(e),e=setTimeout(function(){n.hide(),o.init()},500)}}),e.ajax({type:"POST",dataType:"JSON",url:i.Tool.url("/app/request/activity"),data:JSON.stringify({place_cid:i.Tool.userAgent().isGjj?1:0,tag:"进入页面"+projectName}),success:function(e){1==e.success}})},init:function(){var t=this;e(".wp").removeClass("hide"),t.openRule(),t.closeRule(),t.grabBonus(),t.share()},grabBonus:function(){e(".content").on("click",".btn",function(){e(".bonus-shake").addClass("hand-shake"),e(".bonus1").show().addClass("bonus1-animation"),e(".bonus2").show().addClass("bonus2-animation"),e(".bonus3").show().addClass("bonus3-animation"),i.Ajax.do({url:indexData.ajaxUrl||"test.php",data:{},success:function(e){if(console.log(e),1==e.success){var t=null;clearTimeout(t),1==e.ret.weChat?t=setTimeout(function(){s.show("登录51公积金管家APP领取"),t=setTimeout(function(){window.location.href=e.ret.url},1500)},200):1==e.ret.qq?t=setTimeout(function(){s.show("登录51公积金管家APP领取"),t=setTimeout(function(){window.location.href=e.ret.url},1500)},200):0==e.ret.login?n&&n.action("login"):0==e.ret.order?s.show("您暂不符合活动参与条件,试试其它活动~"):t=setTimeout(function(){t=setTimeout(function(){window.location.href=e.ret.url},1500)},200)}else s.show(e.msg||"出错了请重试")}})})},openRule:function(){e(".content").on("click",".rule-btn",function(t){c.show(),console.log("event target:"+t.target);var o=e("#tpl-rule").html(),i=a(o,l);e("body").append(i),e(".rule").fadeIn()})},closeRule:function(){e("body").on("click",".btn-close",function(){e(".rule").fadeOut(function(){c.hide()})})},share:function(){var e=navigator.userAgent,t={mobile:!!e.match(/AppleWebKit.*Mobile.*/),isAndroid:e.indexOf("Android")>-1||e.indexOf("Linux")>-1||e.indexOf("android")>-1,isiOS:/[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),webApp:-1==e.indexOf("Safari"),weixin:e.indexOf("MicroMessenger")>-1,isGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(e)||/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),isAndroidGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(e),isiOSGjj:/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),isGjjFdjsq:/^android\/[\w\W]+client\/[\w\W]+category\/51fdjsq$/.test(e)},o=window.location.host;return t.isGjj&&n&&n.action("quickIcon",{thumb:"https://r.51gjj.com/image/static/ico_title_share_dark.png",onclick:function(){n.action("ShareTimeline",{title:"送你115元高温补贴",desc:"51鑫福贷申请即可获得15元，放款再得100元",thumb:"https://r.51gjj.com/act/release/img/20170623_wxshare.png",link:"http://"+o+"/act/home/huodong/20170623/"})}}),this}},l={rule:["通过活动页面完成申请或放款，首月还款时直接抵扣还款利息及本金，提前还款、逾期等将无法享受该优惠。","本活动致力于回馈金盈贷新老用户，未申请过金盈贷用户与之前审批通过未放款用户都可参与此活动。","同一用户仅能领取一次，红包券有效期为20天，您需要在失效之前完成放款。","有任何疑问或者帮助可联系客服4008635151。","本商品由51公积金管家提供，与设备生产商Apple Inc.公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。"]};r.start()});