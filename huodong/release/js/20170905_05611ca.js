require.config(requireConfig),require(["jquery","fastClick","FullPage","ct","bridge","juicer","qrcode"],function(e,o,t,i,n){var c=(e(".mask"),Object.create(i.Prompt));c.create().build();var r=Object.create(i.Mask);r.create().build();var a=(i.Tool.local(),window.location.host);i.Tool.buryPoint_v2(0);var d={start:function(){var t=this;o.attach(document.body),i.Tool.setFont(),window.addEventListener("resize",i.Tool.debounce(i.Tool.setFont));var n=Object.create(i.PreLodingUi);n.create({preLoadingCls:"loading-bg-color",loadingEleCls:"loading-ele-color"}).build(),i.Tool.imgPreLoad({callback:function(){this.hintLog("图片加载完成");var e=null;clearTimeout(e),e=setTimeout(function(){n.hide(),t.init()},500)}}),e.ajax({type:"POST",dataType:"JSON",url:i.Tool.url("/act/request/activity"),data:JSON.stringify({source:i.Tool.userAgent().isGjj?1:0,tag:"20170901_1_0_0_进入页面"}),success:function(e){1==e.success}})},init:function(){var o=this;e(".wp").removeClass("hide"),o.showQrcode(),o.closeQrcode(),o.invite(),o.record()},showQrcode:function(){e.ajax({url:"/act/market/get_invitation_code",type:"POST",dataType:"JSON",success:function(o){if(o.success){var t=o.ret.invitation_code;if(console.log(o.ret.invitation_phone),document.getElementById("qrcode-show")){var i="https://"+a+"/act/home/huodong/20170908_invest/index.php?pcode="+t+"&channel=invest_invitation&phone="+o.ret.invitation_phone,r=new QRCode(document.getElementById("qrcode-show"),{width:100,height:100,colorDark:"#000000"});r.makeCode(i);var d=new QRCode(document.getElementById("qrcodeBig"),{width:e("#qrcodeBig").height(),height:e("#qrcodeBig").height(),colorDark:"#000000"});d.makeCode(i),e("#qrcode-show").on("click",function(o){e("#JS-code-show").show(),o.preventDefault()})}}else c.show(o.msg),setTimeout(function(){n&&n.action("login")},1e3)},error:function(e){c.show("发生错误"+e+"，请重试")}})},closeQrcode:function(){e("#JS-code-close").on("click",function(){e("#JS-code-show").hide()})},invite:function(){e(".invite_btn").on("click",function(){console.log("邀请码**"),e.ajax({url:"/act/market/get_invitation_code",type:"POST",dataType:"JSON",success:function(e){var o=e.ret.invitation_code;n.action("ShareTimeline",{title:"老司机带你赚钱，快来领18888元体验金",desc:"收益高达8.5%，新网银行监管，放心上车",thumb:"https://r.51gjj.com/act/release/img/20170905_wx_fx.png",link:"https://"+a+"/act/home/huodong/20170908_invest/index.php?pcode="+o+"&channel=invest_invitation&phone="+e.ret.invitation_phone})},error:function(e){c.show("发生错误"+e+"，请重试")}})})},record:function(){e(".invite-record-btn").on("click",function(){window.location.href="record.php"})}};d.start()});