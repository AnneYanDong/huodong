require.config(requireConfig),require(["jquery","fastClick","lucky-card","ct","bridge","juicer","marquee"],function(e,t,o,n){var a=(e(".mask"),Object.create(n.Prompt));a.create().build();var i=Object.create(n.Mask);i.create().build();n.Tool.local();n.Tool.buryPoint();var l=((new Date).getDay(),{status:{login:!1,msg:""},charge:{loan:null,type:null,pay:null},start:function(){var o=this;t.attach(document.body),n.Tool.setFont(),n.Tool.handleBottomStatusBar(),window.addEventListener("resize",n.Tool.debounce(n.Tool.setFont)),window.addEventListener("resize",n.Tool.debounce(n.Tool.handleBottomStatusBar));var a=Object.create(n.PreLodingUi);a.create({preLoadingCls:"loading-bg-color",loadingEleCls:"loading-ele-color"}).build(),n.Tool.imgPreLoad({callback:function(){this.hintLog("图片加载完成");var e=null;clearTimeout(e),e=setTimeout(function(){a.hide(),o.init()},500)}}),e.ajax({type:"POST",dataType:"JSON",url:n.Tool.url("/app/request/activity"),data:JSON.stringify({place_cid:n.Tool.userAgent().isGjj?1:0,tag:"进入页面"+projectName}),success:function(e){1==e.success}})},init:function(){var t=this;e(".wp").removeClass("hide"),t.apply(),t.openRule(),t.closeRule()},apply:function(){e(".btn_sub").on("click",function(){console.log("...");var t=JSON.stringify({type:1});e.ajax({type:"POST",dataType:"JSON",url:n.Tool.url("/act/act170411/get_url"),data:t,success:function(e){if(1==e.success){a.show(1==e.ret.msgType?"恭喜您领券成功！立享极速放款":2==e.ret.msgType?"您已领券，直接体验极速放款":3==e.ret.msgType?"在APP里面申请体验更佳！":"出错请重试");var t;clearTimeout(t),t=setTimeout(function(){window.location.href=e.ret.url},2e3)}else a.show(403==e.code?"请先登录哦...":e.msg||"出错请重试")}})})},changeState:function(e){window.history.pushState&&window.history.pushState({title:e},e,"index.php#page="+e)},openRule:function(){e(".content").on("click",".rule-btn",function(){i.show(),e(".rule").fadeIn()})},closeRule:function(){e("body").on("click",".btn-close",function(){e(".rule").fadeOut(function(){i.hide()})})}});l.start()});