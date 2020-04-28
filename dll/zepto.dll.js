var dll_zepto=function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){t.exports=n},function(t,e,n){var r;void 0===(r=function(){return n=function(){var t,e,n,r,i,o=[],a=o.concat,s=o.filter,u=o.slice,c=window.document,l={},f={},h={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},p=/^\s*<(\w+|!)[^>]*>/,d=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,m=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,v=/^(?:body|html)$/i,y=/([A-Z])/g,g=["val","css","html","text","data","width","height","offset"],x=c.createElement("table"),b=c.createElement("tr"),w={tr:c.createElement("tbody"),tbody:x,thead:x,tfoot:x,td:b,th:b,"*":c.createElement("div")},E=/complete|loaded|interactive/,j=/^[\w-]*$/,S={},T=S.toString,C={},N=c.createElement("div"),O={tabindex:"tabIndex",readonly:"readOnly",for:"htmlFor",class:"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},P=Array.isArray||function(t){return t instanceof Array};function A(t){return null==t?String(t):S[T.call(t)]||"object"}function D(t){return"function"==A(t)}function L(t){return null!=t&&t==t.window}function M(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function $(t){return"object"==A(t)}function F(t){return $(t)&&!L(t)&&Object.getPrototypeOf(t)==Object.prototype}function k(t){var n=!!t&&"length"in t&&t.length,r=e.type(t);return"function"!=r&&!L(t)&&("array"==r||0===n||"number"==typeof n&&n>0&&n-1 in t)}function R(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function _(t){return t in f?f[t]:f[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function z(t,e){return"number"!=typeof e||h[R(t)]?e:e+"px"}function Z(t){return"children"in t?u.call(t.children):e.map(t.childNodes,(function(t){if(1==t.nodeType)return t}))}function q(t,e){var n,r=t?t.length:0;for(n=0;n<r;n++)this[n]=t[n];this.length=r,this.selector=e||""}function H(e,n,r){for(t in n)r&&(F(n[t])||P(n[t]))?(F(n[t])&&!F(e[t])&&(e[t]={}),P(n[t])&&!P(e[t])&&(e[t]=[]),H(e[t],n[t],r)):void 0!==n[t]&&(e[t]=n[t])}function I(t,n){return null==n?e(t):e(t).filter(n)}function V(t,e,n,r){return D(e)?e.call(t,n,r):e}function B(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function U(t,e){var n=t.className||"",r=n&&void 0!==n.baseVal;if(void 0===e)return r?n.baseVal:n;r?n.baseVal=e:t.className=e}function X(t){try{return t?"true"==t||"false"!=t&&("null"==t?null:+t+""==t?+t:/^[\[\{]/.test(t)?e.parseJSON(t):t):t}catch(e){return t}}function J(t,e){e(t);for(var n=0,r=t.childNodes.length;n<r;n++)J(t.childNodes[n],e)}return C.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.matches||t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var r,i=t.parentNode,o=!i;return o&&(i=N).appendChild(t),r=~C.qsa(i,e).indexOf(t),o&&N.removeChild(t),r},r=function(t){return t.replace(/-+(.)?/g,(function(t,e){return e?e.toUpperCase():""}))},i=function(t){return s.call(t,(function(e,n){return t.indexOf(e)==n}))},C.fragment=function(t,n,r){var i,o,a;return d.test(t)&&(i=e(c.createElement(RegExp.$1))),i||(t.replace&&(t=t.replace(m,"<$1></$2>")),void 0===n&&(n=p.test(t)&&RegExp.$1),n in w||(n="*"),(a=w[n]).innerHTML=""+t,i=e.each(u.call(a.childNodes),(function(){a.removeChild(this)}))),F(r)&&(o=e(i),e.each(r,(function(t,e){g.indexOf(t)>-1?o[t](e):o.attr(t,e)}))),i},C.Z=function(t,e){return new q(t,e)},C.isZ=function(t){return t instanceof C.Z},C.init=function(t,n){var r,i;if(!t)return C.Z();if("string"==typeof t)if("<"==(t=t.trim())[0]&&p.test(t))r=C.fragment(t,RegExp.$1,n),t=null;else{if(void 0!==n)return e(n).find(t);r=C.qsa(c,t)}else{if(D(t))return e(c).ready(t);if(C.isZ(t))return t;if(P(t))i=t,r=s.call(i,(function(t){return null!=t}));else if($(t))r=[t],t=null;else if(p.test(t))r=C.fragment(t.trim(),RegExp.$1,n),t=null;else{if(void 0!==n)return e(n).find(t);r=C.qsa(c,t)}}return C.Z(r,t)},(e=function(t,e){return C.init(t,e)}).extend=function(t){var e,n=u.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach((function(n){H(t,n,e)})),t},C.qsa=function(t,e){var n,r="#"==e[0],i=!r&&"."==e[0],o=r||i?e.slice(1):e,a=j.test(o);return t.getElementById&&a&&r?(n=t.getElementById(o))?[n]:[]:1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType?[]:u.call(a&&!r&&t.getElementsByClassName?i?t.getElementsByClassName(o):t.getElementsByTagName(e):t.querySelectorAll(e))},e.contains=c.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},e.type=A,e.isFunction=D,e.isWindow=L,e.isArray=P,e.isPlainObject=F,e.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},e.isNumeric=function(t){var e=Number(t),n=typeof t;return null!=t&&"boolean"!=n&&("string"!=n||t.length)&&!isNaN(e)&&isFinite(e)||!1},e.inArray=function(t,e,n){return o.indexOf.call(e,t,n)},e.camelCase=r,e.trim=function(t){return null==t?"":String.prototype.trim.call(t)},e.uuid=0,e.support={},e.expr={},e.noop=function(){},e.map=function(t,n){var r,i,o,a,s=[];if(k(t))for(i=0;i<t.length;i++)null!=(r=n(t[i],i))&&s.push(r);else for(o in t)null!=(r=n(t[o],o))&&s.push(r);return(a=s).length>0?e.fn.concat.apply([],a):a},e.each=function(t,e){var n,r;if(k(t)){for(n=0;n<t.length;n++)if(!1===e.call(t[n],n,t[n]))return t}else for(r in t)if(!1===e.call(t[r],r,t[r]))return t;return t},e.grep=function(t,e){return s.call(t,e)},window.JSON&&(e.parseJSON=JSON.parse),e.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),(function(t,e){S["[object "+e+"]"]=e.toLowerCase()})),e.fn={constructor:C.Z,length:0,forEach:o.forEach,reduce:o.reduce,push:o.push,sort:o.sort,splice:o.splice,indexOf:o.indexOf,concat:function(){var t,e,n=[];for(t=0;t<arguments.length;t++)e=arguments[t],n[t]=C.isZ(e)?e.toArray():e;return a.apply(C.isZ(this)?this.toArray():this,n)},map:function(t){return e(e.map(this,(function(e,n){return t.call(e,n,e)})))},slice:function(){return e(u.apply(this,arguments))},ready:function(t){return E.test(c.readyState)&&c.body?t(e):c.addEventListener("DOMContentLoaded",(function(){t(e)}),!1),this},get:function(t){return void 0===t?u.call(this):this[t>=0?t:t+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each((function(){null!=this.parentNode&&this.parentNode.removeChild(this)}))},each:function(t){return o.every.call(this,(function(e,n){return!1!==t.call(e,n,e)})),this},filter:function(t){return D(t)?this.not(this.not(t)):e(s.call(this,(function(e){return C.matches(e,t)})))},add:function(t,n){return e(i(this.concat(e(t,n))))},is:function(t){return this.length>0&&C.matches(this[0],t)},not:function(t){var n=[];if(D(t)&&void 0!==t.call)this.each((function(e){t.call(this,e)||n.push(this)}));else{var r="string"==typeof t?this.filter(t):k(t)&&D(t.item)?u.call(t):e(t);this.forEach((function(t){r.indexOf(t)<0&&n.push(t)}))}return e(n)},has:function(t){return this.filter((function(){return $(t)?e.contains(this,t):e(this).find(t).size()}))},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!$(t)?t:e(t)},last:function(){var t=this[this.length-1];return t&&!$(t)?t:e(t)},find:function(t){var n=this;return t?"object"==typeof t?e(t).filter((function(){var t=this;return o.some.call(n,(function(n){return e.contains(n,t)}))})):1==this.length?e(C.qsa(this[0],t)):this.map((function(){return C.qsa(this,t)})):e()},closest:function(t,n){var r=[],i="object"==typeof t&&e(t);return this.each((function(e,o){for(;o&&!(i?i.indexOf(o)>=0:C.matches(o,t));)o=o!==n&&!M(o)&&o.parentNode;o&&r.indexOf(o)<0&&r.push(o)})),e(r)},parents:function(t){for(var n=[],r=this;r.length>0;)r=e.map(r,(function(t){if((t=t.parentNode)&&!M(t)&&n.indexOf(t)<0)return n.push(t),t}));return I(n,t)},parent:function(t){return I(i(this.pluck("parentNode")),t)},children:function(t){return I(this.map((function(){return Z(this)})),t)},contents:function(){return this.map((function(){return this.contentDocument||u.call(this.childNodes)}))},siblings:function(t){return I(this.map((function(t,e){return s.call(Z(e.parentNode),(function(t){return t!==e}))})),t)},empty:function(){return this.each((function(){this.innerHTML=""}))},pluck:function(t){return e.map(this,(function(e){return e[t]}))},show:function(){return this.each((function(){var t,e,n;"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=(t=this.nodeName,l[t]||(e=c.createElement(t),c.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),l[t]=n),l[t]))}))},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var n=D(t);if(this[0]&&!n)var r=e(t).get(0),i=r.parentNode||this.length>1;return this.each((function(o){e(this).wrapAll(n?t.call(this,o):i?r.cloneNode(!0):r)}))},wrapAll:function(t){if(this[0]){var n;for(e(this[0]).before(t=e(t));(n=t.children()).length;)t=n.first();e(t).append(this)}return this},wrapInner:function(t){var n=D(t);return this.each((function(r){var i=e(this),o=i.contents(),a=n?t.call(this,r):t;o.length?o.wrapAll(a):i.append(a)}))},unwrap:function(){return this.parent().each((function(){e(this).replaceWith(e(this).children())})),this},clone:function(){return this.map((function(){return this.cloneNode(!0)}))},hide:function(){return this.css("display","none")},toggle:function(t){return this.each((function(){var n=e(this);(void 0===t?"none"==n.css("display"):t)?n.show():n.hide()}))},prev:function(t){return e(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return e(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each((function(n){var r=this.innerHTML;e(this).empty().append(V(this,t,n,r))})):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each((function(e){var n=V(this,t,e,this.textContent);this.textContent=null==n?"":""+n})):0 in this?this.pluck("textContent").join(""):null},attr:function(e,n){var r;return"string"!=typeof e||1 in arguments?this.each((function(r){if(1===this.nodeType)if($(e))for(t in e)B(this,t,e[t]);else B(this,e,V(this,n,r,this.getAttribute(e)))})):0 in this&&1==this[0].nodeType&&null!=(r=this[0].getAttribute(e))?r:void 0},removeAttr:function(t){return this.each((function(){1===this.nodeType&&t.split(" ").forEach((function(t){B(this,t)}),this)}))},prop:function(t,e){return t=O[t]||t,1 in arguments?this.each((function(n){this[t]=V(this,e,n,this[t])})):this[0]&&this[0][t]},removeProp:function(t){return t=O[t]||t,this.each((function(){delete this[t]}))},data:function(t,e){var n="data-"+t.replace(y,"-$1").toLowerCase(),r=1 in arguments?this.attr(n,e):this.attr(n);return null!==r?X(r):void 0},val:function(t){return 0 in arguments?(null==t&&(t=""),this.each((function(e){this.value=V(this,t,e,this.value)}))):this[0]&&(this[0].multiple?e(this[0]).find("option").filter((function(){return this.selected})).pluck("value"):this[0].value)},offset:function(t){if(t)return this.each((function(n){var r=e(this),i=V(this,t,n,r.offset()),o=r.offsetParent().offset(),a={top:i.top-o.top,left:i.left-o.left};"static"==r.css("position")&&(a.position="relative"),r.css(a)}));if(!this.length)return null;if(c.documentElement!==this[0]&&!e.contains(c.documentElement,this[0]))return{top:0,left:0};var n=this[0].getBoundingClientRect();return{left:n.left+window.pageXOffset,top:n.top+window.pageYOffset,width:Math.round(n.width),height:Math.round(n.height)}},css:function(n,i){if(arguments.length<2){var o=this[0];if("string"==typeof n){if(!o)return;return o.style[r(n)]||getComputedStyle(o,"").getPropertyValue(n)}if(P(n)){if(!o)return;var a={},s=getComputedStyle(o,"");return e.each(n,(function(t,e){a[e]=o.style[r(e)]||s.getPropertyValue(e)})),a}}var u="";if("string"==A(n))i||0===i?u=R(n)+":"+z(n,i):this.each((function(){this.style.removeProperty(R(n))}));else for(t in n)n[t]||0===n[t]?u+=R(t)+":"+z(t,n[t])+";":this.each((function(){this.style.removeProperty(R(t))}));return this.each((function(){this.style.cssText+=";"+u}))},index:function(t){return t?this.indexOf(e(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return!!t&&o.some.call(this,(function(t){return this.test(U(t))}),_(t))},addClass:function(t){return t?this.each((function(r){if("className"in this){n=[];var i=U(this);V(this,t,r,i).split(/\s+/g).forEach((function(t){e(this).hasClass(t)||n.push(t)}),this),n.length&&U(this,i+(i?" ":"")+n.join(" "))}})):this},removeClass:function(t){return this.each((function(e){if("className"in this){if(void 0===t)return U(this,"");n=U(this),V(this,t,e,n).split(/\s+/g).forEach((function(t){n=n.replace(_(t)," ")})),U(this,n.trim())}}))},toggleClass:function(t,n){return t?this.each((function(r){var i=e(this);V(this,t,r,U(this)).split(/\s+/g).forEach((function(t){(void 0===n?!i.hasClass(t):n)?i.addClass(t):i.removeClass(t)}))})):this},scrollTop:function(t){if(this.length){var e="scrollTop"in this[0];return void 0===t?e?this[0].scrollTop:this[0].pageYOffset:this.each(e?function(){this.scrollTop=t}:function(){this.scrollTo(this.scrollX,t)})}},scrollLeft:function(t){if(this.length){var e="scrollLeft"in this[0];return void 0===t?e?this[0].scrollLeft:this[0].pageXOffset:this.each(e?function(){this.scrollLeft=t}:function(){this.scrollTo(t,this.scrollY)})}},position:function(){if(this.length){var t=this[0],n=this.offsetParent(),r=this.offset(),i=v.test(n[0].nodeName)?{top:0,left:0}:n.offset();return r.top-=parseFloat(e(t).css("margin-top"))||0,r.left-=parseFloat(e(t).css("margin-left"))||0,i.top+=parseFloat(e(n[0]).css("border-top-width"))||0,i.left+=parseFloat(e(n[0]).css("border-left-width"))||0,{top:r.top-i.top,left:r.left-i.left}}},offsetParent:function(){return this.map((function(){for(var t=this.offsetParent||c.body;t&&!v.test(t.nodeName)&&"static"==e(t).css("position");)t=t.offsetParent;return t}))}},e.fn.detach=e.fn.remove,["width","height"].forEach((function(t){var n=t.replace(/./,(function(t){return t[0].toUpperCase()}));e.fn[t]=function(r){var i,o=this[0];return void 0===r?L(o)?o["inner"+n]:M(o)?o.documentElement["scroll"+n]:(i=this.offset())&&i[t]:this.each((function(n){(o=e(this)).css(t,V(this,r,n,o[t]()))}))}})),["after","prepend","before","append"].forEach((function(t,n){var r=n%2;e.fn[t]=function(){var t,i,o=e.map(arguments,(function(n){var r=[];return"array"==(t=A(n))?(n.forEach((function(t){return void 0!==t.nodeType?r.push(t):e.zepto.isZ(t)?r=r.concat(t.get()):void(r=r.concat(C.fragment(t)))})),r):"object"==t||null==n?n:C.fragment(n)})),a=this.length>1;return o.length<1?this:this.each((function(t,s){i=r?s:s.parentNode,s=0==n?s.nextSibling:1==n?s.firstChild:2==n?s:null;var u=e.contains(c.documentElement,i);o.forEach((function(t){if(a)t=t.cloneNode(!0);else if(!i)return e(t).remove();i.insertBefore(t,s),u&&J(t,(function(t){if(!(null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src)){var e=t.ownerDocument?t.ownerDocument.defaultView:window;e.eval.call(e,t.innerHTML)}}))}))}))},e.fn[r?t+"To":"insert"+(n?"Before":"After")]=function(n){return e(n)[t](this),this}})),C.Z.prototype=q.prototype=e.fn,C.uniq=i,C.deserializeValue=X,e.zepto=C,e}(),window.Zepto=n,void 0===window.$&&(window.$=n),t.exports=n,function(t){var e=1,n=Array.prototype.slice,r=t.isFunction,i=function(t){return"string"==typeof t},o={},a={},s="onfocusin"in window,u={focus:"focusin",blur:"focusout"},c={mouseenter:"mouseover",mouseleave:"mouseout"};function l(t){return t._zid||(t._zid=e++)}function f(t,e,n,r){if((e=h(e)).ns)var i=(a=e.ns,new RegExp("(?:^| )"+a.replace(" "," .* ?")+"(?: |$)"));var a;return(o[l(t)]||[]).filter((function(t){return t&&(!e.e||t.e==e.e)&&(!e.ns||i.test(t.ns))&&(!n||l(t.fn)===l(n))&&(!r||t.sel==r)}))}function h(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function p(t,e){return t.del&&!s&&t.e in u||!!e}function d(t){return c[t]||s&&u[t]||t}function m(e,n,r,i,a,s,u){var f=l(e),m=o[f]||(o[f]=[]);n.split(/\s/).forEach((function(n){if("ready"==n)return t(document).ready(r);var o=h(n);o.fn=r,o.sel=a,o.e in c&&(r=function(e){var n=e.relatedTarget;if(!n||n!==this&&!t.contains(this,n))return o.fn.apply(this,arguments)}),o.del=s;var l=s||r;o.proxy=function(t){if(!(t=w(t)).isImmediatePropagationStopped()){t.data=i;var n=l.apply(e,null==t._args?[t]:[t].concat(t._args));return!1===n&&(t.preventDefault(),t.stopPropagation()),n}},o.i=m.length,m.push(o),"addEventListener"in e&&e.addEventListener(d(o.e),o.proxy,p(o,u))}))}function v(t,e,n,r,i){var a=l(t);(e||"").split(/\s/).forEach((function(e){f(t,e,n,r).forEach((function(e){delete o[a][e.i],"removeEventListener"in t&&t.removeEventListener(d(e.e),e.proxy,p(e,i))}))}))}a.click=a.mousedown=a.mouseup=a.mousemove="MouseEvents",t.event={add:m,remove:v},t.proxy=function(e,o){var a=2 in arguments&&n.call(arguments,2);if(r(e)){var s=function(){return e.apply(o,a?a.concat(n.call(arguments)):arguments)};return s._zid=l(e),s}if(i(o))return a?(a.unshift(e[o],e),t.proxy.apply(null,a)):t.proxy(e[o],e);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,r){return this.on(t,e,n,r,1)};var y=function(){return!0},g=function(){return!1},x=/^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,b={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};function w(e,n){return!n&&e.isDefaultPrevented||(n||(n=e),t.each(b,(function(t,r){var i=n[t];e[t]=function(){return this[r]=y,i&&i.apply(n,arguments)},e[r]=g})),e.timeStamp||(e.timeStamp=Date.now()),(void 0!==n.defaultPrevented?n.defaultPrevented:"returnValue"in n?!1===n.returnValue:n.getPreventDefault&&n.getPreventDefault())&&(e.isDefaultPrevented=y)),e}function E(t){var e,n={originalEvent:t};for(e in t)x.test(e)||void 0===t[e]||(n[e]=t[e]);return w(n,t)}t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,o,a,s,u){var c,l,f=this;return e&&!i(e)?(t.each(e,(function(t,e){f.on(t,o,a,e,u)})),f):(i(o)||r(s)||!1===s||(s=a,a=o,o=void 0),void 0!==s&&!1!==a||(s=a,a=void 0),!1===s&&(s=g),f.each((function(r,i){u&&(c=function(t){return v(i,t.type,s),s.apply(this,arguments)}),o&&(l=function(e){var r,a=t(e.target).closest(o,i).get(0);if(a&&a!==i)return r=t.extend(E(e),{currentTarget:a,liveFired:i}),(c||s).apply(a,[r].concat(n.call(arguments,1)))}),m(i,e,s,a,o,l||c)})))},t.fn.off=function(e,n,o){var a=this;return e&&!i(e)?(t.each(e,(function(t,e){a.off(t,n,e)})),a):(i(n)||r(o)||!1===o||(o=n,n=void 0),!1===o&&(o=g),a.each((function(){v(this,e,o,n)})))},t.fn.trigger=function(e,n){return(e=i(e)||t.isPlainObject(e)?t.Event(e):w(e))._args=n,this.each((function(){e.type in u&&"function"==typeof this[e.type]?this[e.type]():"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)}))},t.fn.triggerHandler=function(e,n){var r,o;return this.each((function(a,s){(r=E(i(e)?t.Event(e):e))._args=n,r.target=s,t.each(f(s,e.type||e),(function(t,e){if(o=e.proxy(r),r.isImmediatePropagationStopped())return!1}))})),o},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach((function(e){t.fn[e]=function(t){return 0 in arguments?this.bind(e,t):this.trigger(e)}})),t.Event=function(t,e){i(t)||(t=(e=t).type);var n=document.createEvent(a[t]||"Events"),r=!0;if(e)for(var o in e)"bubbles"==o?r=!!e[o]:n[o]=e[o];return n.initEvent(t,r,!0),w(n)}}(n),function(t){var e,n,r=+new Date,i=window.document,o=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,a=/^(?:text|application)\/javascript/i,s=/^(?:text|application)\/xml/i,u=/^\s*$/,c=i.createElement("a");function l(e,n,r,o){if(e.global)return function(e,n,r){var i=t.Event(n);return t(e).trigger(i,r),!i.isDefaultPrevented()}(n||i,r,o)}function f(t,e){var n=e.context;if(!1===e.beforeSend.call(n,t,e)||!1===l(e,n,"ajaxBeforeSend",[t,e]))return!1;l(e,n,"ajaxSend",[t,e])}function h(t,e,n,r){var i=n.context;n.success.call(i,t,"success",e),r&&r.resolveWith(i,[t,"success",e]),l(n,i,"ajaxSuccess",[e,n,t]),d("success",e,n)}function p(t,e,n,r,i){var o=r.context;r.error.call(o,n,e,t),i&&i.rejectWith(o,[n,e,t]),l(r,o,"ajaxError",[n,r,t||e]),d(e,n,r)}function d(e,n,r){var i=r.context;r.complete.call(i,n,e),l(r,i,"ajaxComplete",[n,r]),function(e){e.global&&!--t.active&&l(e,null,"ajaxStop")}(r)}function m(){}function v(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function y(e,n,r,i){return t.isFunction(n)&&(i=r,r=n,n=void 0),t.isFunction(r)||(i=r,r=void 0),{url:e,data:n,success:r,dataType:i}}c.href=window.location.href,t.active=0,t.ajaxJSONP=function(e,n){if(!("type"in e))return t.ajax(e);var o,a,s=e.jsonpCallback,u=(t.isFunction(s)?s():s)||"Zepto"+r++,c=i.createElement("script"),l=window[u],d=function(e){t(c).triggerHandler("error",e||"abort")},m={abort:d};return n&&n.promise(m),t(c).on("load error",(function(r,i){clearTimeout(a),t(c).off().remove(),"error"!=r.type&&o?h(o[0],m,e,n):p(null,i||"error",m,e,n),window[u]=l,o&&t.isFunction(l)&&l(o[0]),l=o=void 0})),!1===f(m,e)?(d("abort"),m):(window[u]=function(){o=arguments},c.src=e.url.replace(/\?(.+)=\?/,"?$1="+u),i.head.appendChild(c),e.timeout>0&&(a=setTimeout((function(){d("timeout")}),e.timeout)),m)},t.ajaxSettings={type:"GET",beforeSend:m,success:m,error:m,complete:m,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:"application/json",xml:"application/xml, text/xml",html:"text/html",text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0,dataFilter:m},t.ajax=function(r){var o,d,y=t.extend({},r||{}),g=t.Deferred&&t.Deferred();for(e in t.ajaxSettings)void 0===y[e]&&(y[e]=t.ajaxSettings[e]);!function(e){e.global&&0==t.active++&&l(e,null,"ajaxStart")}(y),y.crossDomain||((o=i.createElement("a")).href=y.url,o.href=o.href,y.crossDomain=c.protocol+"//"+c.host!=o.protocol+"//"+o.host),y.url||(y.url=window.location.toString()),(d=y.url.indexOf("#"))>-1&&(y.url=y.url.slice(0,d)),function(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()&&"jsonp"!=e.dataType||(e.url=v(e.url,e.data),e.data=void 0)}(y);var x=y.dataType,b=/\?.+=\?/.test(y.url);if(b&&(x="jsonp"),!1!==y.cache&&(r&&!0===r.cache||"script"!=x&&"jsonp"!=x)||(y.url=v(y.url,"_="+Date.now())),"jsonp"==x)return b||(y.url=v(y.url,y.jsonp?y.jsonp+"=?":!1===y.jsonp?"":"callback=?")),t.ajaxJSONP(y,g);var w,E=y.accepts[x],j={},S=function(t,e){j[t.toLowerCase()]=[t,e]},T=/^([\w-]+:)\/\//.test(y.url)?RegExp.$1:window.location.protocol,C=y.xhr(),N=C.setRequestHeader;if(g&&g.promise(C),y.crossDomain||S("X-Requested-With","XMLHttpRequest"),S("Accept",E||"*/*"),(E=y.mimeType||E)&&(E.indexOf(",")>-1&&(E=E.split(",",2)[0]),C.overrideMimeType&&C.overrideMimeType(E)),(y.contentType||!1!==y.contentType&&y.data&&"GET"!=y.type.toUpperCase())&&S("Content-Type",y.contentType||"application/x-www-form-urlencoded"),y.headers)for(n in y.headers)S(n,y.headers[n]);if(C.setRequestHeader=S,C.onreadystatechange=function(){if(4==C.readyState){C.onreadystatechange=m,clearTimeout(w);var e,n=!1;if(C.status>=200&&C.status<300||304==C.status||0==C.status&&"file:"==T){if(x=x||function(t){return t&&(t=t.split(";",2)[0]),t&&("text/html"==t?"html":"application/json"==t?"json":a.test(t)?"script":s.test(t)&&"xml")||"text"}(y.mimeType||C.getResponseHeader("content-type")),"arraybuffer"==C.responseType||"blob"==C.responseType)e=C.response;else{e=C.responseText;try{e=function(t,e,n){if(n.dataFilter==m)return t;var r=n.context;return n.dataFilter.call(r,t,e)}(e,x,y),"script"==x?(0,eval)(e):"xml"==x?e=C.responseXML:"json"==x&&(e=u.test(e)?null:t.parseJSON(e))}catch(t){n=t}if(n)return p(n,"parsererror",C,y,g)}h(e,C,y,g)}else p(C.statusText||null,C.status?"error":"abort",C,y,g)}},!1===f(C,y))return C.abort(),p(null,"abort",C,y,g),C;var O=!("async"in y)||y.async;if(C.open(y.type,y.url,O,y.username,y.password),y.xhrFields)for(n in y.xhrFields)C[n]=y.xhrFields[n];for(n in j)N.apply(C,j[n]);return y.timeout>0&&(w=setTimeout((function(){C.onreadystatechange=m,C.abort(),p(null,"timeout",C,y,g)}),y.timeout)),C.send(y.data?y.data:null),C},t.get=function(){return t.ajax(y.apply(null,arguments))},t.post=function(){var e=y.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=y.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,r){if(!this.length)return this;var i,a=this,s=e.split(/\s/),u=y(e,n,r),c=u.success;return s.length>1&&(u.url=s[0],i=s[1]),u.success=function(e){a.html(i?t("<div>").html(e.replace(o,"")).find(i):e),c&&c.apply(a,arguments)},t.ajax(u),this};var g=encodeURIComponent;t.param=function(e,n){var r=[];return r.add=function(e,n){t.isFunction(n)&&(n=n()),null==n&&(n=""),this.push(g(e)+"="+g(n))},function e(n,r,i,o){var a,s=t.isArray(r),u=t.isPlainObject(r);t.each(r,(function(r,c){a=t.type(c),o&&(r=i?o:o+"["+(u||"object"==a||"array"==a?r:"")+"]"),!o&&s?n.add(c.name,c.value):"array"==a||!i&&"object"==a?e(n,c,i,r):n.add(r,c)}))}(r,e,n),r.join("&").replace(/%20/g,"+")}}(n),(e=n).fn.serializeArray=function(){var t,n,r=[],i=function(e){if(e.forEach)return e.forEach(i);r.push({name:t,value:e})};return this[0]&&e.each(this[0].elements,(function(r,o){n=o.type,(t=o.name)&&"fieldset"!=o.nodeName.toLowerCase()&&!o.disabled&&"submit"!=n&&"reset"!=n&&"button"!=n&&"file"!=n&&("radio"!=n&&"checkbox"!=n||o.checked)&&i(e(o).val())})),r},e.fn.serialize=function(){var t=[];return this.serializeArray().forEach((function(e){t.push(encodeURIComponent(e.name)+"="+encodeURIComponent(e.value))})),t.join("&")},e.fn.submit=function(t){if(0 in arguments)this.bind("submit",t);else if(this.length){var n=e.Event("submit");this.eq(0).trigger(n),n.isDefaultPrevented()||this.get(0).submit()}return this},function(){try{getComputedStyle(void 0)}catch(e){var t=getComputedStyle;window.getComputedStyle=function(e,n){try{return t(e,n)}catch(t){return null}}}}(),n;var e,n}.call(e,n,e,t))||(t.exports=r)}]);