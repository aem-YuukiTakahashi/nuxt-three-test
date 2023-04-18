<template lang="pug">
div
  .wrapper
    .demo-box
      .demo-box__inner
        .demo-box-img-1(@click="img1 = ''")
          <img :src="img1" v-if="img1" />
        .demo-box-img-2(@click="img2 = ''")
          <img :src="img2" v-if="img2" />
        .demo-box-img-3(@click="img3 = ''")
          <img :src="img3" v-if="img3" />

    <img :src="imgPath" :data-id="imgDataId" id="drag-img" class="drag-img js-drag-img" />

    ul.img-list
      li.img-list__item
        <img class="js-drag-elem" src="images/stamp/stamp1.png" data-id="1" />
      li.img-list__item
        <img class="js-drag-elem" src="images/stamp/stamp2.png" data-id="2" />
      li.img-list__item
        <img class="js-drag-elem" src="images/stamp/stamp3.png" data-id="3" />
      li.img-list__item
        <img class="js-drag-elem" src="images/stamp/stamp4.png" data-id="4" />
      li.img-list__item
        <img class="js-drag-elem" src="images/stamp/stamp5.png" data-id="5" />
      li.img-list__item
        <img class="js-drag-elem" src="images/stamp/stamp6.png" data-id="6" />
      li.img-list__item
        <img class="js-drag-elem" src="images/stamp/stamp7.png" data-id="7" />
</template>

<script>
export default {
  data() {
    return {
      targetElem: null,
      imgPath: '',
      imgDataId: '',
      img1: '',
      img2: '',
      img3: '',
      posiX: 0,
      poxiY: 0,
    }
  },
  computed: {},
  mounted() {
    this.targetElem = document.getElementsByClassName("js-drag-elem");

    //マウスが要素内で押されたとき、又はタッチされたとき発火
    for(var i = 0; i < this.targetElem.length; i++) {
        this.targetElem [i].addEventListener("mousedown", this.mdown, false);
        this.targetElem [i].addEventListener("touchstart", this.mdown, false);
    }
  },
  methods: {
    mdown(e) {
      //クラス名に .drag を追加
      e.target.classList.add("drag");

      //タッチデイベントとマウスのイベントの差異を吸収
      if(e.type === "mousedown") {
          const event = e;
      } else {
          const event = e.changedTouches[0];
      }

      // マウスダウンの位置に画像を移動させて表示させる
      const posiX = e.pageX;
      const posiY = e.pageY;

      console.log(posiX, posiY);

      this.$nextTick(function() {
        const img = document.getElementById("drag-img");
        img.style.left = (posiX - img.clientWidth * 2) + 'px';
        img.style.top  = (posiY - img.clientHeight - 120) + 'px';

        this.imgPath = e.target.currentSrc;
        this.imgDataId = e.target.dataset.id;

        //ムーブイベントにコールバック
        document.body.addEventListener("mousemove", this.mmove, false);
        document.body.addEventListener("touchmove", this.mmove, false);
      });
    },

    //マウスカーソルが動いたときに発火
    mmove(e) {
      //ドラッグしている要素を取得
     const img = document.getElementById("drag-img");

      //同様にマウスとタッチの差異を吸収
      if(e.type === "mousemove") {
          var event = e;
      } else {
          var event = e.changedTouches[0];
      }

      //フリックしたときに画面を動かさないようにデフォルト動作を抑制
      e.preventDefault();

      //マウスが動いた場所に要素を動かす
      img.style.top = (event.pageY - img.clientWidth / 2) + "px";
      img.style.left = (event.pageX - img.clientHeight / 2) + "px";


      img.style.display = "none";
      const area = document.elementFromPoint(event.clientX, event.clientY);


      if(!area.classList.contains("demo-box-img-1") &&
        !area.classList.contains("demo-box-img-2") &&
        !area.classList.contains("demo-box-img-3")) {
          img.style.display = "block";
      } else {
        img.style.display = "none";
      }

      if(area.classList.contains("demo-box-img-1")) {
        this.img1 = img.src;
      } else if(this.img1){
        // 既に画像があれば何もしない
      } else {
        this.img1 = '';
      }

      if(area.classList.contains("demo-box-img-2")) {
        this.img2 = img.src;
      } else if(this.img2){
        // 既に画像があれば何もしない
      } else {
        this.img2 = '';
      }

      if(area.classList.contains("demo-box-img-3")) {
        this.img3 = img.src;
      } else if(this.img3){
        // 既に画像があれば何もしない
      } else {
        this.img3 = '';
      }

      //マウスボタンが離されたとき、またはカーソルが外れたとき発火
      this.posiX = event.clientX;
      this.posiY = event.clientY;
      document.body.addEventListener("mouseup", this.mup, false);
      document.body.addEventListener("mouseleave", this.mup, false);
      document.body.addEventListener("touchend", this.mup, { passive: false } );
      document.body.addEventListener("touchleave", this.mup, { passive: false } );

    },

    //マウスボタンが上がったら発火
    mup(e) {

      console.log(e.type);

      //ドラッグしている要素を取得
      const img = document.getElementById("drag-img");

      const area = document.elementFromPoint(this.posiX, this.posiY);

      // if(!area.classList.contains("demo-box-img-1") &&
      //   !area.classList.contains("demo-box-img-2") &&
      //   !area.classList.contains("demo-box-img-3")) {
      //     img.style.display = "block";
      //   }

      // if(area.classList.contains("demo-box-img-1")) {
      //   this.img1 = img.src;
      // }

      // if(area.classList.contains("demo-box-img-2")) {
      //   this.img2 = img.src;
      // }

      // if(area.classList.contains("demo-box-img-3")) {
      //   this.img3 = img.src;
      // }

      //ムーブベントハンドラの消去
      document.body.removeEventListener("mousemove", this.mmove, false);
      document.body.removeEventListener("mouseup", this.mup, false);
      document.body.removeEventListener("mouseleave", this.mup, false);
      document.body.removeEventListener("touchmove", this.mmove, { passive: false } );
      document.body.removeEventListener("touchend", this.mup, { passive: false } );
      document.body.removeEventListener("touchleave", this.mup, { passive: false } );

      this.imgPath = '';
      this.imgDataId = '';
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
}

.wrapper {
  position: relative;
}

.demo-box {
  width: 100%;
  max-width: 300px;
  height: 250px;
  margin: 60px auto 0;
  border: 2px solid #000;
  background-color: gray;
}

.demo-box__inner {
  position: relative;
}

.demo-box-img-1,
.demo-box-img-2,
.demo-box-img-3 {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  top: 20px;
  border: 2px solid #000;
  background-color: #fff;
}

.demo-box-img-1 {
  right: 160px;
}

.demo-box-img-2 {
  right: 90px;
}

.demo-box-img-3 {
  right: 20px;
}

.drag-img {
  position: absolute;
  opacity: .75;
}

.img-list {
  width: 100%;
  max-width: 600px;
  margin: 30px auto 0;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
}

.img-list__item {
  width: calc((100% - 30px) / 4);
  margin-right: 10px;
  margin-bottom: 10px;
}

.img-list__item:nth-child(4n) {
  margin-right: 0;
}

</style>