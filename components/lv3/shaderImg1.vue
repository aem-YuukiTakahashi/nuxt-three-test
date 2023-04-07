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
      isLoading: true,
      loadingProgress: 0,
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
          function ( texture ) {
            console.log('texture = ', texture);
          },

          // onProgress callback currently not supported
          undefined,

          // onError callback
          function () {
            console.error( 'An error happened.' );
          }
        );
      }
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
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this.width, this.height);
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

</style>