require.config(requireConfig),require(["jquery","fastClick","lucky-card","ct","bridge","juicer","marquee","goDownload"],function(e,t,o,i,n,a){var l=(e(".mask"),Object.create(i.Prompt));l.create().build();var c=Object.create(i.Mask);c.create().build();i.Tool.local();i.Tool.buryPoint();var r=((new Date).getDay(),null),s={status:{login:!1,msg:""},charge:{loan:null,type:null,pay:null},start:function(){var o=this;t.attach(document.body),i.Tool.setFont(),i.Tool.handleBottomStatusBar(),window.addEventListener("resize",i.Tool.debounce(i.Tool.setFont)),window.addEventListener("resize",i.Tool.debounce(i.Tool.handleBottomStatusBar));var n=Object.create(i.PreLodingUi);n.create({preLoadingCls:"loading-bg-color",loadingEleCls:"loading-ele-color"}).build(),r=i.Tool.userAgent(),console.log(r),i.Tool.imgPreLoad({callback:function(){this.hintLog("图片加载完成");var e=null;clearTimeout(e),e=setTimeout(function(){n.hide(),o.init()},500)}}),e.ajax({type:"POST",dataType:"JSON",url:i.Tool.url("/app/request/activity"),data:JSON.stringify({place_cid:i.Tool.userAgent().isGjj?1:0,tag:"进入页面"+projectName}),success:function(e){1==e.success}})},init:function(){var t=this;e(".wp").removeClass("hide"),t.openRule(),t.closeRule(),t.share(),console.log("周末提款机")},openRule:function(){e(".content").on("click",".rule-btn",function(){c.show();var t=e("#tpl-rule").html(),o=a(t,d);e("body").append(o),e(".rule").fadeIn()})},closeRule:function(){e("body").on("click",".btn-close",function(){e(".rule").fadeOut(function(){c.hide()})})},share:function(){var e=navigator.userAgent,t={mobile:!!e.match(/AppleWebKit.*Mobile.*/),isAndroid:e.indexOf("Android")>-1||e.indexOf("Linux")>-1||e.indexOf("android")>-1,isiOS:/[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),webApp:-1==e.indexOf("Safari"),weixin:e.indexOf("MicroMessenger")>-1,isGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(e)||/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),isAndroidGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(e),isiOSGjj:/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),isGjjFdjsq:/^android\/[\w\W]+client\/[\w\W]+category\/51fdjsq$/.test(e)},o=window.location.host;return t.isGjj&&n&&n.action("quickIcon",{thumb:"https://r.51gjj.com/image/static/ico_title_share_dark.png",onclick:function(){n.action("ShareTimeline",{title:"烂世，别妨碍我的生活！",desc:"年轻小资消费搭档or成家立业必然选择，这次你的选择？",thumb:"https://r.51gjj.com/act/release/img/20170512_share1.png",link:"http://"+o+"/act/home/huodong/20170512/"})}}),this}},d={rule:["活动仅限于6月28日至奖品发完期间首次申请鑫福贷的用户；","完成申请可获得15元现金红包，成功放款可获得100元现金红包。为了您能够顺利拿到奖励，请申请业务后及时关注“我的奖品”提示；","成功领取后将在7个工作日内发放到您的支付宝账户，领取时请填写正确的个人支付宝账户；","关于活动有任何疑问请咨询官方客服热线4008635151；","本商品由51公积金管家提供，与设备生产商Apple Inc.公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。"]};s.start()});