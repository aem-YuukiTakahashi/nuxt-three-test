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
export default {
  data() {
    return {
      imgList: [
        "/images/gallery/img1.png",
        "/images/gallery/img2.png",
        "/images/gallery/img3.png",
        "/images/gallery/img4.png",
        "/images/gallery/img5.png",
        "/images/gallery/img6.png",
        "/images/gallery/img7.png",
      ],
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
      fov: 50, // 視野角
      isAnime: true,

      clock: new THREE.Clock(),
      textureList: [],
      group: null,
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
      const camera = new THREE.PerspectiveCamera(this.fov, width / height);
      camera.position.z = this.distance;
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      this.camera = camera;

      // シーンを作成
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2( 0xaaccff, 0.0007 );
      this.scene = scene;

      // show axes in the screen
      const axes = new THREE.AxesHelper(500);
      scene.add(axes);

      // loader
      this.loader();


      this.onResize();
      window.addEventListener('resize', this.onResize, false);
    },

    /**
     * ローダー
     */
    loader() {
      const manager = new THREE.LoadingManager();

      // 画像が全部ロードされたらよばれる
      manager.onLoad = () => {
        // mesh作成の関数を呼び出す
        this.createMesh();
      };

      // 画像それぞれがロードされたらよばれる
      manager.onProgress = ( url, itemsLoaded, itemsTotal ) => {
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
            this.textureList.push(texture);
          },

          // onProgress callback currently not supported
          undefined,

          // onError callback
          () => {
            console.error( 'An error happened.' );
          }
        );
      }
    },

    /**
     * メッシュ作成
     */
    createMesh() {
      // グループを作る
      const group = new THREE.Group();
      this.group = group;

      // 3D空間にグループを追加する
      this.scene.add(group);

      for (let i = 0; i < this.textureList.length; i++) {

        // planegeometry
        const planeGeometry = new THREE.PlaneGeometry(300, 400, 1, 1);

        // テクスチャからマテリアルを作成
        const material = new THREE.MeshBasicMaterial({
          map: this.textureList[i],
          side: THREE.DoubleSide
        });

        // メッシュを作成
        const mesh = new THREE.Mesh(planeGeometry, material);

        mesh.lookAt( this.camera.position );

        // 配置座標を計算
        const radian = i / this.textureList.length * Math.PI * 2;
        mesh.position.set(
          300 + i * 350, // X座標
          0, // Y座標
          0 // Z座標
        );

        // グループに追加する
        group.add(mesh);

      }

      this.animate();
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

      this.group.rotation.y += 0.01;

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
    },
  },
  beforeDestroy: function() {
    this.isAnime = false;
  },
}
</script>