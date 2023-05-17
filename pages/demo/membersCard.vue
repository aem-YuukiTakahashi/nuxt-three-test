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
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js';
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
      boxGeometry: null,
      boxMaterial: null,
      box: null,
      fov: 50, // 視野角
      isAnime: true,

      cardWidth: 512,
      cardHeight: 288,

      currentFrontKey: 'front-img-0',
      currentBackKey: 'back-img-0',

      labelFont: 'EB Garamond',
      label1: 'No.',
      label2: 'Name.',

      valueFont: 'Noto Sans JP',
      value1: '100001',
      value2: 'TEST 太郎 タロウ たろう',

      loadFrontImgsList: [
        './images/card/front/front-1.png',
        './images/card/front/front-2.png',
        './images/card/front/front-3.png'
      ],

      loadBackImgsList: [
        './images/card/back/back-1.png',
        './images/card/back/back-2.png',
        './images/card/back/back-3.png'
      ],

      loadFontsList: [
        './fonts/Noto_Sans_JP_Bold.json',
        './fonts/EB_Garamond_Bold.json',
        './fonts/Roboto_Bold.json',
        './fonts/Zen_Kaku_Gothic_New_Bold.json'
      ],

      fontsList: [],
      textureFrontList: [],
      textureBackList: [],
      card: null,
      frontCardImg: null,
      backCardImg: null,
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
      this.scene = scene;

      // カード周りをまとめるグループを作成
      const card = new THREE.Group();
      // カードをz軸に45度傾ける
      card.rotation.z = Math.PI / 4;
      this.card = card;
      this.scene.add(this.card);

      // show axes in the screen
      const axes = new THREE.AxesHelper(500);
      scene.add(axes);

      this.load();

      this.onResize();
      window.addEventListener('resize', this.onResize, false);
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
     * ロードの処理
     * 画像とフォントをロードする
     */
    load() {

      const manager = new THREE.LoadingManager();

      // 画像が全部ロードされたらよばれる
      manager.onLoad = () => {
        console.log('Loading complete!');
        console.log('ロードフォント = ', this.fontsList);
        console.log('ロードフロント画像 = ', this.textureFrontList);
        console.log('ロードバック画像 = ', this.textureBackList);

        // ロードが完了したらカードを作成
        this.createCard();
      };

      // 画像それぞれがロードされたらよばれる
      manager.onProgress = ( url, itemsLoaded, itemsTotal ) => {
        console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
      };

      // ロード中の画像で何かエラーがあればよばれる
      manager.onError = function ( url ) {
        console.error('There was an error loading ' + url);
      };

      this.loadImg(manager);
      this.loadFont(manager);
    },

    /**
     * 画像のロード
     */
    loadImg(manager) {
      const loader = new THREE.TextureLoader(manager);

      // フロント画像をロード
      this.loadFrontImgsList.forEach((value, index) => {
        loader.load(
          value,
          (img) => {
            img.name = `front-img-${index}`;
            this.textureFrontList.push(img);
          },
        );
      });

      // バック画像をロード
      this.loadBackImgsList.forEach((value, index) => {
        loader.load(
          value,
          (img) => {
            img.name = `back-img-${index}`;
            this.textureBackList.push(img);
          },
        );
      });
    },

    /**
     * フォントのロード
     */
    loadFont(manager) {
      const loader = new FontLoader(manager);
      for(const font of this.loadFontsList) {
        loader.load(
          font,
          (font) => {
            this.fontsList.push(font);
          },
        );
      }
    },

    /**
     * カードの作成
     */
    createCard() {
      // フロントのテクスチャーを取得
      const currentFrontTexture = this.textureFrontList.find((value) => {
        return value.name === this.currentFrontKey;
      });

      // フロントのテクスチャーからマテリアルを作成
      const frontMaterial = new THREE.MeshBasicMaterial({
        map: currentFrontTexture,
        side: THREE.FrontSide,
      });

      // フロント用のジオメトリーを作成
      const frontGeometry = new THREE.PlaneGeometry(this.cardWidth, this.cardHeight);

      // ジオメトリーとマテリアルからメッシュを作成
      const frontMesh = new THREE.Mesh(frontGeometry, frontMaterial);
      this.frontCardImg = frontMesh;

      // バックのテクスチャーを取得
      const currentBackTexture = this.textureBackList.find((value) => {
        return value.name === this.currentBackKey;
      });

      // バックのテクスチャーからマテリアルを作成
      const backMaterial = new THREE.MeshBasicMaterial({
        map: currentBackTexture,
        side: THREE.FrontSide,
      });

      // バック用のジオメトリーを作成
      const backGeometry = new THREE.PlaneGeometry(this.cardWidth, this.cardHeight);

      // ジオメトリーとマテリアルからメッシュを作成
      const backMesh = new THREE.Mesh(backGeometry, backMaterial);
      backMesh.rotation.y = Math.PI;
      this.backCardImg = backMesh;

      // ラベルで使用するフォントを取得する
      const currentLabelFont = this.fontsList.find((value) => {
        return value.data.familyName === this.labelFont;
      });

      // ラベルのフォントオプション
      const labelFontOption = {
        font: currentLabelFont,
        size: 15,
        height: 1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 1,
      }

      // ラベル1のテキストジオメトリーを作成
      const label1Geometry = new TextGeometry(this.label1, labelFontOption);
      label1Geometry.computeBoundingBox();
      const textMaterial = new THREE.MeshBasicMaterial({
         color: `#000`, // 文字の色
      })
      const label1 = new THREE.Mesh(label1Geometry, textMaterial)
      label1.position.x = -230;
      label1.position.y = -100;
      label1.position.z = 3;

      // ラベル2のテキストジオメトリーを作成
      const label2Geometry = new TextGeometry(this.label2, labelFontOption);
      label2Geometry.computeBoundingBox();
      const label2 = new THREE.Mesh(label2Geometry, textMaterial)
      label2.position.x = -230;
      label2.position.y = -130;
      label2.position.z = 3;

      // バリューで使用するフォントを取得する
      const currentValueFont = this.fontsList.find((value) => {
        return value.data.familyName === this.valueFont;
      });

      // バリューのテキストオプション
      const valueOption = {
        font: currentValueFont,
        size: 15,
        height: 1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 1,
      }

      // バリュー1のテキストジオメトリーを作成
      const value1Geometry = new TextGeometry(this.value1, valueOption);
      value1Geometry.computeBoundingBox();
      const value1 = new THREE.Mesh(value1Geometry, textMaterial)
      value1.position.x = -230 + label1Geometry.boundingBox.max.x + 20;
      value1.position.y = -100;
      value1.position.z = 3;

      // バリュー2のテキストジオメトリーを作成
      const value2Geometry = new TextGeometry(this.value2, valueOption);
      value2Geometry.computeBoundingBox();
      const value2 = new THREE.Mesh(value2Geometry, textMaterial)
      value2.position.x = -230 + label2Geometry.boundingBox.max.x + 20;
      value2.position.y = -130;
      value2.position.z = 3;

      // グループにそれぞれのメッシュを追加
      this.card.add(frontMesh);
      this.card.add(backMesh);
      this.card.add(label1);
      this.card.add(label2);
      this.card.add(value1);
      this.card.add(value2);
    },

    /**
     * レンダリング
     */
    render() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.card.rotation.y += 0.01;

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