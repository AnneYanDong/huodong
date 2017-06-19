var init = {
    actCenter: function() {
        window.centerVm = new Vue({
            el: "#app",
            data: {
                menu: ["活动", "红包/奖品"],
                menuActive: 0,

                bannerTimer: null, 
                bannerList: [],
                hotList: [],
                recommendList: [],

                actType: [],

                prizeList: [],

                prizeRecord: [],
                showRecord: false,
                recordPid: 1,
                recordText: "",

                showMore: false,

                prizeShow: false,
                singlePrize: {},

                ajaxStatus: true,

                maskStatus: false
            },
            filters: {
                dateLineDes: function(value, type) {
                    if (type === 1) {
                        // return value + "天后到期";
                        return value;
                    } else {
                        // return "有效期至:" + value;
                        return value;
                    }
                }
            },
            computed: {
                recordTextChange: function() {
                    if (this.showRecord) {
                        return "历史记录";
                    } else {
                        return "查看历史记录";
                    }
                }
            },
            created: function() {
                var defaultmenu = ct.getUrlData("defaultmenu") + "";
                if (defaultmenu == '0') {
                    this.menuActive = 0;
                } else {
                    this.menuActive = 1;
                }
            },
            mounted: function() {
                this.render();
            },
            methods: {
                tab1: function() {
                    this.menuChange(0);
                    this.closePrizeForm();
                },

                tab2: function() {
                    this.menuChange(1);
                },

                render: function() {
                    var _this = this;

                    function getBanner() {
                        return axios.post(ct.packingUrl("/app/banners/get_activity_banners"), JSON.stringify({}));
                    }

                    function getActType() {
                        return axios.post(ct.packingUrl("/act/v2/activities/get_act_categories"), JSON.stringify({
                            location: "activity_hot"
                        }));
                    }

                    function getPrizeList() {
                        return axios.post(ct.packingUrl("/act/v2/activities/get_gifts"), JSON.stringify({}));
                    }

                    function getPrizeRecord() {
                        return axios.post(ct.packingUrl("/act/v2/activities/record_gifts"), JSON.stringify({
                            pid: _this.recordPid
                        }));
                    }

                    axios.all([getBanner(), getActType(), getPrizeList(), getPrizeRecord()])
                        .then(axios.spread(function(banner, actType, prizeList, prizeRecord) {
                            _this.ajaxStatus = false;
                            var banner = banner.data;
                            var actType = actType.data;
                            var prizeList = prizeList.data;
                            var prizeRecord = prizeRecord.data;
                            if (banner.success) {
                                _this.bannerList = banner.ret.activity_shuffling;
                                _this.hotList = banner.ret.activity_hot;
                                _this.recommendList = banner.ret.others ? banner.ret.others : null;
                                _this.$nextTick(function() {
                                    _this.tabShow();
                                })
                            }
                            if (actType.success) {
                                console.log("actType");
                                _this.actType = actType.ret;
                            }
                            if (prizeList.success) {
                                console.log("prizeList");
                                _this.prizeList = prizeList.ret;
                            }
                            // if (prizeRecord.success) {
                            //     // _this.dropload();
                            //     console.log("prizeRecord");
                            //     _this.recordPid++;
                            //     _this.prizeRecord = prizeRecord.ret;
                            // }
                        }));
                },

                renderGetPrize: function() {
                    var _this = this;
                    console.log("renderGetPrize")

                    function getPrizeList() {
                        return axios.post(ct.packingUrl("/act/v2/activities/get_gifts"), JSON.stringify({}));
                    }

                    function getPrizeRecord() {
                        return axios.post(ct.packingUrl("/act/v2/activities/record_gifts"), JSON.stringify({

                        }));
                    }

                    axios.all([getPrizeList(), getPrizeRecord()])
                        .then(axios.spread(function(prizeList, prizeRecord) {
                            var prizeList = prizeList.data;
                            var prizeRecord = prizeRecord.data;
                            if (prizeList.success) {
                                _this.prizeList = prizeList.ret;
                            }
                            if (prizeRecord.success) {
                                _this.prizeRecord = prizeRecord.ret;
                            }
                        }));
                },

                tabShow: function() {
                    // demo3
                    clearTimeout(this.bannerTimer);
                    this.bannerTimer = setTimeout(function() {
                        $('.banner-pic').swipeSlide({
                            continuousScroll: true,
                            speed: 3000,
                            transitionType: 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
                            firstCallback: function(i, sum, me) {
                                me.find('.banner-nav').children().first().addClass('active');
                            },
                            callback: function(i, sum, me) {
                                me.find('.banner-nav').children().eq(i).addClass('active').siblings().removeClass('active');
                            }
                        });
                    }, 100)
                },

                menuChange: function(index) {
                    console.log(index);
                    if (index == 0) {
                        this.tabShow();
                        this.menuActive = 0;
                        this.showRecord = false;
                    } else {
                        this.menuActive = 1;
                    }
                },

                goList: function(id) {
                    if (id) {
                        var url = ct.packingUrl("/act/home/optimization/activity/ActList.php?id=" + id);
                    }
                    window.location.href = url;
                },

                goDetail: function(url) {
                    console.log("...");
                    window.location.href = url;
                    // window.location.href = ct.packingUrl("/act/home/optimization/activity/" + url.replace("prizeInfo", "PrizeDetail") + "&mode=local");
                },

                // 奖品领取框打开
                openPrizeForm: function(item) {
                    var _this = this;

                    var type = item.button.confirmInfoType;
                    this.singlePrize = item;

                    if (type === 5) {
                        console.log("type=5不能点，也没提示")
                        return;
                    }

                    if (type === 0) {
                        window.location.href = item.button.url;
                    } else if (type === 4) {
                        axios.post(ct.packingUrl("/act/v2/activities/receive_gift"), JSON.stringify({
                            aid: item.aid,
                            gid: item.gid,
                            sid: item.id
                        })).then(function(r) {
                            if (r.data.success) {
                                ct.prompt({ "txt": "我的文案" })
                                _this.renderGetPrize();
                            }
                        })
                    } else {
                        this.prizeShow = true;
                        this.maskStatus = true;
                        console.log(this.$refs.childPrizeForm)
                        this.$refs.childPrizeForm.getUserInfo();
                    }
                },

                // 奖品领取框关闭
                closePrizeForm: function() {
                    console.log("触发关闭奖品框事件");
                    this.prizeShow = false;
                    this.maskStatus = false;
                },

                dropload: function() {
                    var _this = this;
                    var prizeRecordDropWrap = $('.prize-record-drop-wrap').dropload({
                        scrollArea: window,
                        loadDownFn: function(me) {
                            if (_this.showRecord) {
                                axios.post(ct.packingUrl('/act/v2/activities/record_gifts'), JSON.stringify({
                                    pid: _this.recordPid
                                })).then(function(r) {
                                    if (r.data.success) {
                                        _this.recordPid++;
                                        var ret = r.data.ret;
                                        if (ret.length > 0) {
                                            for (var i = 0; i < ret.length; i++) {
                                                _this.prizeRecord.push(ret[i])
                                            }
                                        } else {
                                            console.log('no data')
                                            prizeRecordDropWrap.lock("down");
                                            prizeRecordDropWrap.noData();
                                        }
                                        me.resetload();
                                    }
                                })
                            }
                        }
                    });
                },

                back: function() {
                    alert("go-1")
                    window.history.go(-1);
                }
            },
            watch: {
                showRecord: function() {
                    var _this = this;
                    if (this.showRecord) {
                        var timer = null;
                        clearTimeout(timer);
                        timer = setTimeout(function() {
                            _this.dropload();
                        }, 100)
                    }
                }
            }
        });
    },

    actList: function() {
        window.listVm = new Vue({
            el: "#app",
            data: {
                actList: [],
                actListPid: 1,
                ajaxStatus: true
            },
            mounted: function() {
                this.render();
            },
            methods: {
                render: function() {
                    var _this = this;
                    var categoryId = ct.getUrlData("id");
                    axios.post(ct.packingUrl("/act/v2/activities/act_category_list"), JSON.stringify({
                        category_id: categoryId,
                        pid: _this.actListPid
                    })).then(function(r) {
                        if (r.data.success) {
                            _this.ajaxStatus = false;
                            _this.actList = r.data.ret
                            _this.actListPid++;
                            var actListWrap = $('.act-list-wrap').dropload({
                                scrollArea: window,
                                loadDownFn: function(me) {
                                    axios.post(ct.packingUrl('/act/v2/activities/act_category_list'), JSON.stringify({
                                        category_id: categoryId,
                                        pid: _this.actListPid
                                    })).then(function(r) {
                                        if (r.data.success) {
                                            _this.actListPid++;
                                            var ret = r.data.ret;
                                            if (ret.length > 0) {
                                                for (var i = 0; i < ret.length; i++) {
                                                    _this.actList.push(ret[i])
                                                }
                                            } else {
                                                console.log('no data')
                                                actListWrap.lock("down");
                                                actListWrap.noData();
                                            }
                                            me.resetload();
                                        }
                                    })
                                }
                            });
                        }
                    });
                }
            }
        })
    },

    prizeDetail: function() {
        window.detailVm = new Vue({
            el: "#app",
            data: {
                detailInfo: '',
                prizeBanner: {
                    type: Array,
                    default: []
                },
                buttonInfo: '',
                shippingInfo: '',

                prizeShow: false,

                singlePrize: {},

                ajaxStatus: true,

                maskStatus: false
            },
            created: function() {
                this.render();
            },
            mounted: function() {

            },
            methods: {
                render: function() {
                    var _this = this;
                    var gid = ct.getUrlData("gid");
                    var aid = ct.getUrlData("aid");
                    var sid = ct.getUrlData("sid");
                    var isValid = ct.getUrlData("is_valid");

                    function getGift() {
                        return axios.post(ct.packingUrl("/act/v2/activities/get_gift"), JSON.stringify({
                            gid: gid,
                            aid: aid,
                            sid: sid
                        }))
                    }

                    function getButton() {
                        if (isValid) {
                            return axios.post(ct.packingUrl("/act/v2/activities/get_record_button "), JSON.stringify({
                                sid: sid
                            }))
                        } else {
                            return axios.post(ct.packingUrl("/act/v2/activities/get_button"), JSON.stringify({
                                sid: sid
                            }))
                        }
                    }

                    function shipping() {
                        return axios.post(ct.packingUrl("/act/v2/activities/get_shipping"), JSON.stringify({
                            sid: sid
                        }))
                    }

                    axios.all([getGift(), getButton(), shipping()])
                        .then(axios.spread(function(gift, button, shipping) {
                            var gift = gift.data;
                            var button = button.data;
                            var shipping = shipping.data;

                            _this.ajaxStatus = false;

                            if (gift.success) {
                                _this.detailInfo = gift.ret;
                                if (!_this.detailInfo.imgList) {
                                    ct.prompt({ "txt": "产品图片没有配置" });
                                } else {
                                    _this.prizeBanner = gift.ret.imgList;
                                    _this.$nextTick(function() {
                                        if (_this.detailInfo.imgList.length > 1) {
                                            _this.tabShow();
                                        }
                                    })
                                }
                            }
                            if (button.success) {
                                _this.buttonInfo = button.ret;
                            }
                            if (shipping.success) {
                                _this.shippingInfo = shipping.ret;
                            }

                            _this.singlePrize = {
                                id: sid,
                                gid: gid,
                                aid: aid,
                                confirmInfoType: button.ret.confirmInfoType
                            };
                        }));

                    // console.log(this.singlePrize)
                },
                tabShow: function() {
                    // demo3
                    setTimeout(function() {
                        $('.banner-pic').swipeSlide({
                            continuousScroll: true,
                            speed: 3000,
                            transitionType: 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
                            firstCallback: function(i, sum, me) {
                                me.find('.banner-nav').children().first().addClass('active');
                            },
                            callback: function(i, sum, me) {
                                me.find('.banner-nav').children().eq(i).addClass('active').siblings().removeClass('active');
                            }
                        });
                    }, 100)
                },
                // 奖品领取框打开
                openPrizeForm: function() {
                    var _this = this;
                    if (!(this.buttonInfo.confirmInfoType.toString())) {
                        ct.prompt({ "txt": "出错,按钮状态参数没有" });
                        return false;
                    }
                    var type = this.buttonInfo.confirmInfoType;

                    if (type === 5 || type === 9) {
                        console.log("不能点，也没提示")
                        return;
                    }

                    if (type === 0) {
                        window.location.href = _this.buttonInfo.url;
                    } else if (type === 4) {
                        axios.post(ct.packingUrl("/act/v2/activities/receive_gift"), JSON.stringify({
                            aid: _this.singlePrize.aid,
                            gid: _this.singlePrize.gid,
                            sid: _this.singlePrize.id
                        })).then(function(r) {
                            if (r.data.success) {
                                ct.prompt({ "txt": "我的文案" })
                            }
                        })
                    } else {
                        this.prizeShow = true;
                        this.maskStatus = true;
                        this.$refs.childPrizeForm.getUserInfo();
                    }
                },
                // 奖品领取框关闭
                closePrizeForm: function() {
                    console.log("触发关闭奖品框事件");
                    this.prizeShow = false;
                    this.maskStatus = false;
                },
            },
            filters: {
                from: function(value) {
                    return "来源：" + value;
                }
            },
            computed: {
                detailinfoTxt: function() {
                    var txt = this.detailInfo.prizeDes;
                    if (txt) {
                        txt = br2nl(txt);
                    }

                    function br2nl(txt) {
                        var re = /(<br\/>|<br>|<BR>|<BR\/>)/g;
                        var s = txt.replace(re, "\n");
                        return s;
                    }
                    return txt;
                },

                buttonStatus: function() {
                    var cls;
                    var type = this.buttonInfo.confirmInfoType;
                    if (type === 9 || type === -1) {
                        cls = "bg-grey font-grey";
                    } else {
                        cls = "bg-blue"
                    }
                    return cls;
                }
            }
        })
    }
}

Vue.component("prize-form", {
    template: "#getForm",
    props: {
        prizeShow: Boolean,
        singlePrize: Object
    },
    data: function() {
        return {
            userInfo: {
                got: false,
                name: "",
                phone: "",
                alipay: "",
                address: "",
            }
        }
    },
    mounted: function() {

    },
    methods: {
        closeparentprizeform: function() {
            // if (ev.target.className == "prize-form-wrap") {
            this.$emit("closeparentprizeform");
            this.userInfo.got = false;
            // }
        },

        getUserInfo: function() {
            var _this = this;
            this.$nextTick(function() {
                axios.post(ct.packingUrl("/act/v2/activities/get_user_info"), JSON.stringify({
                    sid: _this.singlePrize.id
                })).then(function(d) {
                    var d = d.data;
                    _this.userInfo.got = true;
                    if (d.success) {
                        _this.userInfo.name = d.ret.name || "";
                        _this.userInfo.phone = d.ret.phone || "";
                        _this.userInfo.address = d.ret.address || "";
                        _this.userInfo.alipay = d.ret.alipay || "";
                    }
                });
            })
        },

        gotrender: function() {
            var _this = this;
            console.log("触发领取事件");
            axios.post(ct.packingUrl("/act/v2/activities/receive_gift"), JSON.stringify({
                aid: _this.singlePrize.aid,
                gid: _this.singlePrize.gid,
                sid: _this.singlePrize.id,
                name: _this.userInfo.name,
                phone: _this.userInfo.phone,
                alipay: _this.userInfo.alipay,
                address: _this.userInfo.address
            })).then(function(r) {
                if (r.data.success) {
                    _this.closeparentprizeform();
                    ct.prompt({
                        "txt": r.data.msg || "领取奖品成功",
                        "duration": 3000
                    });
                    _this.$emit('gotrender');
                } else {
                    ct.prompt({
                        "txt": r.data.msg,
                        "duration": 3000
                    });
                }
            })
        }
    }
})

Vue.component("loading-anim", {
    template: "#loadingAnim",
    props: {
        ajaxStatus: Boolean
    }
})

Vue.component("my-mask", {
    template: "#oMask",
    props: {
        maskStatus: Boolean
    }
})
