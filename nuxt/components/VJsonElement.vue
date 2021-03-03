<template>
  <!--
    Developer note: you should find weird syntax like `!!(typeof x !== 'string')`
    You can't write `typeof x !== 'string'` in vue template, somehow because
    the Vue interpreter can't properly recognize this correct syntax.
    Although they can interpret `(typeof x !== 'string')`, with parentheses,
    the great Prettier can't help automatically removing them.
    So, I finally *created* an ultimate syntax `!!(typeof x !== 'string')`,
    that prevents Prettier from formatting it, while letting Vue read it properly.

    Tips: you can also use `!(typeof x === 'string')`, that will probably
    make readers misunderstand easily though.
  -->

  <!-- First, handle non-object value (i.e. string passed to `value` prop) -->
  <span v-if="typeof value === 'string'">{{ value }}</span>

  <!-- Object AnyValue -->
  <div v-else-if="value.type === 'table'">
    <v-row
      v-for="(row, index) in value.rows"
      :key="index"
      v-bind="simpleRowProps"
    >
      <v-col cols="1" :style="tableCeadingColStyle">
        <VJsonElement :value="row.header" />
      </v-col>
      <v-col>
        <VJsonElement :value="row.content" />
      </v-col>
    </v-row>
  </div>

  <ul v-else-if="value.type === 'list'" :style="listStyle">
    <li v-for="(item, index) in value.items" :key="index" class="mb-1">
      <!--
        Prepend a content if an item has a `precontent` property
        Useful for creating a nested list.
      -->
      <span v-if="!!(typeof item !== 'string') && 'precontent' in item"
        ><VJsonElement :value="item.precontent"
      /></span>
      <VJsonElement :value="item" />
    </li>
  </ul>

  <v-row v-else-if="value.type === 'attachments'" class="mb-3" dense>
    <v-col
      v-for="(item, index) in value.items"
      :key="index"
      v-bind="getAttachmentItemColProps(index)"
    >
      <!-- If an item is object and its `content` is a type of FeaturedCardValue, -->
      <FeaturedCard
        v-if="
          !!(typeof item.content !== 'string') &&
          'type' in item.content &&
          item.content.type === 'featuredCard'
        "
        :title="item.description"
        description=""
        :thumbnail-url="item.content.thumbnailUrl"
      >
        <v-row align="center" no-gutters>
          <v-col cols="12"></v-col>
          <v-col v-if="item.year" cols="12">
            <VYearBadge :text="item.year" />
          </v-col>
        </v-row>
      </FeaturedCard>

      <!-- Otherwise, -->
      <v-card v-else v-bind="attachmentItemCardProps">
        <v-card-title class="JsonElement-Attachment-Title">
          <span>{{ item.description }}</span>
          <!-- Append a badge if an item has a year info -->
          <VYearBadge
            v-if="item.year"
            class="JsonElement-Attachment-Year"
            :text="item.year"
          />
        </v-card-title>
        <v-card-text>
          <VJsonElement v-if="'precontent' in item" :value="item.precontent" />
          <!-- If a content of an item is a type of AttachmentEmbedAnyValue, -->
          <AttachmentEmbedHandler
            v-if="
              !!(typeof item.content !== 'string') &&
              'embedType' in item.content
            "
            :value="item.content"
          />
          <!-- Otherwise, -->
          <VJsonElement v-else :value="item.content" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <component
    :is="value.wrapperTag || 'div'"
    v-else-if="value.type === 'inlines'"
    ><VJsonElement
      v-for="(inline, index) in value.items"
      :key="index"
      :value="inline"
    />
  </component>

  <!-- Notice: links can include only inline elements. -->
  <nuxt-link v-else-if="value.type === 'link' && 'to' in value" :to="value.to"
    ><VJsonElement :value="value.content"
  /></nuxt-link>
  <a
    v-else-if="value.type === 'link' && 'href' in value"
    :href="value.href"
    rel="noopener"
    target="_blank"
    ><VJsonElement :value="value.content"
  /></a>

  <!-- These types of elements below can't include any child VJsonElements. -->
  <p v-else-if="value.type === 'paragraph'">{{ value.text }}</p>
  <VYearBadge v-else-if="value.type === 'badge'" :text="value.text" />
  <span v-else-if="value.type === 'plaintext'">{{ value.text }}</span>
</template>

<script lang="ts">
import Vue /* , { PropType } */ from 'vue'
import { AnyValue as AttachmentEmbedAnyValue } from '@/components/AttachmentEmbedHandler.vue'

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

type AnyValue = AnyBlockElementValue | AnyInlineElementValue | string

type AnyBlockElementValue =
  | TableValue
  | ListValue
  | AttachmentsValue
  | ParagraphValue
  | FeaturedCardValue
  | InlinesValue

type AnyInlineElementValue = LinkValue | PlainTextValue | BadgeValue

type TableValue = {
  type: 'table'
  options?: {
    headerFlexBasis?: string
  }
  rows: { header: AnyValue; content: AnyValue }[]
}

type ListValue = {
  type: 'list'
  options?: {
    noBulletList?: boolean
  }
  precontent?: AnyValue
  items: AnyValue[]
}

type AttachmentsValue = {
  type: 'attachments'
  options?: {}
  items: {
    description: string
    year: string
    content: AnyValue | AttachmentEmbedAnyValue
    precontent?: AnyValue
    options?: { span?: number }
  }[]
}

type FeaturedCardValue = {
  type: 'featuredCard'
  thumbnailUrl: string
}

type InlinesValue = {
  type: 'inlines'
  wrapperTag?: string
  items: AnyInlineElementValue[]
}

type LinkValue = {
  type: 'link'
  content: AnyInlineElementValue | InlinesValue
} & ({ to: string } | { href: string })

type ParagraphValue = { type: 'paragraph'; text: string }

type BadgeValue = { type: 'badge'; text: string }

type PlainTextValue = { type: 'plaintext'; text: string }

// ******************************************************** //

export default Vue.extend<Data, Methods, Computed, Props>({
  name: 'VJsonElement',
  props: {
    value: {
      type: [String, Object as () => Exclude<AnyValue, string>],
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
      if (typeof this.value === 'string' || this.value.type !== 'table') {
        return {}
      }

      return {
        maxWidth: 'unset',
        flexBasis: this.value.options && this.value.options.headerFlexBasis,
      }
    },
    listStyle() {
      if (typeof this.value === 'string' || this.value.type !== 'list') {
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
      if (typeof this.value === 'string' || this.value.type !== 'attachments') {
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
