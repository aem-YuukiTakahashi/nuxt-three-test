<template lang="pug">
div
  lv3-shader-img-1(:img-list='imgList')
</template>

<style scoped>
</style>

<script>
export default {
  data() {
    return {
      imgList: [
        "images/img1.jpeg",
        // "/images/img2.jpeg",
        // "/images/img3.jpeg",
        // "/images/img4.jpeg",
      ]
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