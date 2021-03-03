<template>
  <v-hover #default="{ hover }">
    <div
      ref="Player"
      class="EmbedYouTubeVideo"
      :class="{ 'EmbedYouTubeVideo-Hovered': hover }"
    ></div>
  </v-hover>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiPlay } from '@mdi/js'

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

    const videoId = this.id

    const setAttributes = (
      element: HTMLElement | SVGElement,
      attributes: Record<string, string>
    ) => {
      for (const [name, value] of Object.entries(attributes)) {
        element.setAttribute(name, value)
      }
    }

    playerElement.appendChild(
      (() => {
        const div = document.createElement('div')

        const src = this.playerUrl
        div.addEventListener('click', function () {
          const iframe = document.createElement('iframe')
          setAttributes(iframe, {
            src,
            frameborder: '0',
            allowfullscreen: '1',
            allow:
              'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
            loading: 'lazy',
          })
          this.parentNode?.replaceChild(iframe, this)
        })

        div.appendChild(
          (() => {
            const thumbnail = document.createElement('img')
            thumbnail.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
            setAttributes(thumbnail, {
              loading: 'lazy',
              alt: `${videoId}の YouTube 動画`,
            })
            return thumbnail
          })()
        )

        div.appendChild(
          (() => {
            const playButton = document.createElement('div')
            playButton.classList.add('EmbedYouTubeVideo-PlayButton')

            playButton.appendChild(
              (() => {
                const svg = document.createElementNS(
                  'http://www.w3.org/2000/svg',
                  'svg'
                )
                setAttributes(svg, {
                  viewBox: '0 0 24 24',
                  role: 'img',
                  'aria-hidden': 'true',
                  xmlns: 'http://www.w3.org/2000/svg',
                })

                svg.appendChild(
                  (() => {
                    const path = document.createElementNS(
                      'http://www.w3.org/2000/svg',
                      'path'
                    )
                    setAttributes(path, {
                      d: mdiPlay,
                      fill: '#ffffff',
                    })
                    return path
                  })()
                )
                return svg
              })()
            )
            return playButton
          })()
        )
        return div
      })()
    )
  },
})
</script>

<style lang="scss" scoped>
.EmbedYouTubeVideo {
  position: relative;
  height: 0;
  max-width: 100%;
  margin: 5px;
  padding-bottom: 54.6%;
  overflow: hidden;
  background: #000;

  ::v-deep {
    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: auto;
      background: transparent;
    }

    img,
    .EmbedYouTubeVideo-PlayButton {
      cursor: pointer;
      transition: 0.4s all;
    }

    img {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;

      margin: auto;
      max-width: 100%;
      width: 100%;
      height: auto;

      border: none;
      object-fit: cover;
    }

    $playButtonHeight: 64px;
    $playButtonWidth: 72px;

    .EmbedYouTubeVideo-PlayButton {
      top: 50%;
      left: 50%;
      margin-top: -($playButtonHeight / 2);
      margin-left: -($playButtonWidth / 2);
      position: absolute;
      background: #212121cc;
      border-radius: 5px;

      &,
      & > svg {
        height: $playButtonHeight;
        width: $playButtonWidth;
      }
    }
  }
}

.EmbedYouTubeVideo-Hovered ::v-deep {
  img,
  .EmbedYouTubeVideo-PlayButton {
    filter: brightness(120%);
  }

  img {
    transform: scale(1.03);
  }
}
</style>
