<template lang="pug">
.wrapper
  canvas#myCanvas(ref="canvas")
  .inner#inner-1
    .inner__title コンテンツ見出し1
    .inner__wrapper
      div コンテンツ内容
  .inner#inner-2
    .inner__title コンテンツ見出し2
    .inner__wrapper
      div コンテンツ内容
  .inner#inner-3
    .inner__title コンテンツ見出し3
    .inner__wrapper
      div コンテンツ内容
  .inner#inner-4
    .inner__title コンテンツ見出し4
    .inner__wrapper
      div コンテンツ内容
</template>

<script>
import * as THREE from "three";
export default {
  data() {
    return {
      renderer: null,
      scene: null,
      camera: null,
      sphere: null,
      materialImg: [
        'images/img1.jpeg',
        'images/img2.jpeg',
        'images/img3.jpeg',
        'images/img4.jpeg',
      ],
      materials: [],
    }
  },
  computed: {},
  mounted() {
      window.addEventListener('scroll', this.scroll, false);

      // materialを作成する
      this.createMaterial();
  },
  methods: {
    init() {
      console.log('init');

      // サイズを指定
      const width = window.innerWidth;
      const height = window.innerHeight;

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

      // ライトを作る1
      let dirLight = new THREE.DirectionalLight(0xffffff, 1);
      dirLight.position.set(5,3,5);// 光の向き
      scene.add(dirLight);

      // ライトを作る2
      let ambLight = new THREE.AmbientLight(0x333333);
      scene.add(ambLight);

      const geometry = new THREE.SphereGeometry( 300, 32, 32 );
      const material = new THREE.MeshBasicMaterial( {color: 0xFF0000} );
      const sphere = new THREE.Mesh( geometry, this.materials[0] );
      scene.add(sphere);

      this.renderer = renderer;
      this.scene = scene;
      this.camera = camera;
      this.sphere = sphere;

      this.tick();
    },
    tick() {
        this.sphere.rotation.y += 0.001;
        this.renderer.render(this.scene, this.camera); // レンダリング
        requestAnimationFrame(this.tick);
    },
    createMaterial(){
      for(let i = 0; i < this.materialImg.length; i++) {
        const texture = new THREE.TextureLoader().load(this.materialImg[i]);
        const material = new THREE.MeshStandardMaterial({
          map: texture,
        });
        this.materials.push(material);
      }
      this.init();
    },
    changeSphere(index) {
      this.sphere.material = this.materials[index];
    },
    scroll() {
      const target = document.getElementsByClassName('inner');
      const position = Math.floor(window.innerHeight * .5);

      for (let i = 0; i < target.length; i++) {

        let offsetTop = Math.floor(target[i].getBoundingClientRect().top);
        let offsetBottom = Math.floor(target[i].getBoundingClientRect().bottom);

        if (offsetTop < position) {
          if(!target[i].classList.contains('is-changed')){
            target[i].classList.add('is-changed');
            this.changeSphere(i);
          }
        } else {
          if(target[i].classList.contains('is-changed')) {
            target[i].classList.remove('is-changed');
            this.changeSphere(i - 1);
          }
        }

      }
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
}
.wrapper {
  position: relative;
}
#myCanvas {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
}
.inner {
  width: 100%;
  max-width: 1020px;
  margin: 0 auto;
  padding: 0 30px;
  position: relative;
  z-index: 1;
}

.inner + .inner {
  margin-top: 60px;
}

.inner__title {
  color: white;
  font-size: 2rem;
  font-weight: bold;
}

.inner__wrapper {
  height: 600px;
  background-color: rgba(255,255,255,.25);
}
</style>