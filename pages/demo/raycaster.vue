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
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
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
      raycaster: null,
      mousePosition: null,
      selectedMesh: null,
      fov: 70, // 視野角
      isAnime: true,
      theta: 0,
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
      const camera = new THREE.PerspectiveCamera(this.fov, width / height, 1, 10000);
      camera.position.z = this.distance;
      this.camera = camera;

      // シーンを作成
      const scene = new THREE.Scene();
      this.scene = scene;

      const orbit = new OrbitControls(camera, renderer.domElement);
      orbit.update();

      // show axes in the screen
      const axes = new THREE.AxesHelper(500);
      scene.add(axes);
      axes.name = 'AxesHelper';

      const light = new THREE.DirectionalLight( 0xffffff, 1 );
      light.position.set( 1, 1, 1 ).normalize();
      scene.add( light );

      // 箱を作成
      const geometry = new THREE.BoxGeometry( 50, 50, 50 );
      for ( let i = 0; i < 50; i ++ ) {

        const object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );

        object.position.x = Math.random() * 800 - 400;
        object.position.y = Math.random() * 800 - 400;
        object.position.z = Math.random() * 800 - 400;

        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;

        object.scale.x = Math.random() + 0.5;
        object.scale.y = Math.random() + 0.5;
        object.scale.z = Math.random() + 0.5;

        object.name = `box-${i}`;

        scene.add( object );

      }

      const raycaster = new THREE.Raycaster();
      this.raycaster = raycaster;

      const mousePosition = new THREE.Vector2();
      this.mousePosition = mousePosition;

      document.addEventListener( 'mousemove', this.onPointerMove );

      this.onResize();
      window.addEventListener('resize', this.onResize, false);
      this.animate();
    },

    onPointerMove(event) {
      this.mousePosition.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      this.mousePosition.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

      this.raycaster.setFromCamera( this.mousePosition, this.camera );
      const intersects = this.raycaster.intersectObjects( this.scene.children, false );
      console.log(intersects);

      if(intersects.length > 0) {
        if ( intersects[0].object.name !== 'AxesHelper' && this.selectedMesh != intersects[0].object ) {
          if ( this.selectedMesh ) this.selectedMesh.material.emissive.setHex( this.selectedMesh.currentHex );

          this.selectedMesh = intersects[0].object;
          this.selectedMesh.currentHex = this.selectedMesh.material.emissive.getHex();
          this.selectedMesh.material.emissive.setHex( 0xff0000 );
        }
      } else {
        if ( this.selectedMesh ) this.selectedMesh.material.emissive.setHex( this.selectedMesh.currentHex );
        this.selectedMesh = null;
      }
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

      // this.theta+= 0.1;

      // this.camera.position.x = 100 * Math.sin( THREE.MathUtils.degToRad( this.theta ) );
      // this.camera.position.y = 100 * Math.sin( THREE.MathUtils.degToRad( this.theta ) );
      // this.camera.position.z = 100 * Math.cos( THREE.MathUtils.degToRad( this.theta ) );
      // this.camera.lookAt( this.scene.position );
      // this.camera.updateMatrixWorld();

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

    },
  },
  beforeDestroy: function() {
    this.isAnime = false;
  },
}
</script>