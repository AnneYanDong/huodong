!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.VueRouter=e()}(this,function(){"use strict";function t(t,e){if(!t)throw new Error("[vue-router] "+e)}function e(t,e){t||"undefined"!=typeof console&&console.warn("[vue-router] "+e)}function n(t,n){switch(typeof n){case"undefined":return;case"object":return n;case"function":return n(t);case"boolean":return n?t.params:void 0;default:e(!1,'props in "'+t.path+'" is a '+typeof n+", expecting an object, function or boolean.")}}function r(t,n){if(void 0===n&&(n={}),t){var r;try{r=o(t)}catch(i){!0&&e(!1,i.message),r={}}for(var a in n)r[a]=n[a];return r}return n}function o(t){var e={};return(t=t.trim().replace(/^(\?|#|&)/,""))?(t.split("&").forEach(function(t){var n=t.replace(/\+/g," ").split("="),r=$e(n.shift()),o=n.length>0?$e(n.join("=")):null;void 0===e[r]?e[r]=o:Array.isArray(e[r])?e[r].push(o):e[r]=[e[r],o]}),e):e}function i(t){var e=t?Object.keys(t).map(function(e){var n=t[e];if(void 0===n)return"";if(null===n)return _e(e);if(Array.isArray(n)){var r=[];return n.slice().forEach(function(t){void 0!==t&&r.push(null===t?_e(e):_e(e)+"="+_e(t))}),r.join("&")}return _e(e)+"="+_e(n)}).filter(function(t){return t.length>0}).join("&"):null;return e?"?"+e:""}function a(t,e,n){var r={name:e.name||t&&t.name,meta:t&&t.meta||{},path:e.path||"/",hash:e.hash||"",query:e.query||{},params:e.params||{},fullPath:c(e),matched:t?u(t):[]};return n&&(r.redirectedFrom=c(n)),Object.freeze(r)}function u(t){for(var e=[];t;)e.unshift(t),t=t.parent;return e}function c(t){var e=t.path,n=t.query;void 0===n&&(n={});var r=t.hash;return void 0===r&&(r=""),(e||"/")+i(n)+r}function s(t,e){return e===Se?t===e:e?t.path&&e.path?t.path.replace(Te,"")===e.path.replace(Te,"")&&t.hash===e.hash&&p(t.query,e.query):t.name&&e.name?t.name===e.name&&t.hash===e.hash&&p(t.query,e.query)&&p(t.params,e.params):!1:!1}function p(t,e){void 0===t&&(t={}),void 0===e&&(e={});var n=Object.keys(t),r=Object.keys(e);return n.length!==r.length?!1:n.every(function(n){return String(t[n])===String(e[n])})}function f(t,e){return 0===t.path.replace(Te,"/").indexOf(e.path.replace(Te,"/"))&&(!e.hash||t.hash===e.hash)&&h(t.query,e.query)}function h(t,e){for(var n in e)if(!(n in t))return!1;return!0}function l(t){if(!(t.metaKey||t.ctrlKey||t.shiftKey||t.defaultPrevented||void 0!==t.button&&0!==t.button)){if(t.target&&t.target.getAttribute){var e=t.target.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function d(t){if(t)for(var e,n=0;n<t.length;n++){if(e=t[n],"a"===e.tag)return e;if(e.children&&(e=d(e.children)))return e}}function y(t){if(!y.installed){y.installed=!0,Oe=t,Object.defineProperty(t.prototype,"$router",{get:function(){return this.$root._router}}),Object.defineProperty(t.prototype,"$route",{get:function(){return this.$root._route}}),t.mixin({beforeCreate:function(){this.$options.router&&(this._router=this.$options.router,this._router.init(this),t.util.defineReactive(this,"_route",this._router.history.current))}}),t.component("router-view",Ee),t.component("router-link",Pe);var e=t.config.optionMergeStrategies;e.beforeRouteEnter=e.beforeRouteLeave=e.created}}function v(t,e,n){if("/"===t.charAt(0))return t;if("?"===t.charAt(0)||"#"===t.charAt(0))return e+t;var r=e.split("/");n&&r[r.length-1]||r.pop();for(var o=t.replace(/^\//,"").split("/"),i=0;i<o.length;i++){var a=o[i];"."!==a&&(".."===a?r.pop():r.push(a))}return""!==r[0]&&r.unshift(""),r.join("/")}function m(t){var e="",n="",r=t.indexOf("#");r>=0&&(e=t.slice(r),t=t.slice(0,r));var o=t.indexOf("?");return o>=0&&(n=t.slice(o+1),t=t.slice(0,o)),{path:t,query:n,hash:e}}function g(t){return t.replace(/\/\//g,"/")}function w(t,e,n){var r=e||Object.create(null),o=n||Object.create(null);return t.forEach(function(t){b(r,o,t)}),{pathMap:r,nameMap:o}}function b(n,r,o,i,a){var u=o.path,c=o.name;t(null!=u,'"path" is required in a route configuration.'),t("string"!=typeof o.component,'route config "component" for path: '+String(u||c)+" cannot be a string id. Use an actual component instead.");var s={path:x(u,i),components:o.components||{"default":o.component},instances:{},name:c,parent:i,matchAs:a,redirect:o.redirect,beforeEnter:o.beforeEnter,meta:o.meta||{},props:null==o.props?{}:o.components?o.props:{"default":o.props}};if(o.children&&(o.name&&o.children.some(function(t){return/^\/?$/.test(t.path)})&&e(!1,"Named Route '"+o.name+"' has a default child route. When navigating to this named route (:to=\"{name: '"+o.name+"'\"), the default child route will not be rendered. Remove the name from this route and use the name of the default child route for named links instead."),o.children.forEach(function(t){var e=a?g(a+"/"+t.path):void 0;b(n,r,t,s,e)})),void 0!==o.alias)if(Array.isArray(o.alias))o.alias.forEach(function(t){var e={path:t,children:o.children};b(n,r,e,i,s.path)});else{var p={path:o.alias,children:o.children};b(n,r,p,i,s.path)}n[s.path]||(n[s.path]=s),c&&(r[c]?a||e(!1,'Duplicate named routes definition: { name: "'+c+'", path: "'+s.path+'" }'):r[c]=s)}function x(t,e){return t=t.replace(/\/$/,""),"/"===t[0]?t:null==e?t:g(e.path+"/"+t)}function k(t,e){for(var n,r=[],o=0,i=0,a="",u=e&&e.delimiter||"/";null!=(n=Fe.exec(t));){var c=n[0],s=n[1],p=n.index;if(a+=t.slice(i,p),i=p+c.length,s)a+=s[1];else{var f=t[i],h=n[2],l=n[3],d=n[4],y=n[5],v=n[6],m=n[7];a&&(r.push(a),a="");var g=null!=h&&null!=f&&f!==h,w="+"===v||"*"===v,b="?"===v||"*"===v,x=n[2]||u,k=d||y;r.push({name:l||o++,prefix:h||"",delimiter:x,optional:b,repeat:w,partial:g,asterisk:!!m,pattern:k?C(k):m?".*":"[^"+A(x)+"]+?"})}}return i<t.length&&(a+=t.substr(i)),a&&r.push(a),r}function R(t,e){return j(k(t,e))}function O(t){return encodeURI(t).replace(/[\/?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}function E(t){return encodeURI(t).replace(/[?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}function j(t){for(var e=new Array(t.length),n=0;n<t.length;n++)"object"==typeof t[n]&&(e[n]=new RegExp("^(?:"+t[n].pattern+")$"));return function(n,r){for(var o="",i=n||{},a=r||{},u=a.pretty?O:encodeURIComponent,c=0;c<t.length;c++){var s=t[c];if("string"!=typeof s){var p,f=i[s.name];if(null==f){if(s.optional){s.partial&&(o+=s.prefix);continue}throw new TypeError('Expected "'+s.name+'" to be defined')}if(Me(f)){if(!s.repeat)throw new TypeError('Expected "'+s.name+'" to not repeat, but received `'+JSON.stringify(f)+"`");if(0===f.length){if(s.optional)continue;throw new TypeError('Expected "'+s.name+'" to not be empty')}for(var h=0;h<f.length;h++){if(p=u(f[h]),!e[c].test(p))throw new TypeError('Expected all "'+s.name+'" to match "'+s.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===h?s.prefix:s.delimiter)+p}}else{if(p=s.asterisk?E(f):u(f),!e[c].test(p))throw new TypeError('Expected "'+s.name+'" to match "'+s.pattern+'", but received "'+p+'"');o+=s.prefix+p}}else o+=s}return o}}function A(t){return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function C(t){return t.replace(/([=!:$\/()])/g,"\\$1")}function _(t,e){return t.keys=e,t}function $(t){return t.sensitive?"":"i"}function T(t,e){var n=t.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)e.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return _(t,e)}function S(t,e,n){for(var r=[],o=0;o<t.length;o++)r.push(P(t[o],e,n).source);var i=new RegExp("(?:"+r.join("|")+")",$(n));return _(i,e)}function q(t,e,n){return L(k(t,n),e,n)}function L(t,e,n){Me(e)||(n=e||n,e=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",a=0;a<t.length;a++){var u=t[a];if("string"==typeof u)i+=A(u);else{var c=A(u.prefix),s="(?:"+u.pattern+")";e.push(u),u.repeat&&(s+="(?:"+c+s+")*"),s=u.optional?u.partial?c+"("+s+")?":"(?:"+c+"("+s+"))?":c+"("+s+")",i+=s}}var p=A(n.delimiter||"/"),f=i.slice(-p.length)===p;return r||(i=(f?i.slice(0,-p.length):i)+"(?:"+p+"(?=$))?"),i+=o?"$":r&&f?"":"(?="+p+"|$)",_(new RegExp("^"+i,$(n)),e)}function P(t,e,n){return Me(e)||(n=e||n,e=[]),n=n||{},t instanceof RegExp?T(t,e):Me(t)?S(t,e,n):q(t,e,n)}function U(t){var e,n,r=Ne[t];return r?(e=r.keys,n=r.regexp):(e=[],n=ze(t,e),Ne[t]={keys:e,regexp:n}),{keys:e,regexp:n}}function V(t,n,r){try{var o=Je[t]||(Je[t]=ze.compile(t));return o(n||{},{pretty:!0})}catch(i){return e(!1,"missing param for "+r+": "+i.message),""}}function M(t,n,o){var i="string"==typeof t?{path:t}:t;if(i.name||i._normalized)return i;if(!i.path&&i.params&&n){i=z({},i),i._normalized=!0;var a=z(z({},n.params),i.params);if(n.name)i.name=n.name,i.params=a;else if(n.matched){var u=n.matched[n.matched.length-1].path;i.path=V(u,a,"path "+n.path)}else e(!1,"relative params navigation requires a current route.");return i}var c=m(i.path||""),s=n&&n.path||"/",p=c.path?v(c.path,s,o||i.append):n&&n.path||"/",f=r(c.query,i.query),h=i.hash||c.hash;return h&&"#"!==h.charAt(0)&&(h="#"+h),{_normalized:!0,path:p,query:f,hash:h}}function z(t,e){for(var n in e)t[n]=e[n];return t}function B(n){function r(t){w(t,p,f)}function o(t,n,r){var o=M(t,n),i=o.name;if(i){var a=f[i];e(a,"Route with name '"+i+"' does not exist");var u=U(a.path).keys.filter(function(t){return!t.optional}).map(function(t){return t.name});if("object"!=typeof o.params&&(o.params={}),n&&"object"==typeof n.params)for(var s in n.params)!(s in o.params)&&u.indexOf(s)>-1&&(o.params[s]=n.params[s]);if(a)return o.path=V(a.path,o.params,'named route "'+i+'"'),c(a,o,r)}else if(o.path){o.params={};for(var h in p)if(H(h,o.params,o.path))return c(p[h],o,r)}return c(null,o)}function i(n,r){var i=n.redirect,u="function"==typeof i?i(a(n,r)):i;if("string"==typeof u&&(u={path:u}),!u||"object"!=typeof u)return!0&&e(!1,"invalid redirect option: "+JSON.stringify(u)),c(null,r);var s=u,p=s.name,h=s.path,l=r.query,d=r.hash,y=r.params;if(l=s.hasOwnProperty("query")?s.query:l,d=s.hasOwnProperty("hash")?s.hash:d,y=s.hasOwnProperty("params")?s.params:y,p){var v=f[p];return t(v,'redirect failed: named route "'+p+'" not found.'),o({_normalized:!0,name:p,query:l,hash:d,params:y},void 0,r)}if(h){var m=I(h,n),g=V(m,y,'redirect route with path "'+m+'"');return o({_normalized:!0,path:g,query:l,hash:d},void 0,r)}return e(!1,"invalid redirect option: "+JSON.stringify(u)),c(null,r)}function u(t,e,n){var r=V(n,e.params,'aliased route with path "'+n+'"'),i=o({_normalized:!0,path:r});if(i){var a=i.matched,u=a[a.length-1];return e.params=i.params,c(u,e)}return c(null,e)}function c(t,e,n){return t&&t.redirect?i(t,n||e):t&&t.matchAs?u(t,e,t.matchAs):a(t,e,n)}var s=w(n),p=s.pathMap,f=s.nameMap;return{match:o,addRoutes:r}}function H(t,e,n){var r=U(t),o=r.regexp,i=r.keys,a=n.match(o);if(!a)return!1;if(!e)return!0;for(var u=1,c=a.length;c>u;++u){var s=i[u-1],p="string"==typeof a[u]?decodeURIComponent(a[u]):a[u];s&&(e[s.name]=p)}return!0}function I(t,e){return v(t,e.parent?e.parent.path:"/",!0)}function D(){window.addEventListener("popstate",function(t){N(),t.state&&t.state.key&&Z(t.state.key)})}function F(e,n,r,o){if(e.app){var i=e.options.scrollBehavior;i&&(t("function"==typeof i,"scrollBehavior must be a function"),e.app.$nextTick(function(){var t=J(),e=i(n,r,o?t:null);if(e){var a="object"==typeof e;if(a&&"string"==typeof e.selector){var u=document.querySelector(e.selector);u?t=K(u):W(e)&&(t=X(e))}else a&&W(e)&&(t=X(e));t&&window.scrollTo(t.x,t.y)}}))}}function N(){var t=Q();t&&(Ke[t]={x:window.pageXOffset,y:window.pageYOffset})}function J(){var t=Q();return t?Ke[t]:void 0}function K(t){var e=document.documentElement,n=e.getBoundingClientRect(),r=t.getBoundingClientRect();return{x:r.left-n.left,y:r.top-n.top}}function W(t){return Y(t.x)||Y(t.y)}function X(t){return{x:Y(t.x)?t.x:window.pageXOffset,y:Y(t.y)?t.y:window.pageYOffset}}function Y(t){return"number"==typeof t}function G(){return Xe.now().toFixed(3)}function Q(){return Ye}function Z(t){Ye=t}function te(t,e){N();var n=window.history;try{e?n.replaceState({key:Ye},"",t):(Ye=G(),n.pushState({key:Ye},"",t))}catch(r){window.location[e?"replace":"assign"](t)}}function ee(t){te(t,!0)}function ne(t,e,n){var r=function(o){o>=t.length?n():t[o]?e(t[o],function(){r(o+1)}):r(o+1)};r(0)}function re(t){if(!t)if(Ue){var e=document.querySelector("base");t=e&&e.getAttribute("href")||"/"}else t="/";return"/"!==t.charAt(0)&&(t="/"+t),t.replace(/\/$/,"")}function oe(t,e){var n,r=Math.max(t.length,e.length);for(n=0;r>n&&t[n]===e[n];n++);return{updated:e.slice(0,n),activated:e.slice(n),deactivated:t.slice(n)}}function ie(t,e,n,r){var o=de(t,function(t,r,o,i){var a=ae(t,e);return a?Array.isArray(a)?a.map(function(t){return n(t,r,o,i)}):n(a,r,o,i):void 0});return ye(r?o.reverse():o)}function ae(t,e){return"function"!=typeof t&&(t=Oe.extend(t)),t.options[e]}function ue(t){return ie(t,"beforeRouteLeave",se,!0)}function ce(t){return ie(t,"beforeRouteUpdate",se)}function se(t,e){return function(){return t.apply(e,arguments)}}function pe(t,e,n){return ie(t,"beforeRouteEnter",function(t,r,o,i){return fe(t,o,i,e,n)})}function fe(t,e,n,r,o){return function(i,a,u){return t(i,a,function(t){u(t),"function"==typeof t&&r.push(function(){he(t,e.instances,n,o)})})}}function he(t,e,n,r){e[n]?t(e[n]):r()&&setTimeout(function(){he(t,e,n,r)},16)}function le(t){return de(t,function(t,n,r,o){return"function"!=typeof t||t.options?void 0:function(n,i,a){var u=ve(function(t){r.components[o]=t,a()}),c=ve(function(t){e(!1,"Failed to resolve async component "+o+": "+t),a(!1)}),s=t(u,c);s&&"function"==typeof s.then&&s.then(u,c)}})}function de(t,e){return ye(t.map(function(t){return Object.keys(t.components).map(function(n){return e(t.components[n],t.instances[n],t,n)})}))}function ye(t){return Array.prototype.concat.apply([],t)}function ve(t){var e=!1;return function(){return e?void 0:(e=!0,t.apply(this,arguments))}}function me(t){var e=window.location.pathname;return t&&0===e.indexOf(t)&&(e=e.slice(t.length)),(e||"/")+window.location.search+window.location.hash}function ge(t){var e=me(t);return/^\/#/.test(e)?void 0:(window.location.replace(g(t+"/#"+e)),!0)}function we(){var t=be();return"/"===t.charAt(0)?!0:(ke("/"+t),!1)}function be(){var t=window.location.href,e=t.indexOf("#");return-1===e?"":t.slice(e+1)}function xe(t){window.location.hash=t}function ke(t){var e=window.location.href.indexOf("#");window.location.replace(window.location.href.slice(0,e>=0?e:0)+"#"+t)}function Re(t,e,n){var r="hash"===n?"#"+e:e;return t?g(t+"/"+r):r}var Oe,Ee={name:"router-view",functional:!0,props:{name:{type:String,"default":"default"}},render:function(t,e){var r=e.props,o=e.children,i=e.parent,a=e.data;a.routerView=!0;for(var u=r.name,c=i.$route,s=i._routerViewCache||(i._routerViewCache={}),p=0,f=!1;i;)i.$vnode&&i.$vnode.data.routerView&&p++,i._inactive&&(f=!0),i=i.$parent;if(a.routerViewDepth=p,f)return t(s[u],a,o);var h=c.matched[p];if(!h)return s[u]=null,t();var l=s[u]=h.components[u],d=a.hook||(a.hook={});return d.init=function(t){h.instances[u]=t.child},d.prepatch=function(t,e){h.instances[u]=e.child},d.destroy=function(t){h.instances[u]===t.child&&(h.instances[u]=void 0)},a.props=n(c,h.props&&h.props[u]),t(l,a,o)}},je=/[!'()*]/g,Ae=function(t){return"%"+t.charCodeAt(0).toString(16)},Ce=/%2C/g,_e=function(t){return encodeURIComponent(t).replace(je,Ae).replace(Ce,",")},$e=decodeURIComponent,Te=/\/?$/,Se=a(null,{path:"/"}),qe=[String,Object],Le=[String,Array],Pe={name:"router-link",props:{to:{type:qe,required:!0},tag:{type:String,"default":"a"},exact:Boolean,append:Boolean,replace:Boolean,activeClass:String,event:{type:Le,"default":"click"}},render:function(t){var e=this,n=this.$router,r=this.$route,o=n.resolve(this.to,r,this.append),i=o.location,u=o.route,c=o.href,p={},h=this.activeClass||n.options.linkActiveClass||"router-link-active",y=i.path?a(null,i):u;p[h]=this.exact?s(r,y):f(r,y);var v=function(t){l(t)&&(e.replace?n.replace(i):n.push(i))},m={click:l};Array.isArray(this.event)?this.event.forEach(function(t){m[t]=v}):m[this.event]=v;var g={"class":p};if("a"===this.tag)g.on=m,g.attrs={href:c};else{var w=d(this.$slots.default);if(w){w.isStatic=!1;var b=Oe.util.extend,x=w.data=b({},w.data);x.on=m;var k=w.data.attrs=b({},w.data.attrs);k.href=c}else g.on=m}return t(this.tag,g,this.$slots.default)}},Ue="undefined"!=typeof window,Ve=Array.isArray||function(t){return"[object Array]"==Object.prototype.toString.call(t)},Me=Ve,ze=P,Be=k,He=R,Ie=j,De=L,Fe=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");ze.parse=Be,ze.compile=He,ze.tokensToFunction=Ie,ze.tokensToRegExp=De;var Ne=Object.create(null),Je=Object.create(null),Ke=Object.create(null),We=Ue&&function(){var t=window.navigator.userAgent;return-1===t.indexOf("Android 2.")&&-1===t.indexOf("Android 4.0")||-1===t.indexOf("Mobile Safari")||-1!==t.indexOf("Chrome")||-1!==t.indexOf("Windows Phone")?window.history&&"pushState"in window.history:!1}(),Xe=Ue&&window.performance&&window.performance.now?window.performance:Date,Ye=G(),Ge=function(t,e){this.router=t,this.base=re(e),this.current=Se,this.pending=null,this.ready=!1,this.readyCbs=[]};Ge.prototype.listen=function(t){this.cb=t},Ge.prototype.onReady=function(t){this.ready?t():this.readyCbs.push(t)},Ge.prototype.transitionTo=function(t,e,n){var r=this,o=this.router.match(t,this.current);this.confirmTransition(o,function(){r.updateRoute(o),e&&e(o),r.ensureURL(),r.ready||(r.ready=!0,r.readyCbs.forEach(function(t){t(o)}))},n)},Ge.prototype.confirmTransition=function(t,e,n){var r=this,o=this.current,i=function(){n&&n()};if(s(t,o)&&t.matched.length===o.matched.length)return this.ensureURL(),i();var a=oe(this.current.matched,t.matched),u=a.updated,c=a.deactivated,p=a.activated,f=[].concat(ue(c),this.router.beforeHooks,ce(u),p.map(function(t){return t.beforeEnter}),le(p));this.pending=t;var h=function(e,n){return r.pending!==t?i():void e(t,o,function(t){t===!1?(r.ensureURL(!0),i()):"string"==typeof t||"object"==typeof t?("object"==typeof t&&t.replace?r.replace(t):r.push(t),i()):n(t)})};ne(f,h,function(){var n=[],o=function(){return r.current===t},a=pe(p,n,o);ne(a,h,function(){return r.pending!==t?i():(r.pending=null,e(t),void(r.router.app&&r.router.app.$nextTick(function(){n.forEach(function(t){return t()})})))})})},Ge.prototype.updateRoute=function(t){var e=this.current;this.current=t,this.cb&&this.cb(t),this.router.afterHooks.forEach(function(n){n&&n(t,e)})};var Qe=function(t){function e(e,n){var r=this;t.call(this,e,n);var o=e.options.scrollBehavior;o&&D(),window.addEventListener("popstate",function(){r.transitionTo(me(r.base),function(t){o&&F(e,t,r.current,!0)})})}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.go=function(t){window.history.go(t)},e.prototype.push=function(t,e,n){var r=this,o=this,i=o.current;this.transitionTo(t,function(t){te(g(r.base+t.fullPath)),F(r.router,t,i,!1),e&&e(t)},n)},e.prototype.replace=function(t,e,n){var r=this,o=this,i=o.current;this.transitionTo(t,function(t){ee(g(r.base+t.fullPath)),F(r.router,t,i,!1),e&&e(t)},n)},e.prototype.ensureURL=function(t){if(me(this.base)!==this.current.fullPath){var e=g(this.base+this.current.fullPath);t?te(e):ee(e)}},e.prototype.getCurrentLocation=function(){return me(this.base)},e}(Ge),Ze=function(t){function e(e,n,r){t.call(this,e,n),r&&ge(this.base)||we()}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setupListeners=function(){var t=this;window.addEventListener("hashchange",function(){we()&&t.transitionTo(be(),function(t){ke(t.fullPath)})})},e.prototype.push=function(t,e,n){this.transitionTo(t,function(t){xe(t.fullPath),e&&e(t)},n)},e.prototype.replace=function(t,e,n){this.transitionTo(t,function(t){ke(t.fullPath),e&&e(t)},n)},e.prototype.go=function(t){window.history.go(t)},e.prototype.ensureURL=function(t){var e=this.current.fullPath;be()!==e&&(t?xe(e):ke(e))},e.prototype.getCurrentLocation=function(){return be()},e}(Ge),tn=function(t){function e(e,n){t.call(this,e,n),this.stack=[],this.index=-1}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.push=function(t,e,n){var r=this;this.transitionTo(t,function(t){r.stack=r.stack.slice(0,r.index+1).concat(t),r.index++,e&&e(t)},n)},e.prototype.replace=function(t,e,n){var r=this;this.transitionTo(t,function(t){r.stack=r.stack.slice(0,r.index).concat(t),e&&e(t)},n)},e.prototype.go=function(t){var e=this,n=this.index+t;if(!(0>n||n>=this.stack.length)){var r=this.stack[n];this.confirmTransition(r,function(){e.index=n,e.updateRoute(r)})}},e.prototype.getCurrentLocation=function(){var t=this.stack[this.stack.length-1];return t?t.fullPath:"/"},e.prototype.ensureURL=function(){},e}(Ge),en=function(e){void 0===e&&(e={}),this.app=null,this.apps=[],this.options=e,this.beforeHooks=[],this.afterHooks=[],this.matcher=B(e.routes||[]);var n=e.mode||"hash";switch(this.fallback="history"===n&&!We,this.fallback&&(n="hash"),Ue||(n="abstract"),this.mode=n,n){case"history":this.history=new Qe(this,e.base);break;case"hash":this.history=new Ze(this,e.base,this.fallback);break;case"abstract":this.history=new tn(this,e.base);break;default:t(!1,"invalid mode: "+n)}},nn={currentRoute:{}};return en.prototype.match=function(t,e,n){return this.matcher.match(t,e,n)},nn.currentRoute.get=function(){return this.history&&this.history.current},en.prototype.init=function(e){var n=this;if(!0&&t(y.installed,"not installed. Make sure to call `Vue.use(VueRouter)` before creating root instance."),this.apps.push(e),!this.app){this.app=e;var r=this.history;if(r instanceof Qe)r.transitionTo(r.getCurrentLocation());else if(r instanceof Ze){var o=function(){r.setupListeners()};r.transitionTo(r.getCurrentLocation(),o,o)}r.listen(function(t){n.apps.forEach(function(e){e._route=t})})}},en.prototype.beforeEach=function(t){this.beforeHooks.push(t)},en.prototype.afterEach=function(t){this.afterHooks.push(t)},en.prototype.onReady=function(t){this.history.onReady(t)},en.prototype.push=function(t,e,n){this.history.push(t,e,n)},en.prototype.replace=function(t,e,n){this.history.replace(t,e,n)},en.prototype.go=function(t){this.history.go(t)},en.prototype.back=function(){this.go(-1)},en.prototype.forward=function(){this.go(1)},en.prototype.getMatchedComponents=function(t){var e=t?this.resolve(t).route:this.currentRoute;return e?[].concat.apply([],e.matched.map(function(t){return Object.keys(t.components).map(function(e){return t.components[e]})})):[]},en.prototype.resolve=function(t,e,n){var r=M(t,e||this.history.current,n),o=this.match(r,e),i=o.redirectedFrom||o.fullPath,a=this.history.base,u=Re(a,i,this.mode);return{location:r,route:o,href:u,normalizedTo:r,resolved:o}},en.prototype.addRoutes=function(t){this.matcher.addRoutes(t),this.history.current!==Se&&this.history.transitionTo(this.history.getCurrentLocation())},Object.defineProperties(en.prototype,nn),en.install=y,en.version="2.3.1",Ue&&window.Vue&&window.Vue.use(en),en});