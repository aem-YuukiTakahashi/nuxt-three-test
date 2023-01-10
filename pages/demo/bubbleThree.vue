<template lang="pug">
div
  .background
  canvas#myCanvas(ref="canvas")
  .wrapper

    .inner
      div CAMEEA TEST
        div
          input(v-model="cameraX" placeholder="X")
        div
          input(v-model="cameraY" placeholder="Y")
        div
          input(v-model="cameraZ" placeholder="Z")
        button(@click='setCameraPosition') カメラ位置更新
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
  margin: 0 auto 60px;
  text-align: center;
}
</style>

<script>
import * as THREE from "three";
export default {
  data() {
    return {
      renderer: null,
      scene: null,
      camera: null,
      bubbleList: [],
      MaxBubbleCount: 100,
      isAnime: true,
      cameraX: 500,
      cameraY: 500,
      cameraZ: 800,
    }
  },
  computed: {
    bubbleCount() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const count = Math.floor((width + height) * 0.02);
      if(count > this.MaxBubbleCount) return this.MaxBubbleCount;
      return count;
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

      // const camera = new THREE.Camera();
      // camera.position.z = 1;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const camera = new THREE.PerspectiveCamera(45, width / height);
      camera.position.set(this.cameraX, this.cameraY, this.cameraZ);
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      this.camera = camera;

      const scene = new THREE.Scene();
      this.scene = scene;

      for(let i = 0; i < this.bubbleList.length; i++) {
        const bubble = this.bubbleList[i];
        scene.add(bubble.mesh);
      }

      // show axes in the screen
      var axes = new THREE.AxesHelper(500);
      scene.add(axes);

      // 平行光源
      const directionalLight = new THREE.DirectionalLight(0xffffff);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);

      // ポイント光源
      const pointLight = new THREE.PointLight(0xffffff, 2, 1000);
      scene.add(pointLight);

      // レンダラーを作成
      const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x000000, 0);
      this.renderer = renderer;

      this.onWindowResize();
      window.addEventListener('resize', this.onWindowResize, false);

      this.render();
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
        console.log('animate stop');
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

        if (afterPosiX - bubble.radius > width) {
          bubbleMesh.position.set(-bubble.radius, afterPosiY, 0);
        }

        if (afterPosiX + bubble.radius < 0) {
          bubbleMesh.position.set(width + bubble.radius, afterPosiY, 0);
        }

        if (afterPosiY - bubble.radius > height) {
            bubbleMesh.position.set(afterPosiX, -bubble.radius, 0);
        }

        if (afterPosiY + bubble.radius < 0) {
          bubbleMesh.position.set(afterPosiX, height + bubble.radius, 0);
        }
      }
      this.renderer.render(this.scene, this.camera);
    },
    /**
     * リサイズ処理
     */
    onWindowResize() {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    /**
     * 表示する泡の作成
     */
    creatBubble() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      for (let i = 0; i < this.bubbleCount; i++) {
        const radius = 4 + (Math.random() * width / 25);
        const geometry = new THREE.SphereGeometry(radius,radius / 2,radius / 2);
        const material = new THREE.MeshBasicMaterial({color: 0x6699FF});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(Math.random() * width, Math.random() * height, 0);

        const obj = {
          mesh: mesh,
          radius: radius,
          angle: ((() => Math.random() * Math.PI * 2)).call(),
          velocity: ((() => 0.1 + Math.random() * 0.5)).call()
        }

        this.bubbleList.push(obj);
      }
    },
    /**
     * カメラの位置更新
     */
    setCameraPosition() {
      this.camera.position.set(this.cameraX, this.cameraY, this.cameraZ);
    }
  },
  beforeDestroy: function() {
    this.isAnime = false;
  },
}
</script>