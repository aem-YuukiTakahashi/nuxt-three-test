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
import vertexShader from "assets/js/shader-2.vert";
import fragmentShader from "assets/js/shader-2.frag";
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

      mouse: {
        x:0.5,
        y:0.5
      },

      // シェーダーのuniform変数
      uniforms: {
        // timeを設定
        utime: { value: 0.5 },
        amplitude: { value: 0.1 },
        // 画像テクスチャー用の変数
        uTexture: null,

        uAspect: {
          value: this.width / this.height
        },
        uTime: {
          value: 0.0
        },
        uMouse: {
          value: this.mouse
        }
      },

      displacement: null,
      noise: null,
      rota: 0,
      geo: null
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
      // シーンの背景色を白に設定
      scene.background = new THREE.Color(0xffffff);
      this.scene = scene;

      const controls = new OrbitControls( this.threeCamera, canvasElement );
      // OrbitControlsのzoomを無効化
      controls.enableZoom = false;

      // AxesHelperをシーンに追加
      const axesHelper = new THREE.AxesHelper(500);
      this.scene.add(axesHelper);

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

            const geometry = new THREE.PlaneGeometry(1024, 683, 10, 10);

            this.displacement = this.noise = new Float32Array( geometry.attributes.position.count );
            // dispalcementの中身をログ出力
            console.log(this.displacement);

            for ( let i = 0; i < this.displacement.length; i ++ ) {
              this.noise[ i ] = Math.random() * 5;
            }

            geometry.setAttribute( 'displacement', new THREE.BufferAttribute( this.displacement, 1 ) );

            this.geo = geometry;

            this.uniforms.uTexture = {value: texture};

            const material = new THREE.ShaderMaterial({
              uniforms: this.uniforms,
              vertexShader: vertexShader,
              fragmentShader: fragmentShader,
              wireframe: false
            });

            const plane = new THREE.Mesh( geometry, material );
            this.geo = plane;
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

      window.addEventListener('mousemove', e => {
        this.mouseMoved(e.clientX, e.clientY);
      });
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

      const time = Date.now() * 0.01;

      this.rota = 0.0001 * time;

      this.uniforms.amplitude.value = 2.5 * Math.sin( this.rota * 0.125 );

      if(this.displacement) {
        for ( let i = 0; i < this.displacement.length; i ++ ) {

            this.displacement[ i ] = Math.sin( 0.1 * i + time );

            this.noise[ i ] += 0.5 * ( 0.5 - Math.random() );
            this.noise[ i ] = THREE.MathUtils.clamp( this.noise[ i ], - 5, 5 );

            this.displacement[ i ] += this.noise[ i ];

        }
        this.geo.geometry.attributes.displacement.needsUpdate = true;
      }

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

    mouseMoved(x, y) {
      this.mouse.x = x / this.width;
      this.mouse.y = 1.0 - (y / this.height);
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