<template>
  <EmbedSnippetSoundCloudTrack
    v-if="value.embedType === 'SoundCloudTrack'"
    v-bind="embedData"
  />
  <EmbedSnippetSoundCloudPlaylist
    v-else-if="value.embedType === 'SoundCloudPlaylist'"
    v-bind="embedData"
  />
  <EmbedSnippetYouTubeVideo
    v-else-if="value.embedType === 'YouTubeVideo'"
    v-bind="embedData"
  />
  <!-- <EmbedSnippetTwitterTweet
    v-else-if="value.embedType === 'TwitterTweet'"
    v-bind="embedData"
  /> -->
  <Tweet v-else-if="value.embedType === 'TwitterTweet'" v-bind="embedData" />
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Tweet } from 'vue-tweet-embed'

import EmbedSnippetSoundCloudTrack, {
  Props as SoundCloudTrackPlayerProps,
} from '@/components/EmbedSnippetSoundCloudTrack.vue'
import EmbedSnippetSoundCloudPlaylist, {
  Props as SoundCloudPlaylistPlayerProps,
} from '@/components/EmbedSnippetSoundCloudPlaylist.vue'
import EmbedSnippetYouTubeVideo from '@/components/EmbedSnippetYouTubeVideo.vue'
// import EmbedSnippetTwitterTweet from '@/components/EmbedSnippetTwitterTweet.vue'

type SoundCloudCommonProps = 'authorName' | 'authorSlug' | 'color' | 'height'

type SoundCloudTrackDataRequired = Pick<
  SoundCloudTrackPlayerProps,
  SoundCloudCommonProps | 'trackId' | 'trackTitle' | 'trackSlug'
>
type SoundCloudTrackData = SoundCloudTrackDataRequired &
  Partial<Omit<SoundCloudTrackPlayerProps, keyof SoundCloudTrackDataRequired>>

type SoundCloudPlaylistDataRequired = Pick<
  SoundCloudPlaylistPlayerProps,
  SoundCloudCommonProps | 'playlistId' | 'playlistTitle' | 'playlistSlug'
>

type SoundCloudPlaylistData = SoundCloudPlaylistDataRequired &
  Partial<
    Omit<SoundCloudTrackPlayerProps, keyof SoundCloudPlaylistDataRequired>
  >

// ******************************************************** //

type Data = {}

type Computed = {
  embedData: object
}

type Props = {
  value: AnyValue
}

// ******************************************************** //

export type AnyValue = SoundCloudValue | YouTubeVideoValue | TwitterTweetValue

export type SoundCloudValue = {
  embedType: 'SoundCloudTrack' | 'SoundCloudPlaylist'
  id: string
  title: string
  slug: string
}

export type YouTubeVideoValue = {
  embedType: 'YouTubeVideo'
  id: string
  start?: number
}

export type TwitterTweetValue = {
  embedType: 'TwitterTweet'
  // code: string
  id: string
}

// ******************************************************** //

const soundcloudCommon = {
  authorName: 'MaySoMusician',
  authorSlug: 'maysomusician',
  color: 'ff5500',
}
const soundcloudTrackCommon = {
  height: 166,
  hideRelated: true,
  showArtWork: false,
  showTeaser: false,
  showComments: false,
}
const soundcloudPlaylistCommon = {
  height: 320,
  hideRelated: true,
  showArtWork: true,
  showTeaser: false,
}

export default Vue.extend<Data, unknown, Computed, Props>({
  name: 'AttachmentEmbedHandler',
  components: {
    EmbedSnippetSoundCloudTrack,
    EmbedSnippetSoundCloudPlaylist,
    EmbedSnippetYouTubeVideo,
    // EmbedSnippetTwitterTweet,
    Tweet,
  },
  props: {
    value: {
      type: Object as PropType<AnyValue>,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    embedData() {
      if (this.value.embedType === 'SoundCloudTrack') {
        const { id, title, slug } = this.value
        const config: Partial<SoundCloudValue> = Object.assign({}, this.value)
        delete config.id
        delete config.title
        delete config.slug

        const data: SoundCloudTrackData = {
          ...soundcloudCommon,
          ...soundcloudTrackCommon,
          trackId: id,
          trackTitle: title,
          trackSlug: slug,
          ...config,
        }

        return data
      }

      if (this.value.embedType === 'SoundCloudPlaylist') {
        const { id, title, slug } = this.value
        const config: Partial<SoundCloudValue> = Object.assign({}, this.value)
        delete config.id
        delete config.title
        delete config.slug

        const data: SoundCloudPlaylistData = {
          ...soundcloudCommon,
          ...soundcloudPlaylistCommon,
          playlistId: id,
          playlistTitle: title,
          playlistSlug: slug,
          ...config,
        }

        return data
      }

      if (this.value.embedType === 'YouTubeVideo') {
        return {
          id: this.value.id,
          start: this.value.start,
          height: 220,
        }
      }

      if (this.value.embedType === 'TwitterTweet') {
        return {
          // code: this.value.code,
          id: this.value.id,
          options: {
            conversation: 'none',
            lang: 'ja',
            dnt: true,
          },
        }
      }

      return {}
    },
  },
})
</script>

<style lang="scss" scoped>
.JsonElement {
  &-Attachment {
    &-Title {
      font-size: 0.94rem;
      line-height: 120%;
      padding: {
        top: 1em;
        bottom: 0.8em;
      }
    }
  }
}
</style>