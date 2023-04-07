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

export default {
  props: {
    imgList: {
      type: [],
      default: () => {},
    },
    fov: {
      type: Number,
      default: 40
    },
    pageMove:{
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      threeRenderer: null,
      threeCamera: null,
      threeScene: null,
      isThreeAnimation: true,
      isLoading: true,
      loadingProgress: 0,

      wallPosiIndex: 0,
      wallPosi1:0,
      wallPosi2: -1 * 90 * (Math.PI / 180),
      wallPosi3: -1 * 180 * (Math.PI / 180),
      wallPosi4: -1 * 270 * (Math.PI / 180),
      movieReverse: false,

      lot: 0,
      mouseX: 0,
      mouseY: 0,
    }
  },
  computed: {
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

      // レンダラーを作成
      const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(this.width, this.height);
      this.threeRenderer = renderer;

      const camera = new THREE.PerspectiveCamera( 80, this.width / this.height, 0.01, 100 );
      camera.position.z = 3;
      camera.focalLength = 3;

      this.threeCamera = camera;

      const textureCube = new THREE.CubeTextureLoader().load( this.imgList );

      const scene = new THREE.Scene();
      scene.background = textureCube;
      this.threeScene = scene;

      // show axes in the screen
      const axes = new THREE.AxesHelper(500);
      scene.add(axes);

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

      this.onResize();
      window.addEventListener( 'resize', this.onResize );
      this.animate();

      window.addEventListener('scroll', this.scroll, false);
      document.addEventListener("mousemove", (event) => {
        this.mouseX = event.pageX;
        this.mouseY = event.pageY;
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

      if(this.wallPosiIndex == 0) {
        if(this.movieReverse) {
          if(this.threeCamera.rotation.y < 0) {
            this.threeCamera.rotation.y += 0.1;
          }
        }
      } else if(this.wallPosiIndex == 1) {
        if(this.movieReverse) {
          if(this.threeCamera.rotation.y < this.wallPosi2) {
            this.threeCamera.rotation.y += 0.1;
          }
        } else {
          if(this.threeCamera.rotation.y > this.wallPosi2) {
            this.threeCamera.rotation.y -= 0.1;
          }
        }
      } else if(this.wallPosiIndex == 2) {
        if(this.movieReverse) {
          if(this.threeCamera.rotation.y < this.wallPosi3) {
            this.threeCamera.rotation.y += 0.1;
          }
        } else {
          if(this.threeCamera.rotation.y > this.wallPosi3) {
            this.threeCamera.rotation.y -= 0.1;
          }
        }
      } else if(this.wallPosiIndex == 3) {
        if(this.threeCamera.rotation.y > this.wallPosi4) {
          this.threeCamera.rotation.y -= 0.1;
        }
      } else if(this.wallPosiIndex == 4) {
      } else if(this.wallPosiIndex == 5) {
      }

      this.threeRenderer.render(this.threeScene, this.threeCamera);
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
      const cameraPositionFolder = gui.addFolder('CameraPosition');
      cameraPositionFolder.add(this.threeCamera.position, 'x');
      cameraPositionFolder.add(this.threeCamera.position, 'y');
      cameraPositionFolder.add(this.threeCamera.position, 'z');
    },

    scroll() {
      const target = document.getElementsByClassName('inner');
      const position = Math.floor(window.innerHeight * .5);

      for (let i = 0; i < target.length; i++) {

        let offsetTop = Math.floor(target[i].getBoundingClientRect().top);
        let offsetBottom = Math.floor(target[i].getBoundingClientRect().bottom);

        if (offsetTop < position) {
          if(!target[i].classList.contains('is-changed')){
            target[i].classList.add('is-changed');
            this.movieReverse = false;
            this.wallPosiIndex = i;
          }
        } else {
          if(target[i].classList.contains('is-changed')) {
            target[i].classList.remove('is-changed');
            this.movieReverse = true;
            this.wallPosiIndex = i - 1;
          }
        }
      }

      console.log('this.wallPosiIndex = ', this.wallPosiIndex);
    }
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
  z-index: 10000;
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
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
}

</style>