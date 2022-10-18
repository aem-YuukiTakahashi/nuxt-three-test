<template lang="pug">
div
  canvas#myCanvas(ref="canvas")
</template>

<script>
import * as THREE from "three";
import vertexShader from "assets/js/liquid.vert";
import fragmentShader from "assets/js/liquid.frag";
export default {
  data() {
    return {
      renderer: null,
      scene: null,
      camera: null,
      uniforms: null,
      startTime: null,
    }
  },
  computed: {},
  mounted() {
     this.init();
  },
  methods: {
    init() {
      console.log(vertexShader);
      console.log(fragmentShader);

      this.startTime = Date.now();

      const camera = new THREE.Camera();
      camera.position.z = 1;
      this.camera = camera;

      const scene = new THREE.Scene();
      const geometry = new THREE.PlaneGeometry(16, 9);

      this.uniforms = {
        iGlobalTime: { type: "f", value: 1.0 },
        iResolution: { type: "v2", value: new THREE.Vector2() }
      };

      const material = new THREE.ShaderMaterial(
        {
          uniforms: this.uniforms,
          vertexShader: vertexShader,
          fragmentShader: fragmentShader
        }
      );

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      this.scene = scene;

      // レンダラーを作成
      const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer = renderer;

      this.onWindowResize();

      window.addEventListener('resize', this.onWindowResize, false);

      this.animate();
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.render();
    },
    render() {
      var currentTime = Date.now();
      this.uniforms.iGlobalTime.value = (currentTime - this.startTime) * 0.001;
      this.renderer.render(this.scene, this.camera);
    },
    onWindowResize() {
      this.uniforms.iResolution.value.x = window.innerWidth;
      this.uniforms.iResolution.value.y = window.innerHeight;
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
}
</script>