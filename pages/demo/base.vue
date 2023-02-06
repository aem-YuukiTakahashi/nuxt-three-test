<template lang="pug">
div
  canvas#myCanvas(ref="canvas")
</template>

<style scoped>
#myCanvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
}
</style>

<script>
import GUI from 'lil-gui'
import * as THREE from "three";
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
      isAnime: true
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
      const geometry = new THREE.BoxGeometry( 100, 100, 100 );
      const material = new THREE.MeshBasicMaterial();
      const box = new THREE.Mesh(geometry, material);
      scene.add(box);
      this.boxGeometry = geometry;
      this.boxMaterial = material;
      this.box = box;

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

      this.box.rotation.y += 0.01;

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

      const rendererFolder  = gui.addFolder('Renderer');
      rendererFolder.addColor(this.rendererBgColor, 'color').onChange ((value) => {
        this.renderer.setClearColor(new THREE.Color(this.rendererBgColor.color), this.rendererBgColor.opacity);
      });
      rendererFolder.add(this.rendererBgColor, 'opacity').min(0).max(1).onChange ((value) => {
        this.renderer.setClearColor(new THREE.Color(this.rendererBgColor.color), this.rendererBgColor.opacity);
      });

      const boxMaterialFolder = gui.addFolder('BoxMaterial');
      boxMaterialFolder.addColor(this.boxMaterial, 'color');

      const boxPositionFolder = gui.addFolder('BoxPosition');
      boxPositionFolder.add(this.box.position, 'x');
      boxPositionFolder.add(this.box.position, 'y');
      boxPositionFolder.add(this.box.position, 'z');

      const boxScaleFolder = gui.addFolder('BoxScale');
      boxScaleFolder.add(this.box.scale, 'x');
      boxScaleFolder.add(this.box.scale, 'y');
      boxScaleFolder.add(this.box.scale, 'z');

    },
  },
  beforeDestroy: function() {
    this.isAnime = false;
  },
}
</script>