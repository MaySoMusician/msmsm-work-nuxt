<template>
  <iframe
    v-lazy-load
    :src="playerUrl"
    width="100%"
    height="auto"
    frameborder="0"
    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
  ></iframe>
</template>

<script lang="ts">
import Vue from 'vue'

export type Props = {
  id: string
}

type Data = {
  // textColor: string
}

type Computed = {
  playerUrl: string
}
export default Vue.extend<Data, unknown, Computed, Props>({
  props: {
    id: {
      type: String,
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
      return `https://drive.google.com/file/d/${this.id}/preview`
    },
  },
})
</script>

<style></style>
