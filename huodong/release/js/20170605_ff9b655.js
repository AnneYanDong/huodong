require.config(requireConfig),require(["jquery","fastClick","lucky-card","ct","bridge","juicer","marquee"],function(e,t,o,i,n){var c=(e(".mask"),Object.create(i.Prompt));c.create().build();var a=Object.create(i.Mask);a.create().build();i.Tool.local();i.Tool.buryPoint();var r=((new Date).getDay(),null),l={start:function(){var o=this;t.attach(document.body),i.Tool.setFont(),i.Tool.handleBottomStatusBar(),window.addEventListener("resize",i.Tool.debounce(i.Tool.setFont)),window.addEventListener("resize",i.Tool.debounce(i.Tool.handleBottomStatusBar));var n=Object.create(i.PreLodingUi);n.create({preLoadingCls:"loading-bg-color",loadingEleCls:"loading-ele-color"}).build(),r=i.Tool.userAgent(),console.log(r),i.Tool.imgPreLoad({callback:function(){this.hintLog("图片加载完成");var e=null;clearTimeout(e),e=setTimeout(function(){n.hide(),o.init()},500)}}),e.ajax({type:"POST",dataType:"JSON",url:i.Tool.url("/app/request/activity"),data:JSON.stringify({place_cid:i.Tool.userAgent().isGjj?1:0,tag:"进入页面"+projectName}),success:function(e){1==e.success}})},init:function(){var t=this;e(".wp").removeClass("hide"),t.openRule(),t.closeRule(),t.apply(),t.share()},openRule:function(){e(".content").on("click",".rule-btn",function(){a.show(),e(".rule").fadeIn()})},closeRule:function(){e("body").on("click",".btn-close",function(){e(".rule").fadeOut(function(){a.hide()})})},apply:function(){var t=this,o=null;clearTimeout(o),e(".content").on("click",".apply1",function(){e.ajax({type:"POST",dataType:"JSON",url:"/act/act170605/get_prize",success:function(e){console.log(t),t.doAjax(e)}})}),e(".content").on("click",".apply2",function(){e.ajax({type:"POST",dataType:"JSON",url:"/act/act170605/get_prize",success:function(e){console.log(t),t.doAjax(e)}})}),e(".content").on("click",".receive",function(){e.ajax({type:"POST",dataType:"JSON",url:"/act/act170605/get_prize",success:function(e){console.log(t),t.doAjax(e)}})})},doAjax:function(e){e.success?1==e.ret.weChat?timer=setTimeout(function(){window.location.href=e.ret.url},200):0==e.ret.login?n&&n.action("login"):timer=1==e.ret.match?setTimeout(function(){c.show("已领券，去体验吧"),timer=setTimeout(function(){window.location.href=e.ret.url},1500)},200):setTimeout(function(){c.show("暂不符合要求，看看其他业务吧"),timer=setTimeout(function(){window.location.href=e.ret.url},1500)},200):c.show(e.msg||"出错请重试")},share:function(){var e=navigator.userAgent,t={mobile:!!e.match(/AppleWebKit.*Mobile.*/),isAndroid:e.indexOf("Android")>-1||e.indexOf("Linux")>-1||e.indexOf("android")>-1,isiOS:/[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),webApp:-1==e.indexOf("Safari"),weixin:e.indexOf("MicroMessenger")>-1,isGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(e)||/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),isAndroidGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(e),isiOSGjj:/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),isGjjFdjsq:/^android\/[\w\W]+client\/[\w\W]+category\/51fdjsq$/.test(e)},o=window.location.host;return t.isGjj&&n&&n.action("quickIcon",{thumb:"https://r.51gjj.com/image/static/ico_title_share_dark.png",onclick:function(){n.action("ShareTimeline",{title:"8万元额度3分钟到账，申请还送现金",desc:"申请送40，借款送50",thumb:"https://r.51gjj.com/act/release/img/20170605_wxshare.png",link:"http://"+o+"/act/home/huodong/20170605/"})}}),this}};l.start()});