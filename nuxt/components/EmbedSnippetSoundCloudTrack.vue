<template>
  <div>
    <iframe
      v-lazy-load
      width="100%"
      :height="height"
      scrolling="no"
      frameborder="no"
      allow="autoplay"
      :src="playerUrl"
    >
    </iframe>
    <div
      :style="{
        fontSize: '10px',
        color: textColor,
        lineBreak: 'anywhere',
        wordBreak: 'normal',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontFamily:
          'Interstate, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Garuda, Verdana, Tahoma, sans-serif',
        fontWeight: 100,
      }"
    >
      <a
        :href="`https://soundcloud.com/${authorSlug}`"
        :title="authorName"
        target="_blank"
        :style="{ color: textColor, textDecoration: 'none' }"
        >{{ authorName }}</a
      >
      ·
      <a
        :href="`https://soundcloud.com/${authorSlug}/${trackSlug}`"
        :title="trackTitle"
        target="_blank"
        :style="{ color: textColor, textDecoration: 'none' }"
        >{{ trackTitle }}</a
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export type Props = {
  authorName: string
  authorSlug: string
  trackTitle: string
  trackSlug: string
  // SoundCloud widget
  trackId: string
  color: string
  autoPlay: boolean
  hideRelated: boolean
  showArtWork: boolean
  showComments: boolean
  showUser: boolean
  showReposts: boolean
  showTeaser: boolean
  //
  height: number
}

type Data = {
  textColor: string
}

type Computed = {
  playerUrl: string
}
export default Vue.extend<Data, unknown, Computed, Props>({
  props: {
    authorName: {
      type: String,
      required: true,
    },
    authorSlug: {
      type: String,
      required: true,
    },
    trackTitle: {
      type: String,
      required: true,
    },
    trackSlug: {
      type: String,
      required: true,
    },
    trackId: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    autoPlay: {
      type: Boolean,
      default: false,
    },
    hideRelated: {
      type: Boolean,
      default: false,
    },
    showArtWork: {
      type: Boolean,
      default: true,
    },
    showComments: {
      type: Boolean,
      default: true,
    },
    showUser: {
      type: Boolean,
      default: true,
    },
    showReposts: {
      type: Boolean,
      default: true,
    },
    showTeaser: {
      type: Boolean,
      default: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      textColor: '#767676',
    }
  },
  computed: {
    playerUrl() {
      return `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${this.trackId}&color=%23${this.color}&auto_play=${this.autoPlay}&hide_related=${this.hideRelated}&show_artwork=${this.showArtWork}&show_comments=${this.showComments}&show_user=${this.showUser}&show_reposts=${this.showReposts}&show_teaser=${this.showTeaser}`
    },
  },
})
</script>

<style></style>
