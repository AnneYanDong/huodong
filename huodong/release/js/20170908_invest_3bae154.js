require.config(requireConfig),require(["jquery","fastClick","FullPage","ct","bridge","juicer","qrcode"],function(e,t,o,n){function i(e){var t=e.split("?"),o={};if(t[1]){t[1]=t[1].split("#")[0];for(var n=t[1].split("&"),i=0;i<n.length;++i){var c=n[i].split("="),a=decodeURIComponent(c[0]),r=decodeURIComponent(c[1]);o[a]=r}}return o}var c=(e(".mask"),Object.create(n.Prompt));c.create().build();var a=Object.create(n.Mask);a.create().build();n.Tool.local(),window.location.host;n.Tool.buryPoint_v2(n.Tool.userAgent().isGjj?1:0);var r={start:function(){var o=this;t.attach(document.body),n.Tool.setFont(),window.addEventListener("resize",n.Tool.debounce(n.Tool.setFont));var i=Object.create(n.PreLodingUi);i.create({preLoadingCls:"loading-bg-color",loadingEleCls:"loading-ele-color"}).build(),n.Tool.imgPreLoad({callback:function(){this.hintLog("图片加载完成");var e=null;clearTimeout(e),e=setTimeout(function(){i.hide(),o.init()},500)}}),e.ajax({type:"POST",dataType:"JSON",url:n.Tool.url("/act/request/activity"),data:JSON.stringify({source:n.Tool.userAgent().isGjj?1:0,tag:"20170908_1_0_0_理财被邀请人页面"}),success:function(e){1==e.success}})},init:function(){var t=this;e(".wp").removeClass("hide"),t.openRule(),t.closeRule(),t.getCode(),t.searchClick(),t.render()},render:function(){var t=i(window.location.href).phone;e(".tips-phone p span").text(t)},openRule:function(){e(".btn-rule").on("click","span",function(){a.show(),e(".rule").fadeIn()})},closeRule:function(){e("body").on("click",".btn-close",function(){e(".rule").fadeOut(function(){a.hide()})})},getCode:function(){_this=this,e(".JS-get-code").on("click",function(){if(_this.checkPhone(e(".JS-phone"))){var t=e(".JS-phone").val();e.ajax({url:"/act/market/get_verification_code",type:"POST",dataType:"JSON",data:JSON.stringify({phone:t}),success:function(t){t.success===!0?(c.show("短信验证码已发送，请注意查收"),_this.timeDown(e(".JS-get-code"),60)):(e(".JS-get-code").removeClass("timing"),c.show(t.msg||"出错了，请重试"))},error:function(t){e(".JS-get-code").removeClass("timing"),c.show("发生错误"+t+"，请重试")}})}})},searchClick:function(){var t=this,o="/act/market/get_invitation_register";e(".btn-submit").on("click",function(){if(t.checkPhone(e(".JS-phone"))&&t.checkCode(e(".JS-code"))){var n=e(".JS-phone").val(),i=e(".JS-code").val();e.ajax({type:"POST",url:o,dataType:"JSON",data:JSON.stringify({phone:n,code:i}),success:function(e){e.success===!0?window.location.href="http://d.51gjj.com/":c.show(512==e.code?"您已经注册过，不能太贪心哦～":e.msg||"出错了，请重试")},error:function(e){c.show("发生错误"+e+"，请重试")}})}})},checkPhone:function(e){var t=/^1\d{10}$/,o=e.val();return t.test(o)?!0:void c.show("请输入正确的手机号！")},checkCode:function(e){var t=e.val();return""!=t?!0:void c.show("验证码错误或未输入")},timeDown:function(t,o){if(t.hasClass("timing"))return!1;clearInterval(n),t.text(o+"s"),t.addClass("timing"),t.parent().append(e("<div class='code-mark'></div>"));var o=o-1,n=setInterval(function(){t.text(o+"s"),o--,0>o&&(clearInterval(n),e(".code-mark").remove(),t.removeClass("timing"),t.text("获取验证码"))},1e3)}};r.start()});