(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{279:function(e,t,n){"use strict";n.d(t,"a",(function(){return E}));n(260);var o=n(131),r=n(130),c=n(268),l=n(261),d=n(262),m=n(258),h=(n(18),n(38),n(271),n(187),n(257));function f(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,o=Object(m.a)(e);if(t){var r=Object(m.a)(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return Object(d.a)(this,n)}}var v={type:"change"},w={type:"start"},y={type:"end"},E=function(e){Object(l.a)(n,e);var t=f(n);function n(object,e){var o,l,d,m,f,E,O;Object(r.a)(this,n),(o=t.call(this)).object=object,o.domElement=e,o.domElement.style.touchAction="none",o.enabled=!0,o.target=new h.R,o.minDistance=0,o.maxDistance=1/0,o.minZoom=0,o.maxZoom=1/0,o.minPolarAngle=0,o.maxPolarAngle=Math.PI,o.minAzimuthAngle=-1/0,o.maxAzimuthAngle=1/0,o.enableDamping=!1,o.dampingFactor=.05,o.enableZoom=!0,o.zoomSpeed=1,o.enableRotate=!0,o.rotateSpeed=1,o.enablePan=!0,o.panSpeed=1,o.screenSpacePanning=!0,o.keyPanSpeed=7,o.autoRotate=!1,o.autoRotateSpeed=2,o.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},o.mouseButtons={LEFT:h.s.ROTATE,MIDDLE:h.s.DOLLY,RIGHT:h.s.PAN},o.touches={ONE:h.N.ROTATE,TWO:h.N.DOLLY_PAN},o.target0=o.target.clone(),o.position0=o.object.position.clone(),o.zoom0=o.object.zoom,o._domElementKeyEvents=null,o.getPolarAngle=function(){return j.phi},o.getAzimuthalAngle=function(){return j.theta},o.getDistance=function(){return this.object.position.distanceTo(this.target)},o.listenToKeyEvents=function(e){e.addEventListener("keydown",me),this._domElementKeyEvents=e},o.saveState=function(){P.target0.copy(P.target),P.position0.copy(P.object.position),P.zoom0=P.object.zoom},o.reset=function(){P.target.copy(P.target0),P.object.position.copy(P.position0),P.object.zoom=P.zoom0,P.object.updateProjectionMatrix(),P.dispatchEvent(v),P.update(),T=M.NONE},o.update=(l=new h.R,d=(new h.D).setFromUnitVectors(object.up,new h.R(0,1,0)),m=d.clone().invert(),f=new h.R,E=new h.D,O=2*Math.PI,function(){var e=P.object.position;l.copy(e).sub(P.target),l.applyQuaternion(d),j.setFromVector3(l),P.autoRotate&&T===M.NONE&&B(2*Math.PI/60/60*P.autoRotateSpeed),P.enableDamping?(j.theta+=x.theta*P.dampingFactor,j.phi+=x.phi*P.dampingFactor):(j.theta+=x.theta,j.phi+=x.phi);var t=P.minAzimuthAngle,n=P.maxAzimuthAngle;return isFinite(t)&&isFinite(n)&&(t<-Math.PI?t+=O:t>Math.PI&&(t-=O),n<-Math.PI?n+=O:n>Math.PI&&(n-=O),j.theta=t<=n?Math.max(t,Math.min(n,j.theta)):j.theta>(t+n)/2?Math.max(t,j.theta):Math.min(n,j.theta)),j.phi=Math.max(P.minPolarAngle,Math.min(P.maxPolarAngle,j.phi)),j.makeSafe(),j.radius*=R,j.radius=Math.max(P.minDistance,Math.min(P.maxDistance,j.radius)),!0===P.enableDamping?P.target.addScaledVector(L,P.dampingFactor):P.target.add(L),l.setFromSpherical(j),l.applyQuaternion(m),e.copy(P.target).add(l),P.object.lookAt(P.target),!0===P.enableDamping?(x.theta*=1-P.dampingFactor,x.phi*=1-P.dampingFactor,L.multiplyScalar(1-P.dampingFactor)):(x.set(0,0,0),L.set(0,0,0)),R=1,!!(N||f.distanceToSquared(P.object.position)>A||8*(1-E.dot(P.object.quaternion))>A)&&(P.dispatchEvent(v),f.copy(P.object.position),E.copy(P.object.quaternion),N=!1,!0)}),o.dispose=function(){P.domElement.removeEventListener("contextmenu",pe),P.domElement.removeEventListener("pointerdown",se),P.domElement.removeEventListener("pointercancel",de),P.domElement.removeEventListener("wheel",ue),P.domElement.removeEventListener("pointermove",ce),P.domElement.removeEventListener("pointerup",le),null!==P._domElementKeyEvents&&P._domElementKeyEvents.removeEventListener("keydown",me)};var P=Object(c.a)(o),M={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},T=M.NONE,A=1e-6,j=new h.L,x=new h.L,R=1,L=new h.R,N=!1,C=new h.Q,k=new h.Q,H=new h.Q,Y=new h.Q,I=new h.Q,z=new h.Q,D=new h.Q,S=new h.Q,_=new h.Q,F=[],X={};function Z(){return Math.pow(.95,P.zoomSpeed)}function B(e){x.theta-=e}function U(e){x.phi-=e}var Q,K=(Q=new h.R,function(e,t){Q.setFromMatrixColumn(t,0),Q.multiplyScalar(-e),L.add(Q)}),W=function(){var e=new h.R;return function(t,n){!0===P.screenSpacePanning?e.setFromMatrixColumn(n,1):(e.setFromMatrixColumn(n,0),e.crossVectors(P.object.up,e)),e.multiplyScalar(t),L.add(e)}}(),G=function(){var e=new h.R;return function(t,n){var element=P.domElement;if(P.object.isPerspectiveCamera){var o=P.object.position;e.copy(o).sub(P.target);var r=e.length();r*=Math.tan(P.object.fov/2*Math.PI/180),K(2*t*r/element.clientHeight,P.object.matrix),W(2*n*r/element.clientHeight,P.object.matrix)}else P.object.isOrthographicCamera?(K(t*(P.object.right-P.object.left)/P.object.zoom/element.clientWidth,P.object.matrix),W(n*(P.object.top-P.object.bottom)/P.object.zoom/element.clientHeight,P.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),P.enablePan=!1)}}();function V(e){P.object.isPerspectiveCamera?R/=e:P.object.isOrthographicCamera?(P.object.zoom=Math.max(P.minZoom,Math.min(P.maxZoom,P.object.zoom*e)),P.object.updateProjectionMatrix(),N=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),P.enableZoom=!1)}function J(e){P.object.isPerspectiveCamera?R*=e:P.object.isOrthographicCamera?(P.object.zoom=Math.max(P.minZoom,Math.min(P.maxZoom,P.object.zoom/e)),P.object.updateProjectionMatrix(),N=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),P.enableZoom=!1)}function $(e){C.set(e.clientX,e.clientY)}function ee(e){Y.set(e.clientX,e.clientY)}function te(){if(1===F.length)C.set(F[0].pageX,F[0].pageY);else{var e=.5*(F[0].pageX+F[1].pageX),t=.5*(F[0].pageY+F[1].pageY);C.set(e,t)}}function ne(){if(1===F.length)Y.set(F[0].pageX,F[0].pageY);else{var e=.5*(F[0].pageX+F[1].pageX),t=.5*(F[0].pageY+F[1].pageY);Y.set(e,t)}}function oe(){var e=F[0].pageX-F[1].pageX,t=F[0].pageY-F[1].pageY,n=Math.sqrt(e*e+t*t);D.set(0,n)}function ae(e){if(1==F.length)k.set(e.pageX,e.pageY);else{var t=be(e),n=.5*(e.pageX+t.x),o=.5*(e.pageY+t.y);k.set(n,o)}H.subVectors(k,C).multiplyScalar(P.rotateSpeed);var element=P.domElement;B(2*Math.PI*H.x/element.clientHeight),U(2*Math.PI*H.y/element.clientHeight),C.copy(k)}function ie(e){if(1===F.length)I.set(e.pageX,e.pageY);else{var t=be(e),n=.5*(e.pageX+t.x),o=.5*(e.pageY+t.y);I.set(n,o)}z.subVectors(I,Y).multiplyScalar(P.panSpeed),G(z.x,z.y),Y.copy(I)}function re(e){var t=be(e),n=e.pageX-t.x,o=e.pageY-t.y,r=Math.sqrt(n*n+o*o);S.set(0,r),_.set(0,Math.pow(S.y/D.y,P.zoomSpeed)),V(_.y),D.copy(S)}function se(e){!1!==P.enabled&&(0===F.length&&(P.domElement.setPointerCapture(e.pointerId),P.domElement.addEventListener("pointermove",ce),P.domElement.addEventListener("pointerup",le)),function(e){F.push(e)}(e),"touch"===e.pointerType?function(e){switch(fe(e),F.length){case 1:switch(P.touches.ONE){case h.N.ROTATE:if(!1===P.enableRotate)return;te(),T=M.TOUCH_ROTATE;break;case h.N.PAN:if(!1===P.enablePan)return;ne(),T=M.TOUCH_PAN;break;default:T=M.NONE}break;case 2:switch(P.touches.TWO){case h.N.DOLLY_PAN:if(!1===P.enableZoom&&!1===P.enablePan)return;P.enableZoom&&oe(),P.enablePan&&ne(),T=M.TOUCH_DOLLY_PAN;break;case h.N.DOLLY_ROTATE:if(!1===P.enableZoom&&!1===P.enableRotate)return;P.enableZoom&&oe(),P.enableRotate&&te(),T=M.TOUCH_DOLLY_ROTATE;break;default:T=M.NONE}break;default:T=M.NONE}T!==M.NONE&&P.dispatchEvent(w)}(e):function(e){var t;switch(e.button){case 0:t=P.mouseButtons.LEFT;break;case 1:t=P.mouseButtons.MIDDLE;break;case 2:t=P.mouseButtons.RIGHT;break;default:t=-1}switch(t){case h.s.DOLLY:if(!1===P.enableZoom)return;!function(e){D.set(e.clientX,e.clientY)}(e),T=M.DOLLY;break;case h.s.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===P.enablePan)return;ee(e),T=M.PAN}else{if(!1===P.enableRotate)return;$(e),T=M.ROTATE}break;case h.s.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===P.enableRotate)return;$(e),T=M.ROTATE}else{if(!1===P.enablePan)return;ee(e),T=M.PAN}break;default:T=M.NONE}T!==M.NONE&&P.dispatchEvent(w)}(e))}function ce(e){!1!==P.enabled&&("touch"===e.pointerType?function(e){switch(fe(e),T){case M.TOUCH_ROTATE:if(!1===P.enableRotate)return;ae(e),P.update();break;case M.TOUCH_PAN:if(!1===P.enablePan)return;ie(e),P.update();break;case M.TOUCH_DOLLY_PAN:if(!1===P.enableZoom&&!1===P.enablePan)return;!function(e){P.enableZoom&&re(e),P.enablePan&&ie(e)}(e),P.update();break;case M.TOUCH_DOLLY_ROTATE:if(!1===P.enableZoom&&!1===P.enableRotate)return;!function(e){P.enableZoom&&re(e),P.enableRotate&&ae(e)}(e),P.update();break;default:T=M.NONE}}(e):function(e){switch(T){case M.ROTATE:if(!1===P.enableRotate)return;!function(e){k.set(e.clientX,e.clientY),H.subVectors(k,C).multiplyScalar(P.rotateSpeed);var element=P.domElement;B(2*Math.PI*H.x/element.clientHeight),U(2*Math.PI*H.y/element.clientHeight),C.copy(k),P.update()}(e);break;case M.DOLLY:if(!1===P.enableZoom)return;!function(e){S.set(e.clientX,e.clientY),_.subVectors(S,D),_.y>0?V(Z()):_.y<0&&J(Z()),D.copy(S),P.update()}(e);break;case M.PAN:if(!1===P.enablePan)return;!function(e){I.set(e.clientX,e.clientY),z.subVectors(I,Y).multiplyScalar(P.panSpeed),G(z.x,z.y),Y.copy(I),P.update()}(e)}}(e))}function le(e){he(e),0===F.length&&(P.domElement.releasePointerCapture(e.pointerId),P.domElement.removeEventListener("pointermove",ce),P.domElement.removeEventListener("pointerup",le)),P.dispatchEvent(y),T=M.NONE}function de(e){he(e)}function ue(e){!1!==P.enabled&&!1!==P.enableZoom&&T===M.NONE&&(e.preventDefault(),P.dispatchEvent(w),function(e){e.deltaY<0?J(Z()):e.deltaY>0&&V(Z()),P.update()}(e),P.dispatchEvent(y))}function me(e){!1!==P.enabled&&!1!==P.enablePan&&function(e){var t=!1;switch(e.code){case P.keys.UP:G(0,P.keyPanSpeed),t=!0;break;case P.keys.BOTTOM:G(0,-P.keyPanSpeed),t=!0;break;case P.keys.LEFT:G(P.keyPanSpeed,0),t=!0;break;case P.keys.RIGHT:G(-P.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),P.update())}(e)}function pe(e){!1!==P.enabled&&e.preventDefault()}function he(e){delete X[e.pointerId];for(var i=0;i<F.length;i++)if(F[i].pointerId==e.pointerId)return void F.splice(i,1)}function fe(e){var t=X[e.pointerId];void 0===t&&(t=new h.Q,X[e.pointerId]=t),t.set(e.pageX,e.pageY)}function be(e){var t=e.pointerId===F[0].pointerId?F[1]:F[0];return X[t.pointerId]}return P.domElement.addEventListener("contextmenu",pe),P.domElement.addEventListener("pointerdown",se),P.domElement.addEventListener("pointercancel",de),P.domElement.addEventListener("wheel",ue,{passive:!1}),o.update(),o}return Object(o.a)(n)}(h.l)},303:function(e,t,n){var content=n(426);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(103).default)("260cea80",content,!0,{sourceMap:!1})},425:function(e,t,n){"use strict";n(303)},426:function(e,t,n){var o=n(102)(!1);o.push([e.i,"\n#myCanvas[data-v-68682bf9] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2;\n}\n",""]),e.exports=o},453:function(e,t,n){"use strict";n.r(t);n(45);var o=n(277),r=n(257),c=n(279),l={data:function(){return{renderer:null,rendererBgColor:{color:"#000000",opacity:1},scene:null,sceneBgColor:{color:"#000000"},camera:null,raycaster:null,mousePosition:null,selectedMesh:null,fov:70,isAnime:!0,theta:0}},computed:{fovRad:function(){return this.fov/2*(Math.PI/180)},distance:function(){return window.innerHeight/2/Math.tan(this.fovRad)}},mounted:function(){this.init(),this.initGui()},methods:{init:function(){var e=window.innerWidth,t=window.innerHeight,n=new r.T({canvas:document.querySelector("#myCanvas")});n.setPixelRatio(window.devicePixelRatio),n.setClearColor(new r.i(this.rendererBgColor.color),this.rendererBgColor.opacity),n.setSize(e,t),this.renderer=n;var o=new r.B(this.fov,e/t,1,1e4);o.position.z=this.distance,this.camera=o;var l=new r.F;this.scene=l,new c.a(o,n.domElement).update();var d=new r.c(500);l.add(d),d.name="AxesHelper";var m=new r.j(16777215,1);m.position.set(1,1,1).normalize(),l.add(m);for(var h=new r.e(50,50,50),i=0;i<50;i++){var object=new r.u(h,new r.w({color:16777215*Math.random()}));object.position.x=800*Math.random()-400,object.position.y=800*Math.random()-400,object.position.z=800*Math.random()-400,object.rotation.x=2*Math.random()*Math.PI,object.rotation.y=2*Math.random()*Math.PI,object.rotation.z=2*Math.random()*Math.PI,object.scale.x=Math.random()+.5,object.scale.y=Math.random()+.5,object.scale.z=Math.random()+.5,object.name="box-".concat(i),l.add(object)}var f=new r.E;this.raycaster=f;var v=new r.Q;this.mousePosition=v,document.addEventListener("mousemove",this.onPointerMove),this.onResize(),window.addEventListener("resize",this.onResize,!1),this.animate()},onPointerMove:function(e){this.mousePosition.x=e.clientX/window.innerWidth*2-1,this.mousePosition.y=-e.clientY/window.innerHeight*2+1,this.raycaster.setFromCamera(this.mousePosition,this.camera);var t=this.raycaster.intersectObjects(this.scene.children,!1);console.log(t),t.length>0?"AxesHelper"!==t[0].object.name&&this.selectedMesh!=t[0].object&&(this.selectedMesh&&this.selectedMesh.material.emissive.setHex(this.selectedMesh.currentHex),this.selectedMesh=t[0].object,this.selectedMesh.currentHex=this.selectedMesh.material.emissive.getHex(),this.selectedMesh.material.emissive.setHex(16711680)):(this.selectedMesh&&this.selectedMesh.material.emissive.setHex(this.selectedMesh.currentHex),this.selectedMesh=null)},animate:function(){if(!this.isAnime)return cancelAnimationFrame(this.animate);requestAnimationFrame(this.animate),this.render()},render:function(){window.innerWidth,window.innerHeight;this.renderer.render(this.scene,this.camera)},onResize:function(){var e=window.innerWidth,t=window.innerHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(e,t)},initGui:function(){var e=this,t=(new o.a).addFolder("Renderer");t.addColor(this.rendererBgColor,"color").onChange((function(t){e.renderer.setClearColor(new r.i(e.rendererBgColor.color),e.rendererBgColor.opacity)})),t.add(this.rendererBgColor,"opacity").min(0).max(1).onChange((function(t){e.renderer.setClearColor(new r.i(e.rendererBgColor.color),e.rendererBgColor.opacity)}))}},beforeDestroy:function(){this.isAnime=!1}},d=(n(425),n(43)),component=Object(d.a)(l,(function(){var e=this._self._c;return e("div",[e("canvas",{ref:"canvas",attrs:{id:"myCanvas"}})])}),[],!1,null,"68682bf9",null);t.default=component.exports}}]);