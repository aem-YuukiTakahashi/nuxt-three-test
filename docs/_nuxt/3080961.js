(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{403:function(t,e,r){"use strict";r.d(e,"a",(function(){return x}));r(268);var n=r(31),o=r(21),c=r(147),l=r(148),f=r(270),y=r(271),h=r(260),v=(r(404),r(28),r(190),r(288),r(61),r(47),r(46),r(19),r(405),r(406),r(196),r(81),r(145),r(283),r(87),r(88),r(199),r(282),r(290),r(37),r(287),r(286),r(258));function d(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=Object(h.a)(t);if(e){var o=Object(h.a)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return Object(y.a)(this,r)}}var x=function(t){Object(f.a)(r,t);var e=d(r);function r(t){var n;return Object(c.a)(this,r),(n=e.call(this,t)).defaultDPI=90,n.defaultUnit="px",n}return Object(l.a)(r,[{key:"load",value:function(t,e,r,n){var o=this,c=new v.j(o.manager);c.setPath(o.path),c.setRequestHeader(o.requestHeader),c.setWithCredentials(o.withCredentials),c.load(t,(function(text){try{e(o.parse(text))}catch(e){n?n(e):console.error(e),o.manager.itemError(t)}}),r,n)}},{key:"parse",value:function(text){var t=this;function e(path,t,e,n,o,c,l,f){if(0!=t&&0!=e){n=n*Math.PI/180,t=Math.abs(t),e=Math.abs(e);var y=(l.x-f.x)/2,h=(l.y-f.y)/2,v=Math.cos(n)*y+Math.sin(n)*h,d=-Math.sin(n)*y+Math.cos(n)*h,x=t*t,m=e*e,k=v*v,w=d*d,A=k/x+w/m;if(A>1){var s=Math.sqrt(A);x=(t*=s)*t,m=(e*=s)*e}var E=x*w+m*k,T=(x*m-E)/E,q=Math.sqrt(Math.max(0,T));o===c&&(q=-q);var M=q*t*d/e,P=-q*e*v/t,I=Math.cos(n)*M-Math.sin(n)*P+(l.x+f.x)/2,C=Math.sin(n)*M+Math.cos(n)*P+(l.y+f.y)/2,S=r(1,0,(v-M)/t,(d-P)/e),O=r((v-M)/t,(d-P)/e,(-v-M)/t,(-d-P)/e)%(2*Math.PI);path.currentPath.absellipse(I,C,t,e,S,S+O,0===c,n)}else path.lineTo(f.x,f.y)}function r(t,e,r,n){var o=t*r+e*n,c=Math.sqrt(t*t+e*e)*Math.sqrt(r*r+n*n),l=Math.acos(Math.max(-1,Math.min(1,o/c)));return t*n-e*r<0&&(l=-l),l}function c(t,style){style=Object.assign({},style);var e={};if(t.hasAttribute("class"))for(var r=t.getAttribute("class").split(/\s/).filter(Boolean).map((function(i){return i.trim()})),i=0;i<r.length;i++)e=Object.assign(e,w["."+r[i]]);function n(r,n,o){void 0===o&&(o=function(t){return t.startsWith("url")&&console.warn("SVGLoader: url access in attributes is not implemented."),t}),t.hasAttribute(r)&&(style[n]=o(t.getAttribute(r))),e[r]&&(style[n]=o(e[r])),t.style&&""!==t.style[r]&&(style[n]=o(t.style[r]))}function o(t){return Math.max(0,Math.min(1,d(t)))}function c(t){return Math.max(0,d(t))}return t.hasAttribute("id")&&(e=Object.assign(e,w["#"+t.getAttribute("id")])),n("fill","fill"),n("fill-opacity","fillOpacity",o),n("fill-rule","fillRule"),n("opacity","opacity",o),n("stroke","stroke"),n("stroke-opacity","strokeOpacity",o),n("stroke-width","strokeWidth",c),n("stroke-linejoin","strokeLineJoin"),n("stroke-linecap","strokeLineCap"),n("stroke-miterlimit","strokeMiterLimit",c),n("visibility","visibility"),style}function l(a,b){return a-(b-a)}function f(input,t,e){if("string"!=typeof input)throw new TypeError("Invalid input: "+Object(n.a)(input));var r,o={SEPARATOR:/[ \t\r\n\,.\-+]/,WHITESPACE:/[ \t\r\n]/,DIGIT:/[\d]/,SIGN:/[-+]/,POINT:/\./,COMMA:/,/,EXP:/e/i,FLAGS:/[01]/},c=0,l=!0,f="",y="",h=[];function v(t,i,e){var r=new SyntaxError('Unexpected character "'+t+'" at index '+i+".");throw r.partial=e,r}function d(){""!==f&&(""===y?h.push(Number(f)):h.push(Number(f)*Math.pow(10,Number(y)))),f="",y=""}for(var x=input.length,i=0;i<x;i++)if(r=input[i],Array.isArray(t)&&t.includes(h.length%e)&&o.FLAGS.test(r))c=1,f=r,d();else{if(0===c){if(o.WHITESPACE.test(r))continue;if(o.DIGIT.test(r)||o.SIGN.test(r)){c=1,f=r;continue}if(o.POINT.test(r)){c=2,f=r;continue}o.COMMA.test(r)&&(l&&v(r,i,h),l=!0)}if(1===c){if(o.DIGIT.test(r)){f+=r;continue}if(o.POINT.test(r)){f+=r,c=2;continue}if(o.EXP.test(r)){c=3;continue}o.SIGN.test(r)&&1===f.length&&o.SIGN.test(f[0])&&v(r,i,h)}if(2===c){if(o.DIGIT.test(r)){f+=r;continue}if(o.EXP.test(r)){c=3;continue}o.POINT.test(r)&&"."===f[f.length-1]&&v(r,i,h)}if(3===c){if(o.DIGIT.test(r)){y+=r;continue}if(o.SIGN.test(r)){if(""===y){y+=r;continue}1===y.length&&o.SIGN.test(y)&&v(r,i,h)}}o.WHITESPACE.test(r)?(d(),c=0,l=!1):o.COMMA.test(r)?(d(),c=0,l=!0):o.SIGN.test(r)?(d(),c=1,f=r):o.POINT.test(r)?(d(),c=2,f=r):v(r,i,h)}return d(),h}var y=["mm","cm","in","pt","pc","px"],h={mm:{mm:1,cm:.1,in:1/25.4,pt:72/25.4,pc:6/25.4,px:-1},cm:{mm:10,cm:1,in:1/2.54,pt:72/2.54,pc:6/2.54,px:-1},in:{mm:25.4,cm:2.54,in:1,pt:72,pc:6,px:-1},pt:{mm:25.4/72,cm:2.54/72,in:1/72,pt:1,pc:6/72,px:-1},pc:{mm:25.4/6,cm:2.54/6,in:1/6,pt:12,pc:1,px:-1},px:{px:1}};function d(e){var r="px";if("string"==typeof e||e instanceof String)for(var i=0,n=y.length;i<n;i++){var u=y[i];if(e.endsWith(u)){r=u,e=e.substring(0,e.length-u.length);break}}var o=void 0;return"px"===r&&"px"!==t.defaultUnit?o=h.in[t.defaultUnit]/t.defaultDPI:(o=h[r][t.defaultUnit])<0&&(o=h[r].in*t.defaultDPI),o*parseFloat(e)}function x(t){var e=t.elements;return Math.sqrt(e[0]*e[0]+e[1]*e[1])}function m(t){var e=t.elements;return Math.sqrt(e[3]*e[3]+e[4]*e[4])}var k=[],w={},A=[],E=new v.n,T=new v.n,M=new v.n,P=new v.n,I=new v.E,C=new v.F,S=new v.n,O=(new DOMParser).parseFromString(text,"image/svg+xml");return function t(r,style){if(1===r.nodeType){var n=function(t){if(!(t.hasAttribute("transform")||"use"===t.nodeName&&(t.hasAttribute("x")||t.hasAttribute("y"))))return null;var e=function(t){var e=new v.n,r=E;if("use"===t.nodeName&&(t.hasAttribute("x")||t.hasAttribute("y"))){var n=d(t.getAttribute("x")),o=d(t.getAttribute("y"));e.translate(n,o)}if(t.hasAttribute("transform"))for(var c=t.getAttribute("transform").split(")"),l=c.length-1;l>=0;l--){var y=c[l].trim();if(""!==y){var h=y.indexOf("("),x=y.length;if(h>0&&h<x){var m=y.slice(0,h),k=f(y.slice(h+1));switch(r.identity(),m){case"translate":if(k.length>=1){var w=k[0],A=0;k.length>=2&&(A=k[1]),r.translate(w,A)}break;case"rotate":if(k.length>=1){var I=0,C=0,S=0;I=-k[0]*Math.PI/180,k.length>=3&&(C=k[1],S=k[2]),T.identity().translate(-C,-S),M.identity().rotate(I),P.multiplyMatrices(M,T),T.identity().translate(C,S),r.multiplyMatrices(T,P)}break;case"scale":if(k.length>=1){var O=k[0],N=O;k.length>=2&&(N=k[1]),r.scale(O,N)}break;case"skewX":1===k.length&&r.set(1,Math.tan(k[0]*Math.PI/180),0,0,1,0,0,0,1);break;case"skewY":1===k.length&&r.set(1,0,0,Math.tan(k[0]*Math.PI/180),1,0,0,0,1);break;case"matrix":6===k.length&&r.set(k[0],k[2],k[4],k[1],k[3],k[5],0,0,1)}}e.premultiply(r)}}return e}(t);A.length>0&&e.premultiply(A[A.length-1]);return S.copy(e),A.push(e),e}(r),y=!1,path=null;switch(r.nodeName){case"svg":case"g":style=c(r,style);break;case"style":!function(t){if(!t.sheet||!t.sheet.cssRules||!t.sheet.cssRules.length)return;for(var i=0;i<t.sheet.cssRules.length;i++){var e=t.sheet.cssRules[i];if(1===e.type)for(var r=e.selectorText.split(/,/gm).filter(Boolean).map((function(i){return i.trim()})),n=0;n<r.length;n++){var c=Object.fromEntries(Object.entries(e.style).filter((function(t){return""!==Object(o.a)(t,2)[1]})));w[r[n]]=Object.assign(w[r[n]]||{},c)}}}(r);break;case"path":style=c(r,style),r.hasAttribute("d")&&(path=function(t){for(var path=new v.z,r=new v.E,n=new v.E,o=new v.E,c=!0,y=!1,h=t.getAttribute("d").match(/[a-df-z][^a-df-z]*/gi),i=0,d=h.length;i<d;i++){var x=h[i],m=x.charAt(0),k=x.slice(1).trim();!0===c&&(y=!0,c=!1);var w=void 0;switch(m){case"M":for(var A=0,E=(w=f(k)).length;A<E;A+=2)r.x=w[A+0],r.y=w[A+1],n.x=r.x,n.y=r.y,0===A?path.moveTo(r.x,r.y):path.lineTo(r.x,r.y),0===A&&o.copy(r);break;case"H":for(var T=0,M=(w=f(k)).length;T<M;T++)r.x=w[T],n.x=r.x,n.y=r.y,path.lineTo(r.x,r.y),0===T&&!0===y&&o.copy(r);break;case"V":for(var P=0,I=(w=f(k)).length;P<I;P++)r.y=w[P],n.x=r.x,n.y=r.y,path.lineTo(r.x,r.y),0===P&&!0===y&&o.copy(r);break;case"L":for(var C=0,S=(w=f(k)).length;C<S;C+=2)r.x=w[C+0],r.y=w[C+1],n.x=r.x,n.y=r.y,path.lineTo(r.x,r.y),0===C&&!0===y&&o.copy(r);break;case"C":for(var O=0,N=(w=f(k)).length;O<N;O+=6)path.bezierCurveTo(w[O+0],w[O+1],w[O+2],w[O+3],w[O+4],w[O+5]),n.x=w[O+2],n.y=w[O+3],r.x=w[O+4],r.y=w[O+5],0===O&&!0===y&&o.copy(r);break;case"S":for(var z=0,L=(w=f(k)).length;z<L;z+=4)path.bezierCurveTo(l(r.x,n.x),l(r.y,n.y),w[z+0],w[z+1],w[z+2],w[z+3]),n.x=w[z+0],n.y=w[z+1],r.x=w[z+2],r.y=w[z+3],0===z&&!0===y&&o.copy(r);break;case"Q":for(var R=0,V=(w=f(k)).length;R<V;R+=4)path.quadraticCurveTo(w[R+0],w[R+1],w[R+2],w[R+3]),n.x=w[R+0],n.y=w[R+1],r.x=w[R+2],r.y=w[R+3],0===R&&!0===y&&o.copy(r);break;case"T":for(var W=0,j=(w=f(k)).length;W<j;W+=2){var G=l(r.x,n.x),B=l(r.y,n.y);path.quadraticCurveTo(G,B,w[W+0],w[W+1]),n.x=G,n.y=B,r.x=w[W+0],r.y=w[W+1],0===W&&!0===y&&o.copy(r)}break;case"A":for(var D=0,H=(w=f(k,[3,4],7)).length;D<H;D+=7)if(w[D+5]!=r.x||w[D+6]!=r.y){var J=r.clone();r.x=w[D+5],r.y=w[D+6],n.x=r.x,n.y=r.y,e(path,w[D],w[D+1],w[D+2],w[D+3],w[D+4],J,r),0===D&&!0===y&&o.copy(r)}break;case"m":for(var U=0,X=(w=f(k)).length;U<X;U+=2)r.x+=w[U+0],r.y+=w[U+1],n.x=r.x,n.y=r.y,0===U?path.moveTo(r.x,r.y):path.lineTo(r.x,r.y),0===U&&o.copy(r);break;case"h":for(var F=0,Y=(w=f(k)).length;F<Y;F++)r.x+=w[F],n.x=r.x,n.y=r.y,path.lineTo(r.x,r.y),0===F&&!0===y&&o.copy(r);break;case"v":for(var Q=0,_=(w=f(k)).length;Q<_;Q++)r.y+=w[Q],n.x=r.x,n.y=r.y,path.lineTo(r.x,r.y),0===Q&&!0===y&&o.copy(r);break;case"l":for(var Z=0,K=(w=f(k)).length;Z<K;Z+=2)r.x+=w[Z+0],r.y+=w[Z+1],n.x=r.x,n.y=r.y,path.lineTo(r.x,r.y),0===Z&&!0===y&&o.copy(r);break;case"c":for(var $=0,tt=(w=f(k)).length;$<tt;$+=6)path.bezierCurveTo(r.x+w[$+0],r.y+w[$+1],r.x+w[$+2],r.y+w[$+3],r.x+w[$+4],r.y+w[$+5]),n.x=r.x+w[$+2],n.y=r.y+w[$+3],r.x+=w[$+4],r.y+=w[$+5],0===$&&!0===y&&o.copy(r);break;case"s":for(var et=0,nt=(w=f(k)).length;et<nt;et+=4)path.bezierCurveTo(l(r.x,n.x),l(r.y,n.y),r.x+w[et+0],r.y+w[et+1],r.x+w[et+2],r.y+w[et+3]),n.x=r.x+w[et+0],n.y=r.y+w[et+1],r.x+=w[et+2],r.y+=w[et+3],0===et&&!0===y&&o.copy(r);break;case"q":for(var it=0,at=(w=f(k)).length;it<at;it+=4)path.quadraticCurveTo(r.x+w[it+0],r.y+w[it+1],r.x+w[it+2],r.y+w[it+3]),n.x=r.x+w[it+0],n.y=r.y+w[it+1],r.x+=w[it+2],r.y+=w[it+3],0===it&&!0===y&&o.copy(r);break;case"t":for(var ot=0,st=(w=f(k)).length;ot<st;ot+=2){var ut=l(r.x,n.x),ct=l(r.y,n.y);path.quadraticCurveTo(ut,ct,r.x+w[ot+0],r.y+w[ot+1]),n.x=ut,n.y=ct,r.x=r.x+w[ot+0],r.y=r.y+w[ot+1],0===ot&&!0===y&&o.copy(r)}break;case"a":for(var lt=0,ft=(w=f(k,[3,4],7)).length;lt<ft;lt+=7)if(0!=w[lt+5]||0!=w[lt+6]){var yt=r.clone();r.x+=w[lt+5],r.y+=w[lt+6],n.x=r.x,n.y=r.y,e(path,w[lt],w[lt+1],w[lt+2],w[lt+3],w[lt+4],yt,r),0===lt&&!0===y&&o.copy(r)}break;case"Z":case"z":path.currentPath.autoClose=!0,path.currentPath.curves.length>0&&(r.copy(o),path.currentPath.currentPoint.copy(r),c=!0);break;default:console.warn(x)}y=!1}return path}(r));break;case"rect":style=c(r,style),path=function(t){var e=d(t.getAttribute("x")||0),r=d(t.getAttribute("y")||0),n=d(t.getAttribute("rx")||t.getAttribute("ry")||0),o=d(t.getAttribute("ry")||t.getAttribute("rx")||0),c=d(t.getAttribute("width")),l=d(t.getAttribute("height")),f=.448084975506,path=new v.z;path.moveTo(e+n,r),path.lineTo(e+c-n,r),(0!==n||0!==o)&&path.bezierCurveTo(e+c-n*f,r,e+c,r+o*f,e+c,r+o);path.lineTo(e+c,r+l-o),(0!==n||0!==o)&&path.bezierCurveTo(e+c,r+l-o*f,e+c-n*f,r+l,e+c-n,r+l);path.lineTo(e+n,r+l),(0!==n||0!==o)&&path.bezierCurveTo(e+n*f,r+l,e,r+l-o*f,e,r+l-o);path.lineTo(e,r+o),(0!==n||0!==o)&&path.bezierCurveTo(e,r+o*f,e+n*f,r,e+n,r);return path}(r);break;case"polygon":style=c(r,style),path=function(t){function e(t,a,b){var e=d(a),r=d(b);0===n?path.moveTo(e,r):path.lineTo(e,r),n++}var r=/(-?[\d\.?]+)[,|\s](-?[\d\.?]+)/g,path=new v.z,n=0;return t.getAttribute("points").replace(r,e),path.currentPath.autoClose=!0,path}(r);break;case"polyline":style=c(r,style),path=function(t){function e(t,a,b){var e=d(a),r=d(b);0===n?path.moveTo(e,r):path.lineTo(e,r),n++}var r=/(-?[\d\.?]+)[,|\s](-?[\d\.?]+)/g,path=new v.z,n=0;return t.getAttribute("points").replace(r,e),path.currentPath.autoClose=!1,path}(r);break;case"circle":style=c(r,style),path=function(t){var e=d(t.getAttribute("cx")||0),r=d(t.getAttribute("cy")||0),n=d(t.getAttribute("r")||0),o=new v.t;o.absarc(e,r,n,0,2*Math.PI);var path=new v.z;return path.subPaths.push(o),path}(r);break;case"ellipse":style=c(r,style),path=function(t){var e=d(t.getAttribute("cx")||0),r=d(t.getAttribute("cy")||0),n=d(t.getAttribute("rx")||0),o=d(t.getAttribute("ry")||0),c=new v.t;c.absellipse(e,r,n,o,0,2*Math.PI);var path=new v.z;return path.subPaths.push(c),path}(r);break;case"line":style=c(r,style),path=function(t){var e=d(t.getAttribute("x1")||0),r=d(t.getAttribute("y1")||0),n=d(t.getAttribute("x2")||0),o=d(t.getAttribute("y2")||0),path=new v.z;return path.moveTo(e,r),path.lineTo(n,o),path.currentPath.autoClose=!1,path}(r);break;case"defs":y=!0;break;case"use":style=c(r,style);var h=(r.getAttributeNS("http://www.w3.org/1999/xlink","href")||"").substring(1),O=r.viewportElement.getElementById(h);O?t(O,style):console.warn("SVGLoader: 'use node' references non-existent node id: "+h)}path&&(void 0!==style.fill&&"none"!==style.fill&&path.color.setStyle(style.fill),function(path,t){function e(e){C.set(e.x,e.y,1).applyMatrix3(t),e.set(C.x,C.y)}for(var r=function(t){return 0!==t.elements[1]||0!==t.elements[3]}(t),n=path.subPaths,i=0,o=n.length;i<o;i++)for(var c=n[i].curves,l=0;l<c.length;l++){var f=c[l];f.isLineCurve?(e(f.v1),e(f.v2)):f.isCubicBezierCurve?(e(f.v0),e(f.v1),e(f.v2),e(f.v3)):f.isQuadraticBezierCurve?(e(f.v0),e(f.v1),e(f.v2)):f.isEllipseCurve&&(r&&console.warn("SVGLoader: Elliptic arc or ellipse rotation or skewing is not implemented."),I.set(f.aX,f.aY),e(I),f.aX=I.x,f.aY=I.y,f.xRadius*=x(t),f.yRadius*=m(t))}}(path,S),k.push(path),path.userData={node:r,style:style});for(var N=r.childNodes,i=0;i<N.length;i++){var z=N[i];y&&"style"!==z.nodeName&&"defs"!==z.nodeName||t(z,style)}n&&(A.pop(),A.length>0?S.copy(A[A.length-1]):S.identity())}}(O.documentElement,{fill:"#000",fillOpacity:1,strokeOpacity:1,strokeWidth:1,strokeLineJoin:"miter",strokeLineCap:"butt",strokeMiterLimit:4}),{paths:k,xml:O.documentElement}}}],[{key:"createShapes",value:function(t){var e=999999999,r=0,n=1,o=2,c=3,l=4,f=5,y=6,h={loc:r,t:0};function d(t,e,n,c){var l=t.x,f=e.x,y=n.x,v=c.x,d=t.y,m=e.y,k=n.y,w=c.y,A=(v-y)*(d-k)-(w-k)*(l-y),E=(w-k)*(f-l)-(v-y)*(m-d),T=A/E,M=((f-l)*(d-k)-(m-d)*(l-y))/E;if(0===E&&0!==A||T<=0||T>=1||M<0||M>1)return null;if(0===A&&0===E){for(var i=0;i<2;i++){if(x(0===i?n:c,t,e),h.loc==r){var P=0===i?n:c;return{x:P.x,y:P.y,t:h.t}}if(h.loc==o)return{x:+(l+h.t*(f-l)).toPrecision(10),y:+(d+h.t*(m-d)).toPrecision(10),t:h.t}}return null}for(var I=0;I<2;I++)if(x(0===I?n:c,t,e),h.loc==r){var C=0===I?n:c;return{x:C.x,y:C.y,t:h.t}}return{x:+(l+T*(f-l)).toPrecision(10),y:+(d+T*(m-d)).toPrecision(10),t:T}}function x(p,t,e){var v,d=e.x-t.x,x=e.y-t.y,m=p.x-t.x,k=p.y-t.y,w=d*k-m*x;if(p.x===t.x&&p.y===t.y)return h.loc=r,void(h.t=0);if(p.x===e.x&&p.y===e.y)return h.loc=n,void(h.t=1);w<-Number.EPSILON?h.loc=c:w>Number.EPSILON?h.loc=l:d*m<0||x*k<0?h.loc=f:Math.sqrt(d*d+x*x)<Math.sqrt(m*m+k*k)?h.loc=y:(v=0!==d?m/d:k/x,h.loc=o,h.t=v)}function m(t,e,r){var n=new v.E;e.getCenter(n);var o=[];return r.forEach((function(path){path.boundingBox.containsPoint(n)&&function(t,e){for(var r=[],n=[],o=1;o<t.length;o++)for(var c=t[o-1],l=t[o],f=function(t){var o=e[t-1],f=e[t],y=d(c,l,o,f);null!==y&&void 0===r.find((function(i){return i.t<=y.t+Number.EPSILON&&i.t>=y.t-Number.EPSILON}))&&(r.push(y),n.push(new v.E(y.x,y.y)))},y=1;y<e.length;y++)f(y);return n}(t,path.points).forEach((function(p){o.push({identifier:path.identifier,isCW:path.isCW,point:p})}))})),o.sort((function(t,e){return t.point.x-e.point.x})),o}var k=0,w=e,A=-999999999,E=t.subPaths.map((function(p){for(var t=p.getPoints(),r=-999999999,n=e,o=-999999999,c=e,i=0;i<t.length;i++){var l=t[i];l.y>r&&(r=l.y),l.y<n&&(n=l.y),l.x>o&&(o=l.x),l.x<c&&(c=l.x)}return A<=o&&(A=o+1),w>=c&&(w=c-1),{curves:p.curves,points:t,isCW:v.A.isClockWise(t),identifier:k++,boundingBox:new v.c(new v.E(c,n),new v.E(o,r))}})),T=(E=E.filter((function(t){return t.points.length>1}))).map((function(p){var e;return function(t,e,r,n,o){null!=o&&""!==o||(o="nonzero");var c=new v.E;t.boundingBox.getCenter(c);var l=m([new v.E(r,c.y),new v.E(n,c.y)],t.boundingBox,e);l.sort((function(t,e){return t.point.x-e.point.x}));var f=[],y=[];l.forEach((function(i){i.identifier===t.identifier?f.push(i):y.push(i)}));for(var h=f[0].point.x,d=[],i=0;i<y.length&&y[i].point.x<h;)d.length>0&&d[d.length-1]===y[i].identifier?d.pop():d.push(y[i].identifier),i++;if(d.push(t.identifier),"evenodd"===o){var x=d.length%2==0,k=d[d.length-2];return{identifier:t.identifier,isHole:x,for:k}}if("nonzero"===o){for(var w=!0,A=null,E=null,T=0;T<d.length;T++){var M=d[T];w?(E=e[M].isCW,w=!1,A=M):E!==e[M].isCW&&(E=e[M].isCW,w=!0)}return{identifier:t.identifier,isHole:w,for:A}}console.warn('fill-rule: "'+o+'" is currently not implemented.')}(p,E,w,A,null===(e=t.userData)||void 0===e?void 0:e.style.fillRule)})),M=[];return E.forEach((function(p){if(!T[p.identifier].isHole){var t=new v.y;t.curves=p.curves,T.filter((function(t){return t.isHole&&t.for===p.identifier})).forEach((function(e){var r=E[e.identifier],path=new v.t;path.curves=r.curves,t.holes.push(path)})),M.push(t)}})),M}},{key:"getStrokeStyle",value:function(t,e,r,n,o){return{strokeColor:e=void 0!==e?e:"#000",strokeWidth:t=void 0!==t?t:1,strokeLineJoin:r=void 0!==r?r:"miter",strokeLineCap:n=void 0!==n?n:"butt",strokeMiterLimit:o=void 0!==o?o:4}}},{key:"pointsToStroke",value:function(t,style,e,n){var o=[],c=[],l=[];if(0===r.pointsToStrokeWithBuffers(t,style,e,n,o,c,l))return null;var f=new v.e;return f.setAttribute("position",new v.k(o,3)),f.setAttribute("normal",new v.k(c,3)),f.setAttribute("uv",new v.k(l,2)),f}},{key:"pointsToStrokeWithBuffers",value:function(t,style,e,r,n,o,c,l){var f=new v.E,y=new v.E,h=new v.E,d=new v.E,x=new v.E,m=new v.E,k=new v.E,w=new v.E,A=new v.E,E=new v.E,T=new v.E,M=new v.E,P=new v.E,I=new v.E,C=new v.E,S=new v.E,O=new v.E;e=void 0!==e?e:12,r=void 0!==r?r:.001,l=void 0!==l?l:0;var N=(t=function(t){for(var e=!1,i=1,n=t.length-1;i<n;i++)if(t[i].distanceTo(t[i+1])<r){e=!0;break}if(!e)return t;var o=[];o.push(t[0]);for(var c=1,l=t.length-1;c<l;c++)t[c].distanceTo(t[c+1])>=r&&o.push(t[c]);return o.push(t[t.length-1]),o}(t)).length;if(N<2)return 0;var z,L,R,V,W,j,G=t[0].equals(t[N-1]),B=t[0],D=style.strokeWidth/2,H=1/(N-1),J=0,U=!1,X=0,F=3*l,Y=2*l;ot(t[0],t[1],f).multiplyScalar(D),w.copy(t[0]).sub(f),A.copy(t[0]).add(f),E.copy(w),T.copy(A);for(var Q=1;Q<N;Q++){z=t[Q],L=Q===N-1?G?t[1]:void 0:t[Q+1];var _=f;if(ot(B,z,_),h.copy(_).multiplyScalar(D),M.copy(z).sub(h),P.copy(z).add(h),R=J+H,V=!1,void 0!==L){ot(z,L,y),h.copy(y).multiplyScalar(D),I.copy(z).sub(h),C.copy(z).add(h),W=!0,h.subVectors(L,B),_.dot(h)<0&&(W=!1),1===Q&&(U=W),h.subVectors(L,z),h.normalize();var Z=Math.abs(_.dot(h));if(Z>Number.EPSILON){var K=D/Z;h.multiplyScalar(-K),d.subVectors(z,B),x.copy(d).setLength(K).add(h),S.copy(x).negate();var $=x.length(),tt=d.length();d.divideScalar(tt),m.subVectors(L,z);var et=m.length();switch(m.divideScalar(et),d.dot(S)<tt&&m.dot(S)<et&&(V=!0),O.copy(x).add(z),S.add(z),j=!1,V?W?(C.copy(S),P.copy(S)):(I.copy(S),M.copy(S)):ct(),style.strokeLineJoin){case"bevel":lt(W,V,R);break;case"round":ft(W,V),W?ut(z,M,I,R,0):ut(z,C,P,R,1);break;default:var nt=D*style.strokeMiterLimit/$;if(nt<1){if("miter-clip"!==style.strokeLineJoin){lt(W,V,R);break}ft(W,V),W?(m.subVectors(O,M).multiplyScalar(nt).add(M),k.subVectors(O,I).multiplyScalar(nt).add(I),st(M,R,0),st(m,R,0),st(z,R,.5),st(z,R,.5),st(m,R,0),st(k,R,0),st(z,R,.5),st(k,R,0),st(I,R,0)):(m.subVectors(O,P).multiplyScalar(nt).add(P),k.subVectors(O,C).multiplyScalar(nt).add(C),st(P,R,1),st(m,R,1),st(z,R,.5),st(z,R,.5),st(m,R,1),st(k,R,1),st(z,R,.5),st(k,R,1),st(C,R,1))}else V?(W?(st(A,J,1),st(w,J,0),st(O,R,0),st(A,J,1),st(O,R,0),st(S,R,1)):(st(A,J,1),st(w,J,0),st(O,R,1),st(w,J,0),st(S,R,0),st(O,R,1)),W?I.copy(O):C.copy(O)):W?(st(M,R,0),st(O,R,0),st(z,R,.5),st(z,R,.5),st(O,R,0),st(I,R,0)):(st(P,R,1),st(O,R,1),st(z,R,.5),st(z,R,.5),st(O,R,1),st(C,R,1)),j=!0}}else ct()}else ct();G||Q!==N-1||yt(t[0],E,T,W,!0,J),J=R,B=z,w.copy(I),A.copy(C)}if(G){if(V&&n){var it=O,at=S;U!==W&&(it=S,at=O),W?(j||U)&&(at.toArray(n,0),at.toArray(n,9),j&&it.toArray(n,3)):!j&&U||(at.toArray(n,3),at.toArray(n,9),j&&it.toArray(n,0))}}else yt(z,M,P,W,!1,R);return X;function ot(t,e,r){return r.subVectors(e,t),r.set(-r.y,r.x).normalize()}function st(t,u,e){n&&(n[F]=t.x,n[F+1]=t.y,n[F+2]=0,o&&(o[F]=0,o[F+1]=0,o[F+2]=1),F+=3,c&&(c[Y]=u,c[Y+1]=e,Y+=2)),X+=3}function ut(t,r,n,u,o){f.copy(r).sub(t).normalize(),y.copy(n).sub(t).normalize();var c=Math.PI,l=f.dot(y);Math.abs(l)<1&&(c=Math.abs(Math.acos(l))),c/=e,h.copy(r);for(var i=0,v=e-1;i<v;i++)d.copy(h).rotateAround(t,c),st(h,u,o),st(d,u,o),st(t,u,.5),h.copy(d);st(d,u,o),st(n,u,o),st(t,u,.5)}function ct(){st(A,J,1),st(w,J,0),st(M,R,0),st(A,J,1),st(M,R,1),st(P,R,0)}function lt(t,e,u){e?t?(st(A,J,1),st(w,J,0),st(M,R,0),st(A,J,1),st(M,R,0),st(S,R,1),st(M,u,0),st(I,u,0),st(S,u,.5)):(st(A,J,1),st(w,J,0),st(P,R,1),st(w,J,0),st(S,R,0),st(P,R,1),st(P,u,1),st(C,u,0),st(S,u,.5)):t?(st(M,u,0),st(I,u,0),st(z,u,.5)):(st(P,u,1),st(C,u,0),st(z,u,.5))}function ft(t,e){e&&(t?(st(A,J,1),st(w,J,0),st(M,R,0),st(A,J,1),st(M,R,0),st(S,R,1),st(M,J,0),st(z,R,.5),st(S,R,1),st(z,R,.5),st(I,J,0),st(S,R,1)):(st(A,J,1),st(w,J,0),st(P,R,1),st(w,J,0),st(S,R,0),st(P,R,1),st(P,J,1),st(S,R,0),st(z,R,.5),st(z,R,.5),st(S,R,0),st(C,J,1)))}function yt(t,e,r,o,c,u){switch(style.strokeLineCap){case"round":c?ut(t,r,e,u,.5):ut(t,e,r,u,.5);break;case"square":if(c)f.subVectors(e,t),y.set(f.y,-f.x),h.addVectors(f,y).add(t),d.subVectors(y,f).add(t),o?(h.toArray(n,3),d.toArray(n,0),d.toArray(n,9)):(h.toArray(n,3),h.toArray(n,9),d.toArray(n,0));else{f.subVectors(r,t),y.set(f.y,-f.x),h.addVectors(f,y).add(t),d.subVectors(y,f).add(t);var l=n.length;o?(h.toArray(n,l-3),d.toArray(n,l-6),d.toArray(n,l-12)):(h.toArray(n,l-6),d.toArray(n,l-3),d.toArray(n,l-12))}}}}}]),r}(v.m)},404:function(t,e,r){var n=r(2),o=r(265),c=r(131);n({target:"Array",proto:!0},{fill:o}),c("fill")},405:function(t,e,r){"use strict";var n=r(74),o=r(8),c=r(5),l=r(109),f=r(10),y=r(34),h=r(141),v=r(23),d=r(127),x=r(144),m=r(58),k=r(13),w=r(49),A=r(135),E=r(110),T=r(108),M=r(142),P=r(3),I=M.UNSUPPORTED_Y,C=4294967295,S=Math.min,O=[].push,N=c(/./.exec),z=c(O),L=c("".slice),R=!P((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var r="ab".split(t);return 2!==r.length||"a"!==r[0]||"b"!==r[1]}));l("split",(function(t,e,r){var c;return c="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,r){var c=k(v(this)),l=void 0===r?C:r>>>0;if(0===l)return[];if(void 0===t)return[c];if(!h(t))return o(e,c,t,l);for(var f,y,d,output=[],x=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),m=0,w=new RegExp(t.source,x+"g");(f=o(T,w,c))&&!((y=w.lastIndex)>m&&(z(output,L(c,m,f.index)),f.length>1&&f.index<c.length&&n(O,output,A(f,1)),d=f[0].length,m=y,output.length>=l));)w.lastIndex===f.index&&w.lastIndex++;return m===c.length?!d&&N(w,"")||z(output,""):z(output,L(c,m)),output.length>l?A(output,0,l):output}:"0".split(void 0,0).length?function(t,r){return void 0===t&&0===r?[]:o(e,this,t,r)}:e,[function(e,r){var n=v(this),l=y(e)?void 0:w(e,t);return l?o(l,e,n,r):o(c,k(n),e,r)},function(t,n){var o=f(this),l=k(t),y=r(c,o,l,n,c!==e);if(y.done)return y.value;var h=d(o,RegExp),v=o.unicode,w=(o.ignoreCase?"i":"")+(o.multiline?"m":"")+(o.unicode?"u":"")+(I?"g":"y"),A=new h(I?"^(?:"+o.source+")":o,w),T=void 0===n?C:n>>>0;if(0===T)return[];if(0===l.length)return null===E(A,l)?[l]:[];for(var p=0,q=0,M=[];q<l.length;){A.lastIndex=I?0:q;var P,O=E(A,I?L(l,q):l);if(null===O||(P=S(m(A.lastIndex+(I?q:0)),l.length))===p)q=x(l,q,v);else{if(z(M,L(l,p,q)),M.length===T)return M;for(var i=1;i<=O.length-1;i++)if(z(M,O[i]),M.length===T)return M;q=p=P}}return z(M,L(l,p)),M}]}),!R,I)},406:function(t,e,r){var n=r(2),o=r(126),c=r(51);n({target:"Object",stat:!0},{fromEntries:function(t){var e={};return o(t,(function(t,r){c(e,t,r)}),{AS_ENTRIES:!0}),e}})}}]);