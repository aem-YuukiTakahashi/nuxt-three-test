<template lang="pug">
div
  .background
  canvas#myCanvas(ref="canvas")
  .wrapper

    .inner
      div PARAM TEST
        div
          p 背景色
          input(v-model="clearColor" placeholder="背景色")
        div
          br
          p 背景色透過度
          input(v-model="clearAlpha" placeholder="発光エフェクト: 閾値")
        div
          br
          p 発光エフェクト: 閾値
          input(v-model="threshold" placeholder="発光エフェクト: 閾値")
        div
          br
          p 発光エフェクト: 強さ
          input(v-model="strength" placeholder="発光エフェクト: 強さ")
        div
          br
          p 発光エフェクト: 半径
          input(v-model="radius" placeholder="発光エフェクト: 半径")
        div
          br
          button(@click='setParam') 更新
          br
          br
      div LINK
        br
        nuxt-link(to='/demo/blob') blob
        br
        nuxt-link(to='/demo/bubble') bubble
</template>

<style scoped>
.background {
  width: 100%;
  height: 100vh;
  height: 100svh;
  background-color: gray;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}

#myCanvas {
  min-width: 100%;
  min-height: 100vh;
  min-height: 100svh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
}

.wrapper {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
}

.inner {
  width: 90%;
  max-width: 320px;
  margin: 0 auto 60px;
  text-align: center;
  padding: 30px;
  background-color: rgba(255,255,255,.5);
}
</style>

<script>
import * as THREE from "three";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ClearPass } from 'three/examples/jsm/postprocessing/ClearPass.js';
export default {
  data() {
    return {
      renderer: null,
      scene: null,
      camera: null,
      bubbleList: [],
      MaxBubbleCount: 10,
      isAnime: true,
      fov: 50, // 視野角
      composer: null,
      bloomPass: null,
      clearPass: null,
      clearColor: '000000',
      clearAlpha: 1,
      threshold: 0,
      strength: 1,
      radius: 1,
    }
  },
  computed: {
    fovRad() {
      return (this.fov / 2) * (Math.PI / 180);
    },
    distance() {
      return (window.innerHeight / 2) / Math.tan(this.fovRad);
    },
    bgColor() {
      const colorValue = parseInt ( this.clearColor.replace("#","0x"), 16 );
      return new THREE.Color( colorValue );
    },
    bubbleCount() {
      return this.MaxBubbleCount;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    /**
    *  初期化
    */
    init() {

      this.creatBubble();

      const width = window.innerWidth;
      const height = window.innerHeight;

      const camera = new THREE.PerspectiveCamera(this.fov, width / height);
      camera.position.z = this.distance;
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      this.camera = camera;

      const scene = new THREE.Scene();
      this.scene = scene;

      // show axes in the screen
      // var axes = new THREE.AxesHelper(500);
      // scene.add(axes);

      for(let i = 0; i < this.bubbleList.length; i++) {
        const bubble = this.bubbleList[i];
        scene.add(bubble.mesh);
      }

      // レンダラーを作成
      const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x000000, 0);
      this.renderer = renderer;

      const renderScene = new RenderPass( scene, camera );
      renderScene.clear = false;

      const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
      bloomPass.threshold = this.threshold;
      bloomPass.strength = this.strength;
      bloomPass.radius = this.radius;
      this.bloomPass = bloomPass;

      const clearPass = new ClearPass( this.bgColor, this.clearAlpha );
      this.clearPass = clearPass;

      const composer = new EffectComposer( this.renderer );
      composer.addPass( clearPass );
      composer.addPass( renderScene );
      composer.addPass( bloomPass );
      this.composer = composer;

      this.onResize();
      window.addEventListener('resize', this.onResize, false);

      this.animate();

    },
    /**
     * アニメーション開始
     */
    animate() {
      if(this.isAnime) {
        requestAnimationFrame(this.animate);
        this.render();
      } else {
        return cancelAnimationFrame(this.animate)
      }
    },
    /**
     * レンダリング
     */
    render() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      for(let i = 0; i < this.bubbleList.length; i++) {
        const bubble = this.bubbleList[i];
        const bubbleMesh = bubble.mesh;

        const nowPosiX = bubbleMesh.position.x;
        const nowPosiY = bubbleMesh.position.y;

        const afterPosiX = nowPosiX + Math.cos(bubble.angle) * bubble.velocity;
        const afterPosiY = nowPosiY + Math.sin(bubble.angle) * bubble.velocity;

        bubbleMesh.position.set(afterPosiX, afterPosiY, 0);

        if (afterPosiX - bubble.radius > width / 2 ||
            afterPosiX + bubble.radius < -1 * width / 2 ||
            afterPosiY - bubble.radius > height / 2 ||
            afterPosiY + bubble.radius < -1 * height / 2) {
          bubble.angle = Math.random() * Math.PI * 2;
          bubble.velocity = 1 + Math.random() * 0.5;
        }
      }

      //this.renderer.render(this.scene, this.camera);
      this.composer.render();
    },

    /**
     * 表示する泡の作成
     */
    creatBubble() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      for (let i = 0; i < this.bubbleCount; i++) {
        const radius = 4 + (Math.random() * width / 10);
        const geometry = new THREE.SphereGeometry(radius,radius / 2,radius / 2);
        const material = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
        const mesh = new THREE.Mesh(geometry, material);
        const posi = this.creatBubblePosition();
        mesh.position.set(posi.x, posi.y, posi.z);

        const obj = {
          mesh: mesh,
          radius: radius,
          angle: ((() => Math.random() * Math.PI * 2)).call(),
          velocity: ((() => 1 + Math.random() * 0.5)).call()
        }

        this.bubbleList.push(obj);
      }

      console.log(this.bubbleList);
    },

    /**
     * ランダムなpositionを生成する
     */
    creatBubblePosition() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const x = (width / 2) - Math.random() * width;
      const y = (height / 2) - Math.random() * height;
      console.log('x =', x, 'y =', y);
      return {'x': x, 'y': y, 'z': 0};
    },

    /**
     * リサイズ処理
     */
    onResize() {
      // サイズを取得
      const width = window.innerWidth;
      const height = window.innerHeight;

      // カメラのアスペクト比を正す
      this.camera.aspect = width / height;
      //this.camera.position.z = this.distance;
      this.camera.updateProjectionMatrix();

      // レンダラーのサイズを調整する
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(width, height);
      this.composer.setSize(width, height);
    },
    /**
     * パラメータに応じて更新
     */
    setParam() {
      console.log();
      this.clearPass.clearColor = this.bgColor;
      this.clearPass.clearAlpha = this.clearAlpha;
      this.bloomPass.threshold = this.threshold;
      this.bloomPass.strength = this.strength;
      this.bloomPass.radius = this.radius;
    }
  },
  beforeDestroy: function() {
    this.isAnime = false;
  },
}
</script>