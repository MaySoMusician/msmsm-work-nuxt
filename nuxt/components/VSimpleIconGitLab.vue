<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    :style="{ height: size, width: size, fill: `#${iconColor}` }"
    v-html="iconSvg"
  />
  <!-- eslint-enable vue/no-v-html -->
</template>

<script lang="ts">
import Vue from 'vue'
// import simpleIcons from 'simple-icons'

type Props = {
  color: string
  size: string
}

type Data = {
  iconSvg: any
  iconColor: string
}

export default Vue.extend<Data, unknown, unknown, Props>({
  props: {
    color: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      required: true,
    },
  },
  data() {
    /* const icon = simpleIcons.get('gitlab')

    const iconSvg = icon.svg
    const iconColor = this.color || icon.hex */

    return {
      iconSvg: undefined,
      iconColor: this.color,
    }
  },
  async mounted() {
    const simpleIcons = (
      await import(
        /* webpackChunkName: "simpleicons", webpackPreload: true */ 'simple-icons'
      )
    ).default
    const icon = simpleIcons.get('gitlab')
    this.iconSvg = icon ? icon.svg : undefined
  },
})
</script>
