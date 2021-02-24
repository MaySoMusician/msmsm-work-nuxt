<template>
  <v-tooltip color="grey darken-4" top>
    <template #activator="{ on, attrs }">
      <!-- eslint-disable vue/no-v-html -->
      <div
        v-bind="attrs"
        :style="{ height: size, width: size, fill: `#${iconColor}` }"
        v-on="on"
        v-html="iconSvg"
      />
      <!-- eslint-enable vue/no-v-html -->
    </template>
    <span>{{ iconTitle }}</span>
  </v-tooltip>
</template>

<script lang="ts">
import Vue from 'vue'
// import simpleIcons from 'simple-icons'

type Props = {
  value: string
  size: string
}

type Data = {
  iconSvg: any
  iconColor: string
  iconTitle: string
}

export default Vue.extend<Data, unknown, unknown, Props>({
  props: {
    value: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  },
  data() {
    /* const icon = simpleIcons.get(this.value)

    const iconSvg = icon ? icon.svg : undefined
    const iconColor = icon ? icon.hex : '000000'
    const iconTitle = icon ? icon.title : '' */

    return {
      iconSvg: undefined,
      iconColor: '000000',
      iconTitle: '',
    }
  },
  async mounted() {
    const simpleIcons = (
      await import(
        /* webpackChunkName: "simpleicons", webpackPrefetch: true */ 'simple-icons'
      )
    ).default
    const icon = simpleIcons.get(this.value)
    this.iconSvg = icon ? icon.svg : undefined
    this.iconColor = icon ? icon.hex : '000000'
    this.iconTitle = icon ? icon.title : ''
  },
})
</script>
