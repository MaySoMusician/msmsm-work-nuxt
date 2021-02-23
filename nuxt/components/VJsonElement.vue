<template>
  <div v-if="value.type === 'table'">
    <v-row
      v-for="(row, index) in value.rows"
      :key="index"
      v-bind="simpleRowProps"
    >
      <v-col cols="1" :style="tableCeadingColStyle">
        <span>{{ row.header }}</span>
      </v-col>
      <v-col>
        <template v-if="!(typeof row.content === 'string')">
          <VJsonElement :value="row.content" />
        </template>
        <span v-else>{{ row.content }}</span>
      </v-col>
    </v-row>
  </div>
  <ul v-else-if="value.type === 'list'" :style="listStyle">
    <li v-for="(item, index) in value.items" :key="index" class="mb-1">
      <template v-if="!(typeof item === 'string')">
        <span v-if="'pretext' in item">{{ item.pretext }}</span>
        <span v-if="'precontent' in item"
          ><VJsonElement :value="item.precontent"
        /></span>
        <VJsonElement :value="item" />
      </template>
      <span v-else>{{ item }}</span>
    </li>
  </ul>

  <v-row v-else-if="value.type === 'attachments'" class="mb-3" dense>
    <v-col
      v-for="(item, index) in value.items"
      :key="index"
      v-bind="getAttachmentItemColProps(index)"
    >
      <v-card v-bind="attachmentItemCardProps">
        <v-card-title class="JsonElement-Attachment-Title">
          <span>{{ item.description }}</span>
          <VYearBadge
            v-if="item.year"
            class="JsonElement-Attachment-Year"
            :text="item.year"
          />
        </v-card-title>
        <v-card-text>
          <AttachmentEmbedHandler
            v-if="'embedType' in item.content"
            :value="item.content"
          />
          <VJsonElement v-else :value="item.content" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <!-- Element types which cannot includes child elements -->
  <nuxt-link v-else-if="value.type === 'link'" :to="value.to">{{
    value.text
  }}</nuxt-link>
  <p v-else-if="value.type === 'sentence'">{{ value.text }}</p>
  <span v-else-if="value.type === 'textWithBadge'"
    >{{ value.text }} <VYearBadge :text="value.badge"
  /></span>
  <span v-else-if="typeof value === 'string'">{{ value }}</span>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import AttachmentEmbedHandler, {
  AnyValue as AttachmentEmbedAnyValue,
} from '@/components/AttachmentEmbedHandler.vue'
import VYearBadge from '@/components/VYearBadge.vue'

type Data = {
  simpleRowProps: object
  attachmentItemCardProps: object
}

type Methods = {
  getAttachmentItemColProps(index: number): object
}

type Computed = {
  tableCeadingColStyle: object
  listStyle: object
}

type Props = {
  value: AnyValue
}

// ******************************************************** //

type AnyValue =
  | TableValue
  | ListValue
  | AttachmentsValue
  | LinkValue
  | SentenceValue
  | TextWithBadge

type TableValue = {
  type: 'table'
  options?: {
    headerFlexBasis?: string
  }
  rows: { header: string; content: string | AnyValue }[]
}

type ListValue = {
  type: 'list'
  options?: {
    noBulletList?: boolean
  }
  items: (string | AnyValue)[]
} & ({ pretext?: string } | { precontent?: AnyValue })

type AttachmentsValue = {
  type: 'attachments'
  options?: {}
  items: {
    description: string
    year: string
    content: AnyValue | AttachmentEmbedAnyValue
    options?: { span?: number }
  }[]
}

type LinkValue = { type: 'link'; to: string; text: string }

type SentenceValue = { type: 'sentence'; text: string }

type TextWithBadge = { type: 'textWithBadge'; text: string; badge: string }

// ******************************************************** //

export default Vue.extend<Data, Methods, Computed, Props>({
  name: 'VJsonElement',
  components: {
    AttachmentEmbedHandler,
    VYearBadge,
  },
  props: {
    value: {
      type: Object as PropType<AnyValue>,
      required: true,
    },
  },
  data() {
    return {
      simpleRowProps: {
        justify: 'start',
        align: 'start',
        dense: true,
        class: 'py-0',
      },
      attachmentItemCardProps: {
        elevation: '3',
        color: 'white',
        height: '100%',
      },
    }
  },
  computed: {
    tableCeadingColStyle() {
      if (this.value.type !== 'table') {
        return {}
      }

      return {
        maxWidth: 'unset',
        flexBasis: this.value.options && this.value.options.headerFlexBasis,
      }
    },
    listStyle() {
      if (this.value.type !== 'list') {
        return {}
      }

      if (this.value.options) {
        if (this.value.options.noBulletList) {
          return {
            listStyle: 'none',
            paddingLeft: 0,
          }
        }
      }

      return {}
    },
  },
  methods: {
    getAttachmentItemColProps(_index: number) {
      if (this.value.type !== 'attachments') {
        return {}
      }

      const calculateBase = (items: AttachmentsValue['items']) => {
        if (items.length <= 1) {
          return { cols: 12, sm: 12, lg: 12 }
        }

        if (items.length === 2) {
          return { cols: 12, sm: 6, lg: 6 }
        }

        return { cols: 12, sm: 6, lg: 4 }
      }

      const base = calculateBase(this.value.items)

      // TODO: Implements `span` option
      return base
    },
  },
})
</script>

<style lang="scss" scoped>
.JsonElement {
  &-Attachment {
    &-Title {
      display: block;
      font-size: 0.94rem;
      line-height: 120%;
      padding: {
        top: 1em;
        bottom: 0.8em;
      }
    }
    &-Year {
      margin: {
        left: 4px;
      }
    }
  }
}
</style>
