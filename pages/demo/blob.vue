<template lang="pug">
div
  .blob
    img(src='blob.svg')
</template>

<style scoped>
.blob {
  width: calc(100% - 20px);
  max-width: 500px;
  margin: 0 auto;
  animation:30s linear infinite rotation1;
}

@keyframes rotation1{
  0%{ transform:rotate(0);}
  100%{ transform:rotate(360deg); }
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