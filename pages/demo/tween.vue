<template lang="pug">
div
  canvas#myCanvas(ref="canvas")

  .inner
    .inner__wrapper
      div.button(@click='setPosition(100, 100, distance)') x=100, y=100
      div.button(@click='setPosition(-100, -100, distance)') x=-100, y=-100
      div.button(@click='setPosition(-50, 50, distance)') x=-50, y=50
      div.button(@click='setPosition(0, 0, -600)') x=-0, y=0 z=-600
      div.button(@click='setPosition(-100, 100, -600)') x=-100, y=100 z=-600
</template>

<style scoped>
#myCanvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
}

.inner {
  position: relative;
  height: 100vh;
  z-index: 3;
}

.inner__wrapper {
  position: absolute;
  width: 100%;
  bottom: 0;
}

.button {
  width: 300px;
  height: 50px;
  border: 1px solid #fff;
  background-color: #000;
  color: #fff;
  cursor: pointer;
  margin: 10px auto;
}
</style>

<script>
import GUI from 'lil-gui'
import * as THREE from "three";
import TWEEN from '@tweenjs/tween.js'

export default {
  data() {
    return {
      renderer: null,
      rendererBgColor: {
        color: '#000000',
        opacity: 1
      },
      scene: null,
      sceneBgColor: {
        color: '#000000',
      },
      camera: null,
      boxGeometry: null,
      boxMaterial: null,
      box: null,
      fov: 50, // 視野角
      isAnime: true,
      coords :{x: 0, y: 0},
      tween: null,
      x: 0,
      y: 0,
    }
  },
  computed: {
    fovRad() {
      return (this.fov / 2) * (Math.PI / 180);
    },
    distance() {
      return (window.innerHeight / 2) / Math.tan(this.fovRad);
    },
  },
  mounted() {
    this.init();
    this.initGui();
  },
  methods: {
    /**
    *  初期化
    */
    init() {

      const width = window.innerWidth;
      const height = window.innerHeight;

      // レンダラーを作成
      const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(new THREE.Color(this.rendererBgColor.color), this.rendererBgColor.opacity);
      renderer.setSize(width, height);
      this.renderer = renderer;

      // カメラを作成
      const camera = new THREE.PerspectiveCamera(this.fov, width / height);
      camera.position.z = this.distance;
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      this.camera = camera;

      // シーンを作成
      const scene = new THREE.Scene();
      this.scene = scene;

      // show axes in the screen
      const axes = new THREE.AxesHelper(500);
      scene.add(axes);

      // 箱を作成
      const geometry = new THREE.BoxGeometry( 150, 150, 150 );
      const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
      const box = new THREE.Mesh(geometry, material);
      scene.add(box);
      this.boxGeometry = geometry;
      this.boxMaterial = material;
      this.box = box;

      this.tween = new TWEEN.Tween(this.camera.position).easing(TWEEN.Easing.Cubic.Out);

      this.onResize();
      window.addEventListener('resize', this.onResize, false);
      this.animate();
    },

    /**
     * アニメーション開始
     */
    animate() {
      if(this.isAnime) {
        this.tween.update();
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
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      this.renderer.render(this.scene, this.camera);
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
      this.camera.updateProjectionMatrix();

      // レンダラーのサイズを調整する
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(width, height);
    },

    /**
     * GUI 初期化
     */
    initGui() {
      const gui = new GUI();
    },

    setPosition(x, y, z) {

      if(this.tween) {
        this.tween.stop();
      }

      this.tween = new TWEEN.Tween(this.camera.position).easing(TWEEN.Easing.Cubic.Out);

      this.tween
          .to({x: x, y: y, z: z}, 1000)
          .onUpdate((object) => {
            this.camera.position.x = object.x;
            this.camera.position.y = object.y;
            this.camera.position.z = object.z;
          })
          .start();
    }
  },
  beforeDestroy: function() {
    this.isAnime = false;
  },
}
</script>