require.config(requireConfig),require(["jquery","fastClick","ct","bridge","juicer"],function(e,t,n,i){function o(e){var t=document.cookie,n=t.indexOf(e);if(-1!=n){n+=e.length+1;var i=t.indexOf(";",n);-1==i&&(i=t.length);var o=unescape(t.substring(n,i))}return o}var r=(e(".mask"),Object.create(n.Prompt));r.create().build();var a=Object.create(n.Mask);a.create().build();n.Tool.local();n.Tool.buryPoint();var s=navigator.userAgent,c={mobile:!!s.match(/AppleWebKit.*Mobile.*/),isAndroid:s.indexOf("Android")>-1||s.indexOf("Linux")>-1||s.indexOf("android")>-1,isiOS:/[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(s),webApp:-1==s.indexOf("Safari"),weixin:s.indexOf("MicroMessenger")>-1,isGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(s)||/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(s),isAndroidGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(s),isiOSGjj:/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(s),isGjjFdjsq:/^android\/[\w\W]+client\/[\w\W]+category\/51fdjsq$/.test(s)},d=o("invest_uid");console.log(d);var l=o("invest_token");console.log(l);var u={start:function(){var i=this;t.attach(document.body),n.Tool.setFont(),window.addEventListener("resize",n.Tool.debounce(n.Tool.setFont)),window.addEventListener("resize",n.Tool.debounce(n.Tool.handleBottomStatusBar));var o=Object.create(n.PreLodingUi);o.create({preLoadingCls:"loading-bg-color",loadingEleCls:"loading-ele-color"}).build(),n.Tool.imgPreLoad({callback:function(){this.hintLog("图片加载完成");var e=null;clearTimeout(e),e=setTimeout(function(){o.hide(),i.init()},500)}}),e.ajax({type:"POST",dataType:"JSON",url:n.Tool.url("/act/request/activity"),data:JSON.stringify({source:n.Tool.userAgent().isGjj?1:0,tag:"20170926_1_0_0_理财排行榜活动"}),success:function(e){1==e.success}})},init:function(){var t=this;e(".wp").removeClass("hide"),t.render(),t.openRule(),t.closeRule()},render:function(){e.ajax({type:"POST",dataType:"JSON",url:"/invest2/user/queryUser/tenderRank",success:function(t){1==t.resCode?(e.each(t.resData.topList,function(t,n){e(".prize-"+n.rank+" .act-rank-name").text(n.mobilePhone.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")),e(".prize-"+n.rank+" .act-rank-money").text(n.sumTenderMoney)}),e(".act-invest .personal-invest").text(t.resData.currentUserTenderMoney+"元")):10100<=t.resCode&&t.resCode<10200?c.isGjj&&i?i.action("login"):window.location.href="/hs/appgjj/login?return_url=/app/invest/":r.show(t.resMsg||"暂无数据")}})},openRule:function(){e(".content").on("click",".act-prize-text span",function(){a.show(),e(".rule").fadeIn()})},closeRule:function(){e("body").on("click",".btn-close",function(){e(".rule").fadeOut(function(){a.hide()})})}};u.start()});