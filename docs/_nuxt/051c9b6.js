(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{262:function(e,n,t){"use strict";t.r(n);var r=t(250),o={data:function(){return{renderer:null,scene:null,camera:null,box:null}},computed:{},mounted:function(){this.init()},methods:{init:function(){console.log("init");var e=new r.l({canvas:document.querySelector("#myCanvas")});e.setPixelRatio(window.devicePixelRatio),e.setSize(960,540);var n=new r.i,t=new r.g(45,960/540);t.position.set(0,0,1e3);var o=new r.b(400,400,400),c=new r.f,l=new r.d(o,c);n.add(l),this.renderer=e,this.scene=n,this.camera=t,this.box=l,this.tick()},tick:function(){this.box.rotation.y+=.01,this.renderer.render(this.scene,this.camera),requestAnimationFrame(this.tick)}}},c=t(42),component=Object(c.a)(o,(function(){var e=this._self._c;return e("div",[e("canvas",{ref:"canvas",attrs:{id:"myCanvas"}})])}),[],!1,null,null,null);n.default=component.exports}}]);