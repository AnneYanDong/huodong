require.config(requireConfig),require(["jquery","fastClick","lucky-card","ct","bridge","juicer","marquee"],function(e,i,t,o,n){var a=(e(".mask"),Object.create(o.Prompt));a.create().build();var c=Object.create(o.Mask);c.create().build();o.Tool.local();o.Tool.buryPoint();var r=((new Date).getDay(),null),s={status:{login:!1,msg:""},charge:{loan:null,type:null,pay:null},start:function(){var t=this;i.attach(document.body),o.Tool.setFont(),o.Tool.handleBottomStatusBar(),window.addEventListener("resize",o.Tool.debounce(o.Tool.setFont)),window.addEventListener("resize",o.Tool.debounce(o.Tool.handleBottomStatusBar));var n=Object.create(o.PreLodingUi);n.create({preLoadingCls:"loading-bg-color",loadingEleCls:"loading-ele-color"}).build(),r=o.Tool.userAgent(),console.log(r),o.Tool.imgPreLoad({callback:function(){this.hintLog("图片加载完成");var e=null;clearTimeout(e),e=setTimeout(function(){n.hide(),t.init()},500)}}),e.ajax({type:"POST",dataType:"JSON",url:o.Tool.url("/app/request/activity"),data:JSON.stringify({place_cid:o.Tool.userAgent().isGjj?1:0,tag:"进入页面"+projectName}),success:function(e){1==e.success}})},init:function(){var i=this;e(".outer").removeClass("hide"),i.apply(),i.share()},openRule:function(){e(".content").on("click",".rule-btn",function(){c.show(),e(".rule").fadeIn()})},closeRule:function(){e("body").on("click",".btn-close",function(){e(".rule").fadeOut(function(){c.hide()})})},share:function(){var e=navigator.userAgent,i={mobile:!!e.match(/AppleWebKit.*Mobile.*/),isAndroid:e.indexOf("Android")>-1||e.indexOf("Linux")>-1||e.indexOf("android")>-1,isiOS:/[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),webApp:-1==e.indexOf("Safari"),weixin:e.indexOf("MicroMessenger")>-1,isGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(e)||/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),isAndroidGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(e),isiOSGjj:/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),isGjjFdjsq:/^android\/[\w\W]+client\/[\w\W]+category\/51fdjsq$/.test(e)},t=window.location.host;return i.isGjj&&n&&n.action("quickIcon",{thumb:"https://r.51gjj.com/image/static/ico_title_share_dark.png",onclick:function(){n.action("ShareTimeline",{title:"烂世，别妨碍我的生活！",desc:"年轻小资消费搭档or成家立业必然选择，这次你的选择？",thumb:"https://r.51gjj.com/act/release/img/20170512_share1.png",link:"http://"+t+"/act/home/huodong/20170512/"})}}),this},apply:function(){e(".content").on("click","#gold",function(){window.location.href="https://b.jianbing.com/shequ/discovery/index.php?route=bankx/index&bank_id=43&from=activity_?from=activity_20170512"}),e(".content").on("click","#platinum",function(){var i=null;clearTimeout(i),e.ajax({type:"POST",dataType:"JSON",url:"test.php",success:function(e){if(console.log(e),1==e.success){var e=e.ret;e.is_weChat||e.is_qq?window.location.href="https://b.jianbing.com/shequ/discovery/index.php?route=bankx/index&bank_id=1&from=activity_?from=activity_20170512":e.login?e.jump?window.location.href="https://b.jianbing.com/shequ/discovery/index.php?route=bankx/index&bank_id=1&from=activity_?from=activity_20170512":(a.show("您暂不符合该卡申请资格，可尝试申请智能金卡"),i=setTimeout(function(){window.location.href="https://b.jianbing.com/shequ/discovery/index.php?route=bankx/index&bank_id=43&from=activity_?from=activity_20170512"},2e3)):n&&n.action("login")}}})})}};s.start()});