require.config(requireConfig),require(["jquery","fastClick","lucky-card","ct","bridge","juicer","marquee"],function(t,e,n,o,i,a){var c=(t(".mask"),Object.create(o.Prompt));c.create().build();var s=Object.create(o.Mask);s.create().build();o.Tool.local();o.Tool.buryPoint();var l=((new Date).getDay(),null),d=[],r=0,u=null;clearInterval(u);var p={status:{login:!1,msg:""},charge:{loan:null,type:null,pay:null},start:function(){var n=this;e.attach(document.body),o.Tool.setFont(),o.Tool.handleBottomStatusBar(),window.onresize=o.Tool.debounce(o.Tool.setFont);var i=Object.create(o.PreLodingUi);i.create({preLoadingCls:"loading-bg-color",loadingEleCls:"loading-ele-color"}).build(),l=o.Tool.userAgent(),o.Tool.imgPreLoad({callback:function(){this.hintLog("图片加载完成");var t=null;clearTimeout(t),t=setTimeout(function(){i.hide(),n.init()},500)}}),t.ajax({type:"POST",dataType:"JSON",url:o.Tool.url("/app/request/activity"),data:JSON.stringify({place_cid:o.Tool.userAgent().isGjj?1:0,tag:"进入页面"+projectName}),success:function(t){t.success}})},init:function(){var e=this;t(".wp").removeClass("hide"),e.checkWithDrawAmount(),e.getCustStatus(),clearInterval(u),e.withDraw(),e.openRule(),e.closeRule(),e.share(),console.log("周末提款机")},getCustStatus:function(){var e=this;t.ajax({type:"POST",dataType:"JSON",url:"/act/act170725/get_status",success:function(t){if(console.log("进入页面的请求d->",t),t.success){var t=t.ret;e.getCustType(t,t.type)}else c.show(t.msg||"活动尚未开始")}})},showMoney:function(){var e=r%5;if(0===e)for(var n=0;4>n;n++)t(".dynamic-money .money"+(n+1)).addClass("hide");else for(var o=0;e>o;o++)t(".dynamic-money .money"+(o+1)).removeClass("hide");r++},checkAmount:function(t){var t=t,e=/^[1-7]{1}\d{0,4}$|^[8-9]{1}\d{0,3}$|^8(0)(0)(0)(0)$/;return e.test(t)?!0:(c.show("请输入1~80000整数"),!1)},checkWithDrawAmount:function(){var e=this;t(".atm-total-input input").keyup(function(){var n=Number(t(this).val());e.checkAmount(n),setTimeout(function(){t(".atm-content .finger-box").show().addClass("hint")},500)})},getCustLabel:function(){t(".atm-content ul").on("click","li.btn",function(){var e=this;t(this).toggleClass("down"),setTimeout(function(){t(e).toggleClass("up"),t(".atm-content ul div").toggleClass("bgColor")},300);var n=t(e).data("purpose");t(e).is(".down")?d.push(n):d.pop(t(e).data("purpose")),console.log("purpose:",d)})},backToOrigin:function(){t(".withdraw-btn").removeAttr("disabled"),t(".atm-total-input input").val(""),d.length=0,t(".atm-usage ul li.btn").removeClass("down").removeClass("up").addClass(".btn"),t(".atm-usage ul .div").removeClass("bgColor").addClass(".div"),t("#money").removeClass("money").addClass("hide")},getCustType:function(e,n){console.log(e);var o=this;switch(n){case 1:setTimeout(function(){t("#money").removeClass("money").addClass("hide"),s.show(),t(".tp-hide1").fadeIn(),t(".content .tp-jk").fadeIn(),t(".content .tp-apply-btn").fadeIn(),t(".content").on("click",".tp-hide1",function(){t(".content .tp-hide1").fadeOut(),t(".content .tp-jk").fadeOut(),t(".content .tp-apply-btn").fadeOut(),s.hide(),o.backToOrigin()}),t(".content").on("click",".tp-apply-btn",function(){window.location.href=e.url})},500);break;case 2:setTimeout(function(){t("#money").removeClass("money").addClass("hide"),s.show(),t(".tp-hide2").fadeIn(),t(".content .tp-jy").fadeIn(),t(".content .tp-apply-btn").fadeIn(),t(".content").on("click",".tp-hide2",function(){t(".content .tp-hide2").fadeOut(),t(".content .tp-jy").fadeOut(),t(".content .tp-apply-btn").fadeOut(),s.hide(),o.backToOrigin()}),t(".content").on("click",".tp-apply-btn",function(){window.location.href=e.url})},500);break;case 3:setTimeout(function(){t("#money").removeClass("money").addClass("hide"),s.show(),t(".tp-hide3").fadeIn(),t(".content .tp-ja").fadeIn(),t(".content .tp-apply-btn").fadeIn(),t(".dynamic-money img").addClass("hide"),t(".content").on("click",".tp-hide3",function(){t(".content .tp-hide3").fadeOut(),t(".content .tp-ja").fadeOut(),t(".content .tp-apply-btn").fadeOut(),s.hide(),o.backToOrigin()}),t(".content").on("click",".tp-apply-btn",function(){window.location.href=e.url})},500);break;case 4:setTimeout(function(){t("#money").removeClass("money").addClass("hide"),s.show(),t(".tp-hide4").fadeIn(),t(".content .tp-jh").fadeIn(),t(".content .tp-apply-btn").fadeIn(),t(".dynamic-money img").addClass("hide"),t(".content").on("click",".tp-hide4",function(){t(".content .tp-hide4").fadeOut(),t(".content .tp-jh").fadeOut(),t(".content .tp-apply-btn").fadeOut(),s.hide(),o.backToOrigin()}),t(".content").on("click",".tp-apply-btn",function(){window.location.href=e.url})},500)}},withDraw:function(){clearInterval(u);var e=this;e.getCustLabel(),t(".atm-content").on("click",".withdraw-btn",function(){t(".withdraw-btn").attr("disabled","disabled"),console.log(d),t(".atm-content .finger-box").fadeOut();var n=t(".atm-total-input input").val();t.ajax({type:"POST",dataType:"JSON",data:JSON.stringify({money:n,purpose:d}),url:"/act/act170725/get_button",success:function(n){if(n.success){var n=n.ret;if(n.is_weChat||n.is_qq)setTimeout(function(){window.location.href=n.url},1500);else if(n.login){switch(t("#money").removeClass("hide").addClass("money"),console.log(n),n.type){case 0:case 5:clearInterval(u),t(".dynamic-money img").addClass("hide"),c.show("暂不符合活动规则，去看看其他"),setTimeout(function(){window.location.href=n.url},1500);break;case 6:clearInterval(u),t(".dynamic-money img").addClass("hide"),c.show("提款机余额不足，去试试其他"),setTimeout(function(){window.location.href=n.url},1500)}e.getCustType(n,n.type)}else i&&i.action("login")}else c.show(n.msg||"出错了请重试"),e.backToOrigin()}}),t(".withdraw-btn").removeAttr("disabled")})},openRule:function(){t(".wp-inner").on("click",".rule-btn",function(){s.show();var e=t("#tpl-rule").html(),n=a(e,h);t("body").append(n),t(".rule").fadeIn()})},closeRule:function(){t("body").on("click",".btn-close",function(){t(".rule").fadeOut(function(){s.hide()})})},share:function(){var t=navigator.userAgent,e={mobile:!!t.match(/AppleWebKit.*Mobile.*/),isAndroid:t.indexOf("Android")>-1||t.indexOf("Linux")>-1||t.indexOf("android")>-1,isiOS:/[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(t),webApp:-1==t.indexOf("Safari"),weixin:t.indexOf("MicroMessenger")>-1,isGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(t)||/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(t),isAndroidGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(t),isiOSGjj:/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(t),isGjjFdjsq:/^android\/[\w\W]+client\/[\w\W]+category\/51fdjsq$/.test(t)},n=window.location.host;return e.isGjj&&i&&i.action("quickIcon",{thumb:"https://r.51gjj.com/image/static/ico_title_share_dark.png",onclick:function(){i.action("ShareTimeline",{title:"抢个红包过周末",desc:"利息5折、现金、实物...",thumb:"https://r.51gjj.com/act/release/img/20170725_weChat_share.png",link:"http://"+n+"/act/home/huodong/20170725/index.php"})}}),this}},h={rule:["领券后，通过活动页面完成申请或放款将获得特定奖励，同个业务奖励只能领取一次。","领券后申请金优贷，每日前100名将获得精美定制笔记本一份；领券后申请金卡贷并放款，享受当月利息下调50%；领券后申请金安贷24小时未放款，获得超时赔付50元现金；领券后申请金花贷并放款，获得50元无门槛抵息券。","此活动针对从未申请过金花贷、金优贷、金卡贷、金安贷业务的新用户，一个用户至多领取到这4个业务对应的奖励。","抵息券将在首月还款直接减免，逾期、提前还款将不享受此优惠；现金/实物奖励将在用户信息完整后7个工作日内打款/寄出，请确认收款/收货信息准确性。","有任何疑问或者帮助可联系客服4008635151。","本商品由51公积金管家提供，与设备生产商Apple Inc.公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。"]};p.start()});