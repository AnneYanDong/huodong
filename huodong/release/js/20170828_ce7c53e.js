require.config(requireConfig),require(["jquery","fastClick","FullPage","ct","bridge","juicer","marquee","dataStatistics"],function(t,e,o,n,i,a){var c=(t(".mask"),Object.create(n.Prompt));c.create().build();var r=Object.create(n.Mask);r.create().build();var s=(n.Tool.local(),n.Tool.userAgent().isGjj?1:0);n.Tool.buryPoint_v2(s);var l={start:function(){var t=this;e.attach(document.body),n.Tool.setFont(),n.Tool.handleBottomStatusBar(),window.addEventListener("resize",n.Tool.debounce(n.Tool.setFont)),window.addEventListener("resize",n.Tool.debounce(n.Tool.handleBottomStatusBar));var o=Object.create(n.PreLodingUi);o.create({preLoadingCls:"loading-bg-color",loadingEleCls:"loading-ele-color"}).build(),n.Tool.imgPreLoad({callback:function(){this.hintLog("图片加载完成");var e=null;clearTimeout(e),e=setTimeout(function(){o.hide(),t.init()},500)}})},init:function(){console.log("理财金活动");var e=this;e.openRule(),e.closeRule(),e.setNavAttr(),e.share(),t(".wp").removeClass("hide"),e.PageBuryRequest(),e.getSingleInfo()},getSingleInfo:function(){var e=this;t.ajax({type:"POST",dataType:"JSON",url:"/act/act170828/get_status",success:function(o){o.success?(console.log("后台数据：",o),e.getLottery(o),o.ret.auth?o.ret.is_weChat||o.ret.is_qq?e.startIsImportedProcess(o):o.ret.login?e.startIsImportedProcess(o):i&&i.action("login"):(e.showDynamicLayout(t("#tpl-have-doubled"),o),e.getNumberImage(o.ret.money),e.showScrollPage(o),t(".dynamic-layout").on("click",".btn4",function(){window.location.href="https://b.jianbing.com/51wealthy/h5/account/index.php"}))):c.show("出错了")}})},startIsImportedProcess:function(e){var o=this;e.ret.import?(o.showImportedLayout(e),t(".tp").on("click",".deposite-btn",function(){t(".dynamic-layout .tp").fadeOut(),window.location.href="https://b.jianbing.com/51wealthy/h5/account/index.php"}),t(".dynamic-layout").on("click",".tp",function(){r.hide(),t(".double").remove(),t(".multiple").remove(),t(".dynamic-layout").empty(),o.showDynamicLayout(t("#tpl-not-double"),e),o.getNumberImage(e.ret.money),o.showScrollPage(e)}),t(".dynamic-layout").on("click",".btn3",function(){window.location.href="https://b.jianbing.com/51wealthy/h5/account/index.php"})):o.showNotImportLayout(e)},showDynamicLayout:function(e,o){var n=e.html(),i=a(n,o.ret);t(".dynamic-layout").append(i)},showNotImportLayout:function(e){var o=this;o.showDynamicLayout(t("#tpl-not-imported"),e),t(".dynamic-layout").on("click",".btn1",function(){c.show("抱歉，您的公积金尚未查询，请先查询后再来领取哦。"),setTimeout(function(){window.location.href="https://kaifa.jianbing.com/h5/?page=query"},1500)})},getTpContent:function(e){t("<div class='double'></div>").appendTo(t(".tp")).text(e.ret.money),t("<div class='multiple'></div>").appendTo(t(".tp")),t("<span></span>").appendTo(t(".tp .multiple")).text("已翻X"),t("<span></span>").appendTo(t(".tp .multiple")).text(e.ret.multiple)},showImportedLayout:function(e){var o=this;o.showDynamicLayout(t("#tpl-have-imported"),e),o.getNumberImage(e.ret.base),t(".dynamic-layout").on("click",".btn2",function(){o.getNumberImage(e.ret.money),o.showScrollPage(e),setTimeout(function(){o.getTpContent(e),r.show(),t(".dynamic-layout .tp").fadeIn()},1500)})},showScrollPage:function(e){t(".provident2").addClass("dataStatistics"),t(".provident2 div").addClass("digit_set"),t(".provident2 .digit_set").each(function(e,o){t(o).empty()}),t(".provident2 div:last").addClass("set_last"),t(".dataStatistics").dataStatistics({min:e.ret.money-100,max:e.ret.money,time:1,len:e.ret.money.toString().length})},getNumberImage:function(e){var o=e.toString();t(".provident2").empty();for(var n=o.length,i=0;n>i;i++){var a=new Image,c=t("<div class='show-num'>");c.append(a);for(var r=0;i>=r;r++)a.src="http://r.51gjj.com/act/release/img/20170828_number_bg.png",t(".provident2").append(c);t(".provident2 div:eq("+i+")").append('<span class="show-num-span">'+o.charAt(i)+"</span>")}},getLottery:function(e){for(var o=e.ret.info,n=t(".single-info"),i=0;i<o.length;i++){var a=t("<span>");a.text("恭喜用户"+o[i].name+"获得"+o[i].money+"元理财金"),a.appendTo(n)}n.liMarquee({hoverstop:!1,drag:!1,scrollamount:30})},setNavAttr:function(){i&&i.action("setNavigationColor",{backgroundColor:"#fff",textColor:"#212226",iconType:"1"})},PageBuryRequest:function(){t.ajax({type:"POST",dataType:"JSON",url:"/act/request/activity",data:JSON.stringify({source:n.Tool.userAgent().isGjj?1:0,tag:"20170821_1_0_0_进入页面"}),success:function(t){t.success}})},openRule:function(){t(".wp-inner").on("click",".rule-btn",function(){r.show();var e=t("#tpl-rule").html(),o=a(e,d);t("body").append(o),t(".rule").fadeIn()})},closeRule:function(){t("body").on("click",".btn-close",function(){t(".rule").fadeOut(function(){r.hide()})})},share:function(){var t=navigator.userAgent,e={mobile:!!t.match(/AppleWebKit.*Mobile.*/),isAndroid:t.indexOf("Android")>-1||t.indexOf("Linux")>-1||t.indexOf("android")>-1,isiOS:/[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(t),webApp:-1==t.indexOf("Safari"),weixin:t.indexOf("MicroMessenger")>-1,isGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(t)||/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(t),isAndroidGjj:/^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(t),isiOSGjj:/^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(t),isGjjFdjsq:/^android\/[\w\W]+client\/[\w\W]+category\/51fdjsq$/.test(t)},o=window.location.host;return e.isGjj&&i&&i.action("quickIcon",{thumb:"https://r.51gjj.com/image/static/ico_title_share_dark.png",onclick:function(){i.action("ShareTimeline",{title:"28888元理财金，人人有份",desc:"我们出本金，利息都归你",thumb:"https://r.51gjj.com/act/release/img/20170828_share.png",link:"https://"+o+"/act/home/huodong/20170828/index.php"})}}),this}},d={rule:["活动时间：9月1号-9月15号；","活动对象：已导入公积金的所有用户；","活动页面中所有金额单位均为：元；","导入多个公积金账户的用户，以距当前时间最近的导入账户为发放标准；","成功领取理财金后，可点击理财Tab页—在首页找到新手体验标查看；","发放时间：理财金的收益会在领取成功后的第2天发放到您的理财账户，收益可以操作提现，点击我的理财——可用余额——提现，可提现到银行卡；","已经获得体验金，但未获得后续认证或投资体验金的用户，请在9月22日24点前完成实名认证，否则将失去领取后续体验金的资格；","本活动仅限于未投资过51有钱的用户参加，同一个用户只能领取一次（同一个手机号码和身份证和银行卡视为同一用户）；","有任何疑问或者帮助可联系客服4008635151。","理财金由51公积金管家提供，与设备生产商Apple Inc公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。"]};l.start()});