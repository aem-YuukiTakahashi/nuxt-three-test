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
      sphereList: [],
      materials: [],
      isChange: false,
      coefficient: 360,
      beforeIndex: 0,
      afterIndex:1,
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

      // 作成した球体をシーンに追加
      for(let i = 0; i < this.sphereList.length; i++) {
        scene.add(this.sphereList[i]);
      }

      this.renderer = renderer;
      this.scene = scene;
      this.camera = camera;

      this.tick();
    },
    tick() {

        if(this.isChange) {
          // 切り替えが走った時
          const beforeSphere = this.sphereList[this.beforeIndex];
          const afterSphere = this.sphereList[this.afterIndex];

          const beforeScale = beforeSphere.scale.x - 0.025;
          const afterScale = afterSphere.scale.x + 0.015;

          if(beforeScale < 0) {
            this.sphereList[this.beforeIndex].scale.set(0,0,0);
            this.sphereList[this.beforeIndex].visible = false;
          } else {
            this.sphereList[this.beforeIndex].scale.set(beforeScale,beforeScale,beforeScale);
          }

          if(afterScale >= 1) {
            this.sphereList[this.afterIndex].scale.set(1,1,1);
            this.isChange = false;
          } else {
            this.sphereList[this.afterIndex].scale.set(afterScale,afterScale,afterScale);
          }

          this.sphereList[this.beforeIndex].rotation.y += 0.1;
          this.sphereList[this.afterIndex].rotation.y += 0.5;

        } else {
          // 表示中のものだけ回転させる
          for(let i = 0; i < this.sphereList.length; i++) {
            const sphere = this.sphereList[i];
            if(sphere.visible) {
              sphere.rotation.y += 0.001;
            }
          }
        }

        this.renderer.render(this.scene, this.camera); // レンダリング
        requestAnimationFrame(this.tick);
    },
    createMaterial(){
      for(let i = 0; i < this.materialImg.length; i++) {
        const texture = new THREE.TextureLoader().load(this.materialImg[i]);
        const material = new THREE.MeshBasicMaterial({
          map : texture,
        });
        this.materials.push(material);
      }
      this.createSphere();
    },
    createSphere() {
      for(let i = 0; i < this.materials.length; i++) {
        const geometry = new THREE.SphereGeometry( 300, 32, 32 );
        const sphere = new THREE.Mesh( geometry, this.materials[i] );
        sphere.visible = i == 0 ? true : false;
        const scale = i == 0 ? 1 : 0;
        sphere.scale.set(scale, scale, scale);
        this.sphereList.push(sphere);
      }
      console.log(this.sphereList);
      this.init();
    },
    changeSphere(beforeIndex, afterIndex) {
      if(this.isChanged) {
      }
      this.beforeIndex = beforeIndex;
      this.afterIndex = afterIndex;
      this.sphereList[this.afterIndex].visible = true;
      this.isChange = true;
    },
    scroll() {
      const target = document.getElementsByClassName('inner');
      const position = Math.floor(window.innerHeight * .5);

      for (let i = 0; i < target.length; i++) {

        let offsetTop = Math.floor(target[i].getBoundingClientRect().top);
        let offsetBottom = Math.floor(target[i].getBoundingClientRect().bottom);

        if(i != 0) {
          if (offsetTop < position) {
            if(!target[i].classList.contains('is-changed')){
              console.log('入った index = ', i);
              target[i].classList.add('is-changed');
              this.changeSphere(i - 1, i);
            }
          } else {
            if(target[i].classList.contains('is-changed')) {
              console.log('出た index = ', i);
              target[i].classList.remove('is-changed');
              this.changeSphere(i, i - 1);
            }
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