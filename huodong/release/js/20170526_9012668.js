require.config(requireConfig),require(["jquery","fastClick","FullPage","ct","bridge","juicer"],function(e,t,a,o,n,l){var i=e(".mask"),s=Object.create(o.Prompt);s.create().build();var r=Object.create(o.Mask);r.create().build();o.Tool.local();o.Tool.buryPoint(),o.Tool.share(63,"xykdzpyq");var c={status:{login:!1,weChat:!1,url:"",msg:""},charge:{loan:null,type:null,pay:null},start:function(){var a=this;t.attach(document.body),o.Tool.setFont_v2(),window.addEventListener("resize",o.Tool.debounce(o.Tool.setFont_v2)),window.addEventListener("resize",o.Tool.debounce(o.Tool.handleBottomStatusBar));var n=Object.create(o.PreLodingUi);n.create({preLoadingCls:"loading-bg-color",loadingEleCls:"loading-ele-color"}).build(),o.Tool.imgPreLoad({callback:function(){this.hintLog("图片加载完成");var e=null;clearTimeout(e),e=setTimeout(function(){n.hide(),a.init()},500)}}),e.ajax({type:"POST",dataType:"JSON",url:o.Tool.url("/app/request/activity"),data:JSON.stringify({place_cid:o.Tool.userAgent().isGjj?1:0,tag:"进入页面"+projectName}),success:function(e){1==e.success&&console.log("进入页面")}}),e.ajax({type:"POST",dataType:"JSON",url:"/act/act170526/get_status",success:function(e){e.success?(e=e.ret,e.login&&(a.status.login=e.login),e.weChat&&(a.status.weChat=e.weChat),e.url&&(a.status.url=e.url)):(a.status.msg=e.msg||"出错请重试",s.show(e.msg||"出错请重试"))}})},init:function(){var t=this;e(".wp").removeClass("hide"),t.fullPageObj=t.fullpage(),t.apply(),t.openRule(),t.closeRule(),t.share()},fullpage:function(){var t=this,a=document.getElementsByClassName("wp-inner")[0].fullpage({start:0,beforeChange:function(e){var a="page"+e.next;t.changeState(a)},afterChange:function(a){t.fullPageObj.stop();var o="page"+a.cur;"page0"==o&&(e(".page1 .btn").on("click",function(){t.status.login||n&&n.action("login"),1==t.status.weChat&&s.show("请登陆app参与活动"),t.fullPageObj.moveTo(1,!0)}),e(".process").on("click",function(){window.location.href=t.status.url}),t.respondState(o)),"page1"==o&&(e(".page1 li").removeClass("rotate").addClass("grayscale"),e(".page2 li").on("click",function(){i.show();var a=e(this);if(a.hasClass("rotate"))i.hide(),t.fullPageObj.moveTo(2,!0);else{a.siblings().addClass("grayscale").removeClass("animated rotate").end().removeClass("grayscale").addClass("animated");var o=null;clearTimeout(o),o=setTimeout(function(){a.addClass("rotate"),clearTimeout(o),o=setTimeout(function(){t.fullPageObj.moveTo(2,!0),i.hide()},1200)},200)}t.charge.loan=e(this).data("loan-type")}),t.respondState(o,0,!0)),"page2"==o&&(e(".page2 li").removeClass("rotate").addClass("grayscale"),e(".page3 li").on("click",function(){i.show();var a=e(this);a.siblings().addClass("grayscale").removeClass("animated rotate").end().removeClass("grayscale").addClass("animated");var o=null;clearTimeout(o),o=setTimeout(function(){a.addClass("rotate"),clearTimeout(o),o=setTimeout(function(){if(console.log(t.charge),"continue"==t.cardType(t.charge)){var a=null;if(1==t.charge.type)var o=e("#tpl-choose-pf").html();else var o=e("#tpl-choose-gd").html();var n=l(o,a)}else{var a=u[t.cardType(t.charge)];console.log(a);var o=e("#tpl-card").html(),n=l(o,a);l.register("index_add",indexFn);var s=e("#tpl-rule").html(),r=l(s,a);console.log(r)}e(".page4 .content").html("").append(n),e(".rule").remove(),e("body").append(r),i.hide(),t.fullPageObj.moveTo(3,!0)},1200)},200),t.charge.type=e(this).data("card-type")}),t.respondState(o,1,!0,function(){t.charge.loan=null})),"page3"==o&&(e(".page3 li").removeClass("rotate").addClass("grayscale"),e(".page4 .next")&&e(".next li").on("click",function(){i.show();var a=e(this);a.siblings().addClass("grayscale").removeClass("animated rotate").end().removeClass("grayscale").addClass("animated");var o=null;clearTimeout(o),o=setTimeout(function(){a.addClass("rotate"),clearTimeout(o),o=setTimeout(function(){if(console.log(t.charge),"continue"==t.cardType(t.charge))return console.log("错了"),!1;var a=u[t.cardType(t.charge)];console.log(a);var o=e("#tpl-card").html(),n=l(o,a);l.register("index_add",indexFn);var s=e("#tpl-rule").html(),r=l(s,a);e(".page5 .content").html("").append(n),e(".rule").remove(),e("body").append(r),i.hide(),t.fullPageObj.moveTo(4,!0)},1200)},200),t.charge.pay=e(this).data("pay")}),t.respondState(o,2,!0)),"page4"==o&&(e(".page4 li").removeClass("rotate").addClass("grayscale"),t.charge.pay=null,t.respondState(o,3,!0))}});return a},apply:function(){e(".page4,.page5").on("click",".apply",function(){console.log("...");var t=e(this).data("link");console.log(t),e.ajax({url:"/act/act170526/get_url",type:"POST",dataType:"JSON",data:JSON.stringify({type:t}),success:function(e){e.success?window.location.href=e.ret.url:s.show(e.msg||"出错请重试")}})})},changeState:function(e){var t=window.location.search.slice(1);console.log(t),window.history.pushState&&window.history.pushState({title:e},e,"index.php?"+t+"#page="+e)},respondState:function(e,t,a,l){var i=this,s=o.Tool.userAgent();n&&s.isGjj?n.onBack(function(){return"page0"==e?!1:(a?i.fullPageObj.moveTo(t,!0):i.fullPageObj.moveTo(t),l&&l(),!0)}):window.onpopstate=function(){a?(console.log(i.fullPageObj),i.fullPageObj.moveTo(t,!0)):i.fullPageObj.moveTo(t),l&&l()}},openRule:function(){e(".content").on("click",".rule-btn",function(){r.show(),e(".rule").fadeIn()})},closeRule:function(){e("body").on("click",".btn-close",function(){e(".rule").fadeOut(function(){r.hide()})})},cardType:function(e){if(!e)return!1;if(1==e.loan){if(1==e.type)return"psfq";if(2!=e.type)return"lxjy";if(!e.pay)return"continue";if(1==e.pay)return"lt";if(2==e.pay)return"znsw"}else if(2==e.loan){if(1==e.type)return"psfq";if(2!=e.type)return"lxy";if(!e.pay)return"continue";if(1==e.pay)return"lt";if(2==e.pay)return"znsw"}},share:function(){var e=navigator.userAgent,t={mobile:!!e.match(/AppleWebKit.*Mobile.*/),isAndroid:e.indexOf("Android")>-1||e.indexOf("Linux")>-1||e.indexOf("android")>-1,isiOS:/[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),webApp:-1==e.indexOf("Safari"),weixin:e.indexOf("MicroMessenger")>-1,isGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(e)||/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),isAndroidGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(e),isiOSGjj:/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(e),isGjjFdjsq:/^android\/[\w\W]+client\/[\w\W]+category\/51fdjsq$/.test(e)},a=window.location.host;return t.isGjj&&n&&n.action("quickIcon",{thumb:"https://r.51gjj.com/image/static/ico_title_share_dark.png",onclick:function(){n.action("ShareTimeline",{title:"公积金能办信用卡啦",desc:"定制信用卡拿现金大礼包",thumb:"https://r.51gjj.com/act/images/yunying/20170313_fx.jpg",link:"http://"+a+"/act/home/huodong/20170526/"})}}),this}},u={lxy:{title:"兴业立享白金卡悠系列",img:"xy_lxy.png",qy:["取现0手续费 机场贵宾礼遇","12期6.0% 一次性分期费率"],hd:["申请即送伴手礼，可叠加"],cardApply:"5",process:"",rule:["即日起到8月30日，通过活动申请兴业银行任意信用卡即可获精美伴手礼1份，申请巴萨卡可获得58元现金红包，激活卡片更可获得258元现金红包。","本次伴手礼为一份价值30元的复古牛皮笔记本，速写涂鸦记录心情。","每位用户最多可获得2份伴手礼，每日送出100份，先到先得。","获得伴手礼奖品后请在3日内点击我的-我的奖品完善收货信息完成领取，过期失效！","有任何疑问或者帮助可联系客服4008635151。","本商品由51公积金管家提供，与设备生产商Apple Inc公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。"]},lt:{title:"光大智能商务白金卡",img:"zn_bj.png",qy:["银联白金卡，星级酒店住两送一","半年内享无限次机场高铁贵宾厅"],hd:["申请即送伴手礼，可叠加"],cardApply:"2",process:"",rule:["即日起到8月30日，通过活动申请兴业银行任意信用卡即可获精美伴手礼1份，申请巴萨卡可获得58元现金红包，激活卡片更可获得258元现金红包。","本次伴手礼为一份价值30元的复古牛皮笔记本，速写涂鸦记录心情。","每位用户最多可获得2份伴手礼，每日送出100份，先到先得。","获得伴手礼奖品后请在3日内点击我的-我的奖品完善收货信息完成领取，过期失效！","有任何疑问或者帮助可联系客服4008635151。","本商品由51公积金管家提供，与设备生产商Apple Inc公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。"]},znsw:{title:"光大智能商务金卡",img:"gd_znsw.png",qy:["免年费 赠100万航空意外险","低息分期 自由周转"],hd:["申请即送伴手礼，可叠加"],cardApply:"3",process:"",rule:["即日起到8月30日，通过活动申请兴业银行任意信用卡即可获精美伴手礼1份，申请巴萨卡可获得58元现金红包，激活卡片更可获得258元现金红包。","本次伴手礼为一份价值30元的复古牛皮笔记本，速写涂鸦记录心情。","每位用户最多可获得2份伴手礼，每日送出100份，先到先得。","获得伴手礼奖品后请在3日内点击我的-我的奖品完善收货信息完成领取，过期失效！","有任何疑问或者帮助可联系客服4008635151。","本商品由51公积金管家提供，与设备生产商Apple Inc公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。"]},lxjy:{title:"兴业立享白金卡精英系列",img:"xy_jy.png",qy:["取现0手续费 1000万意外险","12期6.0% 一次性分期费率"],hd:["申请即送伴手礼，可叠加"],cardApply:"4",process:"",rule:["即日起到8月30日，通过活动申请兴业银行任意信用卡即可获精美伴手礼1份，申请巴萨卡可获得58元现金红包，激活卡片更可获得258元现金红包。","本次伴手礼为一份价值30元的复古牛皮笔记本，速写涂鸦记录心情。","每位用户最多可获得2份伴手礼，每日送出100份，先到先得。","获得伴手礼奖品后请在3日内点击我的-我的奖品完善收货信息完成领取，过期失效！","有任何疑问或者帮助可联系客服4008635151。","本商品由51公积金管家提供，与设备生产商Apple Inc公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。"]},psfq:{title:"浦发巴萨分期白金卡",img:"bs_bj.png",qy:["50万额度尊享 白金超多权益","无条件免年费 定期特价饮品","1元机场停车 指定酒店住就送"],hd:["申请送58元，激活送258元现金红包"],cardApply:"1",process:"",rule:["即日起到8月30日，通过活动申请兴业银行任意信用卡即可获精美伴手礼1份，申请巴萨卡可获得58元现金红包，激活卡片更可获得258元现金红包。","本次伴手礼为一份价值30元的复古牛皮笔记本，速写涂鸦记录心情。","每位用户最多可获得2份伴手礼，每日送出100份，先到先得。","获得伴手礼奖品后请在3日内点击我的-我的奖品完善收货信息完成领取，过期失效！","有任何疑问或者帮助可联系客服4008635151。","本商品由51公积金管家提供，与设备生产商Apple Inc公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。"]}};c.start()});