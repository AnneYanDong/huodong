require.config(requireConfig),require(["jquery","fastClick","FullPage","ct","bridge","juicer"],function(e,t,i,o,n){var r=(e(".mask"),Object.create(o.Prompt));r.create().build();var s=Object.create(o.Mask);s.create().build();var a=(o.Tool.local(),o.Tool.userAgent().isGjj?1:0);o.Tool.buryPoint_v2(a);var c={start:function(){var e=this;t.attach(document.body),o.Tool.setFont(),window.addEventListener("resize",o.Tool.debounce(o.Tool.setFont)),window.onresize=o.Tool.debounce(o.Tool.setFont);var i=Object.create(o.PreLodingUi);i.create({preLoadingCls:"loading-bg-color",loadingEleCls:"loading-ele-color"}).build(),o.Tool.imgPreLoad({callback:function(){this.hintLog("图片加载完成");var t=null;clearTimeout(t),t=setTimeout(function(){i.hide(),e.init()},500)}})},init:function(){console.log("七夕活动");var t=this;t.setNavAttr(),t.share(),e(".wp-outer").removeClass("hide"),t.PageBuryRequest(),t.getAmount()},getAmount:function(){e.ajax({type:"POST",dataType:"JSON",url:"/invest2/user/queryUser/totalTenderAmount",success:function(t){console.log("后台数据：",t),1==t.resCode?e(".amount span:eq(1)").text(t.resData.currentUserTenderMoney):t.resCode<10200&&t.resCode>=10100?n&&n.action("login"):r.show(t.resMsg||"出错请重试")}})},setNavAttr:function(){n&&n.action("setNavigationColor",{backgroundColor:"#212226",textColor:"#fff",iconType:"1"})},PageBuryRequest:function(){e.ajax({type:"POST",dataType:"JSON",url:"/act/request/activity",data:JSON.stringify({source:o.Tool.userAgent().isGjj?1:0,tag:"20170821_1_0_0_进入页面"}),success:function(e){e.success}})},share:function(){var e=navigator.userAgent,t={mobile:!!e.match(/AppleWebKit.*Mobile.*/),isAndroid:e.indexOf("Android")>-1||e.indexOf("Linux")>-1||e.indexOf("android")>-1,isiOS:/[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),webApp:-1==e.indexOf("Safari"),weixin:e.indexOf("MicroMessenger")>-1,isGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(e)||/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),isAndroidGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(e),isiOSGjj:/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),isGjjFdjsq:/^android\/[\w\W]+client\/[\w\W]+category\/51fdjsq$/.test(e)},i=window.location.host;return t.isGjj&&n&&n.action("quickIcon",{thumb:"https://r.51gjj.com/image/static/ico_title_share_dark.png",onclick:function(){n.action("ShareTimeline",{title:"抢个红包过周末",desc:"利息5折、现金、实物...",thumb:"https://r.51gjj.com/act/release/img/20170824_share.png",link:"https://"+i+"/act/home/huodong/20170824/index.php"})}}),this}};c.start()});