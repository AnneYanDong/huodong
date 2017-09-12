require.config(requireConfig);
require(["jquery", "fastClick", "FullPage", "ct", "bridge", "juicer", "qrcode"], function ($, fastClick, fullpage, ct, Bridge, juicer, qrcode) {
    var oMask = $(".mask");

    var oP = Object.create(ct.Prompt);
    oP.create().build();

    var oM = Object.create(ct.Mask);
    oM.create().build();

    var local = ct.Tool.local();
    var host = window.location.host;
    var state = 1;
    var currentPage_1 = 1,
        loadingPage_1 = 0;
    var currentPage_2 = 1,
        loadingPage_2 = 0;
    var more_1 = 0;
    var more_1 = 0;
    var cur_1 = 1;
    var cur_2 = 1;
    var flag = true;

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
            // _this.loadMore();
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
                    state = 1;
                    // _this.render1();
                } else {
                    state = 2;
                    if (flag == true) {
                        _this.render2();
                        flag = false;
                    } 
                }
            })
        },
        addItems: function (url) {
            var _this = this;
            $.ajax({
                type: 'POST',
                url: url,
                dataType: 'json',
                async: false,
                success: function (json) {
                    if (state == 1) {
                        var html = '';
                        var inviteSue = 0;
                        if (json.resData.userInvites != '') {
                            loadingPage_1 = json.resData.userInvites.length;
                            for (var i = 0; i < loadingPage_1; i++) {
                                var userName = json.resData.userInvites[i].userName;
                                var inviteTime = json.resData.userInvites[i].inviteTime;
                                var inviestTotal = json.resData.userInvites[i].inviestTotal;

                                if (investTotal > 0) {
                                    inviteSue++;
                                }
                                html += '<li class="record-list"><span>' + userName + '</span><span>' + inviteTime + '</span><span>' + inviestTotal + '</span></li>';
                            }
                            $(".wrap-tab .record-on .wrap-scroll").append(html);
                        } else if (currentPage_1 == 1) {
                            loadingPage_1 = 0;
                            $(".wrap-tab .cur .wrap-scroll li").remove();
                        } else {
                            $('.wrap-scroll').unbind('scroll');
                        }
                        currentPage_1++;
                        cur_1 = currentPage_1;
                        console.log("当前cur", cur_1)
                        more_1 = loadingPage_1;
                    } else {
                        var html = '';
                        var inviteSue = 0;
                        if (json.resData.list != '') {
                            loadingPage_2 = json.resData.list.length;
                            for (var i = 0; i < loadingPage_2; i++) {
                                var accountTime = json.resData.list[i].accountTime;
                                var money = json.resData.list[i].money;
                                var relaName = json.resData.list[i].relaName;
                                var investTotal = loadingPage_2;

                                if (investTotal > 0) {
                                    inviteSue++;
                                }
                                html += '<li class="record-list"><span>' + accountTime + '</span><span>' + money + '</span><span>' + relaName + '</span></li>';
                            }
                            $(".wrap-tab .cur .wrap-scroll").append(html);
                        } else if (currentPage_2 == 1) {
                            loadingPage_2 = 0;
                            $(".wrap-tab .cur .wrap-scroll li").remove();
                        } else {
                            $('.wrap-scroll').unbind('scroll');
                        }
                        currentPage_2++;
                        cur_2 = currentPage_2;
                        console.log("当前cur", cur_2)
                        more_2 = loadingPage_2;
                    }
                }
            })

        },
        render1: function () {
            _this = this;
            var falg = true;
            _this.addItems('//test.jianbing.com/invest2/user/queryUser/userInviteList/pageNum/1/pageSize/10');
        },
        render2: function () {
            _this = this;
            var falg = true;
            _this.addItems('//test.jianbing.com/invest2/user/queryUser/userInviteAward/1/10');

        },
        scrollTab: function () {
            var _this = this;
            var loading_1 = false;
            $(document).find('.record-on .wrap-scroll').on('scroll', function (e) {
                if (loading_1) return;
                loading_1 = true;
                setTimeout(function () {
                    if (more_1 < 10) {
                        $('.record-on .wrap-scroll').unbind('scroll');
                        return;
                    } else {
                        _this.addItems('//test.jianbing.com/invest2/user/queryUser/userInviteList/pageNum/' + cur_1 + '/pageSize/10');
                    }
                    loading_1 = false;
                }, 300)

            })
            var loading_2 = false;
            $(document).find('.cur .wrap-scroll').on('scroll', function (e) {
                if (loading_2) return;
                loading_2 = true;
                setTimeout(function () {
                    if (loadingPage_2 < 10) {
                        $('.cur .wrap-scroll').unbind('scroll');
                        return;
                    } else {
                        _this.addItems('//test.jianbing.com/invest2/user/queryUser/userInviteAward/' + cur_2 + '/10');
                    }
                    loading_2 = false;
                }, 300)
            })
        }

    }


    run.start();
})