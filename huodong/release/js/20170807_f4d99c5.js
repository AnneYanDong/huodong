require.config(requireConfig),require(["jquery","fastClick","FullPage","ct","bridge","juicer"],function(e,o,t,a,n){var l=(e(".mask"),Object.create(a.Prompt));l.create().build();var i=Object.create(a.Mask);i.create().build();a.Tool.local();a.Tool.buryPoint();var s={start:function(){var e=this;o.attach(document.body),a.Tool.setFont(),a.Tool.handleBottomStatusBar(),window.addEventListener("resize",a.Tool.debounce(a.Tool.setFont)),window.addEventListener("resize",a.Tool.debounce(a.Tool.handleBottomStatusBar));var t=Object.create(a.PreLodingUi);t.create({preLoadingCls:"loading-bg-color",loadingEleCls:"loading-ele-color"}).build(),a.Tool.imgPreLoad({callback:function(){this.hintLog("图片加载完成");var o=null;clearTimeout(o),o=setTimeout(function(){t.hide(),e.init()},500)}})},init:function(){console.log("解析你的公积金活动");var o=this;e(".wp").removeClass("hide"),o.fullPageObj=o.fullpage()},BuryRequest:function(o){console.log("埋点：",o);e.ajax({type:"POST",dataType:"JSON",url:a.Tool.url("/app/request/activity"),data:JSON.stringify({source:a.Tool.userAgent().isGjj?1:0,tag:"20170807_page_1_0_next"}),success:function(e){e.success}})},fullpage:function(){var o=this,t=document.getElementsByClassName("wp-inner")[0].fullpage({start:0,beforeChange:function(e){var t="page"+(e.next+1);console.log("now",t),o.changeState(t)},afterChange:function(t){var n=null;clearTimeout(n),o.fullPageObj.stop();var l="page"+(t.cur+1);"page1"==l&&(e(".page1").on("click",".img-btn",function(){e.ajax({type:"POST",dataType:"JSON",url:a.Tool.url("/app/request/activity"),data:JSON.stringify({source:a.Tool.userAgent().isGjj?1:0,tag:"20170807_page1_1_0_开始解析"}),success:function(e){e.success}}),i.show(),e(".tp-analyzing").fadeIn(),e(".sweat").fadeIn(),n=setTimeout(function(){i.hide(),e(".tp-analyzing").fadeOut(),e(".sweat").fadeOut(),o.fullPageObj.moveTo(1,!0)},3e3)}),o.respondState(l)),"page2"==l&&(e(".page2").on("click",".next",function(){o.BuryRequest(l),o.fullPageObj.moveTo(2,!0)}),o.respondState(l,0,!0,function(){console.log("返回第一页")})),"page3"==l&&(e(".page3").on("click",".next",function(){o.BuryRequest(l),o.fullPageObj.moveTo(3,!0)}),o.respondState(l,1,!0,function(){console.log("返回第二页")})),"page4"==l&&(e(".page4").on("click",".next",function(){o.BuryRequest(l),o.fullPageObj.moveTo(4,!0)}),o.respondState(l,2,!0,function(){console.log("返回第三页")})),"page5"==l&&(e(".page5").on("click",".next",function(){o.BuryRequest(l),o.fullPageObj.moveTo(5,!0)}),o.respondState(l,3,!0,function(){console.log("返回第四页")})),"page6"==l&&(e(".page6").on("click",".next",function(){o.BuryRequest(l),o.fullPageObj.moveTo(6,!0)}),o.respondState(l,3,!0,function(){console.log("返回第五页")})),"page7"==l&&(o.BuryRequest(l),o.respondState(l,3,!0,function(){console.log("返回第六页")}))}});return t},getAnalysisData:function(){var o=this;console.log("请求传递的数据：",loan),e.ajax({type:"POST",dataType:"JSON",data:JSON.stringify(loan),url:"/act/act170801/get_button",success:function(t){t.success?(data=t.ret.data,console.log("data->",data),1==data.sex&&(e(".page4 .customization-tp").fadeIn(),o.showAnalyzeProcess(0),o.showIcon(),o.getLoanInfo(),setTimeout(function(){o.fullPageObj.moveTo(4,!0),e(".page4 .customization-tp").fadeOut(),e(".page4 .analyzing-process div").removeClass("analyzing").addClass("hide")},2e3))):l.show(t.msg||"出错了请重试")}})},changeState:function(e){window.history.pushState&&window.history.pushState({title:e},e,"index.php#page="+e)},respondState:function(e,o,t,l){var i=this,s=a.Tool.userAgent();n&&s.isGjj?n.onBack(function(){return"page1"==e?!1:(t?i.fullPageObj.moveTo(o,!0):i.fullPageObj.moveTo(o),l&&l(),!0)}):window.onpopstate=function(){t?(console.log(i.fullPageObj),i.fullPageObj.moveTo(o,!0)):i.fullPageObj.moveTo(o),l&&l()}}};s.start()});