<template lang="pug">
.inner
  .wrapper
    .items
      .items-box(ref='box1')
        div(v-observe-visibility="{callback: visibilityChanged1}" key="item-box-1")
          p test1
      .items-box(ref='box2')
        div(v-observe-visibility="{callback: visibilityChanged2}" key="item-box-2")
          p test2
      .items-box(ref='box3')
        div(v-observe-visibility="{callback: visibilityChanged3}" key="item-box-3")
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
          p test3
      .items-box(ref='box4')
        div(v-observe-visibility="{callback: visibilityChanged4}" key="item-box-4")
          p test4
      .items-box(ref='box5')
        div(v-observe-visibility="{callback: visibilityChanged5}" key="item-box-5")
          p test5
</template>

<style scoped>
.items {
  height: 100vh;
  height: 100svh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}

.items.active {
  overflow-y: hidden;
}

.items-box {
  min-height: 100vh;
  min-height: 100svh;
  scroll-snap-align: start;
}

.items .items-box:nth-of-type(1){

}

.items .items-box:nth-of-type(2){
  background-color: gray;
}

.items .items-box:nth-of-type(3){
  background-color: darkgreen;
}

.items .items-box:nth-of-type(4){
  background-color: darkblue;
}

.items .items-box:nth-of-type(5){
    background-color: darkslategray;
}
</style>

<script>
export default {
  data() {
    return {
      isScrollSnap: false,
      ScrollSnapTimer: null,
    }
  },
  computed: {
  },
  mounted() {
    const target = this.$refs.box4;
    target.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  },
  methods: {
    visibilityChanged1(isVisible, entry) {
      console.log("visibilityChanged1");
      console.log(isVisible, entry);
    },
    visibilityChanged2(isVisible, entry) {
      console.log("visibilityChanged2");
      console.log(isVisible, entry);
    },
    visibilityChanged3(isVisible, entry) {
      console.log("visibilityChanged3");
      console.log(isVisible, entry);
    },
    visibilityChanged4(isVisible, entry) {
      console.log("visibilityChanged4");
      console.log(isVisible, entry);
    },
    visibilityChanged5(isVisible, entry) {
      console.log("visibilityChanged5");
      console.log(isVisible, entry);
    },
    initIsScrollSnap() {
      if(this.ScrollSnapTimer) {
        clearTimeout(this.ScrollSnapTimer);
      }

      setTimeout(() => {
        this.isScrollSnap = false;
      }, 100);
    }
  },
}
</script>