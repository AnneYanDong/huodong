require.config(requireConfig),require(["jquery","fastClick","FullPage","ct","bridge","juicer"],function(e,t,o,i,n,c){var r=(e(".mask"),Object.create(i.Prompt));r.create().build();var l=Object.create(i.Mask);l.create().build();i.Tool.local();i.Tool.buryPoint();var a={start:function(){console.log("鑫福贷活动！");var e=this;t.attach(document.body),i.Tool.setFont(),i.Tool.handleBottomStatusBar(),window.addEventListener("resize",i.Tool.debounce(i.Tool.setFont)),window.addEventListener("resize",i.Tool.debounce(i.Tool.handleBottomStatusBar));var o=Object.create(i.PreLodingUi);o.create({preLoadingCls:"loading-bg-color",loadingEleCls:"loading-ele-color"}).build();var n=null;clearTimeout(n),n=setTimeout(function(){o.hide()},500),i.Tool.imgPreLoad({callback:function(){this.hintLog("图片加载完成");var t=null;clearTimeout(t),t=setTimeout(function(){o.hide(),e.init()},500)}})},init:function(){var t=this;e(".wp").removeClass("hide"),t.openRule(),t.closeRule(),t.receive(),t.share()},receive:function(){e(".content").on("click",".btn",function(){e.ajax({type:"POST",dataType:"JSON",url:i.Tool.url("/act/act170623/get_prize"),data:JSON.stringify({place_cid:i.Tool.userAgent().isGjj?1:0,tag:"进入页面"+projectName}),success:function(e){if(1==e.success){console.log(e);var t=null;clearTimeout(t),1==e.ret.weChat?t=setTimeout(function(){r.show("本活动需在app参加"),t=setTimeout(function(){window.location.href="http://d.51gjj.com/"},1500)},200):0==e.ret.login?n&&n.action("login"):0==e.ret.have?window.location.href=e.ret.url:t=setTimeout(function(){r.show("您已领取,直接去体验吧"),t=setTimeout(function(){window.location.href=e.ret.url},1500)},200)}else r.show("出错了请重试")}})})},openRule:function(){e(".content").on("click",".rule-btn",function(t){l.show(),console.log("event target:"+t.target);var o=e("#tpl-rule").html(),i=c(o,s);e("body").append(i),e(".rule").fadeIn()})},closeRule:function(){e("body").on("click",".btn-close",function(){e(".rule").fadeOut(function(){l.hide()})})},share:function(){var e=navigator.userAgent,t={mobile:!!e.match(/AppleWebKit.*Mobile.*/),isAndroid:e.indexOf("Android")>-1||e.indexOf("Linux")>-1||e.indexOf("android")>-1,isiOS:/[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),webApp:-1==e.indexOf("Safari"),weixin:e.indexOf("MicroMessenger")>-1,isGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(e)||/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),isAndroidGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(e),isiOSGjj:/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),isGjjFdjsq:/^android\/[\w\W]+client\/[\w\W]+category\/51fdjsq$/.test(e)},o=window.location.host;return t.isGjj&&n&&n.action("quickIcon",{thumb:"https://r.51gjj.com/image/static/ico_title_share_dark.png",onclick:function(){n.action("ShareTimeline",{title:"送你115元高温补贴",desc:"51鑫福贷申请即可获得15元，放款再得100元",thumb:"https://r.51gjj.com/act/release/img/20170623_wxshare.png",link:"http://"+o+"/act/home/huodong/20170623/"})}}),this}},s={rule:["活动仅限于6月28日至奖品发完期间首次申请鑫福贷的用户；","完成申请可获得15元现金红包，成功放款可获得115元现金红包。为了您能够顺利拿到奖励，请申请业务后及时关注“我的奖品”提示；","成功领取后将在7个工作日内发放到您的支付宝账户，领取时请填写正确的个人支付宝账户；","关于活动有任何疑问请咨询官方客服热线4008635151；","本商品由51公积金管家提供，与设备生产商Apple Inc.公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。"]};a.start()});