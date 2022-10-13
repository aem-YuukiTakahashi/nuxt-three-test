<template lang="pug">
div
  tutorial
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {},
  mounted() {
    console.log('test');
    this.test();
  },
  methods: {
    test() {
      console.log('methods test');
    }
  }
}
</script>