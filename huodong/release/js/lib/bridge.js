var Bridge = {
  platform: navigator.userAgent.indexOf("Android") > -1 || navigator.userAgent.indexOf("Linux") > -1 || navigator.userAgent.indexOf("android") > -1 ? "android" : "ios",
  commandQueue: [],
  callQueueId: 0,
  osEventCallback: {},
  callbackId: 1,
  callbackCache: {},
  pushCallback: function(a) {
    return "function" == typeof a ? (this.callbackCache[this.callbackId] = a, this.callbackId++) : 0
  },
  applyCallback: function(a) {
    var b = this.callbackCache[a];
    if ("function" == typeof b) {
      var c = Array.prototype.slice.call(arguments, 1);
      return b.apply(null, c)
    }
  },
  popCallback: function(a) {
    var b = this.callbackCache[a];
    return "function" == typeof b ? (delete this.callbackCache[a], b) : void 0
  },
  exec: function(a, b) {
    for (var c = [], d = 2; d < arguments.length; d++) c.push(arguments[d]);
    if ("android" == this.platform) {
      var e = !0;
      if (window.os && window.os.notify) try {
        var f = this.addOsCallQueue(a, b, c);
        os.notify(f)
      } catch (g) {
        e = !1
      } else e = !1;
      if (!e && window.os && window.os[a])
        if ("action" == a) "function" == typeof b && c.length > 1 && c[1] && (c[1] = JSON.parse(c[1]), c[1].queueId = ++this.callQueueId, c[1] = JSON.stringify(c[1]), this.commandQueue.push({
          id: this.callQueueId,
          args: c,
          callback: b
        })), window.os[a].apply(window.os, c);
        else {
          var h = window.os[a].apply(window.os, c);
          "function" == typeof b && b(h)
        }
    } else "ios" == this.platform && (null == this.bridge && (this.bridge = document.createElement("iframe"), this.bridge.setAttribute("style", "display:none;"), this.bridge.setAttribute("height", "0px"), this.bridge.setAttribute("width", "0px"), this.bridge.setAttribute("frameborder", "0"), document.documentElement.appendChild(this.bridge)), this.addOsCallQueue(a, b, c))
  },
  addOsCallQueue: function(a, b, c) {
    this.callQueueId++;
    var d = {
      id: this.callQueueId,
      args: c,
      callback: b,
      action: a
    };
    if (this.commandQueue.push(d), "android" == this.platform) return this.urlByCommand(d);
    if (1 == this.commandQueue.length) {
      var e = this.commandQueue[0],
        f = this.urlByCommand(e);
      this.bridge.src = f
    }
  },
  urlByCommand: function(a) {
    return "app://" + a.action + "?id=" + a.id + "&args=" + encodeURIComponent(JSON.stringify(a.args ? a.args : []))
  },
  delOsCallQueue: function(a, b) {
    for (var c = this.commandQueue.length, d = 0; c > d; d++)
      if (this.commandQueue[d].id == a) {
        if ("function" == typeof this.commandQueue[d].callback) try {
          this.commandQueue[d].callback(b)
        } catch (e) {
          console.log(e)
        }
        this.commandQueue.splice(d, 1);
        break
      }
    if ("ios" == this.platform && this.commandQueue.length > 0) {
      var f = this.commandQueue[0],
        g = this.urlByCommand(f);
      this.bridge.src = g
    }
  },
  hideNavigationBar: function() {
    this.exec("hideNavigationBar")
  },
  exitApp: function() {
    this.exec("exitApp")
  },
  back: function(a) {
    var b = "",
      c = "?";
    for (var d in a) b += c + encodeURIComponent(d) + "=" + encodeURIComponent(a[d]), c = "&";
    window.location.href = "app://back" + b
  },
  tag: function(a) {
    this.exec("tag", null, a)
  },
  setNeedsReload: function(a, b) {
    "string" == typeof b ? this.exec("setNeedsReload", null, a, b) : this.exec("setNeedsReload", null, a)
  },
  onBack: function(a) {
    var b = this.pushCallback(a);
    b ? this.exec("onBack", null, b) : this.exec("onBack", null, 0)
  },
  setTitle: function(a) {
    this.exec("setTitle", null, a)
  },
  clipText: function(a, b) {
    this.exec("clipText", b, a)
  },
  getClipText: function(a) {
    this.exec("getClipText", a)
  },
  openWebView: function(a, b) {
    this.exec("openWebView", null, a, b)
  },
  action: function(a, b, c) {
    var d = {};
    if (b && "object" == typeof b)
      for (var e in b) "function" == typeof b[e] ? d[e] = this.pushCallback(b[e]) : d[e] = b[e];
    this.exec("action", c, a, JSON.stringify(d))
  },
  hitEvent: function(a, b) {
    this.exec("hitEvent", null, a, b)
  },
  bind: function(a, b) {
    var c = a;
    a = a.substring(0, 1).toUpperCase() + a.substr(1), "function" == typeof b ? (this.osEventCallback["on" + a] = b, "android" == this.platform && window.os && window.os.registerEvent && window.os.registerEvent.call(window.os, c)) : (delete this.osEventCallback["on" + a], "android" == this.platform && window.os && window.os.unregisterEvent && window.os.unregisterEvent.call(window.os, c))
  },
  trigger: function(a) {
    a = a.substring(0, 1).toUpperCase() + a.substr(1);
    var b = null;
    try {
      b = this.osEventCallback["on" + a] && this.osEventCallback["on" + a]()
    } catch (c) {}
    if ("android" != this.platform) return b;
    var d = [a];
    if (null !== b && void 0 !== b) {
      var e = typeof b;
      d.push("string" == e ? b : JSON.stringify(b)), d.push(e)
    }
    window.os && window.os.onReceiveResult && window.os.onReceiveResult(d[0], d[1], d[2])
  }
};
