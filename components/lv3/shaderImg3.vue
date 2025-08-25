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
import vertexShader from "assets/js/shader-3.vert";
import fragmentShader from "assets/js/shader-3.frag";

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

      uniforms:{
        tDiffuse: null,
        vScreenSize: { type: "v2", value: new THREE.Vector2(0.0, 0.0) },
        uTexture:null
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
        canvas: canvasElement,
        antialias: true,
        alpha: true,
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

            console.log(texture);
            const geometry = new THREE.PlaneGeometry(1024, 683, 10, 10);

            if(texture.source.data.currentSrc.indexOf('img1') > 0) {
              // 後ろの画像
              const material = new THREE.MeshBasicMaterial({
                map: texture,
              });
              const plane = new THREE.Mesh( geometry, material );
              this.scene.add( plane );
            } else {
              // すりガラス用
              // this.uniforms["vScreenSize"].value.x = 1024;
              // this.uniforms["vScreenSize"].value.y = 683;
              // this.uniforms.tDiffuse = {type: "t", value: texture};

              // const material = new THREE.ShaderMaterial({
              //   uniforms: this.uniforms,
              //   vertexShader: vertexShader,
              //   fragmentShader: fragmentShader,
              //   wireframe: false
              // });

              // material.transparent = true;
              // material.alphaToCoverage = true;
              // material.depthTest = true;

              // const plane = new THREE.Mesh( geometry, material );
              // this.scene.add( plane );

              const material = new THREE.MeshPhysicalMaterial({});
              material.reflectivity = 0
              material.transmission = 1.0
              material.roughness = 0.2
              material.metalness = 0
              material.clearcoat = 0.3
              material.clearcoatRoughness = 0.25
              material.color = new THREE.Color(0xffffff)
              material.ior = 1.2
              material.thickness = 10.0
              const plane = new THREE.Mesh( geometry, material );
              plane.position.z = 1;
              this.scene.add( plane );
            }


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