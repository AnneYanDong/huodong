require.config(requireConfig),define(["jquery","ct","bridge","Vue-dev","jqueryEasing"],function(t,i,e,n){var o=Object.create(i.Prompt);o.create().build();var s=Object.create(i.Mask);s.create().build();var a=i.Tool.local(),u=i.Tool.userAgent(),r=Object.create(i.Cookie);i.Tool.share(89,"qqymx");var c={start:function(){var e=this;i.Tool.setFont(),window.addEventListener("resize",i.Tool.debounce(i.Tool.setFont)),i.Tool.imgPreLoad({callback:function(){this.hintLog("图片加载完成");var t=null;clearTimeout(t),t=setTimeout(function(){e.init()},500)}}),t.ajax({type:"POST",dataType:"JSON",url:i.Tool.url("/act/request/activity"),data:JSON.stringify({source:i.Tool.userAgent().isGjj?1:0,tag:"89_1_0_31_进入页面"}),success:function(t){1==t.success}})},init:function(){window.vm=new n({el:".wp",data:{wpShow:!1,itemHeight:"",allowStart:!1,pageShow:!1,maskStatus:!1,ruleStatus:!1,giftStatus:!1,buttonTxt:"马上抢",result:{},giftImg:""},mounted:function(){t(".vue-pre-loading").fadeOut(),this.pageShow=!0,this.$nextTick(function(){i.Tool.buryPoint_v2(),t.ajax({type:"POST",dataType:"json",url:i.Tool.url("/act/act170918/get_status"),data:JSON.stringify({}),success:function(t){return 1!=t.success?(o.show(t.msg||"抽奖失败，请联系客服咨询"),!1):(vm.setItemInfo(),void(0==t.ret.lottery?(vm.$set(vm.result,"gift",t.ret),vm.initAnim(),vm.startAnim()):1==t.ret.lottery&&(vm.$set(vm.result,"gift",t.ret),vm.buttonTxt="立即使用",vm.hasLotteried())))}})})},watch:{result:{handler:function(){if(this.result&&this.result.gift&&this.result.gift.code)switch(this.result.gift.code){case"0500":this.giftImg="g-500";break;case"0600":this.giftImg="g-600";break;case"0700":this.giftImg="g-700";break;case"0800":this.giftImg="g-800";break;case"0900":this.giftImg="g-900";break;case"1000":this.giftImg="g-1000"}},deep:!0}},methods:{setItemInfo:function(){this.itemHeight=t(".count-item")[0].getBoundingClientRect().height||t(".count-item").eq(0).height()},initAnim:function(){var i=this,e=i.itemHeight,n=10*e,o=i.createInitNum(),s=null;i.$nextTick(function(){t(".init-anim").each(function(a){t(this).delay(300*a).animate({backgroundPositionY:-(n+e*o[a])+"px"},{duration:1500,easing:"easeInOutCirc",complete:function(){clearTimeout(s),s=setTimeout(function(){t(".init-anim").addClass("question-mark"),t(".init-anim").css({backgroundPosition:"0px 0px"}),i.allowStart=!0},400)}})})})},startAnim:function(){{var n=this,s=null;r.get("jianbing_customer_id")}n.$refs.buttonapply.addEventListener("click",function(){return n.result.gift.login?n.allowStart?n.result&&n.result.gift&&n.result.gift.code?(n.buttonTxt="立即使用",window.location.href=n.result.gift.url,!1):(n.allowStart=!1,void t.ajax({type:"POST",dataType:"json",url:i.Tool.url("/act/act170918/get_gift"),data:JSON.stringify({}),success:function(i){1==i.success&&1==i.ret.lottery?(n.$set(n.result,"gift",i.ret),n.$nextTick(function(){t(".count-item").removeClass("question-mark");var i=n.itemHeight,e=n.result.gift.code.split(""),o=30*i;t(".count-item").each(function(a){t(this).delay(300*a).animate({backgroundPositionY:-(o+i*e[a])+"px"},{duration:2e3+e.length,easing:"easeInOutCirc",complete:function(){clearTimeout(s),s=setTimeout(function(){n.allowStart=!0,n.maskStatus=!0,n.giftStatus=!0,n.buttonTxt="立即使用"},400)}})})})):o.show(i.msg||"暂不符合活动要求，看看其他贷款",{callback:function(){window.location.href=i.ret.url}})}})):!1:(o.show("请先登录51公积金管家APP参与活动",{callback:function(){u.isGjj&&e&&e.action("login")}}),!1)})},hasLotteried:function(){var i=this;i.$nextTick(function(){var e=i.result.gift.code.split("");t(".count-item").each(function(n){t(this).css("backgroundPositionY",-(i.itemHeight*e[n])+"px")})}),i.$refs.buttonapply.addEventListener("click",function(){i.goUrl()})},goUrl:function(){this.result.gift&&(window.location.href=this.result.gift.url)},createInitNum:function(){for(var t=[],i=0;2>i;i++)t.push(Math.floor(10*Math.random()));return 0!=t[1]&&(t[0]=0),t[0]>1&&(t[0]=1),t},showRule:function(){this.ruleStatus=!this.ruleStatus,this.maskStatus=!this.maskStatus},closeGift:function(){this.maskStatus=!1,this.giftStatus=!1,this.ruleStatus=!1},share:function(){u.isGjj&&e&&e.action("quickIcon",{thumb:"https://r.51gjj.com/image/static/ico_title_share_dark.png",onclick:function(){e.action("ShareTimeline",{title:"5万元3分钟到账，抢1000元免息额度",desc:"抽多少免多少",thumb:"https://r.51gjj.com/act/release/img/20170918_wx_jyd.jpg",link:"https://"+a.host+"act/home/huodong/20170918/index.php"})}})}}})}};c.start()});