<template>
  <span class="Badge">
    <!-- <v-icon left small>{{ icon }}</v-icon> -->
    {{ text }}
  </span>
</template>

<script lang="ts">
import Vue from 'vue'

type Props = {
  // icon: string
  text: string
}

export default Vue.extend<unknown, unknown, unknown, Props>({
  props: {
    /* icon: {
      type: String,
      required: true,
    }, */
    text: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
$background: #ababfc;
$foreground: #272727;

.Badge {
  display: inline-block;
  position: relative;
  margin: 2px 10px 2px 0;

  padding: {
    top: 1px;
    bottom: 1px;
    left: 15px;
    right: 5px;
  }

  // height: 20px;
  line-height: 162%;

  background: $background;
  color: $foreground;

  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;

  font-size: 0.7rem;
  font-weight: 400;

  &::before {
    display: inline-block;
    position: absolute;
    top: calc(50% - 1px);
    left: 6px;

    height: 4px;
    width: 4px;

    border-radius: 10px;
    margin: 0 5px 0 0;

    background: #fff;
    content: '';
  }

  &::after {
    display: inline-block;
    position: absolute;
    top: 0;
    right: -20px;

    height: 0;
    width: 0;

    border: 10px solid;
    border-color: transparent transparent transparent $background;

    content: '';
  }
}
</style>
