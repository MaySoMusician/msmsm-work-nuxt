<template>
  <!-- <iframe
    v-lazy-load
    width="100%"
    :height="height"
    :src="playerUrl"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe> -->
  <div ref="Player" class="EmbedYouTubeVideo"></div>
</template>

<script lang="ts">
import Vue from 'vue'

export type Props = {
  id: string
  start?: number
  height: number
}

type Computed = {
  playerUrl: string
}
export default Vue.extend<unknown, unknown, Computed, Props>({
  props: {
    id: {
      type: String,
      required: true,
    },
    start: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    playerUrl() {
      return `https://www.youtube-nocookie.com/embed/${this.id}?start=${this.start}`
    },
  },
  mounted() {
    // Based on https://www.labnol.org/internet/light-youtube-embeds/27941/
    const playerElement = this.$refs.Player as HTMLDivElement
    console.log(playerElement.dataset)

    const videoId = this.id
    const div = document.createElement('div')

    const thumbnailNode = document.createElement('img')
    thumbnailNode.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    thumbnailNode.setAttribute('loading', 'lazy')
    thumbnailNode.setAttribute('alt', `${videoId}の YouTube 動画`)
    div.appendChild(thumbnailNode)

    const playButton = document.createElement('div')
    playButton.classList.add('play')
    div.appendChild(playButton)

    const src = this.playerUrl
    div.addEventListener('click', function () {
      const iframe = document.createElement('iframe')
      iframe.setAttribute('src', src)
      iframe.setAttribute('frameborder', '0')
      iframe.setAttribute('allowfullscreen', '1')
      iframe.setAttribute(
        'allow',
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      )
      iframe.setAttribute('loading', 'lazy')
      this.parentNode?.replaceChild(iframe, this)
    })
    playerElement.appendChild(div)
  },
})
</script>

<style lang="scss" scoped>
.EmbedYouTubeVideo {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
  background: #000;
  margin: 5px;

  ::v-deep iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: auto;
    background: transparent;
  }

  ::v-deep img {
    object-fit: cover;
    display: block;
    left: 0;
    bottom: 0;
    margin: auto;
    max-width: 100%;
    width: 100%;
    position: absolute;
    right: 0;
    top: 0;
    border: none;
    height: auto;
    cursor: pointer;
    transition: 0.4s all;

    &:hover {
      filter: brightness(75%);
    }
  }

  ::v-deep .play {
    height: 72px;
    width: 72px;
    left: 50%;
    top: 50%;
    margin-left: -36px;
    margin-top: -36px;
    position: absolute;
    background: url('https://i.imgur.com/TxzC70f.png') no-repeat;
    cursor: pointer;
  }
}
</style>
