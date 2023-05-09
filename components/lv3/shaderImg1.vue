<template lang="pug">
.shader-img-1
  canvas#myCanvas(ref="canvas")
  #loader.loading(:class='{active: !isLoading}')
    .loading__inner
      p Loading...
      p {{loadingProgress}}%
</template>

<script>
import GUI from 'lil-gui'
import * as THREE from "three";
import vertexShader from "assets/js/shader-1.vert";
import fragmentShader from "assets/js/shader-1.frag";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

export default {
  props: {
    imgList: {
      type: [],
      default: () => {},
    },
    fov: {
      type: Number,
      default: 40
    }
  },
  data() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      threeRenderer: null,
      threeCamera: null,
      isThreeAnimation: true,
      scene: null,
      isLoading: true,
      loadingProgress: 0,
      uniforms: {
        amplitude: { value: 1.0 },
        uTexture: null
      },
      displacement: null,
      noise: null,
      rota: 0,
    }
  },
  computed: {
    fovRad() {
      return (this.fov / 2) * (Math.PI / 180);
    },
    distance() {
      return (this.height / 2) / Math.tan(this.fovRad);
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
      console.log(this.imgList);

      const width = window.innerWidth;
      const height = window.innerHeight;

      // レンダラーを作成
      const canvasElement = document.querySelector('#myCanvas')
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasElement
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      this.threeRenderer = renderer;

      // カメラを作成
      const camera = new THREE.PerspectiveCamera(this.fov, width / height);
      camera.position.z = this.distance;
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      this.threeCamera = camera;

      // シーンを作成
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);
      this.scene = scene;

      // const light = new THREE.AmbientLight(0xFFFFFF, 1.0);
      // this.scene.add(light);

      const controls = new OrbitControls( this.threeCamera, canvasElement );
      //controls.enableZoom = false;

      // show axes in the screen
      const axes = new THREE.AxesHelper(500);
      this.scene.add(axes);

      const manager = new THREE.LoadingManager();

      // 画像が全部ロードされたらよばれる
      manager.onLoad = () => {
        setTimeout(() => {
          this.loadingProgress = 100;
        }, 1500);

        setTimeout(() => {
          this.isLoading = false;
        }, 2000);
      };

      // 画像それぞれがロードされたらよばれる
      manager.onProgress = ( url, itemsLoaded, itemsTotal ) => {
        this.loadingProgress = (itemsLoaded / itemsTotal) * 99;
      };

      // ロード中の画像で何かエラーがあればよばれる
      manager.onError = function ( url ) {
        console.error('There was an error loading ' + url);
      };

      const loader = new THREE.TextureLoader(manager);
      for(const imgSrc of this.imgList) {
        loader.load(
          // resource URL
          imgSrc,

          // onLoad callback
          ( texture ) => {
            console.log('texture = ', texture);

            const geometry = new THREE.PlaneGeometry(1024, 683, 10, 10);

            this.displacement = new Float32Array( geometry.attributes.position.count );
            this.noise = new Float32Array( geometry.attributes.position.count );

            for ( let i = 0; i < this.displacement.length; i ++ ) {

              this.noise[ i ] = Math.random() * 5;

            }

            geometry.setAttribute( 'displacement', new THREE.BufferAttribute( this.displacement, 1 ) );

            this.uniforms.uTexture = {value: texture};

            const material = new THREE.ShaderMaterial({
              uniforms: this.uniforms,
              vertexShader: vertexShader,
              fragmentShader: fragmentShader,
              wireframe: false
            });

            console.log(material);
            const plane = new THREE.Mesh( geometry, material );
            this.scene.add( plane );
          },

          // onProgress callback currently not supported
          undefined,

          // onError callback
          () => {
            console.error( 'An error happened.' );
          }
        );
      }

      this.onResize();
      this.animate();
      window.addEventListener('resize', this.onResize, false);
    },

    /**
     * アニメーション開始
     */
    animate() {
      if(this.isThreeAnimation) {
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

      this.threeRenderer.render(this.scene, this.threeCamera);
    },

    /**
     * リサイズ処理
     */
    onResize() {
      // サイズを取得
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      // カメラのアスペクト比を正す
      this.threeCamera.aspect = this.width / this.height;
      this.threeCamera.updateProjectionMatrix();

      // レンダラーのサイズを調整する
      this.threeRenderer.setPixelRatio(window.devicePixelRatio);
      this.threeRenderer.setSize(this.width, this.height);
    },

    /**
     * GUI 初期化
     */
    initGui() {
      const gui = new GUI();
    },
  },
  beforeDestroy: function() {
    this.isThreeAnimation = false;
  },
}
</script>

<style scoped>
#loader {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
  z-index: 100000;
}

#loader.active {
  display: none;
}

.loading__inner {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  height: 100%;
}

.loading__inner p {
  text-align: center;
  color: white;
}

#myCanvas {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
}
</style>