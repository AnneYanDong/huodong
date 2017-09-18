require.config(requireConfig);
define(["jquery", "ct", "bridge", "Vue-dev", "FullPage"], function($, ct, Bridge, Vue, FullPage) {

  var oP = Object.create(ct.Prompt);
  oP.create().build();

  var oM = Object.create(ct.Mask);
  oM.create().build();

  var local = ct.Tool.local();
  var app = ct.Tool.userAgent();

  var cookie = Object.create(ct.Cookie);

  ct.Tool.buryPoint_v2(0);

  ct.Tool.share();

  var run = {
    start: function() {
      var _this = this;

      /*解决移动端click点击300延迟*/
      // fastClick.attach(document.body);

      /*设置HTML的font-size*/
      ct.Tool.setFont();
      window.addEventListener("resize", ct.Tool.debounce(ct.Tool.setFont));

      /*图片预加载*/
      ct.Tool.imgPreLoad({
        callback: function() {
          this.hintLog("图片加载完成");
          var timer = null;
          clearTimeout(timer);
          timer = setTimeout(function() {
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
          tag: "87_1_0_33_进入页面"
        }),
        success: function(d) {
          if (d.success == true) {

          }
        }
      })
    },
    init: function() {
      var self = this;
      window.vm = new Vue({
        el: ".wp",
        data: {
          wpShow: false,
          pageOneshow: false,
          pageTwoshow: false,
          pageThreeshow: false,
          pageFourshow: false,
          pageFiveshow: false,
          choose: {
            cardAmount: 0,
            bank: 0,
            base: 0
          },
          page: {
            show: null,
            now: ''
          },
          maskStatus: false,
          ruleStatus: false
        },
        created: function() {

        },
        mounted: function() {
          this.share();
        },
        watch: {

        },
        mounted: function() {
          $(".vue-pre-loading").fadeOut();
          this.wpShow = true;
          this.$nextTick(function() {
            self.fullPageObj = this.fullpage();
          })
        },
        methods: {
          showRule: function() {
            this.ruleStatus = !this.ruleStatus;
            this.maskStatus = !this.maskStatus;
          },
          share: function() {
            if (app.isGjj && Bridge) {
              Bridge.action('quickIcon', {
                thumb: "https://r.51gjj.com/image/static/ico_title_share_dark.png",
                onclick: function() {
                  Bridge.action('ShareTimeline', {
                    "title": "公积金定制大额信用卡，白拿8万理财金！",
                    'desc': "还有298元现金红包送~",
                    "thumb": "https://r.51gjj.com/act/release/img/20170913_wx_xykdz.jpg",
                    "link": "https://" + local.host + "act/home/huodong/20170913/index.php#page=page0"
                  });
                }
              })
            }
          }
        }
      })
    }
  }

  run.start();
})