<template lang="pug">
div
  p 転写するsvg画像
  .svgimg
    img(src='blob.svg')
  p canvasに転写した場合
  .svgimg-canvas
    canvas#myCanvas(ref="canvas")
</template>

<style scoped>
.svgimg {
  width: calc(100% - 20px);
  max-width: 500px;
  margin: 0 auto;
}
</style>

<script>
import * as THREE from "three";
import {SVGLoader} from 'three/examples/jsm/loaders/SVGLoader';
export default {
  data() {
    return {
      renderer: null,
      scene: null,
      camera: null,
    }
  },
  computed: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // サイズを指定
      const width = 960;
      const height = 540;

      // レンダラーを作成
      const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);

      this.renderer = renderer;

      const camera = new THREE.PerspectiveCamera(45, width / height);
      camera.position.set(0, 0, +100);
      this.camera = camera;

      // シーンを作成
      const scene = new THREE.Scene();

      // show axes in the screen
      const axes = new THREE.AxesHelper(100);
      scene.add(axes);

      const loader = new SVGLoader();
      console.log(loader);

      loader.load(
        // resource URL
        'blob.svg',

        // called when the resource is loaded
        (data) => {
          console.log('data = ', data);

          // Group that will contain all of our paths
          const svgGroup = new THREE.Group();
          svgGroup.scale.multiplyScalar( 0.25 );
          svgGroup.position.x = -20;
          svgGroup.position.y = 20;
          svgGroup.scale.y *= - 1;

          const material = new THREE.MeshNormalMaterial();

          // Loop through all of the parsed paths
          data.paths.forEach((path, i) => {
            const shapes = path.toShapes(true);

            // Each path has array of shapes
            shapes.forEach((shape, j) => {
              // Finally we can take each shape and extrude it
              const geometry = new THREE.ExtrudeGeometry(shape, {
                //depth: 20,
                bevelEnabled: false
              });

              // Create a mesh and add it to the group
              const mesh = new THREE.Mesh(geometry, material);

              svgGroup.add(mesh);
            });
          });

          scene.add(svgGroup);
          this.scene = scene;

          this.renderScene();

        },

        // called when loading is in progresses
         (xhr) => {
          console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },

        // called when loading has errors
         (error) => {
          console.log('error =', error);
          console.log( 'An error happened' );
        }
      );
    },

    renderScene() {
      // render using requestAnimationFrame
      requestAnimationFrame(this.renderScene);
      this.renderer.render(this.scene, this.camera);
    },
  }
}
</script>