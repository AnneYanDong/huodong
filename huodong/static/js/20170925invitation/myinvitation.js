require.config(requireConfig);
require(['ct', 'Vue', 'jquerynstSlider'], function(ct, Vue, _) {
  ct.Tool.setFont();
  var platform = ct.Tool.userAgent();
  window.addEventListener('resize', ct.Tool.debounce(ct.Tool.setFont));

  function hide(fn) {
    var oEle = $('.vue-loading-wrap');
    oEle.addClass('vue-loading-hide');
    setTimeout(function() {
      oEle.remove();
      if (fn && ct.Tool.isFunction(fn)) {
        fn();
      }
    }, 0)
  }

  function mask() {
    var tplArr = [
      '<transition name="opacity">',
      '<div class="mask" v-if="show" ref="mask"></div>',
      '</transition>'
    ]

    return {
      props: {
        show: {
          type: [Boolean],
          default: false
        }
      },
      template: tplArr.join(""),
      data: function() {
        return {

        }
      },
      created: function() {},
      mounted: function() {
        this.banScroll();
      },
      methods: {
        banScroll: function() {
          this.$refs.mask.addEventListener('touchmove', function(e) {
            e.preventDefault();
          })
        }
      }
    }
  }

  function init() {
    window.vm = new Vue({
      el: ".wp",
      data: {
        init: false,
        scrollShow: false
      },
      components: {
        'my-mask': mask()
      },
      created: function() {
        hide(function() {
          vm.init = true;
        });
      },
      mounted: function() {
        this.setLine();
      },
      computed: {
        maskShow: function() {
          return this.ruleShow;
        }
      },
      methods: {
        toggleRule: function() {
          this.ruleShow = !this.ruleShow;
        },
        active: function(event) {
          var vm = this;
          var oE = $(event.currentTarget);
          var oList = vm.$refs.list;
          var oInvitation = vm.$refs.invitation;
          if (oE.hasClass('active')) {
            oE.removeClass('active');
          } else {
            oE.addClass('active');
          }    
          
          var oLine = vm.$refs.line;
          var oProcess = vm.$refs.process;
          var oProcessH = oProcess && oProcess.offsetHeight;             
          var oLineH = oLine && oLine.offsetHeight;
          var allowScrollH = oList.offsetHeight - oInvitation.offsetHeight;
          if (allowScrollH <= 0) {
            vm.scrollShow = false;
            return;
          }
          vm.scrollShow = true;
          if (typeof oProcess !== 'undefined') {
            oProcess.style.top = oInvitation.scrollTop * (oLineH - oProcessH) / allowScrollH + 'px';
          }          

        },
        setLine: function() {
          var vm = this;
          var oList = vm.$refs.list;
          var oInvitation = vm.$refs.invitation;     
          oInvitation.addEventListener('scroll', function() {
            var oLine = vm.$refs.line;
            var oProcess = vm.$refs.process;
            var oProcessH = oProcess && oProcess.offsetHeight;             
            var oLineH = oLine && oLine.offsetHeight;
            var allowScrollH = oList.offsetHeight - oInvitation.offsetHeight;
            if (allowScrollH <= 0) {
              vm.scrollShow = false;
              return;
            }
            vm.scrollShow = true;
            if (typeof oProcess !== 'undefined') {
              oProcess.style.top = oInvitation.scrollTop * (oLineH - oProcessH) / allowScrollH + 'px';
            }
          })
        }
      }
    })
  }
  init();
})