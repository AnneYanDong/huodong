//引入配置对象
require.config(requireConfig);
require(["jquery", "fastClick", "FullPage", "ct", "bridge", "juicer"], function ($, fastClick, fullpage, ct, Bridge, juicer) {
    var oMask = $(".mask");
    /*oP和oM的作用是在body元素的最下方默认生成两个div，一个是提示框，一个是遮罩层*/
    var oP = Object.create(ct.Prompt); //提示框对象
    oP.create().build();

    var oM = Object.create(ct.Mask); //遮罩层
    oM.create().build();

    var local = ct.Tool.local(); //获取域名

    ct.Tool.buryPoint(); //统计点击情况

    var run = {
        start: function () {
            console.log("鑫福贷活动！");
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
            timer = setTimeout(function () {
                oPreLoading.hide();
                // _this.init();
            }, 500);
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

            // $.ajax({
            //     type: "POST",
            //     dataType: "JSON",
            //     url: ct.Tool.url("/app/request/activity"),
            //     data: JSON.stringify({
            //         place_cid: ct.Tool.userAgent().isGjj ? 1 : 0,
            //         tag: "进入页面" + projectName
            //     }),
            //     success: function (d) {
            //         if (d.success == true) {

            //         }
            //     }
            // })

        },


        init: function () {
            var _this = this;

            // $.ajax({
            //     type: "POST",
            //     dataType: "JSON",
            //     url: ct.Tool.url("/app/request/activity"),
            //     data: JSON.stringify({
            //         place_cid: ct.Tool.userAgent().isGjj ? 1 : 0,
            //         tag: "进入页面" + projectName
            //     }),
            //     success: function (d) {
            //         if (d.success == true) {

            //         }
            //     }
            // });

            //点击规则按钮
            _this.openRule();
            _this.closeRule();
        },
        openRule: function () {
            $(".content").on("click", ".rule-btn", function (event) {
                oM.show();
                console.log("event target:" + event.target);

                var ruleTpl = $('#tpl-rule').html();
                var resRuleHtml = juicer(ruleTpl, ruleJson);
                // juicer.register("msg_show",msgs);
                $('body').append(resRuleHtml);
                $(".rule").fadeIn();
            })
        },

        // 关闭规则
        closeRule: function () {
            $("body").on("click", ".btn-close", function () {
                $(".rule").fadeOut(function () {
                    oM.hide();
                })
            })
        }
    }

    var ruleJson = {
        rule: [
            "活动仅限于首次申请鑫福贷的用户；",
            "申请被拒可获得15元现金红包，成功放款可获得115元现金红包。为了您能够顺利拿到奖励，请申请业务后及时关注“我的奖品”提示；",
            "现金红包将在7个工作日内发放到您的支付宝账户，领取时请填写正确的个人支付宝账户；",
            "关于活动有任何疑问请咨询官方客服热线4008635151；",
            "本商品由51公积金管家提供，与设备生产商Apple Inc.公司无关，杭州煎饼网络技术有限公司拥有在法律允许范围内解释本活动的权利。"
        ]
    }
    run.start();

});