<template>
  <v-chip
    v-bind="$attrs"
    class="Chip-NoActivable"
    :ripple="false"
    label
    outlined
    small
  >
    <v-icon left small>{{ icon }}</v-icon>
    {{ text }}
  </v-chip>
</template>

<script lang="ts">
import Vue from 'vue'

type Props = {
  icon: string
  text: string
}

export default Vue.extend<unknown, unknown, unknown, Props>({
  props: {
    icon: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.Chip-NoActivable.v-chip:active {
  box-shadow: unset;
}
</style>
