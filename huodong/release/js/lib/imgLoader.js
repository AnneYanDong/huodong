!function(){function n(n){return"[object Array]"===Object.prototype.toString.call(n)}var o=function(o,e,t){t=t||5e3,o=n(o)&&o||[],e="function"==typeof e&&e;var i=o.length,r=0,f=[],c=function(){i>r&&(++r,e&&e(r/i))};if(!i)return e&&e(1);for(var a=0;i>a;a++)f[a]=new Image,f[a].onload=f[a].onerror=c,f[a].src=o[a];setTimeout(function(){i>r&&(r=i,e&&e(r/i))},t*i)};"function"==typeof define&&define.amd?define(function(){return console.log("amd is alive"),o}):(console.log("window imgloader"),window.imgLoader=o)}();