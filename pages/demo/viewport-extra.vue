<template lang="pug">
.container
  p 幅最小375pxエリア
  .inner
    p
      nuxt-link(to='/') INDEX
    p
      nuxt-link(to='/demo/') INDEX
    p
      nuxt-link(to='/demo/liquid') INDEX

</template>

<style scoped>
body {
  margin: 0;
}

.container {
  min-width: 375px;
  max-width: 800px;
  margin: 0 auto;
  padding: 100px 0;
  background-color: #000;
}

.container p {
  color: #fff;
}

.inner {
  margin: 30px auto;
  background-color: gray;
}

.inner p {
  color: #fff;
}
</style>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {},
  mounted() {
  },
  methods: {
  }
}
</script>