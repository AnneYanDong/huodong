require.config(requireConfig),require(["jquery","fastClick","FullPage","ct","bridge","juicer","marquee"],function(e,o,t,n,i,a){var l=(e(".mask"),Object.create(n.Prompt));l.create().build();var r=Object.create(n.Mask);r.create().build();n.Tool.local();n.Tool.buryPoint();var c={start:function(){console.log("金卡贷活动！");var t=this;o.attach(document.body),n.Tool.setFont(),n.Tool.handleBottomStatusBar(),window.addEventListener("resize",n.Tool.debounce(n.Tool.setFont)),window.addEventListener("resize",n.Tool.debounce(n.Tool.handleBottomStatusBar));var i=Object.create(n.PreLodingUi);i.create({preLoadingCls:"loading-bg-color",loadingEleCls:"loading-ele-color"}).build();var a=null;clearTimeout(a),a=setTimeout(function(){i.hide()},500),n.Tool.imgPreLoad({callback:function(){this.hintLog("图片加载完成");var e=null;clearTimeout(e),e=setTimeout(function(){i.hide(),t.init()},500)}}),e.ajax({type:"POST",dataType:"JSON",url:n.Tool.url("/app/request/activity"),data:JSON.stringify({place_cid:n.Tool.userAgent().isGjj?1:0,tag:"进入页面"+projectName}),success:function(e){1==e.success}})},init:function(){var o=this;e(".wp").removeClass("hide"),console.log("初始化成功！"),e.ajax({type:"POST",dataType:"JSON",url:n.Tool.url("/app/request/activity"),data:JSON.stringify({place_cid:n.Tool.userAgent().isGjj?1:0,tag:"进入页面"+projectName}),success:function(e){1==e.success}}),o.pushMsg(),o.openRule(),o.closeRule(),o.withdraw()},pushMsg:function(){var o=e("#lottery");o[0].style.width=e(".content").width()+"px";for(var t=e(".single-info"),n=(e(".awards-info"),["恭喜用户131****8262获得电影票通用券","恭喜用户159****2546完成提款","恭喜用户152****8456获得电影票通用券","恭喜用户139****7522完成提款","恭喜用户182****3575获得电影票通用券","恭喜用户187****9234完成提款","恭喜用户187****7532获得电影票通用券","恭喜用户159****2546完成提款"]),i=0;i<n.length;i++){var a=e("<span>");a.text(n[i]),a.appendTo(t)}e(".single-info").liMarquee({hoverstop:!1,drag:!1,scrollamount:30})},withdraw:function(){e(".apply-wrap").on("click",".withdraw",function(){console.log("点击提款"),window.location.href="https://b.jianbing.com/business/home/h5/xianjin/index.php"})},openRule:function(){e(".content").on("click",".rule-btn",function(o){r.show(),console.log("event target:"+o.target);var t=e("#tpl-rule").html(),n=a(t,u);e("body").append(n),e(".rule").fadeIn()})},closeRule:function(){e("body").on("click",".btn-close",function(){e(".rule").fadeOut(function(){r.hide()})})}},u={rule:["活动期间通过活动页面首次申请金卡贷的新用户完成放款，可获得电影票兑换券一张。奖品将以短信形式发送给您，凭短信到指定影院售票处进行兑换。","每个用户只有1次优惠，优惠不可重复。奖品限前100名放款用户。","见面会、首映会、情人节、平安夜、圣诞节、加长影片、限价片等特殊场次及VIP厅、 IMAX电影除外；适用影院登录看购官网www.kangou.cn进行查询。","有任何问题请咨询51公积金客服热线4008635151或看购客服热线4006776501。","本商品由51公积金管家提供，与设备生产商Apple Inc.公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利"]};c.start()});