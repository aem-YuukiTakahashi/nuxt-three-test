(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{327:function(t,e,n){var content=n(433);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(103).default)("3109309d",content,!0,{sourceMap:!1})},432:function(t,e,n){"use strict";n(327)},433:function(t,e,n){var r=n(102)(!1);r.push([t.i,"\n.inner[data-v-7283aef0] {\n  padding: 60px 20px 80px;\n}\n.inner__wrapper[data-v-7283aef0] {\n  width: 100%;\n  max-width: 960px;\n  margin: 0 auto;\n  line-height: 1;\n}\nh1[data-v-7283aef0] {\n  text-align: center;\n  margin-bottom: 60px;\n}\nh2[data-v-7283aef0] {\n  margin-top: 40px;\n  margin-bottom: 20px;\n}\n.config-img-list[data-v-7283aef0] {\n  display: flex;\n  flex-wrap: wrap;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.config-img-list__item[data-v-7283aef0] {\n  width: calc((100% - 30px) / 4);\n  margin-right: 10px;\n}\n.config-img-list__item[data-v-7283aef0]::nth-child(4n){\n  margin-right: 0;\n}\n#myCanvas[data-v-7283aef0] {\n  width: 100%;\n  height: 500px;\n  line-height: 1;\n}\n\n",""]),t.exports=r},473:function(t,e,n){"use strict";n.r(e);n(18),n(37),n(44),n(275),n(58),n(59),n(35),n(27),n(36),n(61),n(62),n(34),n(264);var r=n(256),o=(n(259),n(343)),c=n(129),l=n(130),h=n(260),d=n(261),f=n(258);function m(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(d.a)(this,n)}}var v=function(t){Object(h.a)(n,t);var e=m(n);function n(t){return Object(c.a)(this,n),e.call(this,t)}return Object(l.a)(n,[{key:"load",value:function(t,e,n,o){var c=this,l=new r.p(this.manager);l.setPath(this.path),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(t,(function(text){var t=c.parse(JSON.parse(text));e&&e(t)}),n,o)}},{key:"parse",value:function(t){return new y(t)}}]),n}(r.u),y=function(){function t(data){Object(c.a)(this,t),this.isFont=!0,this.type="Font",this.data=data}return Object(l.a)(t,[{key:"generateShapes",value:function(text){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,e=[],n=x(text,t,this.data),p=0,r=n.length;p<r;p++)e.push.apply(e,Object(o.a)(n[p].toShapes()));return e}}]),t}();function x(text,t,data){for(var e=Array.from(text),n=t/data.resolution,r=(data.boundingBox.yMax-data.boundingBox.yMin+data.underlineThickness)*n,o=[],c=0,l=0,i=0;i<e.length;i++){var h=e[i];if("\n"===h)c=0,l-=r;else{var d=w(h,n,c,l,data);c+=d.offsetX,o.push(d.path)}}return o}function w(t,e,n,o,data){var glyph=data.glyphs[t]||data.glyphs["?"];if(glyph){var c,l,h,d,f,m,v,y,path=new r.N;if(glyph.o)for(var x=glyph._cachedOutline||(glyph._cachedOutline=glyph.o.split(" ")),i=0,w=x.length;i<w;){switch(x[i++]){case"m":c=x[i++]*e+n,l=x[i++]*e+o,path.moveTo(c,l);break;case"l":c=x[i++]*e+n,l=x[i++]*e+o,path.lineTo(c,l);break;case"q":h=x[i++]*e+n,d=x[i++]*e+o,f=x[i++]*e+n,m=x[i++]*e+o,path.quadraticCurveTo(f,m,h,d);break;case"b":h=x[i++]*e+n,d=x[i++]*e+o,f=x[i++]*e+n,m=x[i++]*e+o,v=x[i++]*e+n,y=x[i++]*e+o,path.bezierCurveTo(f,m,v,y,h,d)}}return{offsetX:glyph.ha*e,path:path}}console.error('THREE.Font: character "'+t+'" does not exists in font family '+data.familyName+".")}function k(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(d.a)(this,n)}}var B=function(t){Object(h.a)(n,t);var e=k(n);function n(text){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Object(c.a)(this,n);var o=r.font;if(void 0===o)t=e.call(this);else{var l=o.generateShapes(text,r.size);r.depth=void 0!==r.height?r.height:50,void 0===r.bevelThickness&&(r.bevelThickness=10),void 0===r.bevelSize&&(r.bevelSize=8),void 0===r.bevelEnabled&&(r.bevelEnabled=!1),t=e.call(this,l,r)}return t.type="TextGeometry",Object(d.a)(t)}return Object(l.a)(n)}(r.o);function C(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return _(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,r=function(){};return{s:r,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){l=!0,o=t},f:function(){try{c||null==n.return||n.return()}finally{if(l)throw o}}}}function _(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}var z={data:function(){return{renderer:null,rendererBgColor:{color:"#000000",opacity:0},scene:null,sceneBgColor:{color:"#000000"},camera:null,boxGeometry:null,boxMaterial:null,box:null,fov:50,isAnime:!0,cardWidth:512,cardHeight:288,currentFrontKey:"front-img-0",currentBackKey:"back-img-0",textColor:"#000000",labelFont:"EB Garamond",label1:"No.",label2:"Name.",valueFont:"Noto Sans JP",value1:"100001",value2:"TEST 太郎 タロウ たろう",loadFrontImgsList:["./images/card/front/front-1.png","./images/card/front/front-2.png","./images/card/front/front-3.png"],loadBackImgsList:["./images/card/back/back-1.png","./images/card/back/back-2.png","./images/card/back/back-3.png"],loadFontsList:["./fonts/Noto_Sans_JP_Bold.json","./fonts/EB_Garamond_Bold.json","./fonts/Roboto_Bold.json","./fonts/Zen_Kaku_Gothic_New_Bold.json"],fontsList:[],textureFrontList:[],textureBackList:[],card:null,frontCardImg:null,backCardImg:null,label1Mesh:null,label2Mesh:null,value1Mesh:null,value2Mesh:null}},computed:{fovRad:function(){return this.fov/2*(Math.PI/180)},distance:function(){return 275/Math.tan(this.fovRad)}},mounted:function(){this.init(),this.initGui()},methods:{init:function(){var t=document.getElementsByClassName("inner__wrapper")[0].clientWidth,e=new r.Y({canvas:document.querySelector("#myCanvas")});e.setPixelRatio(window.devicePixelRatio),e.setClearColor(new r.j(this.rendererBgColor.color),this.rendererBgColor.opacity),e.setSize(t,550),this.renderer=e;var n=new r.G(this.fov,t/550);n.position.z=this.distance,n.lookAt(new r.W(0,0,0)),this.camera=n;var o=new r.K;this.scene=o;var c=new r.t;c.rotation.z=Math.PI/4,c.scale.set(.85,.85,.85),this.card=c,this.scene.add(this.card),this.load(),this.onResize(),window.addEventListener("resize",this.onResize,!1),this.animate()},animate:function(){if(!this.isAnime)return cancelAnimationFrame(this.animate);requestAnimationFrame(this.animate),this.render()},load:function(){var t=this,e=new r.v;e.onLoad=function(){console.log("Loading complete!"),t.createCard()},e.onProgress=function(t,e,n){console.log("Loading file: "+t+".\nLoaded "+e+" of "+n+" files.")},e.onError=function(t){console.error("There was an error loading "+t)},this.loadImg(e),this.loadFont(e)},loadImg:function(t){var e=this,n=new r.T(t);this.loadFrontImgsList.forEach((function(t,r){n.load(t,(function(img){img.name="front-img-".concat(r),e.textureFrontList.push(img)}))})),this.loadBackImgsList.forEach((function(t,r){n.load(t,(function(img){img.name="back-img-".concat(r),e.textureBackList.push(img)}))}))},loadFont:function(t){var e,n=this,r=new v(t),o=C(this.loadFontsList);try{for(o.s();!(e=o.n()).done;){var c=e.value;r.load(c,(function(t){n.fontsList.push(t)}))}}catch(t){o.e(t)}finally{o.f()}},createCard:function(){var t=this,e=this.textureFrontList.find((function(e){return e.name===t.currentFrontKey})),n=new r.A({map:e,side:r.r}),o=new r.H(this.cardWidth,this.cardHeight),c=new r.z(o,n);c.position.z=2,this.frontCardImg=c;var l=this.textureBackList.find((function(e){return e.name===t.currentBackKey})),h=new r.A({map:l,side:r.r}),d=new r.H(this.cardWidth,this.cardHeight),f=new r.z(d,h);f.rotation.y=Math.PI,this.backCardImg=f;var m={font:this.fontsList.find((function(e){return e.data.familyName===t.labelFont})),size:15,height:1,curveSegments:12,bevelEnabled:!1,bevelThickness:1,bevelSize:1,bevelSegments:1},v=new B(this.label1,m);v.computeBoundingBox();var y=new r.A({color:"#000"}),x=new r.z(v,y);x.position.x=-230,x.position.y=-100,x.position.z=2,this.label1Mesh=x;var w=new B(this.label2,m);w.computeBoundingBox();var k=new r.z(w,y);k.position.x=-230,k.position.y=-130,k.position.z=3,this.label2Mesh=k;var C={font:this.fontsList.find((function(e){return e.data.familyName===t.valueFont})),size:15,height:.1,curveSegments:12,bevelEnabled:!1,bevelThickness:1,bevelSize:1,bevelSegments:1},_=new B(this.value1,C);_.computeBoundingBox();var z=new r.z(_,y);z.position.x=-230+v.boundingBox.max.x+20,z.position.y=-100,z.position.z=3,this.value1Mesh=z;var j=new B(this.value2,C);j.computeBoundingBox();var F=new r.z(j,y);F.position.x=-230+w.boundingBox.max.x+20,F.position.y=-130,F.position.z=3,this.value2Mesh=F,this.card.add(c),this.card.add(f),this.card.add(x),this.card.add(k),this.card.add(z),this.card.add(F)},changeFrontImg:function(){var t=this,e=this.textureFrontList.find((function(e){return e.name===t.currentFrontKey})),n=new r.A({map:e,side:r.r});this.frontCardImg.material=n},changeBackImg:function(){var t=this,e=this.textureBackList.find((function(e){return e.name===t.currentBackKey})),n=new r.A({map:e,side:r.r});this.backCardImg.material=n},changeTextColor:function(){console.log(this.textColor);var t=new r.A({color:this.textColor});this.label1Mesh.material=this.label2Mesh.material=this.value1Mesh.material=this.value2Mesh.material=t},render:function(){document.getElementsByClassName("inner__wrapper")[0].clientWidth;this.card.rotation.y+=.01,this.renderer.render(this.scene,this.camera)},onResize:function(){var t=document.getElementsByClassName("inner__wrapper")[0].clientWidth;this.camera.aspect=t/550,this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(t,550)},initGui:function(){}},beforeDestroy:function(){this.isAnime=!1}},j=(n(432),n(42)),component=Object(j.a)(z,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"inner"},[e("h1",[t._v("DEMO")]),e("div",{staticClass:"inner__wrapper"},[e("canvas",{ref:"canvas",attrs:{id:"myCanvas"}}),e("div",{staticClass:"config"},[e("h2",[t._v("表画像変更")]),e("ul",{staticClass:"config-img-list"},t._l(t.loadFrontImgsList,(function(n,r){return e("li",{key:r,staticClass:"config-img-list__item"},[e("img",{attrs:{src:n},on:{click:function(e){t.currentFrontKey="front-img-".concat(r),t.changeFrontImg()}}})])})),0),e("h2",[t._v("裏画像変更")]),e("ul",{staticClass:"config-img-list"},t._l(t.loadBackImgsList,(function(n,r){return e("li",{key:r,staticClass:"config-img-list__item"},[e("img",{attrs:{src:n},on:{click:function(e){t.currentBackKey="back-img-".concat(r),t.changeBackImg()}}})])})),0),e("h2",[t._v("文字色変更")]),e("label",[t._v("文字色変更  "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.textColor,expression:"textColor"}],attrs:{type:"color"},domProps:{value:t.textColor},on:{change:function(e){return t.changeTextColor()},input:function(e){e.target.composing||(t.textColor=e.target.value)}}})])])])])}),[],!1,null,"7283aef0",null);e.default=component.exports}}]);