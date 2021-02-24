<template>
  <v-list-item
    class="pr-0"
    :to="detailsUrl ? detailsUrl : null"
    :ripple="false"
    nuxt
  >
    <v-list-item-avatar class="my-0" height="80" width="110" tile>
      <VThumbnail :src="thumbnailUrl" />
    </v-list-item-avatar>
    <v-list-item-content class="pt-2">
      <v-list-item-title>
        <h3 class="Item-Title">
          {{ title }}
        </h3>
      </v-list-item-title>
      <v-divider class="" />
      <div class="pt-1">
        <slot></slot>
      </div>
      <!-- <v-divider class="" /> -->
      <v-list-item-subtitle>{{ description }}</v-list-item-subtitle>
    </v-list-item-content>
    <!-- <v-list-item-action></v-list-item-action> -->
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'

type Props = {
  title: string
  thumbnailUrl: string
  description: string
  detailsUrl: string | false
}

export default Vue.extend<unknown, unknown, unknown, Props>({
  props: {
    title: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    detailsUrl: {
      type: [String, Boolean as () => false],
      default() {
        return false
      },
    },
  },
})
</script>

<style lang="scss" scoped>
.Item {
  &-Title {
    font-size: 1rem;
    line-height: 133%;
  }
}
</style>
