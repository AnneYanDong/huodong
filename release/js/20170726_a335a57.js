require.config(requireConfig),require(["jquery","fastClick","lucky-card","ct","bridge","juicer","marquee"],function(e,t,n,o,i){function r(e){var t=document.cookie,n=t.indexOf(e);if(-1!=n){n+=e.length+1;var o=t.indexOf(";",n);-1==o&&(o=t.length);var i=unescape(t.substring(n,o))}return i}var a=(e(".mask"),Object.create(o.Prompt));a.create().build();var s=Object.create(o.Mask);s.create().build();o.Tool.local();o.Tool.buryPoint();var c=((new Date).getDay(),navigator.userAgent),d={mobile:!!c.match(/AppleWebKit.*Mobile.*/),isAndroid:c.indexOf("Android")>-1||c.indexOf("Linux")>-1||c.indexOf("android")>-1,isiOS:/[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(c),webApp:-1==c.indexOf("Safari"),weixin:c.indexOf("MicroMessenger")>-1,isGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(c)||/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(c),isAndroidGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(c),isiOSGjj:/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(c),isGjjFdjsq:/^android\/[\w\W]+client\/[\w\W]+category\/51fdjsq$/.test(c)},l=r("invest_uid");console.log(l);var u=r("invest_token");console.log(u);var w={start:function(){var n=this;t.attach(document.body),o.Tool.setFont(),o.Tool.handleBottomStatusBar(),window.addEventListener("resize",o.Tool.debounce(o.Tool.setFont)),window.addEventListener("resize",o.Tool.debounce(o.Tool.handleBottomStatusBar));var i=Object.create(o.PreLodingUi);i.create({preLoadingCls:"loading-bg-color",loadingEleCls:"loading-ele-color"}).build(),o.Tool.imgPreLoad({callback:function(){this.hintLog("图片加载完成");var e=null;clearTimeout(e),e=setTimeout(function(){i.hide(),n.init()},500)}}),e.ajax({type:"POST",dataType:"JSON",url:o.Tool.url("/app/request/activity"),data:JSON.stringify({place_cid:o.Tool.userAgent().isGjj?1:0,tag:"进入页面"+projectName}),success:function(e){1==e.success}})},init:function(){var t=this;e(".wp").removeClass("hide"),t.render(),t.openRule(),t.closeRule()},render:function(){e.ajax({type:"POST",dataType:"JSON",url:"/invest2/user/queryUser/tenderRank",success:function(t){1==t.resCode?(e.each(t.resData.topList,function(t,n){e(".num-"+n.rank+" .phone").text(n.mobilePhone.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")),e(".num-"+n.rank+" .invest-money").text(n.sumTenderMoney)}),e(".money-red").text(t.resData.currentUserTenderMoney)):10100<=t.resCode&&t.resCode<10200?d.isGjj&&i?i.action("login"):window.location.href="/hs/appgjj/login?return_url=/app/invest/":a.show(t.resMsg||"暂无数据")}})},openRule:function(){e(".content").on("click",".rule-btn",function(){s.show(),e(".rule").fadeIn()})},closeRule:function(){e("body").on("click",".btn-close",function(){e(".rule").fadeOut(function(){s.hide()})})}};w.start()});