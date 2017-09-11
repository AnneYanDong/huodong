require.config(requireConfig);
require(["jquery", "fastClick", "FullPage", "ct", "bridge", "juicer", "qrcode"], function ($, fastClick, fullpage, ct, Bridge, juicer,qrcode) {
    var oMask = $(".mask");

    var oP = Object.create(ct.Prompt);
    oP.create().build();

    var oM = Object.create(ct.Mask);
    oM.create().build();

    var local = ct.Tool.local();
    var host = window.location.host;
    var state = 1;
    var currentPage=1,loadingPage=0;

    ct.Tool.buryPoint_v2(0);

    var run = {

        start: function () {
            var _this = this;

            /*解决移动端click点击300延迟*/
            fastClick.attach(document.body);

            /*设置HTML的font-size*/
            ct.Tool.setFont();
            window.addEventListener("resize", ct.Tool.debounce(ct.Tool.setFont));
            // window.onresize = ct.Tool.debounce(ct.Tool.setFont)

            /*整体预加载动画*/
            var oPreLoading = Object.create(ct.PreLodingUi);
            oPreLoading.create({
                preLoadingCls: "loading-bg-color", // 自定义加载动画颜色
                loadingEleCls: "loading-ele-color"
            }).build();

            /*图片预加载*/
            ct.Tool.imgPreLoad({
                callback: function () {
                    this.hintLog("图片加载完成");
                    var timer = null;
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        oPreLoading.hide();
                        _this.init();
                    }, 500)
                }
            })

            $.ajax({
                type: "POST",
                dataType: "JSON",
                url: ct.Tool.url("/act/request/activity"),
                data: JSON.stringify({
                    source: ct.Tool.userAgent().isGjj ? 1 : 0,
                    tag: "20170901_1_0_0_进入页面"
                }),
                success: function (d) {
                    if (d.success == true) {

                    }
                }
            })
        },

        init: function () {
            var _this = this;
            $(".wp").removeClass("hide");
            _this.switchTab();
            _this.render1();
            // _this.render2();
            _this.loadMore();
            _this.scrollTab();
        },
        switchTab: function () {
            var _this = this;
            $(".wrap-title li").click(function () {
                $(".wrap-title li").eq($(this).index()).addClass("yellow").siblings().removeClass("yellow");
                $(".wrap-tab ul").hide().eq($(this).index()).show();
                var type = $(this).attr("data-type");
                console.log($(this).attr("data-type"))
                if (type == 1) {
                    console.log(111);
                    state = 1;
                    _this.render1();
                } else {
                    console.log(222);
                    state = 2;
                    _this.render2();
                }
            })
        },
        addItems:function (url,n,currentPage,loadingPage) {
            var _this = this;
            $.ajax({
                type:'POST',
                //url:Global.url(url + new Date().getTime() + '&page=' +n),
                url: url,
                dataType:'json',
                async:false,
                success:function(json){
                    var html='';
                    var inviteSue = 0;
                    if(json.resData.list != ''){
                        loadingPage=json.resData.list.length;
                        for(var i=0;i<loadingPage;i++){
                            var accountTime=json.resData.list[i].accountTime;
                            var money=json.resData.list[i].money;
                            var relaName = json.resData.list[i].relaName;
                            var investTotal=loadingPage;
    
                            if(investTotal>0){
                                inviteSue++;
                            }
                            //html+='<li><div class="info"><h3>'+userName+'</h3><h4>注册时间：'+inviteTime+'</h4></div></li>';
                            html += '<li class="record-list"><span>'+accountTime+'</span><span>'+money+'</span><span>'+relaName+'</span></li>';
                        }
                        $(".wrap-tab .cur .wrap-scroll").append(html);
                        // $(".inviteNum").html(json.resData.totalNum);
                    }else if(currentPage == 1){
                        loadingPage=0;
                        $(".list-title").append('<div class="null-data"><img src="//r.51gjj.com/image/static/no_invite.png"><p style="color: #000000;">您还没有成功邀请好友哦</p></div>');
                        $('.home-title').remove();
                        $(".home").remove();
                    }
                    else{
                        $('.wrap-tab .cur .wrap-scroll').unbind('scroll');
                    }
                    currentPage++;
                    console.log("currentpage++",currentPage)
                }
            })
          
        },
        render1: function () {
            currentPage=1,loadingPage=0;
            var falg = true;
            var argum = '&randomTime=';
                function addItems(url,n){
                    $.ajax({
                        type:'POST',
                        //url:Global.url(url + new Date().getTime() + '&page=' +n),
                        url: url,
                        dataType:'json',
                        async:false,
                        success:function(json){
                            var html='';
                            var inviteSue = 0;
                            if(json.resData.userInvites != ''){
                                loadingPage=json.resData.userInvites.length;
                                for(var i=0;i<loadingPage;i++){
                                    var userName=json.resData.userInvites[i].userName;
                                    var inviteTime=json.resData.userInvites[i].inviteTime;
                                    var sumTenderMoney = json.resData.userInvites[i].sumTenderMoney;
                                    var investTotal=json.resData.totalNum;
            
                                    if(investTotal>0){
                                        inviteSue++;
                                    }
                                    //html+='<li><div class="info"><h3>'+userName+'</h3><h4>注册时间：'+inviteTime+'</h4></div></li>';
                                    html += '<li class="record-list"><span>'+userName+'</span><span>'+inviteTime+'</span><span>'+sumTenderMoney+'</span></li>';
                                }
                                $(".wrap-tab .record-on .wrap-scroll").append(html);
                                $(".inviteNum").html(json.resData.totalNum);
                            }else if(currentPage == 1){
                                loadingPage=0;
                                $(".list-title").append('<div class="null-data"><img src="//r.51gjj.com/image/static/no_invite.png"><p style="color: #000000;">您还没有成功邀请好友哦</p></div>');
                                $('.home-title').remove();
                                $(".home").remove();
                            }
                            else{
                                $('.wrap-scroll').unbind('scroll');
                            }
                            currentPage++;
                        }
                    })
                }
                //addItems('/member/friend/userInviteJSON.html?'+argum,1);
                addItems('https://test.jianbing.com/invest2/user/queryUser/userInviteList/pageNum/1/pageSize/10',1);
            
                if(currentPage > 1){
                    var loading = false;
                    $(document).find('.infinite-scroll').on('scroll', function(e) {
                        //如果正在加载，则退出
                        if(loading) return;
                        //设置flag
                        loading=true;
                        //模拟1s的加载过程
                        setTimeout(function(){
                            // var loadingPage = currentPage + 1;
                            console.log(loadingPage+','+currentPage)
                            if(loadingPage < 10){
                                //加载完毕，则注销无限加载事件，以防不必要的加载
                                $.detachInfiniteScroll($('.wrap-scroll'));
                                return ;
                            }else {
                                addItems('https://test.jianbing.com/invest2/user/queryUser/userInviteList/pageNum/'+currentPage+'/pageSize/10');
                            }
                            //添加新item           	
                            loading=false;
                        },300)
                    })
                }
        },
        render2: function () {
            _this = this;
            currentPage=1,loadingPage=0;
            var falg = true;
            var argum = '&randomTime=';
                //addItems('/member/friend/userInviteJSON.html?'+argum,1);
                _this.addItems('http://test.jianbing.com/invest2/user/queryUser/userInviteAward/2/10',1,currentPage,loadingPage);
                console.log("当前",currentPage)

        },
        loadMore: function () {
            if(currentPage > 1){
                var loading = false;
                $(document).find('.wrap-scroll').on('scroll', function(e) {
                    //如果正在加载，则退出
                    if(loading) return;
                    //设置flag
                    loading=true;
                    //模拟1s的加载过程
                    setTimeout(function(){
                        var loadingPage = currentPage + 1;
                        console.log(loadingPage+','+currentPage)
                        if(loadingPage < 10){
                            //加载完毕，则注销无限加载事件，以防不必要的加载
                            // $.detachInfiniteScroll($('.wrap-scroll'));
                            return ;
                        }else {
                            _this.addItems('https://test.jianbing.com/invest2/user/queryUser/userInviteList/pageNum/'+currentPage+'/pageSize/10');
                        }
                        //添加新item           	
                        loading=false;
                    },300)
                })
            }
        },
        scrollTab: function () {
                // if(currentPage > 1){
                    var loading = false;
                    $(document).find('.wrap-scroll').on('scroll', function(e) {
                        console.log("*****滚动****")
                        console.log(currentPage)
                        //如果正在加载，则退出
                        if(loading) return;
                        //设置flag
                        loading=true;
                        //模拟1s的加载过程
                        setTimeout(function(){
                            var loadingPage = currentPage + 1;
                            console.log(loadingPage+','+currentPage)
                            if(loadingPage < 10){
                                //加载完毕，则注销无限加载事件，以防不必要的加载
                                // $.detachInfiniteScroll($('.wrap-scroll'));
                                return ;
                            }else {
                                _this.addItems('https://test.jianbing.com/invest2/user/queryUser/userInviteList/pageNum/'+currentPage+'/pageSize/10');
                            }
                            //添加新item           	
                            loading=false;
                        },300)
                    })
                // }
        }

    }


    run.start();
})
