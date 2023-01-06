<template lang="pug">
div
  canvas#bubbly-bg
  .bubbly
    div TEST
      br
      nuxt-link(to='/demo/blob') blob
</template>

<style scoped>
.bubbly {
  width: 100%;
  height: 100vh;
  height: 100svh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
}

#bubbly-bg {
  position: fixed;
  min-width: 100%;
  min-height: 100vh;
  min-height: 100svh;
  top: 0;
  left: 0;
}
</style>

<script>
import "/plugins/bubbly-bg.js";
export default {
  data() {
    return {
    }
  },
  computed: {},
  mounted() {
    setTimeout(() => {
      const canvas = document.querySelector("#bubbly-bg");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.log(canvas);
      bubbly(
        {
          canvas: canvas
        }
      );
    }, 1000);
  },
  methods: {
  },
  beforeDestroy: function() {
    bubblyReset();
  },
}
</script>