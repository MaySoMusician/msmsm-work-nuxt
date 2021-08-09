<template>
  <v-row>
    <v-col
      v-for="(item, index) in icons"
      :key="index"
      :class="{ 'pa-2': $vuetify.breakpoint.xsOnly }"
    >
      <v-btn
        class="TopIcon"
        color="white"
        fab
        :href="item.to"
        :height="size"
        target="_blank"
        rel="noopener"
        outlined
        :width="size"
      >
        <v-icon
          :size="$vuetify.breakpoint.smAndUp ? '36px' : '28px'"
          aria-hidden="false"
          :aria-label="item.label"
          >{{ item.icon }}</v-icon
        >
        <span v-if="item.miniLabel" class="TopIcon-MiniLabel">{{
          item.miniLabel
        }}</span>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'

export type IconData = {
  icon: string
  label: string
  to: string
  miniLabel?: string
}
type Props = {
  icons: IconData[]
  size: string
}

export default Vue.extend<unknown, unknown, unknown, Props>({
  props: {
    icons: {
      type: Array as PropType<IconData[]>,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.TopIcon {
  display: flex;
  border: 2px solid white;

  margin: {
    left: auto;
    right: auto;
  }

  &-MiniLabel {
    position: absolute;
    bottom: -1.2rem;
    background: rgba(255, 255, 255, 0.7);
    color: rgba(0, 0, 0, 0.87);
    font-size: 0.7rem;
    letter-spacing: 0.3px;
    font-weight: 700;
    text-transform: none;
  }
}
</style>
