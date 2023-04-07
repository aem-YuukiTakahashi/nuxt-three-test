<template lang="pug">
.wrapper
  lv3-envmap-2(:img-list='imgList')
  .kv
    img(src="images/demo-1/1366x969.png")
  .inner#inner-1
    .inner__title コンテンツ見出し1
    .inner__wrapper
      div コンテンツ内容
  .inner#inner-2
    .inner__title コンテンツ見出し2
    .inner__wrapper
      div コンテンツ内容
  .inner#inner-3
    .inner__title コンテンツ見出し3
    .inner__wrapper
      div コンテンツ内容
  .inner#inner-4
    .inner__title コンテンツ見出し4
    .inner__wrapper
      div コンテンツ内容
  .inner#inner-5
    .inner__title コンテンツ見出し5
    .inner__wrapper
      div コンテンツ内容
  .inner#inner-6
    .inner__title コンテンツ見出し6
    .inner__wrapper
      div コンテンツ内容

</template>

<style scoped>
</style>

<script>
export default {
  data() {
    return {
      imgList: [
					'images/demo-1/px.png', 'images/demo-1/nx.png',
					'images/demo-1/py.png', 'images/demo-1/ny.png',
					'images/demo-1/pz.png', 'images/demo-1/nz.png'
        // "/images/demo-1/200x200-6.png",
        // "/images/demo-1/200x200-4.png",
        // "/images/demo-1/200x200-3.png",
        // "/images/demo-1/200x200-2.png",
        // "/images/demo-1/200x200-5.png",
        // "/images/demo-1/200x200-1.png",
      ],
      pageMove: false,
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
  },
}
</script>


<style scoped>
body {
  margin: 0;
}
.wrapper {
  position: relative;
}
.inner {
  width: 100%;
  max-width: 1020px;
  margin: 0 auto;
  padding: 0 30px;
  position: relative;
  z-index: 1;
}

.inner + .inner {
  margin-top: 60px;
}

.inner__title {
  color: white;
  font-size: 2rem;
  font-weight: bold;
}

.inner__wrapper {
  height: 600px;
  background-color: rgba(255,255,255,.25);
}

.btn__wrapper {
  text-align: center;
  margin-top: 60px;
  margin-bottom: 60px;
  position: relative;
  z-index: 1;
}

.btn__wrapper button {
  width: 300px;
  height: 50px;
  background-color: #fff;
  border-radius: 100px;
  color: #000;
  cursor: pointer;
}

.kv {
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 1;
}

.kv img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>