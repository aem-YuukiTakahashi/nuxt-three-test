export class ImageMapResizer {
  constructor() {
    this.maps = []
    this.eventListeners = new Map() // イベントリスナーの参照を保持
  }

  scaleImageMap(mapElement) {
    // thisの参照を保持
    const self = this;

    console.log('scaleImageMap called, self:', self);
    console.log('self.eventListeners:', self.eventListeners);
    console.log('mapElement:', mapElement);

    const resizeMap = () => {
      const resizeAreaTag = (cachedAreaCoords, idx) => {
        const scale = (coord) => {
          const dimension = 1 === (isWidth = 1 - isWidth) ? 'width' : 'height'
          return (
            padding[dimension] +
            Math.floor(Number(coord) * scalingFactor[dimension])
          )
        }

        let isWidth = 0
        areas[idx].coords = cachedAreaCoords
          .split(',')
          .map(scale)
          .join(',')
      }

      const scalingFactor = {
        width: image.width / image.naturalWidth,
        height: image.height / image.naturalHeight,
      }

      const padding = {
        width: parseInt(
          window.getComputedStyle(image, null).getPropertyValue('padding-left'),
          10
        ),
        height: parseInt(
          window.getComputedStyle(image, null).getPropertyValue('padding-top'),
          10
        ),
      }

      cachedAreaCoordsArray.forEach(resizeAreaTag)
    }

    const getCoords = (e) => {
      //Normalize coord-string to csv format without any space chars
      return e.coords.replace(/ *, */g, ',').replace(/ +/g, ',')
    }

    const debounce = () => {
      clearTimeout(timer)
      timer = setTimeout(resizeMap, 250)
    }

    const start = () => {
      if (
        image.width !== image.naturalWidth ||
        image.height !== image.naturalHeight
      ) {
        resizeMap()
      }
    }

    const addEventListeners = () => {
      // イベントリスナーの参照を保存
      const listeners = {
        imageLoad: resizeMap,
        windowFocus: resizeMap,
        windowResize: debounce,
        windowReadyStateChange: resizeMap,
        documentFullscreenChange: resizeMap
      }

      image.addEventListener('load', listeners.imageLoad, false)
      window.addEventListener('focus', listeners.windowFocus, false)
      window.addEventListener('resize', listeners.windowResize, false)
      window.addEventListener('readystatechange', listeners.windowReadyStateChange, false)
      document.addEventListener('fullscreenchange', listeners.documentFullscreenChange, false)

      // イベントリスナーの参照を保存（selfを使用）
      self.eventListeners.set(mapElement, listeners)
    }

    const beenHere = () => {
      return 'function' === typeof mapElement._resize
    }

    const getImg = (name) => {
      return document.querySelector('img[usemap="' + name + '"]')
    }

    const setup = () => {
      areas = mapElement.getElementsByTagName('area')
      cachedAreaCoordsArray = Array.prototype.map.call(areas, getCoords)
      image = getImg('#' + mapElement.name) || getImg(mapElement.name)
      mapElement._resize = resizeMap //Bind resize method to HTML map element
    }

    let /*jshint validthis:true */
      areas = null,
      cachedAreaCoordsArray = null,
      image = null,
      timer = null

    if (!beenHere()) {
      setup()
      addEventListeners()
      start()
    } else {
      mapElement._resize() //Already setup, so just resize map
    }
  }

  chkMap(element) {
    if (!element.tagName) {
      throw new TypeError('Object is not a valid DOM element')
    } else if ('MAP' !== element.tagName.toUpperCase()) {
      throw new TypeError(
        'Expected <MAP> tag, found <' + element.tagName + '>.'
      )
    }
  }

  init(element) {
    if (element) {
      this.chkMap(element)
      this.scaleImageMap(element)
      this.maps.push(element)
    }
  }

  resize(target) {
    this.maps = [] // Only return maps from this call

    switch (typeof target) {
      case 'undefined':
      case 'string':
        Array.prototype.forEach.call(
          document.querySelectorAll(target || 'map'),
          (element) => this.init(element)
        )
        break
      case 'object':
        this.init(target)
        break
      default:
        throw new TypeError('Unexpected data type (' + typeof target + ').')
    }

    return this.maps
  }

  // Nuxt用のイベントリスナー削除関数
  destroy() {
    // 各map要素のイベントリスナーを削除
    this.eventListeners.forEach((listeners, mapElement) => {
      if (mapElement && mapElement._resize) {
        // 画像要素を取得
        const image = this.getImageForMap(mapElement)

        if (image) {
          image.removeEventListener('load', listeners.imageLoad, false)
        }

        window.removeEventListener('focus', listeners.windowFocus, false)
        window.removeEventListener('resize', listeners.windowResize, false)
        window.removeEventListener('readystatechange', listeners.windowReadyStateChange, false)
        document.removeEventListener('fullscreenchange', listeners.documentFullscreenChange, false)

        // map要素の参照をクリア
        delete mapElement._resize
      }
    })

    // タイマーをクリア
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }

    // イベントリスナーの参照をクリア
    this.eventListeners.clear()

    // maps配列をクリア
    this.maps = []
  }

  // 特定のmap要素のイベントリスナーを削除
  destroyMap(mapElement) {
    if (!mapElement) return

    const listeners = this.eventListeners.get(mapElement)
    if (listeners) {
      const image = this.getImageForMap(mapElement)

      if (image) {
        image.removeEventListener('load', listeners.imageLoad, false)
      }

      window.removeEventListener('focus', listeners.windowFocus, false)
      window.removeEventListener('resize', listeners.windowResize, false)
      window.removeEventListener('readystatechange', listeners.windowReadyStateChange, false)
      document.removeEventListener('fullscreenchange', listeners.documentFullscreenChange, false)

      delete mapElement._resize
      this.eventListeners.delete(mapElement)

      // maps配列からも削除
      const index = this.maps.indexOf(mapElement)
      if (index > -1) {
        this.maps.splice(index, 1)
      }
    }
  }

  // map要素に対応する画像要素を取得するヘルパー関数
  getImageForMap(mapElement) {
    if (!mapElement || !mapElement.name) return null

    return document.querySelector('img[usemap="' + mapElement.name + '"]') ||
           document.querySelector('img[usemap="#' + mapElement.name + '"]')
  }
}

// 互換性のためのファクトリー関数も提供
export function createImageMapResizer() {
  return new ImageMapResizer()
}

// デフォルトエクスポート
export default ImageMapResizer
