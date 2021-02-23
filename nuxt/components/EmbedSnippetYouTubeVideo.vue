<template>
  <iframe
    width="100%"
    :height="height"
    :src="playerUrl"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
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
})
</script>

<style></style>
