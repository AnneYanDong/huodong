//引入配置对象
require.config(requireConfig);
require(["jquery", "fastClick", "FullPage", "ct", "bridge", "juicer", "marquee"],function($,fastClick,fullpage,ct,Bridge,juicer, liMarquee) {
	var oMask = $(".mask");
	/*oP和oM的作用是在body元素的最下方默认生成两个div，一个是提示框，一个是遮罩层*/
    var oP = Object.create(ct.Prompt); //提示框对象
    oP.create().build();

    var oM = Object.create(ct.Mask); //遮罩层
    oM.create().build();

    var local = ct.Tool.local(); //获取域名

    ct.Tool.buryPoint(); //统计点击情况

	var run = {
		start: function() {
			console.log("金卡贷活动！");
			var _this = this;

			/*解决移动端click点击300延迟*/
            fastClick.attach(document.body);

			/*设置HTML的font-size*/
            ct.Tool.setFont();
            //这个是给content自动加上固定宽高
            ct.Tool.handleBottomStatusBar();
            window.addEventListener("resize", ct.Tool.debounce(ct.Tool.setFont));
            window.addEventListener("resize", ct.Tool.debounce(ct.Tool.handleBottomStatusBar));


            /*整体预加载动画*/
            var oPreLoading = Object.create(ct.PreLodingUi);
            oPreLoading.create({
                preLoadingCls: "loading-bg-color", // 自定义加载动画颜色
                loadingEleCls: "loading-ele-color"
            }).build();
            var timer = null;
            clearTimeout(timer);
            timer = setTimeout(function() {
                oPreLoading.hide();
                // _this.init();
            }, 500);
            /*图片预加载*/
            ct.Tool.imgPreLoad({
                callback: function() {
                    this.hintLog("图片加载完成");
                    var timer = null;
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        oPreLoading.hide();
                        _this.init();
                    }, 500)
                }
            })
		},

		init: function() {
            var _this = this;
            $('.wp').removeClass('hide');

			// oP.show("出错请重试");
			console.log("初始化成功！");

            //点击规则按钮
            _this.openRule();
            _this.closeRule();

            _this.withdraw();
            _this.pushMsg();
		},

        pushMsg: function() {
            // juicer.register('show_msg',msgs);
            var customerTpl = $('#tpl-customer').html();
            var customerHtml = juicer(customerTpl,customerJson);
            $('.awards-info').append(customerHtml);

            $('.single-info').liMarquee({
                    hoverstop: false,
                    drag: false,
                    scrollamount: 30
            });

            // var spans = $('.msg span');
            // var len = spans.length;
            // var index = 0;
            // $('.msg span').hide();
            // $('.msg span')[0].style.display = 'block';
            // setInterval(function(){
            //     console.log("index:", index);
            //     $('.msg').show();
            //     spans[index].style.display = 'none';
            //     ++ index;
            //     index = (index == len ? 0 : index);
            //     spans[index].style.display = 'block';
            // },6000);
        },
        withdraw: function() {
            $('.apply-wrap').on('click','.withdraw',function(){
                console.log('点击提款');
                window.location.href = 'https://b.jianbing.com/business/home/h5/xianjin/index.php';
            })
        },

        // 打开规则
        openRule: function() {
            $(".content").on("click", ".rule-btn", function(event) {
                oM.show();
                console.log("event target:" + event.target);

                var ruleTpl = $('#tpl-rule').html();
                var resRuleHtml = juicer(ruleTpl,ruleJson);
                // juicer.register("msg_show",msgs);
                $('body').append(resRuleHtml);
                $(".rule").fadeIn();
            })
        },

        // 关闭规则
        closeRule: function() {
            $("body").on("click", ".btn-close", function() {
                $(".rule").fadeOut(function() {
                    oM.hide();
                })
            })
        }
	}

    var ruleJson = {
       rule: [
            "活动期间通过活动页面首次申请金卡贷的新用户完成放款，可获得电影票兑换券一张。奖品将以短信形式发送给您，凭短信到指定影院售票处进行兑换。",
            "每个用户只有1次优惠，优惠不可重复。奖品限前100名放款用户。",
            "见面会、首映会、情人节、平安夜、圣诞节、加长影片、限价片等特殊场次及VIP厅、 IMAX电影除外；适用影院登录看购官网www.kangou.cn进行查询。",
            "有任何问题请咨询51公积金客服热线4008635151或看购客服热线4006776501。",
            "本商品由51公积金管家提供，与设备生产商Apple Inc.公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利"
       ]
    }
    var customerJson = {
        customer: [
            "恭喜用户131****8262获得电影票通用券",
            "用户159****2546完成提款",
            "恭喜用户152****8456获得电影票通用券",
            "用户134****5962完成提款",
        ]
    }
	run.start();
});