<template>
  <v-chip
    :href="url"
    :ripple="false"
    label
    :link="!!url"
    :referrer="url ? 'noopener' : null"
    small
    :target="url ? '_blank' : null"
  >
    <slot name="icon">
      <v-icon left small :color="iconColor">{{ icon }}</v-icon>
    </slot>
    {{ label }}
  </v-chip>
</template>

<script lang="ts">
import Vue from 'vue'

type Props = {
  icon: string
  iconColor: string
  label: string
  url: string
}

export default Vue.extend<unknown, unknown, unknown, Props>({
  props: {
    icon: {
      type: String,
      default: '',
    },
    iconColor: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss" scoped></style>
