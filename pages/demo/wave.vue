<template lang="pug">
.wave
  canvas#myCanvas(ref="canvas")
</template>

<script>
export default {
  data() {
    return {
      canvas: null,
      ctx: null,
      animationId: null,
      time: 0,
    }
  },
  computed: {},
  mounted() {
    this.init();
    this.initCanvas();
  },
  methods: {
    init() {

    },

    initCanvas() {
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext('2d');
      this.resizeCanvas();
      window.addEventListener('resize', this.resizeCanvas);
      this.drawAnimatedWave();
    },

    drawAnimatedWave() {
      // 画面の初期化はここで行う
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawWave(this.time, 1.25, '#10c2cd', 1, 100, 300);
      this.drawWave(this.time, 1.75, '#ffc2cd', 0.5, 100, 350);
      this.drawWave(this.time, 1.5, '#ffc2ff', 0.25, 100, 250);
      this.time++;
      this.animationId = requestAnimationFrame(this.drawAnimatedWave);
    },

    drawWave(time, timeDelay, color, alpha, amplitude, waveLength) {

      const _time = time * timeDelay;

      this.ctx.fillStyle = color;
      this.ctx.globalAlpha = alpha;

      this.ctx.beginPath(); //パスの開始

      // 左上が基準点（0 ,0）のため、y軸の開始位置をcanvasの中央にする
      const yAxis = Math.floor(this.canvas.height/2);

      let _x = _time / waveLength; //時間を横の位置にし、移動幅を小さくすることでなめらかな曲線にする
      let _y = Math.sin(_x); //sin関数で波を作成

      const _mAmplitude = (amplitude) - amplitude * Math.sin(_x) * 0.9;

      this.ctx.moveTo(0, _y * _mAmplitude + yAxis); //スタート位置にパスを置く

      // Loop to draw segments (横幅の分、波を描画)
      for (let i = 0; i <= this.canvas.width; i++) {
          _x = (_time + i) / waveLength;
          _y = Math.sin(_x);
          this.ctx.lineTo(i, _y * _mAmplitude+yAxis);
      }

      this.ctx.lineTo(this.canvas.width, this.canvas.height); //パスをCanvasの右下へ
      this.ctx.lineTo(0, this.canvas.height); //パスをCanvasの左下へ
      this.ctx.fill();
      this.ctx.closePath() //パスを閉じる
    },

    resizeCanvas() {
      const devicePixelRatio = window.devicePixelRatio == 1 ? 2 : window.devicePixelRatio;
      this.canvas.width = window.innerWidth * devicePixelRatio;
      this.canvas.height = window.innerHeight * devicePixelRatio;
      this.canvas.style.width = `${window.innerWidth}px`;
      this.canvas.style.height = `${window.innerHeight}px`;
    },
  }
}
</script>

<style lang="scss" scoped>
.wave {
  position: relative;
}

canvas {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
