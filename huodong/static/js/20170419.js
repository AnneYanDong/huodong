require.config(requireConfig);
require(["jquery", "fastClick", "FullPage", "ct", "bridge", "juicer", "Vue", "axios"], function($, fastClick, fullpage, ct, Bridge, juicer, Vue, axios) {
    var oMask = $(".mask");

    var oP = Object.create(ct.Prompt);
    oP.create().build();

    // var oM = Object.create(ct.Mask);
    // oM.create().build();

    var local = ct.Tool.local();

    var app = ct.Tool.userAgent();

    var restTimer;

    ct.Tool.buryPoint();

    var run = {
        status: {
            login: false,
            msg: ""
        },
        charge: {
            loan: null,
            type: null,
            pay: null
        },

        start: function() {
            var _this = this;

            /*解决移动端click点击300延迟*/
            fastClick.attach(document.body);

            /*设置HTML的font-size*/
            ct.Tool.setFont();
            window.addEventListener("resize", ct.Tool.debounce(ct.Tool.setFont));
            window.addEventListener("resize", ct.Tool.debounce(ct.Tool.handleBottomStatusBar));

            /*整体预加载动画*/
            var oPreLoading = Object.create(ct.PreLodingUi);
            oPreLoading.create({
                preLoadingCls: "loading-bg-color", // 自定义加载动画颜色
                loadingEleCls: "loading-ele-color"
            }).build();

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
            // var _this = this;
            $(".wp").removeClass("hide");

            if (app.isGjj && Bridge) {
                Bridge.action('quickIcon', {
                    thumb: "https://r.51gjj.com/image/static/ico_title_share_dark.png",
                    onclick: function() {
                        Bridge.action('ShareTimeline', {
                            "title": "【蛋愿有奖】每日10000个彩蛋，砸中即中奖！",
                            'desc': "华为P10 plus／扫地机器人、腾讯视频会员天天送！",
                            "thumb": "https://r.51gjj.com/act/release/img/20170406_share.png",
                            "link": ct.Tool.url("/act/home/huodong/20170419/index.php")
                        });
                    }
                })
            };

            axios.post(ct.Tool.url("/app/request/activity"), JSON.stringify({
                tag: "进入页面" + projectName,
                place_cid: app.isGjj ? 1 : 0
            }))

            var myMask = {
                template: "#oMask",
                props: {
                    maskStatus: Boolean
                }
            };

            window.vm = new Vue({
                el: ".wp",
                data: {
                    tvList: [], //电视接口返回
                    stateArr: [], // 7天的显示状态
                    eggList: [], // 50个蛋
                    clickNum: '', // 当前显示哪天的电视
                    applyList: '', // 用户可申请的贷款接口返回
                    egg: {},

                    history: "",

                    restTime: '',

                    maskStatus: false,
                    eggPopStatus: false,
                    myEggStatus: false,
                    myApplyStatus: false,
                    ruleStatus: false
                },
                created: function() {
                    this.getTvList();
                    this.getEggList();
                    // this.getApplyList(); // 应该点击才发请求，为了测试
                },
                mounted: function() {

                },
                methods: {
                    getTvList: function() {
                        var _this = this;
                        axios.post(ct.Tool.url("/act/act170419/get_status"), JSON.stringify({

                        })).then(function(r) {
                            if (r.data.success) {
                                _this.tvList = r.data.ret;
                                _this.tvList.list.forEach(function(item, index) {
                                    if (item.today && Object.prototype.toString.call(item.today) == '[object Boolean]') {
                                        _this.clickNum = index;
                                    }
                                })
                                _this.$nextTick(function() {
                                    _this.setPosition();
                                    _this.setProcess();
                                })
                            }
                        })
                    },

                    getEggList: function() {
                        var _this = this;
                        axios.post(ct.Tool.url("/act/act170419/get_egg"), JSON.stringify({

                        })).then(function(r) {
                            if (r.data.success) {
                                _this.eggList = r.data.ret;
                                _this.$nextTick(function() {

                                })
                            }
                        })
                    },

                    breakEgg: function(item, type) {
                        var _this = this;
                        console.log(item);
                        if (item.eggType === 0) {

                            // axios.post("/act/huodong/20170419/breakEgg.php", JSON.stringify({
                            axios.post(ct.Tool.url("/act/act170419/get_break"), JSON.stringify({
                                eggid: item.eggid,
                                operate: type
                            })).then(function(r) {
                                if (r.data.success) {
                                    if (r.data.ret.end) {
                                        oP.show("今天的蛋都被咋光了，明天请提早哦！");
                                        return false;
                                    }
                                    if (r.data.ret.rob === 0) {
                                        _this.$set(_this.egg, 'breakEgg', r.data.ret)
                                        _this.egg.breakEgg.operateType = 0; // 砸蛋操作，operate = 0
                                        _this.$nextTick(function() {
                                            if (r.data.ret.allow) {
                                                _this.maskStatus = true;
                                                _this.eggPopStatus = true;
                                                _this.getEggList();
                                            } else {
                                                oP.show("您已砸中彩蛋，完成申请领取对应奖励，返回后可继续砸蛋！", {
                                                    "duration": 1500,
                                                    callback: function() {
                                                        _this.getEggList();
                                                        _this.getApplyList();
                                                    }
                                                });
                                            }
                                        })
                                    } else {
                                        oP.show("手慢一步，此蛋已被砸，试试其他吧", {
                                            callback: function() {
                                                _this.getEggList();
                                            }
                                        });
                                    }
                                } else {
                                    oP.show(r.data.msg, {
                                        callback: function() {
                                            if (r.data.code == 9) {
                                                window.location.href = "http://d.51gjj.com/hd/";
                                            }
                                        }
                                    });
                                    return false;
                                }
                            })
                        } else {
                            oP.show("该蛋已被砸开，试试其他吧", {
                                callback: function() {
                                    _this.getEggList();
                                }
                            });
                        }
                    },

                    breakMyEgg: function(item, type) {
                        var _this = this;
                        _this.myEggStatus = false;
                        console.log(item);
                        if (item.eggType !== 3 && item.eggType !== 4) {
                            if (item.eggType === 6) {
                                _this.getApplyList();
                                return;
                            }
                            axios.post(ct.Tool.url("/act/act170419/get_break"), JSON.stringify({
                                eggid: item.eggid,
                                operate: type
                            })).then(function(r) {
                                if (r.data.success) {
                                    _this.$set(_this.egg, 'breakEgg', r.data.ret)
                                    _this.egg.breakEgg.operateType = 2; // 砸蛋操作，operate = 2
                                    _this.$nextTick(function() {
                                        _this.maskStatus = true;
                                        _this.eggPopStatus = true;
                                        if (item.eggType === 1 || item.eggType === 2) {
                                            _this.timedown(_this.egg.breakEgg.getTime, 30, 1);
                                        }
                                        _this.getEggList();
                                    })
                                }
                            })
                        } else {
                            oP.show("【我的彩蛋】里复活蛋和烟雾蛋不可点击查看哦！", {
                                duration: 2500,
                                callback: function() {
                                    _this.maskStatus = false;
                                    _this.myEggStatus = false;
                                    _this.getEggList();
                                }
                            })
                        }
                    },

                    robEgg: function(item, id, type) {
                        var _this = this;
                        _this.myEggStatus = false;
                        // axios.post("/act/huodong/20170419/breakEgg.php", JSON.stringify({
                        axios.post(ct.Tool.url("/act/act170419/get_break"), JSON.stringify({
                            eggid: id,
                            operate: type,
                            date: item.date
                        })).then(function(r) {
                            if (r.data.success) {
                                r.data.ret['robEggId'] = id;
                                r.data.ret['date'] = item.date;
                                _this.$set(_this.egg, 'breakEgg', r.data.ret);
                                _this.egg.breakEgg.operateType = 1; // 抢别人的蛋操作，operate = 1
                                _this.$nextTick(function() {
                                    if (r.data.ret.allow) {
                                        _this.maskStatus = true;
                                        _this.eggPopStatus = true;
                                        _this.getEggList();
                                        _this.timedown(_this.egg.breakEgg.getTime, 30, 1);
                                    }
                                })
                            } else {
                                oP.show(r.data.msg);
                            }
                        })
                    },

                    getApplyList: function() {
                        var _this = this;
                        // axios.post("/act/huodong/20170419/myApplyList.php", JSON.stringify({
                        axios.post(ct.Tool.url("/act/act170419/get_apply"), JSON.stringify({

                        })).then(function(r) {
                            if (r.data.success) {
                                _this.eggPopStatus = false;
                                _this.maskStatus = true;
                                _this.myApplyStatus = true;
                                _this.applyList = r.data.ret;
                                _this.$nextTick(function() {

                                })
                            }
                        })
                    },

                    apply: function(item) {
                        var _this = this;
                        axios.post(ct.Tool.url("/act/act170419/get_url"), JSON.stringify({
                            id: item.id
                        })).then(function(r) {
                            if (r.data.success) {
                                axios.post(ct.Tool.url("/app/request/activity"), JSON.stringify({
                                    tag: item.title + projectName,
                                    place_cid: app.isGjj ? 1 : 0
                                })).then(function(){
                                    window.location.href = r.data.ret.url;
                                })
                            } else {
                                oP.show(d.data.msg)
                            }
                        })
                    },


                    // 电视机显示部分
                    // 我的彩蛋
                    myEgg: function() {
                        var _this = this;
                        var timer = null;
                        // this.myEggStatus = true;
                        // this.$refs.myEgg.myEggHistory();
                        // axios.post("/act/huodong/20170419/myEggHistory.php", JSON.stringify({
                        axios.post(ct.Tool.url("/act/act170419/get_mine"), JSON.stringify({

                        })).then(function(r) {
                            if (r.data.success) {
                                _this.history = r.data.ret;
                                _this.maskStatus = true;
                                _this.myEggStatus = true;
                                clearTimeout(timer);
                                timer = setTimeout(_this.getApplyList,1500);
                            }
                        })
                    },


                    // 弹框底部的按钮，抢蛋函数，操作是0或2时用
                    noRobAction: function() {
                        var _this = this;
                        var type = this.egg.breakEgg.eggType;

                        if (type === 1 || type === 2 || type === 6) { // 机器人和手机

                            this.getApplyList();
                        } else if (type === 3 || type === 4) { // 烟雾蛋和复活蛋关弹框
                            this.maskStatus = false;
                            this.eggPopStatus = false;
                            this.getEggList();
                        } else { // 查页蛋，调分享
                            console.log("查页蛋，仅在APP内可调用分享。这里表示无BUG")
                            if (app.isGjj && Bridge) {
                                // Bridge.action('quickIcon', {
                                //     thumb: "https://r.51gjj.com/image/static/ico_title_share_dark.png",
                                //     onclick: function() {

                                //     }
                                // })
                                Bridge.action('ShareTimeline', {
                                    "title": "【蛋愿有奖】每日10000个彩蛋，砸中即中奖！",
                                    'desc': "华为P10 plus／扫地机器人、腾讯视频会员天天送！",
                                    "thumb": "https://r.51gjj.com/act/release/img/20170406_share.png",
                                    "link": ct.Tool.url("/act/home/huodong/20170419/index.php")
                                });
                                _this.close();
                            }
                        }
                    },

                    // 弹框底部的按钮，抢蛋函数，操作是1时用
                    rob: function() {
                        var _this = this;
                        var type = this.egg.breakEgg.eggType;
                        var status = this.egg.breakEgg.eggStatus;
                        var app = ct.Tool.userAgent();
                        if (status === 2) {
                            if (type === 1 || type === 2) {
                                axios.post(ct.Tool.url("/act/act170419/get_break"), JSON.stringify({
                                        eggid: _this.egg.breakEgg.robEggId,
                                        operate: 1,
                                        date: _this.egg.breakEgg.date
                                    })).then(function(r) {
                                        if (r.data.success) {
                                            _this.$set(_this.egg, 'breakEgg', r.data.ret);
                                            _this.egg.breakEgg.operateType = 1; // 抢别人的蛋操作，operate = 1
                                            _this.$nextTick(function() {
                                                if (r.data.ret.allow) {
                                                    _this.maskStatus = true;
                                                    _this.eggPopStatus = true;
                                                    oP.show("好气哟，手太短，比别人慢一步！");
                                                    _this.getEggList();
                                                }
                                            })
                                        } else {
                                            oP.show(r.data.msg);
                                        }
                                    })
                                    // this.eggPopStatus = false;
                                    // this.myApplyStatus = true;
                                    // this.getApplyList();
                            }
                        } else if (status === 0) {
                            oP.show("该蛋已被领取了")
                        } else if (status === 1) {
                            oP.show("该蛋处在被占有状态")
                        }
                    },

                    // 50个蛋列表，5个一组用
                    eggArrGroup: function(n) {
                        if (this.eggList.list) {
                            return this.eggList.list.slice(5 * (n - 1), n * 5);
                        }
                    },

                    // 50个蛋列表展示区分class
                    eggClass: function(eggType) {
                        // 1喜蛋(华为P10) 2邋遢蛋（扫地） 3复活蛋 4烟雾蛋 5查页蛋 6申请蛋
                        switch (eggType) {
                            case 0:
                                return "egg-no-break-box";
                            case 1:
                                return "egg-p10-box";
                            case 2:
                                return "egg-jqr-box";
                            case 3:
                                return "egg-fh-box";
                            case 4:
                                return "egg-yw-box";
                            case 5:
                                return "egg-cy-box";
                            case 6:
                                return "egg-sq-box";
                        }
                    },

                    // 7天电视位置
                    setPosition: function() {
                        var _this = this;
                        var state = [
                            { "zindex": 1, width: '5.51rem', height: '3.49rem', top: '42%', left: '28%' },
                            { "zindex": 1, width: '5.51rem', height: '3.49rem', top: '42%', left: '28%' },
                            { "zindex": 1, width: '5.51rem', height: '3.49rem', top: '42%', left: '28%' },
                            { "zindex": 4, width: '5.51rem', height: '3.49rem', top: '50%', left: '50%' },
                            { "zindex": 1, width: '5.51rem', height: '3.49rem', top: '42%', left: '54%' },
                            { "zindex": 1, width: '5.51rem', height: '3.49rem', top: '42%', left: '54%' },
                            { "zindex": 1, width: '5.51rem', height: '3.49rem', top: '42%', left: '54%' }
                        ]
                        this.stateArr = state;
                        for (var i = 0; i < this.tvList.list.length; i++) {
                            Vue.set(this.tvList.list[i], 'zindex', state[i]['zindex']);
                        }
                        var oList = this.$refs.tvList;
                        var oNext = this.$refs.tvNext;
                        var oPrev = this.$refs.tvPrev;
                        this.$nextTick(function() {

                            function next() {
                                $(oNext).on("click", function() {
                                    if (_this.clickNum < 6 && _this.clickNum > -1) {
                                        _this.clickNum++;
                                    }
                                })
                            }

                            function prev() {
                                $(oPrev).on("click", function() {
                                    if (_this.clickNum <= 6 && _this.clickNum > 0) {
                                        _this.clickNum--;
                                    }
                                })
                            }

                            function swipe() {
                                var iStart = null;
                                var touchStart = function(ev) {
                                    iStart = ev.changedTouches[0].clientX;
                                }
                                var touchMove = function(ev) {
                                    ev.preventDefault();
                                }
                                var touchEnd = function(ev) {
                                    ev.preventDefault();
                                    var dis = ev.changedTouches[0].clientX - iStart;
                                    console.log(dis);
                                    if (dis > 10) {
                                        if (_this.clickNum <= 6 && _this.clickNum > 0) {
                                            _this.clickNum--;
                                        }
                                    } else if (dis < 0 && dis < -10) {
                                        if (_this.clickNum < 6 && _this.clickNum > -1) {
                                            _this.clickNum++;
                                        }
                                    }
                                }
                                oList.addEventListener("touchstart", touchStart, false);
                                oList.addEventListener("touchmove", touchMove, false);
                                oList.addEventListener("touchend", touchEnd, false);
                            }


                            next();
                            prev();
                            swipe();
                        })
                    },

                    // 剩余多少蛋  type机器人蛋还是手机蛋  eggPos设置蛋的显示位置数值无任何意义
                    rest: function(item, nthEgg, eggPos, type) {
                        var txt = '';
                        if (item.process && eggPos && type && nthEgg) {
                            if (type == 1) {
                                txt = item[nthEgg] / item.process * 100 + "%";
                            } else {
                                txt = item[nthEgg] / item.process * 100 + "%";
                            }
                        } else {
                            txt = "剩余" + Math.floor((10000 - item.process) / 100) + "%";
                        }
                        return txt;
                    },

                    // 剩余蛋的进度增长动画
                    setProcess: function() {
                        var list = this.tvList.list;
                        var timer = null;
                        clearTimeout(timer);
                        timer = setTimeout(function() {
                            $(".process-line").each(function(index, item) {
                                $(this).css("width", list[index].process / 100 + "%")
                            })
                        }, 400)
                    },

                    // 我的菜单接口分组分组
                    eggHistoryGroup: function(n) {
                        if (this.history.eggHistory) {
                            return this.history.eggHistory.slice(3 * (n - 1), n * 3);
                        }
                    },
                    // 我的彩蛋根据类型区分文案
                    eggType: function(type) {
                        switch (type) {
                            case 1:
                                return {
                                    cls: 'my-xd',
                                    txt: '喜蛋',
                                    des: '华为P10'
                                }
                            case 2:
                                return {
                                    cls: 'my-ltd',
                                    txt: '邋遢蛋',
                                    des: '扫地机器人'
                                }
                            case 3:
                                return {
                                    cls: 'my-fhd',
                                    txt: '复活蛋',
                                    des: '再来一次'
                                }
                            case 4:
                                return {
                                    cls: 'my-ywd',
                                    txt: '烟雾蛋',
                                    des: '什么都没有'
                                }
                            case 5:
                                return {
                                    cls: 'my-cyd',
                                    txt: '查页蛋',
                                    des: '分享活动'
                                }
                            case 6:
                                return {
                                    cls: 'my-sqd',
                                    txt: '申请蛋',
                                    des: '申请业务赢会员'
                                }
                        }
                    },

                    // 砸蛋操作显示对应文案
                    resEggCls: function(type) {
                        switch (type) {
                            case 1:
                                return {
                                    resCls: "res-xd",
                                    historyCls: "xd",
                                    txt: "砸中“喜蛋”",
                                    desc: "获得红色特别版iPhone 7，系统将为您占有30分钟，超时未领走将自动释放给其他用户争抢",
                                    howGetDesc: "完成申请活动中任意贷款或信用卡业务，即可锁定奖品，成功放款或发卡后开卡即可领取。"
                                };
                            case 2:
                                return {
                                    resCls: "res-ltd",
                                    historyCls: "ltd",
                                    txt: "砸中“邋遢蛋”",
                                    desc: "获得扫地机器人，系统将为您占有30分钟，超时未领走将自动释放给其他用户争抢",
                                    howGetDesc: "完成申请活动中任意贷款或信用卡业务，即可锁定奖品，成功放款或发卡后开卡即可领取。"
                                };
                            case 3:
                                return {
                                    resCls: "res-fhd",
                                    historyCls: "fhd",
                                    txt: "砸中“复活蛋”",
                                    desc: "复活一次砸蛋机会",
                                    howGetDesc: "您可返回活动继续砸蛋抽奖！"
                                };
                            case 4:
                                return {
                                    resCls: "res-ywd",
                                    historyCls: "ywd",
                                    txt: "砸中“烟雾蛋”",
                                    desc: "您收到了空气",
                                    howGetDesc: "您已无法再继续活动，转发邀请朋友一起来玩吧！"
                                };
                            case 5:
                                return {
                                    resCls: "res-cyd",
                                    historyCls: "cyd",
                                    txt: "砸中“查页蛋”",
                                    desc: "转发好友可继续",
                                    howGetDesc: "转发活动至一位微信好友（不可重复）即可返回活动继续砸蛋抽奖！"
                                };
                            case 6:
                                return {
                                    resCls: "res-sqd",
                                    historyCls: "sqd",
                                    txt: "砸中“申请蛋”",
                                    desc: "每日前2000名申请即送腾讯视频会员<br/><br/>*成功申请浦发卡的用户可额外获得318元现金红包奖励<br/>*成功申请兴业卡的用户可额外获得50元话费奖励<br/>*成功申请金薪贷的用户可额外获得100元抵息券",
                                    howGetDesc: "申请活动中任意贷款或信用卡业务，完成提交即可返回活动继续砸蛋！"
                                };
                        }
                    },

                    // 通用，关闭弹框遮罩
                    close: function() {
                        this.maskStatus = false;
                        this.myEggStatus = false;
                        this.eggPopStatus = false;
                        this.myApplyStatus = false;
                        this.getEggList();
                    },

                    showRule: function() {
                        this.ruleStatus = !this.ruleStatus;
                        this.maskStatus = !this.maskStatus;
                    },

                    // timeDown
                    timedown: function(startTime, durationTime, operate) {
                        var _this = this;
                        if (!startTime) {
                            console.log("倒计时起始时间有问题")
                            return false;
                        }

                        function timing() {
                            var now = new Date();
                            var nowTime = indexData.nowTime;
                            var endTime = startTime + durationTime * 60;

                            var restTime = endTime - nowTime;
                            if (restTime < 0) {
                                console.log("30分钟倒计时已经结束了");
                                return;
                                // _this.egg.breakEgg.eggStatus = 0;
                                // return;
                            }
                            indexData.nowTime++;
                            console.log(restTime);

                            var showM;
                            if (restTime > 60) {
                                showM = Math.floor(restTime / 60);
                            } else {
                                showM = 0;
                            }


                            if (restTime == 0) {
                                clearTimeout(restTimer);
                                console.log(operate);
                                if (operate === 0) {
                                    _this.close();
                                    oP.show("30分钟倒计时已结束啦，蛋蛋要飞啦！", {
                                        callback: function() {
                                            _this.getEggList();
                                            _this.egg.breakEgg.eggStatus = 2;
                                        }
                                    })
                                    return;
                                } else if (operate === 1) {
                                    _this.egg.breakEgg.eggStatus = 2;
                                    return;
                                }
                            }

                            var showS = restTime % 60;

                            var addZero = function(num) {
                                if (num < 10 && num >= 0) {
                                    return "0" + num;
                                } else {
                                    return num;
                                }
                            }
                            _this.restTime = addZero(showM) + ":" + addZero(showS);
                            clearTimeout(restTimer);
                            restTimer = setTimeout(timing, 1000);

                        }
                        timing();
                    },

                },
                computed: {

                }
            })
        }
    }

    run.start();
})
