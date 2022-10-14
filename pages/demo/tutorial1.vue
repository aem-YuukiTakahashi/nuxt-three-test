<template lang="pug">
div
  div#Stats-output
  canvas#myCanvas(ref="canvas")

</template>

<script>
import * as THREE from "three";
import Stats from 'stats.js'
export default {
  data() {
    return {
      stats: null,
      renderer: null,
      scene: null,
      camera: null,
      cube: null,
      sphere: null,
      step: 0,
    }
  },
  computed: {},
  mounted() {
     this.init();
  },
  methods: {
    init() {
      this.initStats();

      // create a scene, that will hold all our elements such as objects, cameras and lights.
      var scene = new THREE.Scene();

      // create a camera, which defines where we're looking at.
      var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

      // レンダラーを作成
      const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
      });
      renderer.setClearColor(new THREE.Color(0xEEEEEE));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;

      // show axes in the screen
      var axes = new THREE.AxesHelper(20);
      scene.add(axes);

      // create the ground plane
      var planeGeometry = new THREE.PlaneGeometry(60, 20);
      var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
      var plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.receiveShadow = true;

      // rotate and position the plane
      plane.rotation.x = -0.5 * Math.PI;
      plane.position.x = 15;
      plane.position.y = 0;
      plane.position.z = 0;

      // add the plane to the scene
      scene.add(plane);

      // create a cube
      var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
      var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
      var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.castShadow = true;

      // position the cube
      cube.position.x = -4;
      cube.position.y = 3;
      cube.position.z = 0;

      // add the cube to the scene
      scene.add(cube);

      var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
      var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
      var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

      // position the sphere
      sphere.position.x = 20;
      sphere.position.y = 4;
      sphere.position.z = 2;
      sphere.castShadow = true;

      // add the sphere to the scene
      scene.add(sphere);

      // position and point the camera to the center of the scene
      camera.position.x = -30;
      camera.position.y = 40;
      camera.position.z = 30;
      camera.lookAt(scene.position);

      // add spotlight for the shadows
      var spotLight = new THREE.SpotLight(0xffffff);
      spotLight.position.set(-20, 30, -5);
      spotLight.castShadow = true;
      scene.add(spotLight);

      this.renderer = renderer;
      this.scene = scene;
      this.camera = camera;
      this.cube = cube;
      this.sphere = sphere;

      this.renderScene();
    },

    renderScene() {
      this.stats.update();

      // rotate the cube around its axes
      this.cube.rotation.x += 0.02;
      this.cube.rotation.y += 0.02;
      this.cube.rotation.z += 0.02;

      // bounce the sphere up and down
      this.step += 0.04;
      this.sphere.position.x = 20 + ( 10 * (Math.cos(this.step)));
      this.sphere.position.y = 2 + ( 10 * Math.abs(Math.sin(this.step)));

      // render using requestAnimationFrame
      requestAnimationFrame(this.renderScene);
      this.renderer.render(this.scene, this.camera);
    },

    initStats() {
      this.stats = new Stats();

      this.stats.setMode(0); // 0: fps, 1: ms

      // Align top-left
      this.stats.domElement.style.position = 'absolute';
      this.stats.domElement.style.left = '0px';
      this.stats.domElement.style.top = '0px';

      document.getElementById("Stats-output").appendChild(this.stats.domElement);

    }
  }
}
</script>