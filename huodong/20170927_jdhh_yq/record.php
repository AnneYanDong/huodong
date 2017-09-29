<!doctype html>
<html>
<head>
	<meta charset="UTF-8">
	<title>邀请记录</title>
	<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />
	<meta content="telephone=no" name="format-detection" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<script src="https://r.51gjj.com/act/js/jQuery.min.js?v=2.1.4"></script>
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
    setFont(750, 200);
    </script>
<style>
html {
    font-family: sans-serif;
    font-size: 100px;
    -webkit-text-size-adjust: 100%;
}
body{
	background: url("./img/20170626_jdhh_record_bg_v2.png") no-repeat;
  background-size: 100%;
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
.record-top {
    background: url("./img/20170626_jdhh_record_num_v2.png") no-repeat;
    background-size: 100%;
    font-size: 0.18rem;
    color: #000000;
    font-weight: 600;
    text-align: center;
    width: 3.376rem;
    height: .46rem;
    line-height: .46rem;
    box-sizing: border-box;
    position: absolute;
    top: 0.25rem;
    margin-left: -1.688rem;
    left: 50%;
}
.record-panel {
    width: 3.376rem;
    min-height: 2.5rem;
    border-radius: 0 0 0.08rem 0.08rem;
    background: #ffffff;
    padding: 0 0.1rem;
    position: absolute;
    margin-left: -1.688rem;
    left: 50%;
    top: 0.707rem;
}
.panel-title {
    height: 0.4rem;
    border-radius: 0.05rem 0.05rem 0 0;
    border-bottom: 1px dashed #bfbfbf;
}
.page-cont .panel-title span {
    height: 0.4rem;
    font-size: 0.17rem;
    float: left;
    line-height: 0.4rem;
    color: #333333;
}
.page-cont .panel-title span:first-child {
    width: 1.5rem;
}
.page-cont .panel-title span:last-child {
    border-right: none;
    float: right;
}
.record-panel ul {
    max-height: 3.3rem;
    overflow: scroll;
}
.record-panel ul li {
    height: 0.4rem;
    border-bottom: 1px dashed #bfbfbf;
}
.page-cont .record-panel ul li span {
    font-size: 0.14rem;
    line-height: 0.4rem;
    display: inline-block;
    float: left;
}
.page-cont .record-panel ul li span:last-child {
    border-right: none !important;
}
.record-panel ul li span:last-child {
    border-right: none;
}
.page-cont .record-panel ul li:last-child {
    margin-bottom: 0.4rem;
}
.page-cont .record-panel ul li span:nth-child(1) {
    width: 1.5rem;
}
.page-cont .record-panel ul li span:nth-child(2) {
    /*background: #ffa143;*/
    width: 0.7rem;
    height: 0.225rem;
    border-radius: 3px;
    font-size: 0.12rem;
    box-sizing: border-box;
    line-height: 0.225rem;
    margin-top: 0.07rem;
    text-align: center;
    color: #ffffff;
}
.add-red {
    background: #ffa143;
}
.add-grey {
    background: #dcdcdc;
}
.page-cont .record-panel ul li span:nth-child(3) {
    /*background: #dcdcdc;*/
    color: #ffffff;
    font-size: 0.12rem;
    box-sizing: border-box;
    line-height: 0.225rem;
    height: 0.225rem;
    margin-top: 0.07rem;
    text-align: center;
    width: 0.7rem;
    border-radius: 3px;
    float: right;
}
.record-btn-invite {
    width: 2.05rem;
    font-size: 0.17rem;
    top: 5rem;
    position: absolute;
    left: 50%;
    margin-left: -1.025rem;
    background: url("./img/20170626_jdhh_record_btn_sub_v2.png")no-repeat;
    background-size: 100%;
    height: 0.45rem;
}
a{text-decoration:none}
</style>
<body class="share-invite">
<div class="page">
	<div class="page-view">
		<div class="page-cont">
            <div class="record-top">我已成功邀请<span class="record-number">0</span>人<span class="record-cash"></span></div>
            <div class="record-panel">
                <div class="panel-title">
                    <span>成功邀请的好友</span>
                    <span>好友的奖励</span>
                    <!-- <span>我的奖励</span> -->
                </div>
                <ul>
                    <!--<li><span>158********</span><span>10元免息券</span><span>10元免息券</span></li>-->
                </ul>
            </div>
            <div class="record-btn-invite"></div>
		</div>
	</div>
</div>
</body>
<script>
    $.ajax({
        type: "POST",
        dataType: "JSON",
        url: "/app/jdhh/invitations/invitation/get_history_invitation",
        // url: "/app/jdhh/invitation/get_history_invitation",
        success: function (d) {
            $(".record-number").text(d.ret.total_number);
            $(".record-cash").text(d.ret.total_cash);
                if (d.ret.records.length>0) {
                $.each(d.ret.records,function(k,v){
                    $(".record-number").text(d.ret.total);
                    var oLi = $("<li></li>");
                    var oContent = $('<span>'+v.guest_phone+'</span><span class="inviter-statu">'+v.guest_reward_text+'</span>');
                    oLi.append(oContent);
                    if(v.inviter_reward_status == true){
                        oLi.find(".inviter-statu").addClass("add-red");
                    }else{
                        oLi.find(".inviter-statu").addClass("add-grey");
                    }
                    if (v.guest_reward_status == true) {
                        oLi.find(".guest-statu").addClass("add-red");
                    } else {
                        oLi.find(".guest-statu").addClass("add-grey");
                    }
                    $(".record-panel ul").append(oLi);
                })
            } 
        },
        error: function (jqXHR) {
            alert( jqXHR);
        }
    })
    $(".record-btn-invite").click(function() {
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
</script>
</html>


