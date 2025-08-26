<template lang="pug">
#container(v-if='isPlaying')
  #wrapper
    video#movie(muted playsinline autoplay)
      source(src='movie/movie.mp4' type='video/mp4')
  #loading
    p LOADING...
  button#skip SKIP
</template>

<script>
export default {
  data() {
    return {
      isPlaying: true,
      movieEl: null,
      loadingEl: null,
      skipEl: null,
    };
  },
  mounted() {
    this.initSplashScreen();
  },
  beforeDestroy() {
    document.body.classList.remove('active');

    if (this.videoHandlerPlay && this.movieEl) {
      this.movieEl.removeEventListener('play', this.videoHandlerPlay);
    }
    if (this.videoHandlerCanplaythrough && this.movieEl) {
      this.movieEl.removeEventListener('canplaythrough', this.videoHandlerCanplaythrough);
    }
    if (this.skipButtonHandler && this.skipEl) {
      this.skipEl.removeEventListener('click', this.skipButtonHandler);
    }
    if (this.videoHandlerEnded && this.movieEl) {
      this.movieEl.removeEventListener('ended', this.videoHandlerEnded);
    }
    if (this.videoHandlerError && this.movieEl) {
      this.movieEl.removeEventListener('error', this.videoHandlerError);
    }
  },
  methods: {
    initSplashScreen() {
      this.movieEl = this.$el.querySelector('#movie');
      this.loadingEl = this.$el.querySelector('#loading');
      this.skipEl = this.$el.querySelector('#skip');
      const body = document.body;

      console.log('movieEl', this.movieEl);
      console.log('loadingEl', this.loadingEl);
      console.log('skipEl', this.skipEl);

      // alert(`movieEl: ${this.movieEl}, loadingEl: ${this.loadingEl}, skipEl: ${this.skipEl}`);

      if (!this.movieEl || !this.loadingEl || !this.skipEl) {
        console.error('movieEl, loadingEl, skipEl is not found');
        alert('movieEl, loadingEl, skipEl is not found');
        return;
      }

      // コンテンツ表示
      const showContent = () => {
        // スクロールを許可する
        body.classList.remove('active');
        this.isPlaying = false;

        this.$emit('loaded');
      };

      // bodyにactiveクラスを追加してスクロール不可にする
      body.classList.add('active');

      // ローディングを表示
      this.loadingEl.style.display = 'block';

      // 動画が再生された時にローディングを非表示にする
      this.videoHandlerPlay = () => {
        // alert('動画を再生します');
        this.loadingEl.style.display = 'none';
        this.skipEl.style.display = 'block';
      };

      // 動画が再生できる状態になったらローディングを非表示にする
      this.videoHandlerCanplaythrough = (event) => {
        // alert('動画を再生できる状態になりました');

        this.loadingEl.style.display = 'none';
        this.skipEl.style.display = 'block';

        // エラーの詳細を確認
        const video = event.target;
        if (video.error) {
          const errorCode = video.error.code;
          const errorMessage = video.error.message;

          console.error(`エラーコード: ${errorCode}, メッセージ: ${errorMessage}`);
          alert(`エラーコード: ${errorCode}, メッセージ: ${errorMessage}`);
        }

        // 動画を再生（Promiseのエラーハンドリング付き）
        this.movieEl.play().catch((error) => {
          console.error('動画再生エラー:', error);

          let errorMessage = '動画の再生に失敗しました';

          if (error.name) {
            errorMessage += `\nエラー名: ${error.name}`;
          }
          if (error.message) {
            errorMessage += `\nエラーメッセージ: ${error.message}`;
          }
          if (error.code) {
            errorMessage += `\nエラーコード: ${error.code}`;
          }

          alert(errorMessage);
          showContent();
        });
      };

      // 動画が再生終了したらコンテンツを表示する
      this.videoHandlerEnded = () => {
        // alert('動画が再生終了しました');
        console.log('動画が再生終了しました');
        showContent();
      };

      // 動画が再生できなかったらコンテンツを表示する
      this.videoHandlerError = () => {
        alert('動画を再生できませんでした');
        showContent();
      };

      // スキップボタンをクリックしたらコンテンツを表示する
      this.skipButtonHandler = () => {
        this.movieEl.pause();
        showContent();
      };

      // イベント登録
      this.movieEl.addEventListener('play', this.videoHandlerPlay);
      this.movieEl.addEventListener('canplaythrough', this.videoHandlerCanplaythrough);
      this.skipEl.addEventListener('click', this.skipButtonHandler);
      this.movieEl.addEventListener('ended', this.videoHandlerEnded);
      this.movieEl.addEventListener('error', this.videoHandlerError);

    },
  },
};
</script>

<style lang="scss" scoped>
#container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: white;

  #wrapper {
    width: 100%;
    position: relative;
    overflow: hidden;
    background: white;
    aspect-ratio: 16 / 9;

    $clipPathWidth: 4px;
    clip-path: polygon(
      $clipPathWidth $clipPathWidth,
      calc(100% - #{$clipPathWidth}) 0,
      calc(100% - #{$clipPathWidth}) calc(100% - #{$clipPathWidth}),
      $clipPathWidth calc(100% - #{$clipPathWidth})
    );
  }

  #movie {
    width: 100%;
    height: 100%;
    background: white;
    border: none;
    pointer-events: none;

    &:focus {
      outline: none;
    }
  }

  #loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    p {
      text-align: center;
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
      color: black;
    }
  }

  #skip {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    padding: 10px 20px;
    background: black;
    color: white;
    border: none;
    cursor: pointer;
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 102;
    transition: background-color 0.3s ease;

    display: block;
  }
}
</style>
