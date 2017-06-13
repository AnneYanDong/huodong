<?php 
    $title = "信用卡定制"; // 配置标题的，必须
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
?>
    <link rel="stylesheet" href="<?php echo $res['css'] ?>">
    <style>
        /* 加载动画颜色配置 */
        .loading-bg-color {
            background: #0d0d0d;
        }

        .loading-ele-color:after, .loading-ele-color:before {
            background: #0d0d0d !important;
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
                                        <div class="pos phone-pos" v-show="item.phoneEgg" v-bind:style="{left: rest(item,1,1)}">查看彩蛋</div>
                                        <div class="pos robot-pos" v-show="item.robotEgg" v-bind:style="{left: rest(item,1,2)}">查看彩蛋</div>
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
                    <div class="desc">每日10000个彩蛋 砸中即中</div>
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
                    <div class="my-egg" @click="myEgg"></div>
                </div>
                <div class="break-egg">
                    <div class="break-egg-title"></div>
                    <ul class="egg-list">
                        <li class="egg-item" v-for="n in 10">
                            <div class="egg-box" :class="eggClass(item.eggType)" v-for="(item,index) in eggArrGroup(n)" @click="breakEgg(item)"></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <my-mask :mask-status="maskStatus"></my-mask>
        <my-break-egg-pop :egg-pop-status="eggPopStatus" :egg="egg" v-on:closerompt="closePop"></my-break-egg-pop>
        <my-egg :my-egg-status="myEggStatus" v-on:closerompt="closePop" ref="myEgg"></my-egg>
        <my-apply :my-apply-status="myApplyStatus" :applylist="applyList"  v-on:closerompt="closePop"></my-apply>
    </div>
    <script>
        var indexData = {
            ajaxUrl: "<?php echo 'test.php'; ?>"
        };
    </script>
    <script src="../static/js/lib/require.min.js" data-main="<?php echo $res['js'] ?>"></script>
    <script type="text/x-template" id="oMask">
        <transition name="fade-slow">
            <div class="mask" v-show="maskStatus"></div>
        </transition>
    </script>
    <script type="text/x-template" id="break-egg-pop">
        <transition name="scale">
            <div class="center-wrap" v-if="eggPopStatus">
                <div class="egg-pop-wrap">
                    <div class="close" @click="closerompt"></div>
                    <div class="timing" v-show="egg.breakEgg.eggType === 1 || egg.breakEgg.eggType === 2">30:00</div>
                    <div class="egg-icon" :class="resEggCls(egg.breakEgg.eggType)['resCls']"></div>
                    <div class="egg-pop-top">
                        <p class="egg-break-title" v-text="egg.breakEgg.operateType === 0 ? resEggCls(egg.breakEgg.eggType)['txt'] : egg.breakEgg.eggTitle"></p>
                        <p class="egg-break-desc" v-html="egg.breakEgg.operateType === 0 ? resEggCls(egg.breakEgg.eggType)['desc'] : egg.breakEgg.eggGotInfo"></p>
                        <div class="egg-history" v-if="egg.breakEgg.operateType === 1">
                            <div class="egg-history-des-box">
                                <span class="egg-history-des">他的经历</span>
                            </div>
                            <div class="egg-history-box">
                                <div class="egg-history-egg-icon" v-for="(item,index) in egg.breakEgg.eggHistory" :class="resEggCls(item)['historyCls']"></div>
                            </div>
                        </div>
                        <p class="how-get-desc" v-if="egg.breakEgg.operateType === 0" v-text="resEggCls(egg.breakEgg.eggType)['howGetDesc']"></p>
                    </div>
                    <div class="egg-pop-middle" v-if="egg.breakEgg.operateType === 1">
                        <div class="ice-egg" v-if="egg.breakEgg.eggStatus !== 0">
                            <div class="ice-egg-icon">
                                <span :class="{'ice-jqregg': egg.breakEgg.eggType === 2, 'ice-p10egg': egg.breakEgg.eggType === 1}"></span>
                            </div>
                            <div class="ice-egg-state">
                                <div class="ice-egg-middle-wrap">
                                    <div class="ice-egg-middle">
                                        <p>当前状态：<span class="state-res">已被占用</span></p>
                                        <p>释放倒计时：<span class="state-res res-time">29:30</span></p> 
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
                        <p class="remind" v-if="egg.breakEgg.eggStatus !== 0">提醒：每位用户在砸中奖品蛋后有30min的领取时间超时未领a取彩蛋将自动释放，其余已申请活动业务的用户均可在本页面争抢</p>
                    </div>
                    <div class="egg-pop-bottom">
                        <template v-if="egg.breakEgg.operateType === 0">
                            <div class="btn bg-orange">马上去</div>
                        </template>
                        <template v-else="egg.breakEgg.operateType === 1">
                            <div class="btn" :class="{'bg-orange': egg.breakEgg.eggStatus === 2, 'bg-grey': egg.breakEgg.eggStatus !== 2}">抢蛋</div>
                        </template>
                    </div>
                </div>     
            </div>   
        </transition>
    </script>
    <script type="text/x-template" id="my-egg">
        <transition name="scale">
        <div class="center-wrap" v-show="myEggStatus">
            <div class="my-broke-egg">
                <div class="close" @click="closerompt"></div>
                <h6 class="title">我的彩蛋</h6>
                <ul class="my-egg-list" v-if="history.eggHistory">
                    <li v-for="n in Math.ceil(history.eggHistory.length / 3)">
                        <div class="egg-item" v-for="(item,index) in eggHistoryGroup(n)">
                            <span class="my-egg-item" :class="eggType(item.eggType)['cls']"></span>
                            <p class="my-egg-title" v-text="eggType(item.eggType)['txt']"></p>
                            <p class="my-egg-des" v-text="eggType(item.eggType)['des']"></p>
                        </div>
                    </li>
                </ul>
            </div>    
        </div>    
        </transition>
    </script>
    <script type="text/x-template" id="my-apply">
        <div class="center-wrap" v-show="myApplyStatus">
            <div class="my-apply">
                <div class="back"></div>
                <div class="close" @click="closerompt"></div>
                <h6 class="title">我的彩蛋</h6>
                <ul class="my-apply-list">
                    <li class="apply-item" v-for="(item,index) in applylist">
                        <div class="left-info">
                            <img :src="item.img" alt="">
                        </div>
                        <div class="right-info">
                            <div class="apply-middle-wrap">
                                <div class="apply-middle">
                                    <div class="des-txt">
                                        <h6 class="title" v-text="item.title">浦发巴萨卡</h6>
                                        <p class="subtitle" v-text="item.subtitle">免年费</p>
                                        <p class="desc" v-text="item.desc">申请送318元现金</p>
                                    </div>
                                </div>
                            </div>                       
                        </div>
                        <a class="apply-btn" :href="item.url">申请</a>
                    </li>
                </ul>
            </div>    
        </div>
    </script>
    </body>
</html>