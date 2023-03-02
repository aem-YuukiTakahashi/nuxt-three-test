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
      fov: 45, // 視野角
      isAnime: true,

      highlightMesh: null,
      sphereMesh: null,

      putObjects: [],
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
      const camera = new THREE.PerspectiveCamera(this.fov, width / height ,0.1 ,1000);
      camera.position.set(10, 15, -22);
      this.camera = camera;

      const orbit = new OrbitControls(camera, renderer.domElement);
      orbit.update();

      // シーンを作成
      const scene = new THREE.Scene();
      this.scene = scene;

      // show axes in the screen
      const axes = new THREE.AxesHelper(500);
      axes.name = 'AxesHelper';
      scene.add(axes);

      const planeMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20),
        new THREE.MeshBasicMaterial({
          side: THREE.DoubleSide,
          visible: false
        })
      );

      planeMesh.rotateX(-Math.PI / 2);
      planeMesh.name = "ground";
      scene.add(planeMesh);

      const highlightMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.MeshBasicMaterial({
          side: THREE.DoubleSide,
        })
      );

      highlightMesh.rotateX(-Math.PI / 2);
      highlightMesh.position.set(0.5, 0, 0.5);
      scene.add(highlightMesh);
      this.highlightMesh = highlightMesh;

      const sphereMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 4, 2),
        new THREE.MeshBasicMaterial({
          wireframe: true,
          color: 0xFFEA00
        })
      );
      this.sphereMesh = sphereMesh;

      const grid = new THREE.GridHelper(20, 20);
      scene.add(grid);

      const raycaster = new THREE.Raycaster();
      this.raycaster = raycaster;

      const mousePosition = new THREE.Vector2();
      this.mousePosition = mousePosition;

      window.addEventListener( 'mousemove', this.onPointerMove );
      window.addEventListener( 'mousedown', this.onPointerDown );

      this.onResize();
      window.addEventListener('resize', this.onResize, false);
      this.animate();
    },


    onPointerMove(event) {
      this.mousePosition.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      this.mousePosition.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

      this.raycaster.setFromCamera( this.mousePosition, this.camera );
      const intersects = this.raycaster.intersectObjects( this.scene.children, false );

      if(intersects.length > 0) {
        intersects.forEach((intersect) => {
          if(intersect.object.name === 'ground') {
            const highlightPos = new THREE.Vector3().copy(intersect.point).floor().addScalar(0.5);
            this.highlightMesh.position.set(highlightPos.x, 0, highlightPos.z);

            const objectExists = this.putObjects.find((object)=> {
              return (object.position.x === this.highlightMesh.position.x)
                && (object.position.z === this.highlightMesh.position.z);
            });

            if(!objectExists) {
              this.highlightMesh.material.color.setHex(0xFFFFFF);
            } else {
              this.highlightMesh.material.color.setHex(0xFF0000);
            }
          }
        });
      } else {
        this.highlightMesh.position.set(0.5, 0, 0.5);
      }
    },

    onPointerDown(event) {
      const objectExists = this.putObjects.find((object)=> {
        return (object.position.x === this.highlightMesh.position.x)
          && (object.position.z === this.highlightMesh.position.z);
      });

      console.log(objectExists);

      if(!objectExists) {
        this.raycaster.setFromCamera( this.mousePosition, this.camera );
        const intersects = this.raycaster.intersectObjects( this.scene.children, false );

        intersects.forEach((intersect) => {
          if(intersect.object.name === 'ground') {
            const cloneSphere = this.sphereMesh.clone();
            cloneSphere.position.copy(this.highlightMesh.position);
            this.scene.add(cloneSphere);
            this.putObjects.push(cloneSphere);
            this.highlightMesh.material.color.setHex(0xFF0000);
          }
        });
      } else {
        this.putObjects = this.putObjects.filter(mesh => {
          console.log(mesh);
          return (objectExists.position.x !== mesh.position.x)
            && (objectExists.position.z !== mesh.position.z);
        });
        this.scene.remove(objectExists);
        objectExists.material.dispose();
        objectExists.geometry.dispose();
        this.highlightMesh.material.color.setHex(0xFFFFFF);
      }

      console.log('scene len = ', this.scene.children.length);
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