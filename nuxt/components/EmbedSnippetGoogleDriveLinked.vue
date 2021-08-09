<template>
  <div class="EmbedGoogleDrive">
    <v-hover #default="{ hover }">
      <div>
        <a
          class="EmbedGoogleDrive-Linkable"
          :href="linkUrl"
          rel="noopener"
          target="_blank"
        />
        <img
          v-lazy-load
          :class="{ 'EmbedGoogleDrive-Hovered': hover }"
          :alt="`${id}の Google ドライブファイル`"
          :src="thumbnailUrl"
        />
        <div
          class="EmbedGoogleDrive-OpenButton"
          :class="{ 'EmbedGoogleDrive-Hovered': hover }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            viewBox="0 0 24 24"
          >
            <path :d="mdiOpenInNew" fill="#ffffff" />
          </svg>
        </div>
      </div>
    </v-hover>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiOpenInNew } from '@mdi/js'

export type Props = {
  id: string
  thumbnailUrl: string
}

type Data = {
  mdiOpenInNew: string
}

type Computed = {
  linkUrl: string
}
export default Vue.extend<Data, unknown, Computed, Props>({
  props: {
    id: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      mdiOpenInNew,
    }
  },
  computed: {
    linkUrl() {
      return `https://drive.google.com/file/d/${this.id}/view?usp=sharing`
    },
  },
})
</script>

<style lang="scss" scoped>
.EmbedGoogleDrive {
  position: relative;
  height: 0;
  max-width: 100%;
  margin: 5px;
  padding-bottom: 54.6%; // 56.25%;
  overflow: hidden;
  background: #000;

  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.2),
    0px 0px 3px 0px rgba(0, 0, 0, 0.12);

  &-Linkable {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
  }

  &-Hovered {
    filter: brightness(120%);

    @at-root img#{&} {
      transform: scale(1.03);
    }
  }

  img,
  &-OpenButton {
    transition: 0.4s all;
  }

  img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    margin: auto;
    max-width: 100%;
    width: 100%;
    height: auto;

    border: none;
    object-fit: cover;
  }

  $openButtonHeight: 64px;
  $openButtonWidth: 72px;

  &-OpenButton {
    top: 50%;
    left: 50%;
    margin-top: -($openButtonHeight / 2);
    margin-left: -($openButtonWidth / 2);
    position: absolute;
    background: #212121cc;
    border-radius: 5px;

    &,
    & > svg {
      height: $openButtonHeight;
      width: $openButtonWidth;
    }
  }
}
</style>
