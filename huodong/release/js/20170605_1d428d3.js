require.config(requireConfig),require(["jquery","fastClick","lucky-card","ct","bridge","juicer","marquee"],function(e,t,i,o,n){var c=(e(".mask"),Object.create(o.Prompt));c.create().build();var a=Object.create(o.Mask);a.create().build();o.Tool.local();o.Tool.buryPoint();var r=((new Date).getDay(),null),l={start:function(){var i=this;t.attach(document.body),o.Tool.setFont(),o.Tool.handleBottomStatusBar(),window.addEventListener("resize",o.Tool.debounce(o.Tool.setFont)),window.addEventListener("resize",o.Tool.debounce(o.Tool.handleBottomStatusBar));var n=Object.create(o.PreLodingUi);n.create({preLoadingCls:"loading-bg-color",loadingEleCls:"loading-ele-color"}).build(),r=o.Tool.userAgent(),console.log(r),o.Tool.imgPreLoad({callback:function(){this.hintLog("图片加载完成");var e=null;clearTimeout(e),e=setTimeout(function(){n.hide(),i.init()},500)}}),e.ajax({type:"POST",dataType:"JSON",url:o.Tool.url("/app/request/activity"),data:JSON.stringify({place_cid:o.Tool.userAgent().isGjj?1:0,tag:"进入页面"+projectName}),success:function(e){1==e.success}})},init:function(){var t=this;e(".wp").removeClass("hide"),t.openRule(),t.closeRule(),t.apply(),t.share()},openRule:function(){e(".content").on("click",".rule-btn",function(){a.show(),e(".rule").fadeIn()})},closeRule:function(){e("body").on("click",".btn-close",function(){e(".rule").fadeOut(function(){a.hide()})})},apply:function(){var t=null;clearTimeout(t),e(".content").on("click",".receive",function(){e.ajax({type:"POST",dataType:"JSON",url:"/act/act170605/get_prize",success:function(e){e.success?1==e.ret.weChat?t=setTimeout(function(){window.location.href=e.ret.url},200):0==e.ret.login?n&&n.action("login"):t=1==e.ret.match?setTimeout(function(){c.show("已领券，去体验吧"),t=setTimeout(function(){window.location.href=e.ret.url},1500)},200):setTimeout(function(){c.show("暂不符合要求，看看其他业务吧"),t=setTimeout(function(){window.location.href=e.ret.url},1500)},200):c.show(e.msg||"出错请重试")}})})},share:function(){var e=navigator.userAgent,t={mobile:!!e.match(/AppleWebKit.*Mobile.*/),isAndroid:e.indexOf("Android")>-1||e.indexOf("Linux")>-1||e.indexOf("android")>-1,isiOS:/[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),webApp:-1==e.indexOf("Safari"),weixin:e.indexOf("MicroMessenger")>-1,isGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(e)||/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),isAndroidGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(e),isiOSGjj:/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),isGjjFdjsq:/^android\/[\w\W]+client\/[\w\W]+category\/51fdjsq$/.test(e)},i=window.location.host;return t.isGjj&&n&&n.action("quickIcon",{thumb:"https://r.51gjj.com/image/static/ico_title_share_dark.png",onclick:function(){n.action("ShareTimeline",{title:"8万元额度3分钟到账，申请还送现金",desc:"申请送40，借款送50",thumb:"https://r.51gjj.com/act/release/img/20170605_wxshare.png",link:"http://"+i+"/act/home/huodong/20170605/"})}}),this}};l.start()});