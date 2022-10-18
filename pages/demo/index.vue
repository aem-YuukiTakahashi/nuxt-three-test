<template lang="pug">
div
  canvas#myCanvas(ref="canvas")
</template>

<script>
import * as THREE from "three";
export default {
  data() {
    return {
      renderer: null,
      scene: null,
      camera: null,
      box: null,
    }
  },
  computed: {},
  mounted() {
     this.init();
  },
  methods: {
    init() {
      console.log('init');

      // サイズを指定
      const width = 960;
      const height = 540;

      // レンダラーを作成
      const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);

      // シーンを作成
      const scene = new THREE.Scene();

      // カメラを作成
      const camera = new THREE.PerspectiveCamera(45, width / height);
      camera.position.set(0, 0, +1000);

      // 箱を作成
      const geometry = new THREE.BoxGeometry(400, 400, 400);
      const material = new THREE.MeshNormalMaterial();
      const box = new THREE.Mesh(geometry, material);
      scene.add(box);

      this.renderer = renderer;
      this.scene = scene;
      this.camera = camera;
      this.box = box;

      this.tick();
    },
    tick() {
        this.box.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera); // レンダリング
        requestAnimationFrame(this.tick);
    }
  }
}
</script>