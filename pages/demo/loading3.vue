<template lang="pug">
div
  lv3-movie3(v-if='isLoading' @loaded='onLoaded')
  div(v-else)
    .main 表示完了
</template>

<style scoped>
.main {
  width: 100svw;
  height: 100svh;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}
</style>

<script>
export default {
  data() {
    return {
      isLoading: true,
    }
  },
  computed: {},
  mounted() {
  },
  methods: {
    onLoaded() {
      console.log('loaded');
      this.isLoading = false;
    }
  }
}
</script>
