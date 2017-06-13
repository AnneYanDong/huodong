<?php 
    $title = "蛋愿有奖"; // 配置标题的，必须
    include "../public/v1/header.php";
?>
<?php
    $actDate = "20170419"; // 配置图片的，必须
    $obj = new Resource; // 实例化获取资源类
    $res = $obj->getResStr($actDate); // 获取指定的活动资源，返回数组，array("css"=> "..", "js"=>"。。")
    $origin = $_SERVER['HTTP_HOST'];
    if (preg_match('/b\.jianbing\.com/', $origin) || preg_match('/kaifa\.jianbing\.com/', $origin)) {
        $imgUrl = '//r.51gjj.com/act/release/img/' . $actDate . '_';
    } else {
        $imgUrl = '../static/img/' . $actDate . '_';
    };

    $nowTime = time();

?>
    <link rel="stylesheet" href="<?php echo $res['css'] ?>">
    <style>
        /* 加载动画颜色配置 */
        .loading-bg-color {
            background: #c40107;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #c40107 !important;
        }
    </style>
    <script>
        // 埋点后缀用
        var projectName = "<?php echo $actDate ?>";
    </script>
    </head>
    <body>
    <div class="wp hide">
        <div class="curtain l-curtain"></div>
        <div class="curtain r-curtain"></div>
        <div class="content">
            <div class="rule-btn" bp="点击规则" @click="showRule()">规则</div>
            <div class="title-wrap">
                <h1 class="main-title"></h1>
                <h6 class="sub-title"></h1>
                <p class="desc">华为P10 plus/扫地机器人、腾讯视频会员天天送</p>
            </div>
            <div class="tv-wrap">
                <div class="tv-info">
                    <div class="join-people">
                        <h6 class="num" v-text="tvList.totalPeople"></h6>
                        <p class="desc">累计参与人数</p>
                    </div>
                    <div class="send-big-prize">
                        <h6 class="num" v-text="tvList.totalSendBigPrize"></h6>
                        <p class="desc">送出华为P10plus/扫地机器人</p>
                    </div>
                    <div class="send-tx-member">
                        <h6 class="num" v-text="tvList.totalSendMember"></h6>
                        <p class="desc">送出腾讯视频会员</p>
                    </div>
                </div>
                <div class="tv-orange">
                    <div class="tv-grey">
                        <ul class="tv-list" ref="tvList">
                            <li class="tv-item" v-for="(item,index) in tvList.list" :class="{'today-icon': item.today, 'tv-item-index4': index===clickNum, 'tv-item-left': index < clickNum, 'tv-item-right': index > clickNum}" :style="{'z-index': index===clickNum ? 4 : 1}">
                                <div class="date" :class="{'today-bg': item.today, 'otherday-bg': !item.today}">{{item.today ? '今 日' : item.date}}</div>
                                <div class="prize-state">
                                    <div class="prize-item">
                                        <img data-src="<?php echo $imgUrl; ?>p10.png">
                                        <p class="num" style="color: #bc0009;">{{"x" + item.phone}}</p>
                                    </div>
                                    <div class="prize-item">
                                        <img data-src="<?php echo $imgUrl; ?>saodi.png">
                                        <p class="num" style="color: #ff7c27;">{{"x" + item.robot}}</p>
                                    </div>
                                    <div class="prize-item">
                                        <img data-src="<?php echo $imgUrl; ?>member.png">
                                        <p class="num" style="color: #2b83e9;">{{"x" + item.qqMember}}</p>
                                    </div>
                                </div>
                                <div class="prize-process">
                                    <div class="process-line">
                                        <div class="pos phone-pos" bp="电视机查看彩蛋-手机蛋" v-if="item.phoneEgg" v-bind:style="{left: rest(item,'phoneEgg',1,1)}" @click="robEgg(item,item.phoneEgg,1)">查看彩蛋</div>
                                        <div class="pos robot-pos" bp="电视机查看彩蛋-机器蛋" v-if="item.robotEgg" v-bind:style="{left: rest(item,'robotEgg',1,2)}" @click="robEgg(item,item.robotEgg,1)">查看彩蛋</div>
                                        <div class="pos robot-pos" bp="电视机查看彩蛋-机器蛋" v-if="item.robotEgg2" v-bind:style="{left: rest(item,'robotEgg2',1,2)}" @click="robEgg(item,item.robotEgg2,1)">查看彩蛋</div>
                                        <div class="pos robot-pos" bp="电视机查看彩蛋-机器蛋" v-if="item.robotEgg3" v-bind:style="{left: rest(item,'robotEgg3',1,2)}" @click="robEgg(item,item.robotEgg3,1)">查看彩蛋</div>
                                        <div class="process-running"></div>
                                    </div>
                                    <div class="process-start">0</div>
                                    <div class="process-desc" v-text="rest(item)"></div>
                                    <div class="process-end">10000</div>
                                </div>
                            </li>
                        </ul>
                        <div class="dir prev" ref="tvPrev"></div>
                        <div class="dir next" ref="tvNext"></div>
                    </div>
                </div>
            </div>
            <div class="egg-wrap">
                <div class="egg-title-wrap">
                    <h5 class="title"></h5>
                    <div class="desc">每日10000个彩蛋 砸中即中奖</div>
                    <div class="egg-introduction">
                        <h6 class="introduction">彩蛋介绍</h6>
                        <div class="egg-type">
                            <div class="egg-type-item xd"></div>
                            <h6 class="type-title">喜蛋</h6>
                            <p class="type-desc">华为P10plus</p>
                        </div>
                        <div class="egg-type">
                            <div class="egg-type-item ltd"></div>
                            <h6 class="type-title">邋遢蛋</h6>
                            <p class="type-desc">扫地机器人</p>
                        </div>
                        <div class="egg-type">
                            <div class="egg-type-item fhd"></div>
                            <h6 class="type-title">复活蛋</h6>
                            <p class="type-desc">复活一次</p>
                        </div>
                        <div class="egg-type">
                            <div class="egg-type-item ywd"></div>
                            <h6 class="type-title">烟雾蛋</h6>
                            <p class="type-desc">收到空气</p>
                        </div>
                        <div class="egg-type">
                            <div class="egg-type-item cyd"></div>
                            <h6 class="type-title">查页蛋</h6>
                            <p class="type-desc">任务蛋</p>
                        </div>
                        <div class="egg-type">
                            <div class="egg-type-item sqd"></div>
                            <h6 class="type-title">申请蛋</h6>
                            <p class="type-desc">任务蛋</p>
                        </div>
                    </div>
                    <div class="my-egg" bp="我的彩蛋" @click="myEgg"></div>
                </div>
                <div class="break-egg">
                    <div class="break-egg-title"></div>
                    <ul class="egg-list">
                        <li class="egg-item" v-for="n in 10">
                            <div class="egg-box" :class="eggClass(item.eggType)" v-for="(item,index) in eggArrGroup(n)" @click="breakEgg(item,0)" bp="普通砸蛋"></div>
                        </li>
                    </ul>
                </div>
            </div>            
        </div>
        <transition name="scale">
            <template v-if="ruleStatus">
                <div class="rule zm-customer-confirm">
                    <h6>活动规则</h6>
                    <ul>
                        <li><span>1.</span>4.30-5.12活动期间，用户进入活动页面即可参与砸彩蛋活动，每位用户初始均有一次砸蛋机会</li>
                        <li><span>2.</span>用户在使用完第一次砸蛋机会后，可根据提示消息操作以获得继续砸蛋机会，未按提示操作用户则无法继续</li>
                        <li><span>3.</span>活动每日开放10000个彩蛋，砸到即中奖，符合领取条件即可领取，不符合的用户奖品将会自动失效</li>
                        <li><span>4.</span>本次活动奖品华为P10 plus和扫地机器人需申请成功并完成放款／开卡后方可领取，通过申请蛋完成任意申请的用户可获得腾讯视频会员1个月（每日限前800名）</li>
                        <li><span>5.</span>成功申请浦发卡的用户可额外获得318元专享现金红包（其中等价于30元的2017个积分在完成申请后24h内发放，288元现金在放款后3个工作日内打款至个人支付宝）</li>
                        <li><span>6.</span>成功申请兴业卡的用户可额外获得50元话费奖励（话费自动充值至银行预留手机号），领完为止</li>
                        <li><span>7.</span>成功申请金薪贷的用户可额外获得100元抵息券，放款后还款时抵用</li>
                        <li><span>8.</span>成功申请金盈贷的用户可额外获得30元抵息券，放款后还款时抵用</li>
                        <li><span>9.</span>已拥有本活动所推广业务的奖品，或已成功申请过本活动所推广业务通过本活动重复申请，均不可获得奖品，且同一用户不可重复领取同一奖励</li>
                        <li><span>10.</span>获得奖品领取资格后请及时前往“我的奖品”填写信息，超时7天未领取将自动失效</li>
                        <li><span>11.</span>有任何疑问或者帮助可联系客服4008635151</li>
                        <li><span>12.</span>活动最终解释权归杭州煎饼网络技术有限公司所有</li>
                    </ul>
                    <div class="close-btn" @click="showRule()"></div>
                </div> 
            </template>
        </transition>
        <transition name="fade-slow">
            <template v-if="maskStatus">
                <div class="mask"></div>
            </template>
        </transition>
        
        <transition name="scale">
            <template v-if="eggPopStatus">
                <div class="center-wrap" style="z-index:100">
                    <div class="egg-pop-wrap">
                        <div class="close-wrap" @click="close">
                            <div class="close"></div>
                        </div>
                        <div class="timing" v-if="(egg.breakEgg.eggType === 1 || egg.breakEgg.eggType === 2) && egg.breakEgg.eggStatus !== 0 && egg.breakEgg.operateType !== 1" v-text="restTime"></div>
                        <div class="egg-icon" :class="resEggCls(egg.breakEgg.eggType)['resCls']"></div>
                        <div class="egg-pop-top">
                            <p class="egg-break-title" v-text="egg.breakEgg.operateType === 0 || egg.breakEgg.operateType === 2 ? resEggCls(egg.breakEgg.eggType)['txt'] : egg.breakEgg.eggTitle"></p>
                            <p class="egg-break-desc" v-html="egg.breakEgg.operateType === 0 || egg.breakEgg.operateType === 2 ? resEggCls(egg.breakEgg.eggType)['desc'] : egg.breakEgg.eggGotInfo"></p>
                            <div class="egg-history" v-if="egg.breakEgg.operateType === 1">
                                <div class="egg-history-des-box">
                                    <span class="egg-history-des">他的经历</span>
                                </div>
                                <div class="egg-history-box">
                                    <div class="egg-history-egg-icon" v-for="(item,index) in egg.breakEgg.eggHistory" :class="resEggCls(item)['historyCls']"></div>
                                </div>
                            </div>
                            <p class="how-get-desc" v-if="egg.breakEgg.operateType === 0 || egg.breakEgg.operateType === 2" v-text="resEggCls(egg.breakEgg.eggType)['howGetDesc']"></p>
                        </div>
                        <div class="egg-pop-middle" v-if="egg.breakEgg.operateType === 1">
                            <div class="ice-egg" v-if="egg.breakEgg.eggStatus === 1">
                                <div class="ice-egg-icon">
                                    <span :class="{'ice-jqregg': egg.breakEgg.eggType === 2, 'ice-p10egg': egg.breakEgg.eggType === 1}"></span>
                                </div>
                                <div class="ice-egg-state">
                                    <div class="ice-egg-middle-wrap">
                                        <div class="ice-egg-middle">
                                            <p>当前状态：<span class="state-res">已被占用</span></p>
                                            <p>释放倒计时：<span class="state-res res-time" v-text="restTime"></span></p> 
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="ice-egg" v-if="egg.breakEgg.eggStatus === 2">
                                <div class="ice-egg-icon">
                                    <span :class="{'ice-jqregg': egg.breakEgg.eggType === 2, 'ice-p10egg': egg.breakEgg.eggType === 1}"></span>
                                </div>
                                <div class="ice-egg-state">
                                    <div class="ice-egg-middle-wrap">
                                        <div class="ice-egg-middle">
                                            <p>当前状态：<span class="state-res">开放抢蛋</span></p>
                                            <p>释放倒计时：<span class="state-res res-time">00:00</span></p> 
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="got-egg" v-if="egg.breakEgg.eggStatus === 0">
                                <div class="got-egg-icon">
                                    <span :class="{'got-jqregg': egg.breakEgg.eggType === 2, 'got-p10egg': egg.breakEgg.eggType === 1}"></span>
                                </div>
                                <div class="got-egg-info">
                                    <div class="got-egg-middle-wrap">
                                        <div class="got-egg-middle">
                                            <h6 class="prize-title" v-text="egg.breakEgg.giftName"></h6>
                                            <p class="prize-des" v-text="egg.breakEgg.giftDesc"></p>
                                            <div class="prize-state">已领走</div>        
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <p class="remind" v-if="egg.breakEgg.eggStatus !== 0">提醒：每位用户在砸中奖品蛋后有30min的领取时间超时未领取彩蛋将自动释放，其余已申请活动业务的用户均可在本页面争抢</p>
                        </div>
                        <div class="egg-pop-bottom">
                            <template v-if="egg.breakEgg.operateType === 0 || egg.breakEgg.operateType === 2">
                                <div class="btn bg-orange" bp="马上去按钮" @click="noRobAction">马上去</div>
                            </template>
                            <template v-else="egg.breakEgg.operateType === 1">
                                <div class="btn" bp="抢蛋按钮" :class="{'bg-orange': egg.breakEgg.eggStatus === 2, 'bg-grey': egg.breakEgg.eggStatus !== 2}" @click="rob">抢蛋</div>
                            </template>
                        </div>
                    </div>     
                </div>   
            </template>
        </transition>

        <transition name="scale">
            <template v-if="myEggStatus">
                <div class="center-wrap" style="z-index:99">
                    <div class="my-broke-egg">
                        <div class="close-wrap" @click="close">
                            <div class="close"></div>
                        </div>
                        <h6 class="title">我的彩蛋</h6>
                        <template v-if="history.eggHistory.length > 0">
                            <ul class="my-egg-list">
                                <li v-for="n in Math.ceil(history.eggHistory.length / 3)">
                                    <div class="egg-item" v-for="(item,index) in eggHistoryGroup(n)" bp="砸我的彩蛋中的蛋" @click="breakMyEgg(item,2)">
                                        <span class="my-egg-item" :class="eggType(item.eggType)['cls']"></span>
                                        <p class="my-egg-title" v-text="eggType(item.eggType)['txt']"></p>
                                        <p class="my-egg-des" v-text="eggType(item.eggType)['des']"></p>
                                    </div>
                                </li>
                            </ul>    
                        </template>
                        <template v-else>
                            <p class="no-egg">您还没有砸到任何彩蛋，马上返回彩蛋池砸彩蛋，赢取华为P10 plus！</p>
                        </template>
                    </div>    
                </div>                   
            </template>
        </transition>

        <transition name="scale">
            <template v-if='myApplyStatus'>
                <div class="center-wrap" style="z-index:101">
                    <div class="my-apply">
                        <!-- <div class="back"></div> -->
                        <div class="close-wrap" @click="close">
                            <div class="close"></div>
                        </div>
                        <h6 class="title">申请业务拿好礼</h6>
                        <p class="apply-gift-des">申请即送腾讯视频会员</p>
                        <ul class="my-apply-list">
                            <li class="apply-item" v-for="(item,index) in applyList">
                                <div class="left-info">
                                    <img :src="item.img" alt="">
                                </div>
                                <div class="right-info">
                                    <div class="apply-middle-wrap">
                                        <div class="apply-middle">
                                            <div class="des-txt">
                                                <h6 class="title" v-text="item.title"></h6>
                                                <p class="subtitle" v-text="item.subtitle"></p>
                                                <p class="desc" v-text="item.desc"></p>
                                            </div>
                                        </div>
                                    </div>                       
                                </div>
                                <a class="apply-btn" @click="apply(item)">申请</a>
                            </li>
                        </ul>
                    </div>    
                </div>            
            </template>
        </transition>
    </div>
    <script>
        var indexData = {
            ajaxUrl: "<?php echo 'test.php'; ?>",
            nowTime: "<?php echo $nowTime ; ?>"
        };
    </script>
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    </body>
</html>