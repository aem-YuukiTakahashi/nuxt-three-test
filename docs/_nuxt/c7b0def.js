(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{292:function(e,n,t){var content=t(404);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,t(132).default)("3579e81c",content,!0,{sourceMap:!1})},403:function(e,n,t){"use strict";t(292)},404:function(e,n,t){var o=t(131)(!1);o.push([e.i,"\n.svgimg[data-v-9a803e36] {\n  width: calc(100% - 20px);\n  max-width: 500px;\n  margin: 0 auto;\n}\n",""]),e.exports=o},414:function(e,n,t){"use strict";t.r(n);t(19),t(37);var o=t(258),r=t(399),c={data:function(){return{renderer:null,scene:null,camera:null}},computed:{},mounted:function(){this.init()},methods:{init:function(){var e=this,n=new o.B({canvas:document.querySelector("#myCanvas")});n.setPixelRatio(window.devicePixelRatio),n.setSize(960,540),this.renderer=n;var t=new o.q(45,960/540);t.position.set(0,0,100),this.camera=t;var c=new o.s,l=new o.a(100);c.add(l);var d=new r.a;console.log(d),d.load("blob.svg",(function(data){console.log("data = ",data);var n=new o.j;n.scale.multiplyScalar(.25),n.position.x=-20,n.position.y=20,n.scale.y*=-1;var t=new o.o;data.paths.forEach((function(path,i){path.toShapes(!0).forEach((function(e,r){var c=new o.g(e,{bevelEnabled:!1}),l=new o.m(c,t);n.add(l)}))})),c.add(n),e.scene=c,e.renderScene()}),(function(e){console.log(e.loaded/e.total*100+"% loaded")}),(function(e){console.log("error =",e),console.log("An error happened")}))},renderScene:function(){requestAnimationFrame(this.renderScene),this.renderer.render(this.scene,this.camera)}}},l=(t(403),t(43)),component=Object(l.a)(c,(function(){var e=this,n=e._self._c;return n("div",[n("p",[e._v("転写するsvg画像")]),e._m(0),n("p",[e._v("canvasに転写した場合")]),n("div",{staticClass:"svgimg-canvas"},[n("canvas",{ref:"canvas",attrs:{id:"myCanvas"}})])])}),[function(){var e=this._self._c;return e("div",{staticClass:"svgimg"},[e("img",{attrs:{src:"blob.svg"}})])}],!1,null,"9a803e36",null);n.default=component.exports}}]);