(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{413:function(e,n,t){"use strict";t.r(n);var r=t(258),o={data:function(){return{renderer:null,scene:null,camera:null,box:null}},computed:{},mounted:function(){this.init()},methods:{init:function(){console.log("init");var e=new r.B({canvas:document.querySelector("#myCanvas")});e.setPixelRatio(window.devicePixelRatio),e.setSize(960,540);var n=new r.s,t=new r.q(45,960/540);t.position.set(0,0,1e3);var o=new r.c(400,400,400),c=new r.o,l=new r.m(o,c);n.add(l),this.renderer=e,this.scene=n,this.camera=t,this.box=l,this.tick()},tick:function(){this.box.rotation.y+=.01,this.renderer.render(this.scene,this.camera),requestAnimationFrame(this.tick)}}},c=t(43),component=Object(c.a)(o,(function(){var e=this._self._c;return e("div",[e("canvas",{ref:"canvas",attrs:{id:"myCanvas"}})])}),[],!1,null,null,null);n.default=component.exports}}]);