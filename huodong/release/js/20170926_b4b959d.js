require.config(requireConfig),require(["jquery","fastClick","ct","bridge","juicer","share"],function(e,n,t,i,o,a){function r(e){var n=document.cookie,t=n.indexOf(e);if(-1!=t){t+=e.length+1;var i=n.indexOf(";",t);-1==i&&(i=n.length);var o=unescape(n.substring(t,i))}return o}var s=(e(".mask"),Object.create(t.Prompt));s.create().build();var c=Object.create(t.Mask);c.create().build();t.Tool.local();t.Tool.buryPoint_v2(t.Tool.userAgent().isGjj?1:0);var l=r("invest_uid");console.log(l);var d=r("invest_token");console.log(d);var u={start:function(){var i=this;n.attach(document.body),t.Tool.setFont(),window.addEventListener("resize",t.Tool.debounce(t.Tool.setFont)),window.addEventListener("resize",t.Tool.debounce(t.Tool.handleBottomStatusBar));var o=Object.create(t.PreLodingUi);o.create({preLoadingCls:"loading-bg-color",loadingEleCls:"loading-ele-color"}).build(),t.Tool.imgPreLoad({callback:function(){this.hintLog("图片加载完成");var e=null;clearTimeout(e),e=setTimeout(function(){o.hide(),i.init()},500)}}),e.ajax({type:"POST",dataType:"JSON",url:t.Tool.url("/act/request/activity"),data:JSON.stringify({source:t.Tool.userAgent().isGjj?1:0,tag:"20170926_1_0_0_理财排行榜活动"}),success:function(e){1==e.success}})},init:function(){var n=this;e(".wp").removeClass("hide"),n.render(),n.openRule(),n.closeRule(),n.share()},render:function(){e.ajax({type:"GET",dataType:"JSON",url:"/invest2/user/queryUser/tenderRank",success:function(n){1==n.resCode?(e.each(n.resData.topList,function(n,t){e(".prize-"+t.rank+" .act-rank-name").text(t.mobilePhone),e(".prize-"+t.rank+" .act-rank-money").text(t.sumTenderMoney)}),e(".act-invest .personal-invest").text(n.resData.currentUserTenderMoney+"元")):s.show(n.resMsg||"暂无数据")}})},openRule:function(){e(".content").on("click",".act-prize-text span",function(){c.show(),e(".rule").fadeIn()})},closeRule:function(){e("body").on("click",".btn-close",function(){e(".rule").fadeOut(function(){c.hide()})})},share:function(){var n=this,t=window.location.host,o=window.location.href.split("#")[0],a=/b.jianbing.com/g.test(t)?"wx90f7de7c9b73bf69":"wxb42d431526f1c17d";e.ajax({url:"/hs/wx/get_sign_package",type:"GET",data:"url="+encodeURIComponent(o)+"&appid="+a,dataType:"JSON",success:function(e){n.share_callback(e)}});var r=navigator.userAgent,s={mobile:!!r.match(/AppleWebKit.*Mobile.*/),isAndroid:r.indexOf("Android")>-1||r.indexOf("Linux")>-1||r.indexOf("android")>-1,isiOS:/[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(r),webApp:-1==r.indexOf("Safari"),weixin:r.indexOf("MicroMessenger")>-1,isGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(r)||/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(r),isAndroidGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(r),isiOSGjj:/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(r),isGjjFdjsq:/^android\/[\w\W]+client\/[\w\W]+category\/51fdjsq$/.test(r)},t=window.location.host;return s.isGjj&&i&&i.action("quickIcon",{thumb:"https://r.51gjj.com/image/static/ico_title_share_dark.png",onclick:function(){i.action("ShareTimeline",{title:"国庆嗨翻天，全民加息至9.5%，还送888元奖励金",desc:"双节同庆加息至9.5%，新网银行存管，一起赚起来！",thumb:"https://r.51gjj.com/act/release/img/20170926_wxshare.png",link:"https://"+t+"/act/home/huodong/20170926/"})}}),this},share_callback:function(e){var n=window.location.host;a.config({debug:!1,appId:e.data.appId,timestamp:e.data.timestamp,nonceStr:e.data.nonceStr,signature:e.data.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"]}),a.ready(function(){var e={title:"国庆嗨翻天，全民加息至9.5%，还送888元奖励金",link:"https://"+n+"/act/home/huodong/20170926/",imgUrl:"https://r.51gjj.com/act/release/img/20170926_wxshare.png",desc:"双节同庆加息至9.5%，新网银行存管，一起赚起来！",success:function(){console.log(e.imgUrl)}};a.onMenuShareTimeline(e),a.onMenuShareAppMessage(e),a.onMenuShareQQ(e),a.onMenuShareWeibo(e),a.onMenuShareQZone(e)})}};u.start()});