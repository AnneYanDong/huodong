require.config(requireConfig),require(["jquery","fastClick","lucky-card","ct","bridge","juicer","marquee","number"],function(e,t,o,n,i){var c=(e(".mask"),Object.create(n.Prompt));c.create().build();var s=Object.create(n.Mask);s.create().build();n.Tool.local();n.Tool.buryPoint();var r=((new Date).getDay(),null),a={start:function(){var o=this;t.attach(document.body),n.Tool.setFont(),n.Tool.handleBottomStatusBar(),window.addEventListener("resize",n.Tool.debounce(n.Tool.setFont)),window.addEventListener("resize",n.Tool.debounce(n.Tool.handleBottomStatusBar));var i=Object.create(n.PreLodingUi);i.create({preLoadingCls:"loading-bg-color",loadingEleCls:"loading-ele-color"}).build(),r=n.Tool.userAgent(),n.Tool.imgPreLoad({callback:function(){this.hintLog("图片加载完成");var e=null;clearTimeout(e),e=setTimeout(function(){i.hide(),o.init()},500)}}),e.ajax({type:"POST",dataType:"JSON",url:n.Tool.url("/app/request/activity"),data:JSON.stringify({place_cid:n.Tool.userAgent().isGjj?1:0,tag:"进入页面"+projectName}),success:function(e){1==e.success}})},init:function(){var t=this;e(".wp").removeClass("hide"),t.render(),t.openRule(),t.closeRule(),t.receive()},openRule:function(){e(".content").on("click",".rule-btn",function(){s.show(),e(".rule").fadeIn()})},closeRule:function(){e("body").on("click",".btn-close",function(){e(".rule").fadeOut(function(){s.hide()})})},render:function(){e.ajax({type:"POST",dataType:"JSON",url:"/act/act170627/get_judge",success:function(t){t.succ?1==t.res.light&&(e(".prize").css("color","#2e2e2e"),e(".content").append('<div class="seal30"></div><div class="seal50"></div><div class="seal70"></div>')):c.show(t.msg||"出错请重试")}})},receive:function(){var t=null;clearTimeout(t),e(".wp .content").on("click",".receive",function(){e.ajax({type:"POST",dataType:"JSON",url:"/act/act170627/get_status",success:function(o){o.succ?1==o.res.is_weChat?t=setTimeout(function(){c.show("已成功参加活动，立即享受优惠"),t=setTimeout(function(){window.location.href=o.res.url},1e3)},200):0==o.res.login?i&&i.action("login"):1==o.res.type?t=setTimeout(function(){c.show("您已有金e贷优惠券，先去使用吧"),t=setTimeout(function(){window.location.href=o.res.url},1e3)},200):2==o.res.type?t=setTimeout(function(){c.show("已成功参加活动，立即享受优惠"),t=setTimeout(function(){window.location.href=o.res.url},1e3)},200):3==o.res.type?t=setTimeout(function(){c.show("您已申请过，看看其他"),t=setTimeout(function(){window.location.href=o.res.url},1e3)},200):4==o.res.type?t=setTimeout(function(){e(".prize").css("color","#2e2e2e"),e(".content").append('<div class="seal30"></div><div class="seal50"></div><div class="seal70"></div>'),t=setTimeout(function(){window.location.href=o.res.url},1e3)},200):5==o.res.type?t=setTimeout(function(){c.show("已成功参加活动，立即享受优惠"),t=setTimeout(function(){window.location.href=o.res.url},1e3)},200):c.show(o.msg||"出错请重试"):c.show(o.msg||"出错请重试")}})})}};a.start()});