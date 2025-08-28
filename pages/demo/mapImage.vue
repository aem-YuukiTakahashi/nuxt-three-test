<template lang="pug">
div
  img(src="images/img0.jpg" usemap="#image-map")
  map(name="image-map")
    area(target="" alt="test" title="test" href="/" coords="909,174,861,99" shape="rect")
    area(target="" alt="testpoly" title="testpoly" href="/" coords="298,214,352,226,401,269,390,314,314,406,292,400,276,258,285,229" shape="poly")
</template>

<script>
import ImageMapResizer from '~/assets/js/imageMapResizer.js'
export default {
  data() {
    return {
      imageMapResizer: null,
    }
  },
  computed: {},
  beforeDestroy() {
    if (this.imageMapResizer) {
      this.imageMapResizer.destroy();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.imageMapResizer = new ImageMapResizer()
      this.imageMapResizer.resize();
    })
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
