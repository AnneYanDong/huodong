require.config(requireConfig),require(["jquery","fastClick","FullPage","ct","bridge","juicer"],function(e,a,t,o,n,l){var r=e(".mask"),i=Object.create(o.Prompt);i.create().build();var s=Object.create(o.Mask);s.create().build();var c=o.Tool.local();o.Tool.buryPoint();var u={status:{login:!1,msg:""},charge:{loan:null,type:null,pay:null},start:function(){var e=this;a.attach(document.body),o.Tool.setFont(),window.addEventListener("resize",o.Tool.debounce(o.Tool.setFont)),window.addEventListener("resize",o.Tool.debounce(o.Tool.handleBottomStatusBar));var t=Object.create(o.PreLodingUi);t.create({preLoadingCls:"loading-bg-color",loadingEleCls:"loading-ele-color"}).build(),o.Tool.imgPreLoad({callback:function(){this.hintLog("图片加载完成");var a=null;clearTimeout(a),a=setTimeout(function(){t.hide(),e.init()},500)}}),o.Ajax.do({url:indexData.ajaxUrl||"test.php",data:{action:"status",test:"look",num:1},success:function(a){0==a.errcode?e.status.login=!0:(e.status.msg=a.errmsg||"出错请重试",i.show(a.errmsg||"出错请重试"))}})},init:function(){var a=this;e(".wp").removeClass("hide"),a.fullPageObj=a.fullpage(),a.apply(),a.openRule(),a.closeRule()},fullpage:function(){var a=this,t=document.getElementsByClassName("wp-inner")[0].fullpage({start:0,beforeChange:function(e){var t="page"+e.next;a.changeState(t)},afterChange:function(t){a.fullPageObj.stop();var o="page"+t.cur;"page0"==o&&(e(".page1 .btn").on("click",function(){return a.status.login?void a.fullPageObj.moveTo(1,!0):void i.show(a.status.msg)}),e(".process").on("click",function(){console.log(c.origin+"shequ/discovery/index.php?route=account/business&type=3"),window.location.href=c.origin+"shequ/discovery/index.php?route=account/business&type=3"}),a.respondState(o)),"page1"==o&&(e(".page1 li").removeClass("rotate").addClass("grayscale"),e(".page2 li").on("click",function(){r.show();var t=e(this);if(t.hasClass("rotate"))r.hide(),a.fullPageObj.moveTo(2,!0);else{t.siblings().addClass("grayscale").removeClass("animated rotate").end().removeClass("grayscale").addClass("animated");var o=null;clearTimeout(o),o=setTimeout(function(){t.addClass("rotate"),clearTimeout(o),o=setTimeout(function(){a.fullPageObj.moveTo(2,!0),r.hide()},1200)},200)}a.charge.loan=e(this).data("loan-type")}),a.respondState(o,0,!0)),"page2"==o&&(e(".page2 li").removeClass("rotate").addClass("grayscale"),e(".page3 li").on("click",function(){r.show();var t=e(this);t.siblings().addClass("grayscale").removeClass("animated rotate").end().removeClass("grayscale").addClass("animated");var o=null;clearTimeout(o),o=setTimeout(function(){t.addClass("rotate"),clearTimeout(o),o=setTimeout(function(){if(console.log(a.charge),"continue"==a.cardType(a.charge)){var t=null;if(1==a.charge.type)var o=e("#tpl-choose-pf").html();else var o=e("#tpl-choose-gd").html();var n=l(o,t)}else{var t=p[a.cardType(a.charge)];console.log(t);var o=e("#tpl-card").html(),n=l(o,t);l.register("index_add",indexFn);var i=e("#tpl-rule").html(),s=l(i,t);console.log(s)}e(".page4 .content").html("").append(n),e(".rule").remove(),e("body").append(s),r.hide(),a.fullPageObj.moveTo(3,!0)},1200)},200),a.charge.type=e(this).data("card-type")}),a.respondState(o,1,!0,function(){a.charge.loan=null})),"page3"==o&&(e(".page3 li").removeClass("rotate").addClass("grayscale"),e(".page4 .next")&&e(".next li").on("click",function(){r.show();var t=e(this);t.siblings().addClass("grayscale").removeClass("animated rotate").end().removeClass("grayscale").addClass("animated");var o=null;clearTimeout(o),o=setTimeout(function(){t.addClass("rotate"),clearTimeout(o),o=setTimeout(function(){if(console.log(a.charge),"continue"==a.cardType(a.charge))return console.log("错了"),!1;var t=p[a.cardType(a.charge)];console.log(t);var o=e("#tpl-card").html(),n=l(o,t);l.register("index_add",indexFn);var i=e("#tpl-rule").html(),s=l(i,t);e(".page5 .content").html("").append(n),e(".rule").remove(),e("body").append(s),r.hide(),a.fullPageObj.moveTo(4,!0)},1200)},200),a.charge.pay=e(this).data("pay")}),a.respondState(o,2,!0)),"page4"==o&&(e(".page4 li").removeClass("rotate").addClass("grayscale"),a.charge.pay=null,a.respondState(o,3,!0))}});return t},apply:function(){e(".page4,.page5").on("click",".apply",function(){console.log("...");var a=e(this).data("link");o.Ajax.do({url:indexData.ajaxUrl||"test.php",data:{action:"apply",type:a},success:function(e){0==e.errcode?window.location.href=e.url:i.show(e.errmsg||"出错请重试")}})})},changeState:function(e){window.history.pushState&&window.history.pushState({title:e},e,"index.php#page="+e)},respondState:function(e,a,t,l){var r=this,i=o.Tool.userAgent();n&&i.isGjj?n.onBack(function(){return"page0"==e?!1:(t?r.fullPageObj.moveTo(a,!0):r.fullPageObj.moveTo(a),l&&l(),!0)}):window.onpopstate=function(){t?(console.log(r.fullPageObj),r.fullPageObj.moveTo(a,!0)):r.fullPageObj.moveTo(a),l&&l()}},openRule:function(){e(".content").on("click",".rule-btn",function(){s.show(),e(".rule").fadeIn()})},closeRule:function(){e("body").on("click",".btn-close",function(){e(".rule").fadeOut(function(){s.hide()})})},cardType:function(e){if(!e)return!1;if(1==e.loan)if(1==e.type){if(!e.pay)return"continue";if(1==e.pay)return"mk";if(2==e.pay)return"cx"}else{if(2!=e.type)return"lxjy";if(!e.pay)return"continue";if(1==e.pay)return"lt";if(2==e.pay)return"znsw"}else if(2==e.loan)if(1==e.type){if(!e.pay)return"continue";if(1==e.pay)return"mk";if(2==e.pay)return"cx"}else{if(2!=e.type)return"lxy";if(!e.pay)return"continue";if(1==e.pay)return"lt";if(2==e.pay)return"znsw"}}},p={lxy:{title:"立享悠白金卡",img:"xy_lxy.png",qy:["银联白金卡，每年6次机场贵宾服务","10积分=1公里，航空里程随心兑"],hd:["申请即送伴手礼"],cardApply:"34",process:"",rule:["3月19日至3月31日，申请兴业银行立享白金卡精英系列或悠系列即可获精美伴手礼1份。","本次伴手礼为一份价值30元的玻璃水杯，高品质更安全，出行携带更方便。","每位用户限领取一次伴手礼，每日送出300份，先到先得。","中奖后三日内请点击我的奖品来领取，请保证收货地址准确详细，超出三日未领取自动失效。","有任何疑问或者帮助可联系客服4008635151。","本商品由51公积金管家提供，与设备生产商Apple Inc公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。"]},lt:{title:"商务龙腾白金卡",img:"gd_lt.png",qy:["银联白金卡，星级酒店住两送一","半年内享无限次机场高铁贵宾厅"],hd:["申请即送伴手礼"],cardApply:"44",process:"",rule:["3月19日至3月31日，申请光大银行龙腾白金卡或智能商务金卡即可获精美伴手礼1份。","本次伴手礼为一份价值30元的玻璃水杯，高品质更安全，出行携带更方便。","每位用户限领取一次伴手礼，每日送出300份，先到先得。","中奖后三日内请点击我的奖品来领取，请保证收货地址准确详细，超出三日未领取自动失效。","有任何疑问或者帮助可联系客服4008635151。","本商品由51公积金管家提供，与设备生产商Apple Inc公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。"]},mk:{title:"梦卡白金卡",img:"pf_mk.png",qy:["银联白金卡，最高30万现金贷款特权","免年费，商场免费停车"],hd:["申请送积分，开卡送288现金"],cardApply:"38",process:"",rule:["本活动为浦发专享活动，成功申请后您将获得1笔贷款和1张信用卡。","完成申请后您将获得2017个积分（相当于30元），24小时内发放到个人账户。","放款后您将另获得288元现金，3个工作日内发放到您的支付宝账号，为确保您能及时收到现金奖励，请点击我的-我的奖品，确保支付宝信息填写完善。如果您在活动前已申请鑫时贷，活动期间放款您仍然可以获得288元现金。","红包的有效期为30天，您需要在30天内申请并激活放款。","本活动仅限活动前未放款或未申请过的用户，已放款用户不参与本次活动。","如有任何问题请咨询官方客服热线4008635151。","本商品由51公积金管家提供，与设备生产商Apple Inc.公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。"]},cx:{title:"财星IC卡",img:"pf_cx.png",qy:["银联金卡，最高30万现金贷款特权","每月首次取现免手续费"],hd:["申请送积分，开卡送288现金"],cardApply:"22",process:"",rule:["本活动为浦发专享活动，成功申请后您将获得1笔贷款和1张信用卡。","完成申请后您将获得2017个积分（相当于30元），24小时内发放到个人账户。","放款后您将另获得288元现金，3个工作日内发放到您的支付宝账号，为确保您能及时收到现金奖励，请点击我的-我的奖品，确保支付宝信息填写完善。如果您在活动前已申请鑫时贷，活动期间放款您仍然可以获得288元现金。","红包的有效期为30天，您需要在30天内申请并激活放款。","本活动仅限活动前未放款或未申请过的用户，已放款用户不参与本次活动。","如有任何问题请咨询官方客服热线4008635151。","本商品由51公积金管家提供，与设备生产商Apple Inc.公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。"]},znsw:{title:"智能商务金卡",img:"gd_znsw.png",qy:["银联金卡，商旅预订，无忧出行","48小时失卡保障服务"],hd:["申请即送伴手礼"],cardApply:"43",process:"",rule:["3月19日至3月31日，申请光大银行龙腾白金卡或智能商务金卡即可获精美伴手礼1份。","本次伴手礼为一份价值30元的玻璃水杯，高品质更安全，出行携带更方便。","每位用户限领取一次伴手礼，每日送出300份，先到先得。","中奖后三日内请点击我的奖品来领取，请保证收货地址准确详细，超出三日未领取自动失效。","有任何疑问或者帮助可联系客服4008635151。","本商品由51公积金管家提供，与设备生产商Apple Inc公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。"]},lxjy:{title:"立享精英白金卡",img:"xy_jy.png",qy:["银联白金卡，境内机场贵宾厅礼遇","刷卡自动豁免年费"],hd:["申请即送伴手礼"],cardApply:"42",process:"",rule:["3月19日至3月31日，申请兴业银行立享白金卡精英系列或悠系列即可获精美伴手礼1份。","本次伴手礼为一份价值30元的玻璃水杯，高品质更安全，出行携带更方便。","每位用户限领取一次伴手礼，每日送出300份，先到先得。","中奖后三日内请点击我的奖品来领取，请保证收货地址准确详细，超出三日未领取自动失效。","有任何疑问或者帮助可联系客服4008635151。","本商品由51公积金管家提供，与设备生产商Apple Inc公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。"]}};u.start()});