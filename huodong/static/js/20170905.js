require.config(requireConfig);
require(["jquery", "fastClick", "FullPage", "ct", "bridge", "juicer", "qrcode"], function ($, fastClick, fullpage, ct, Bridge, juicer,qrcode) {
    var oMask = $(".mask");

    var oP = Object.create(ct.Prompt);
    oP.create().build();

    var oM = Object.create(ct.Mask);
    oM.create().build();

    var local = ct.Tool.local();
    var host = window.location.host

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
            _this.showQrcode();
            _this.closeQrcode();
            _this.invite();
            _this.record();
        },
        showQrcode: function () {
            if (document.getElementById('qrcode-show')) {
                var url = "https://" + host + "/act/home/20170905/index.php?code=123456";
                var qrcode = new QRCode(document.getElementById('qrcode-show'),{
                    // width:$("#qrcode").height(),
                    // height:$("#qrcode").height(),
                    width: 100,
                    height: 100,
                    colorDark:'#000000',
                });
                qrcode.makeCode(url);
                var qrcodeBig = new QRCode(document.getElementById('qrcodeBig'),{
                    width:$("#qrcodeBig").height(),
                    height:$("#qrcodeBig").height(),
                    colorDark:'#000000',
                });
                qrcodeBig.makeCode(url);
                $("#qrcode-show").on('click', function(event) {
                  $("#JS-code-show").show()
                  event.preventDefault();
                  /* Act on the event */
                });
              }
        },
        closeQrcode: function () {
            $('#JS-code-close').on('click',function() {
                $("#JS-code-show").hide()
            })
        },
        invite: function () {
            $('.invite_btn').on('click', function() {
                Bridge.action('ShareTimeline', {
                    "title": "您的好友送你25元现金，真钱可提现！",
                    'desc': "跟着好友加入51有钱，一起来理财！",
                    "thumb": "https://r.51gjj.com/act/release/img/20170525172908_share.png",
                    "link": "https://" + host + "/act/home/20170905/index.php?code=123456"
                });
            })
        },
        record: function () {
            $(".invite-record-btn").on('click', function () {
                window.location.href = "record.php";
            })
        }

    }


    run.start();
})
