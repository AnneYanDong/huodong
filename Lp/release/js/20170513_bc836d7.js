require.config(requireConfig),require(["jquery","fastClick","lucky-card","ct","bridge","juicer","marquee"],function(e,t,o,i,n){var c=(e(".mask"),Object.create(i.Prompt));c.create().build();var r=Object.create(i.Mask);r.create().build();i.Tool.local();i.Tool.buryPoint();var a=((new Date).getDay(),null),l={status:{login:!1,msg:""},charge:{loan:null,type:null,pay:null},start:function(){var o=this;t.attach(document.body),i.Tool.setFont(),i.Tool.handleBottomStatusBar(),window.addEventListener("resize",i.Tool.debounce(i.Tool.setFont)),window.addEventListener("resize",i.Tool.debounce(i.Tool.handleBottomStatusBar));var n=Object.create(i.PreLodingUi);n.create({preLoadingCls:"loading-bg-color",loadingEleCls:"loading-ele-color"}).build(),a=i.Tool.userAgent(),console.log(a),i.Tool.imgPreLoad({callback:function(){this.hintLog("图片加载完成");var e=null;clearTimeout(e),e=setTimeout(function(){n.hide(),o.init()},500)}}),e.ajax({type:"POST",dataType:"JSON",url:i.Tool.url("/app/request/activity"),data:JSON.stringify({place_cid:i.Tool.userAgent().isGjj?1:0,tag:"进入页面"+projectName}),success:function(e){1==e.success}})},init:function(){var t=this;e(".wp").removeClass("hide"),t.render(),t.apply()},render:function(){},openRule:function(){e(".content").on("click",".rule-btn",function(){r.show(),e(".rule").fadeIn()})},closeRule:function(){e("body").on("click",".btn-close",function(){e(".rule").fadeOut(function(){r.hide()})})},share:function(){var e=navigator.userAgent,t={mobile:!!e.match(/AppleWebKit.*Mobile.*/),isAndroid:e.indexOf("Android")>-1||e.indexOf("Linux")>-1||e.indexOf("android")>-1,isiOS:/[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),webApp:-1==e.indexOf("Safari"),weixin:e.indexOf("MicroMessenger")>-1,isGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(e)||/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),isAndroidGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(e),isiOSGjj:/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),isGjjFdjsq:/^android\/[\w\W]+client\/[\w\W]+category\/51fdjsq$/.test(e)},o=window.location.host;return t.isGjj&&n&&n.action("quickIcon",{thumb:"https://r.51gjj.com/image/static/ico_title_share_dark.png",onclick:function(){n.action("ShareTimeline",{title:"为足球喝彩",desc:"两分钟拿58元现金红包",thumb:"https://r.51gjj.com/act/release/img/20170510_share.png",link:"http://"+o+"/act/home/huodong/20170510/"})}}),this},apply:function(){e(".content").on("click",".apply",function(){i.Ajax.do({url:"test.php",type:"POST",dataType:"json",success:function(e){if(e.success){e=e.ret;var t=null;clearTimeout(t),0==e.order?window.location.href=e.url:1==e.order?t=setTimeout(function(){c.show("您有未结清贷款，暂不能参加该活动"),t=setTimeout(function(){window.location.href=e.url},1500)},200):c.show(e.errmsg||"出错请重试")}else c.show(e.errmsg||"出错请重试")}})})}};l.start()});