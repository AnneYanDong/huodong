require.config(requireConfig),require(["jquery","fastClick","FullPage","ct","bridge","juicer","swiper"],function(e,a,t,n,i){var o=(e(".mask"),Object.create(n.Prompt));o.create().build();var r=Object.create(n.Mask);r.create().build();n.Tool.local(),n.Tool.userAgent().isGjj?1:0;n.Tool.buryPoint_v2(0),n.Tool.share(85,"jiexigjj831");var l={start:function(){var e=this;a.attach(document.body),n.Tool.setFont(),n.Tool.handleBottomStatusBar(),window.addEventListener("resize",n.Tool.debounce(n.Tool.setFont)),window.addEventListener("resize",n.Tool.debounce(n.Tool.handleBottomStatusBar));var t=Object.create(n.PreLodingUi);t.create({preLoadingCls:"loading-bg-color",loadingEleCls:"loading-ele-color"}).build(),n.Tool.imgPreLoad({callback:function(){this.hintLog("图片加载完成");var a=null;clearTimeout(a),a=setTimeout(function(){t.hide(),e.init()},500)}})},init:function(){console.log("解析你的公积金活动");var a=this,t=a.getQueryStringArgs();unionid=t.unionid,shareid=t.shareid,a.share(),a.setNavAttr(),e(".wp").removeClass("hide"),a.useSwiper(),a.fullPageObj=a.fullpage()},fullpage:function(){var a=this,t=document.getElementsByClassName("wp-inner")[0].fullpage({start:0,beforeChange:function(e){var t="page"+(e.next+1);console.log("now",t),a.PageBuryRequest(t),a.changeState(t)},afterChange:function(t){var n=null;clearTimeout(n),a.fullPageObj.stop();var r="page"+(t.cur+1);"page1"==r&&(e(".page1").on("click",".img-btn",function(){e.ajax({type:"POST",dataType:"JSON",data:JSON.stringify({unionid:unionid,shareid:shareid}),url:"/act/analyze/get_analyze",success:function(t){t.success?(console.log("后台数据：",t),newShareId=t.ret.shareid,t.ret.is_weChat?(e(".page8").on("click",".img-btn",function(){e(".page8 .share").addClass("bounce-out"),setTimeout(function(){e(".page8 .share").removeClass("bounce-out")},200)}),a.handleProcess(t)):0==t.ret.login?(o.show("想解析公积金，先登录APP啦！"),i&&i.action("login")):a.handleProcess(t)):o.show(t.msg||"出错了请重试")}})}),a.respondState(r)),"page2"==r&&(e(".page2").on("click",".next",function(){a.fullPageObj.moveTo(2,!0)}),a.respondState(r,0,!0,function(){console.log("返回第一页")})),"page3"==r&&(e(".page3").on("click",".next",function(){a.fullPageObj.moveTo(3,!0)}),a.respondState(r,1,!0,function(){console.log("返回第二页")})),"page4"==r&&(e(".page4").on("click",".next",function(){a.fullPageObj.moveTo(4,!0)}),a.respondState(r,2,!0,function(){console.log("返回第三页")})),"page5"==r&&(e(".page5").on("click",".next",function(){a.fullPageObj.moveTo(5,!0)}),a.respondState(r,3,!0,function(){console.log("返回第四页")})),"page6"==r&&(e(".page6").on("click",".next",function(){a.fullPageObj.moveTo(6,!0)}),a.respondState(r,4,!0,function(){console.log("返回第五页")})),"page7"==r&&(e(".page7").on("click",".next",function(){a.fullPageObj.moveTo(7,!0)}),a.respondState(r,5,!0,function(){console.log("返回第六页")})),"page8"==r&&(e(".page8").on("click",".img-btn",function(){a.share2()}),a.respondState(r,6,!0,function(){console.log("返回第七页")}))}});return t},useSwiper:function(){{var a=this;new Swiper(".swiper-container",{direction:"vertical",history:"index.php?unionid="+unionid+"&shareid="+shareid+"#page",onTouchEnd:function(t){var n=t.activeIndex;switch(n){case 0:e.ajax({type:"POST",dataType:"JSON",data:JSON.stringify({unionid:unionid,shareid:shareid}),url:"test.php",success:function(t){t.success?(console.log("后台数据：",t),t.ret.is_weChat?(e(".page8").on("click",".img-btn",function(){e(".page8 .share").addClass("bounce-out"),setTimeout(function(){e(".page8 .share").removeClass("bounce-out")},200)}),a.handleProcess(t)):0==t.ret.login?(o.show("想解析公积金，先登录APP啦！"),e(".page1").addClass("swiper-no-swiping"),e(".page2").remove(),e(".page3").remove(),e(".page4").remove(),e(".page5").remove(),e(".page6").remove(),e(".page7").remove(),e(".page8").remove(),e(".page9").remove(),i&&i.action("login")):a.handleProcess(t)):o.show(t.msg||"出错了请重试")}})}}})}},setNavAttr:function(){i&&i.action("setNavigationColor",{backgroundColor:"#e33d3b",textColor:"#fff",iconType:"1"})},PageBuryRequest:function(a){console.log("埋点：",a);var t=a.substring(4);e.ajax({type:"POST",dataType:"JSON",url:"/act/request/activity",data:JSON.stringify({source:n.Tool.userAgent().isGjj?1:0,tag:"85_"+t+"_0_0_进入页面"+a}),success:function(e){e.success}})},createPortrait:function(a){var t=new Image,n=["http://r.51gjj.com/act/release/img/20170807_page2_portrait4.png","http://r.51gjj.com/act/release/img/20170807_page2_portrait5.png","http://r.51gjj.com/act/release/img/20170807_page2_portrait6.png"],i=["http://r.51gjj.com/act/release/img/20170807_page2_portrait1.png","http://r.51gjj.com/act/release/img/20170807_page2_portrait2.png","http://r.51gjj.com/act/release/img/20170807_page2_portrait3.png"];"男"==a.analyze1.gender?(e(".portrait").empty(),t.src=n[Math.floor(Math.random()*n.length)]):(e(".portrait").empty(),t.src=i[Math.floor(Math.random()*i.length)]),e(".portrait").append(t)},getNumberImage:function(a,t){var n=a.toString();e("."+t+" .div-container").empty();for(var i=0;len1=n.length,len1>i;i++){var o=new Image,r=e("<div class='img-wrap"+i+"'></div>");r.append(o);for(var l=0;i>=l;l++)o.src="http://r.51gjj.com/act/release/img/"+n[l]+"_new.png",e("."+t+" .div-container").append(r)}e(".div-container div img").css({width:".42rem",height:".68rem",padding:".02rem"}),e(".page7 .div-container").append("<span class='ming'>元</span>")},showData:function(a){for(var t={ele:[".page2 .detail1 span:first-child",".page2 .gjj_number div:first-child span",".page2 .detail2 span:nth-child(2)",".page2 .detail2 span:last-child",".page2 .dynamic-text span",".page3 .detail3 > div:first-child span:nth-child(2)",".page3 .detail3 > div:nth-child(2) span",".page3 .detail3 span:nth-child(4)",".page3 .detail3 .diff-year",".page3 .detail4 span:nth-child(2)",".page4 .detail5 .name",".page4 .detail5 .gender",".page4 .detail5 .female-ranking",".page4 .detail6 .male-ranking",".page5 .detail10 .company_count",".page5 .detail10 .name",".page6 .detail7-1 .name",".page7 .detail8 div:first-child span",".page4 .detail5 .age"],data:[a.name+"的公积金",a.analyze1.city+"缴纳公积金人口基数",a.analyze1.ranking_p+"%",a.analyze1.city+"人",a.analyze1.text,a.analyze2.year,a.name+"第一次缴纳公积金",a.analyze2.month,a.analyze2.diff_year,a.analyze2.city,a.name,"的"+a.analyze3.gender+"性",a.analyze3.ranking_p_female+"%",a.analyze3.ranking_p_male+"%",a.analyze4.company_count,"争着为"+a.name+"缴公积金",a.name+"的公积金可以",a.name+"的公积金可以拥有",a.analyze3.age]},n=0;n<t.ele.length;n++)e(t.ele[n]).html(""),e(t.ele[n]).text(t.data[n]);if(null==a.analyze3.age||0==a.analyze3.age)e(".page4 .detail5 .age").text(""),e(".page4 .detail5 .age").text("社会人");else{e(t.ele[".page4 .detail5 .age"]).text(t.data[a.analyze3.age]);var i=e(".page4 .hou");e(".page4 .detail5 .age").after(e("<span class='hou'>后</span>")),i.length>=1&&(e(".page4 .detail5 .age").siblings().not(":first").remove(),e(".page4 .detail5 .age").after(e("<span class='hou'>后</span>")))}e(".page4 .detail6 .gender").text("女"===a.analyze3.gender?"的男性":"的女性")},getAnalyzingData:function(e){var a=this;a.showData(e),a.getNumberImage(e.analyze6.loanable_amount,"page7"),a.getPage6Text(e.analyze5.text)},getPage6Text:function(a){var t=a.split("|");console.log(t);for(var n=0;len=t.length,len>n;n++)e(".page6 .text"+(n+1)).text(t[n].match(/\S+/))},getQueryStringArgs:function(){for(var e=location.search.length>0?location.search.substring(1):0,a=e.length>0?e.split("&"):[],t=null,n=null,i=null,o=a.length,r={},l=0;o>l;l++)t=a[l].split("="),n=decodeURIComponent(t[0]),i=decodeURIComponent(t[1]),n.length&&(r[n]=i);return r},getAnalysisData:function(e){var a=this;a.createPortrait(e.ret),a.getAnalyzingData(e.ret)},handleProcess:function(a){var t=this;0==a.ret.show?(o.show("查询公积金后，才能解析你的公积金秘密噢~"),setTimeout(function(){window.location.href=a.ret.url+"?page=query"},1500)):(r.show(),e(".tp-analyzing").fadeIn(),e(".sweat").fadeIn(),setTimeout(function(){r.hide(),e(".tp-analyzing").fadeOut(),e(".sweat").fadeOut(),t.getAnalysisData(a),t.fullPageObj.moveTo(1,!0)},1e3))},changeState:function(e){window.history.pushState&&window.history.pushState({title:e},e,"index.php?unionid="+unionid+"&shareid="+shareid+"#page="+e)},respondState:function(e,a,t,o){var r=this,l=n.Tool.userAgent();i&&l.isGjj?i.onBack(function(){return"page1"==e?!1:(t?r.fullPageObj.moveTo(a,!0):r.fullPageObj.moveTo(a),o&&o(),!0)}):window.onpopstate=function(){t?(console.log(r.fullPageObj),r.fullPageObj.moveTo(a,!0)):r.fullPageObj.moveTo(a),o&&o()}},share:function(){var e=navigator.userAgent,a={mobile:!!e.match(/AppleWebKit.*Mobile.*/),isAndroid:e.indexOf("Android")>-1||e.indexOf("Linux")>-1||e.indexOf("android")>-1,isiOS:/[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),webApp:-1==e.indexOf("Safari"),weixin:e.indexOf("MicroMessenger")>-1,isGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(e)||/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),isAndroidGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(e),isiOSGjj:/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),isGjjFdjsq:/^android\/[\w\W]+client\/[\w\W]+category\/51fdjsq$/.test(e)},t=window.location.host;return a.isGjj&&i&&i.action("quickIcon",{thumb:"https://r.51gjj.com/image/static/ico_title_share_white.png",onclick:function(){i.action("ShareTimeline",{title:"要不是和你铁，这份公积金档案也不会发给你！",desc:"点击查看我的公积金秘密。",thumb:"https://r.51gjj.com/act/release/img/20170807_new_share.png",link:"https://"+t+"/act/home/huodong/20170807/index.php?shareid="+newShareId})}}),this},share2:function(){var e=navigator.userAgent,a={mobile:!!e.match(/AppleWebKit.*Mobile.*/),isAndroid:e.indexOf("Android")>-1||e.indexOf("Linux")>-1||e.indexOf("android")>-1,isiOS:/[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),webApp:-1==e.indexOf("Safari"),weixin:e.indexOf("MicroMessenger")>-1,isGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(e)||/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),isAndroidGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(e),isiOSGjj:/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),isGjjFdjsq:/^android\/[\w\W]+client\/[\w\W]+category\/51fdjsq$/.test(e)},t=window.location.host;return a.isGjj&&i&&i.action("ShareTimeline",{title:"要不是和你铁，这份公积金档案也不会发给你！",desc:"点击查看我的公积金秘密。",thumb:"https://r.51gjj.com/act/release/img/20170807_new_share.png",link:"https://"+t+"/act/home/huodong/20170824/index.php?shareid="+newShareId}),this}};l.start()});