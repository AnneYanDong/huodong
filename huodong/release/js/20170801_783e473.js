require.config(requireConfig),require(["jquery","fastClick","FullPage","ct","bridge","juicer"],function(e,a,t,n,o,l){var i=(e(".mask"),Object.create(n.Prompt));i.create().build();var s=Object.create(n.Mask);s.create().build();n.Tool.local();n.Tool.buryPoint();var r,c=[],g=[],u=[],d=null,p=[],m=null,h=[],f=null,v=[],b={iconName:[],start:function(){var t=this;a.attach(document.body),n.Tool.setFont(),n.Tool.handleBottomStatusBar(),window.addEventListener("resize",n.Tool.debounce(n.Tool.setFont)),window.addEventListener("resize",n.Tool.debounce(n.Tool.handleBottomStatusBar));var o=Object.create(n.PreLodingUi);o.create({preLoadingCls:"loading-bg-color",loadingEleCls:"loading-ele-color"}).build(),n.Tool.imgPreLoad({callback:function(){this.hintLog("图片加载完成");var e=null;clearTimeout(e),e=setTimeout(function(){o.hide(),t.init()},500)}}),e.ajax({type:"POST",dataType:"JSON",url:n.Tool.url("/app/request/activity"),data:JSON.stringify({place_cid:n.Tool.userAgent().isGjj?1:0,tag:"进入页面"+projectName}),success:function(e){e.success}})},init:function(){console.log("私人订制活动");var a=this;e(".wp").removeClass("hide"),a.fullPageObj=a.fullpage()},fullpage:function(){var a=this,t=document.getElementsByClassName("wp-inner")[0].fullpage({start:0,beforeChange:function(e){var t="page"+(e.next+1);console.log("now",t),a.changeState(t)},afterChange:function(t){a.fullPageObj.stop();var n="page"+(t.cur+1);if("page1"==n&&(e(".page1 li").removeClass("bounce-out"),e(".page1 li").unbind().on("click",function(){var t=e(this);t.attr("disabled","disabled"),g=t.data("loan-total"),u.length=0,u.push(g),console.log("loanTotal",u);var n=null;clearTimeout(n),n=setTimeout(function(){t.addClass("bounce-out"),clearTimeout(n),n=setTimeout(function(){a.fullPageObj.moveTo(1,!0),t.removeAttr("disabled")},1200)},200)}),a.respondState(n)),"page2"==n&&(e(".page1 li").removeClass("bounce-out").removeAttr("disabled"),e(".page2 li").unbind().on("click",function(){var t=e(this);t.attr("disabled","disabled");var n=null;clearTimeout(n),n=setTimeout(function(){t.addClass("bounce-out"),clearTimeout(n),n=setTimeout(function(){a.fullPageObj.moveTo(2,!0)},1200)},200),d=t.data("loan-time"),p.length=0,p.push(d),console.log("点击时time:",p)}),a.respondState(n,0,!0,function(){console.log("返回第一页"),e(".page1 li").removeClass("bounce-out"),u.length=0,g=null,console.log("返回时loanTotal:",u)})),"page3"==n&&(e(".page3 li").unbind().on("click",function(){var t=e(this);t.attr("disabled","disabled");var n=null;clearTimeout(n),n=setTimeout(function(){t.addClass("bounce-out"),clearTimeout(n),n=setTimeout(function(){a.fullPageObj.moveTo(3,!0)},1200)},200),m=t.data("loan-release"),h.length=0,h.push(m)}),a.respondState(n,1,!0,function(){console.log("返回第二页"),e(".page2 li").removeClass("bounce-out").removeAttr("disabled"),p.length=0,d=null})),"page4"==n&&(e(".page4 .circle div").unbind().on("click",function(){var t=e(this);t.attr("disabled","disabled"),f=t.data("loan-focus"),v.length=0,v.push(f),c.length=0,c.push(u,p,h,v);var n=null;clearTimeout(n),n=setTimeout(function(){t.addClass("circle-rotating"),clearTimeout(n),n=setTimeout(function(){a.getAnalysisData()},1200)},200)}),a.respondState(n,2,!0,function(){console.log("返回第三页"),e(".page3 li").removeClass("bounce-out").removeAttr("disabled"),h.length=0,m=null})),"page5"==n){var o=r;e(".page5 .loan-match span").addClass("progress"),e(".page5 .final-loan").unbind().on("click",".final-loan,.finger-box",function(){e(".page5 .final-loan").attr("bp",o.name),e(".page5 .final-loan").attr("title",o.name),e(".page5 .finger-box").attr("bp",o.name),e(".page5 .finger-box").attr("title",o.name),e(this).attr("disabled","disabled"),e(".page5 .finger").addClass("hide").removeClass("move"),e(".page5 .fingerprint").removeClass("hide"),e(".page5 .finger-scan").removeClass("hide").addClass("finger-scaning"),setTimeout(function(){console.log("dataObj",o),window.location.href=o.url,e(".page5 .fingerprint").addClass("hide"),e(".page5 .finger-scan").addClass("hide").removeClass("finger-scaning")},1e3)}),e(".page5 .content").unbind().on("click",".test-btn",function(){e(".page5 .content .test-btn").attr("disabled","disabled"),timer=setTimeout(function(){a.fullPageObj.moveTo(0,!0),e(".page5 .content .test-btn").removeAttr("disabled"),u.length=0,g=null,p.length=0,d=null,h.length=0,m=null,v.length=0,f=null,c.length=0,e(".page1 li").removeClass("bounce-out"),e(".page2 li").removeClass("bounce-out"),e(".page3 li").removeClass("bounce-out"),e(".page4 .circle div").removeClass("circle-rotating"),e(".page4 .customization-tp").hide(),e(".page5 .loan-match span").removeClass("progress"),e(".page5 .icon-box").html(""),e(".page5 .loan-name").html(""),e(".page5 .loan-match").html(""),e(".page5 .loan-amount").html(""),e(".page5 .day-rate").html(""),e(".page5 .release-time").html(""),e(".page5 .finger").removeClass("hide").addClass("move"),e(".page5 .fingerprint").addClass("hide"),e(".page5 .finger-scan").addClass("hide").removeClass("finger-scaning")},500)}),a.respondState(n,3,!0,function(){console.log("返回第四页"),e(".page4 .circle div").removeClass("circle-rotating").removeAttr("disabled"),e(".page5 .loan-match span").removeClass("progress"),e(".page5 .finger").removeClass("hide").addClass("move"),e(".page5 .fingerprint").addClass("hide"),e(".page5 .finger-scan").addClass("hide").removeClass("finger-scaning"),v.length=0,f=null,c.length=0,e(".page4 .customization-tp").hide()})}}});return t},showAnalyzeProcess:function(a){var t=this;e(".page4 .analyzing-process div.span"+a).removeClass("hide").addClass("analyzing"),console.log("counter:",a),5>a&&setTimeout(function(){t.showAnalyzeProcess(a+1)},500)},getAnalysisData:function(){var a=this;console.log("请求传递的数据：",c),e.ajax({type:"POST",dataType:"JSON",data:JSON.stringify(c),url:"/act/act170801/get_button",success:function(t){t.success?(r=t.ret.data,console.log("data->",r),1==r.sex&&(e(".page4 .customization-tp").fadeIn(),a.showAnalyzeProcess(0),a.showIcon(),a.getLoanInfo(),setTimeout(function(){a.fullPageObj.moveTo(4,!0),e(".page4 .analyzing-process div").removeClass("analyzing").addClass("hide")},5e3)),2==r.sex&&(e(".page4 .customization-tp .male").hide(),e(".page4 .customization-tp").fadeIn(),e(".page4 .customization-tp .female").show(),a.showAnalyzeProcess(0),a.showIcon(),a.getLoanInfo(),setTimeout(function(){a.fullPageObj.moveTo(4,!0),e(".page4 .analyzing-process div").removeClass("analyzing").addClass("hide")},5e3))):i.show(t.msg||"出错了请重试")}})},changeState:function(e){window.history.pushState&&window.history.pushState({title:e},e,"index.php#page="+e)},respondState:function(e,a,t,l){var i=this,s=n.Tool.userAgent();o&&s.isGjj?o.onBack(function(){return"page1"==e?!1:(t?i.fullPageObj.moveTo(a,!0):i.fullPageObj.moveTo(a),l&&l(),!0)}):window.onpopstate=function(){t?(console.log(i.fullPageObj),i.fullPageObj.moveTo(a,!0)):i.fullPageObj.moveTo(a),l&&l()}},showIcon:function(){var a=r.show.length;console.log("len->",a),e(".page5 .icon-box").html("");for(var t=0;a>t;t++){var n=document.createElement("li"),o=document.createElement("img"),l=document.createElement("span");n.append(o),n.append(l),e(".icon-box").append(n),l.innerHTML=r.show[t],"小额度"==l.innerHTML&&(o.src="http://r.51gjj.com/act/release/img/20170801_xed.png"),"放款快"==l.innerHTML&&(o.src="http://r.51gjj.com/act/release/img/20170801_fkk.png"),"分期长"==l.innerHTML&&(o.src="http://r.51gjj.com/act/release/img/20170801_fqc.png"),"急用钱"==l.innerHTML&&(o.src="http://r.51gjj.com/act/release/img/20170801_jyq.png"),"精明派"==l.innerHTML&&(o.src="http://r.51gjj.com/act/release/img/20170801_jmp.png"),"大额度"==l.innerHTML&&(o.src="http://r.51gjj.com/act/release/img/20170801_ded.png")}},getLoanInfo:function(){var a=e("#tpl-loan-name").html(),t=l(a,r);e(".page5 .loan-name").html(""),e(".page5 .loan-name").append(t);var n=e("#tpl-loan-match").html(),o=l(n,r);e(".page5 .loan-match").html(""),e(".page5 .loan-match").append(o);var i=e("#tpl-loan-amount").html(),s=l(i,r);e(".page5 .loan-amount").html(""),e(".page5 .loan-amount").append(s);var c=e("#tpl-day-rate").html(),g=l(c,r);e(".page5 .day-rate").html(""),e(".page5 .day-rate").append(g);var u=e("#tpl-release-time").html(),d=l(u,r);e(".page5 .release-time").html(""),e(".page5 .release-time").append(d)}};b.start()});