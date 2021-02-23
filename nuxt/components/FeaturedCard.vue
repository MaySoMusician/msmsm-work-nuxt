<template>
  <v-card tag="article">
    <VThumbnail height="200" :src="thumbnailUrl" />

    <v-card-title class="mt-3 py-1 Card-Title">
      <h3>
        {{ title }}
      </h3>
    </v-card-title>

    <v-divider class="mx-2" />

    <v-card-text class="py-2">
      <slot></slot>
    </v-card-text>

    <v-divider class="mx-2" />

    <v-card-text class="py-2">{{ description }}</v-card-text>

    <template v-if="detailsUrl !== false">
      <v-divider class="mx-2" />
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary darken-1" text :to="detailsUrl">詳細</v-btn>
      </v-card-actions>
    </template>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import VThumbnail from '@/components/VThumbnail.vue'

type Props = {
  title: string
  thumbnailUrl: string
  description: string
  detailsUrl: string | false
}

export default Vue.extend<unknown, unknown, unknown, Props>({
  components: { VThumbnail },
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
.Card {
  &-Title > h3 {
    font-size: 1.25rem;
    line-height: 120%;
  }
}
</style>
