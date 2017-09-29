
<!doctype html>
<html>
<head>
	<meta charset="UTF-8">
	<title>邀请活动</title>
	<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />
	<meta content="telephone=no" name="format-detection" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <link href="//b.jianbing.com/act/home/huodong/static/css/mtool.css" rel="stylesheet" type="text/css"/>
	<script src="//r.51gjj.com/act/js/jQuery.min.js?v=2.1.4"></script>
  <script src='//r.51gjj.com/package/bridge.js'></script>
</head>
    <script>
    function setFont(d, c) {
        var b = {},
            a = document,
            f;
        b.widthProportion = function() {
            var e = (a.body && a.body.clientWidth || a.getElementsByTagName("html")[0].offsetWidth || window.innerWidth) / d;
            return e
        };
        b.changePage = function() {
            var f = b.widthProportion() * c,
                obj = a.getElementsByTagName("html")[0];
            obj.setAttribute("style", "font-size:" + f + "px !important");
            var style = null;
            if (window.getComputedStyle) {
                style = window.getComputedStyle(obj, null);
                font = style.fontSize;
                font = Number(font.replace("px", ""));
                if (font > f) {
                    var per = font / f;
                    obj.setAttribute("style", "font-size:" + f / per + "px !important");
                }
            }
        };
        b.changePage();
        addEventListener("resize", b.changePage, false);
    }
    setFont(750, 100);
    </script>
<style>
html {
    font-family: sans-serif;
    /*font-size: 100px;*/
    -webkit-text-size-adjust: 100%;
}
body{
    background: #ea3c34;
}
.page * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;padding: 0;margin: 0;font-style: normal;list-style: none;
}
.page-view {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 1;
}
.page-view .page-cont {
  position: relative;
  width: 100%;
  height: 100%;
}
.page-view .page-cont .page-main {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.share-invite .page-view {
  /*background-image: url("./img/20170626_jdhh_yaoqing111.jpg");*/
  /*background-position: center;*/
  background-size: 100%;
  background-repeat: no-repeat;
  /*background-position: center top;*/
}
.share-reward {
  width: 3.5rem;
  border: 2px solid #ea6264;
  height: 1rem;
  margin-left: -1.75rem;
  left: 50%;
  position: absolute;
  top: 5.9rem;
  background: #f9f9f9;
  border-radius: 0.1rem;
}
.share-icon {
  background: url("./img/20170626_jdhh_icon.png");
  background-repeat: no-repeat;
  background-size: 100%;
  height: 0.35rem;
  width: 1.4rem;
  top: -0.2rem;
  position: absolute;
  margin-left: -0.7rem;
  left: 50%;
  font-size: 0.2rem;
  color: #ffeb44;
  line-height: 0.3rem;
  padding-left: 0.17rem;
}
.invite-load {
  font-size: 0.175rem;
  text-align: center;
  width: 100%;
  color: #f3586c;
  margin-top: 0.3rem;
}
a{text-decoration:none}
.invite-ticket {
  text-align: center;
  width: 100%;
  color: #963549;
  font-size: 0.175rem;
}
.btn-invite {
    position: absolute;
    top: 8.9rem;
    width: 3.6rem;
    height: 1.1rem;
    left: 50%;
    margin-left: -1.8rem;
}
.invite-load1 {
    font-size: 0.35rem;
    text-align: center;
    width: 100%;
    color: #f3586c;
    position: absolute;
    top: 11.3rem;
}
.invite-ticket1 {
    text-align: center;
    width: 100%;
    color: #963549;
    font-size: 0.35rem;
    position: absolute;
    top: 11.88rem;
}

.code-show-rule {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.7);
    display: none; 
}
.hide {
  display: none;
}
.page-cont img {
  width: 100%;
}
.jddhh-title {
    width: 100%;
    position: absolute;
    top: 0.75rem;
    padding-left: 0.8rem;
}
.jddhh-title img {
    width: 6.47rem;
}
.sub-btn {
    width: 84%;
    height:1rem;
    position: absolute;
    left: 0;right: 0;
    bottom: 0.45rem;
    margin: auto;
    z-index: 5;
    font-size: 0.44rem;
    line-height: 1rem;
    text-align: center;
    background:#ee672c;
    color:  #ffe167;
    border-radius: 0.1rem;
    letter-spacing:0.08rem;
}
.picaBox{
  position: relative;
}
</style>
<body class="share-invite">
<div class="page">
	<div class="page-view">
		<div class="page-cont">
        <div class="picaBox">
          <img  src="./img/jdhh1001bga.png">
          <div class="sub-btn">
            邀请赚钱
          </div>
        </div>
        <div>
          <img  src="./img/jdhh1001bgb.png">
        </div>
        
		</div>
	</div>
</div>
</body>
<script>
  $(".sub-btn").click(function () {console.log("邀请；；；")
    var host = window.location.host;
    $.ajax({
      type: "POST",
      dataType: "JSON",
      url: "/app/jdhh/invitations/invitation/get_invitation_status",
      success: function (d) {
          if (!!d.success) {console.log(d.ret.inviter_uid)
            Bridge.action('ShareTimeline', {
              "title": "1000元现金10分钟到账，推荐你试试看！",
              'desc': "我在用51借点花花，送你20元免息券，快用起来~",
              "thumb": "https://r.51gjj.com/act/release/img/20170927_pro.png",
              // "link": "https://" + host + "/act/home/huodong/20170927_jdhh_yq/index.php?inviter_uid="+d.ret.inviter_uid
              "link": "https://"+host+".jianbing.com/hd/20170628_jdhh_out/index.php?inviter_uid="+d.ret.inviter_uid
            });
          } else if (d.code == 0){
            alert(d.msg || "出错请重试");
          } else{
            alert(d.msg || "出错请重试");
            }
      },
      error: function (jqXHR) {
        alert(jqXHR);
      }
    })
  })
    var host = window.location.host;
    Bridge.action('quickIcon', {
        "text": "邀请记录",
        "title": "邀请记录",
        "thumb": "https://r.51gjj.com/act/release/img/20170628_share.jpeg",
        "color": "#ffffff",
        "link": "https://" + host + "/hd/20170927_jdhh_yq/record.php"
    })
</script>
</html>


