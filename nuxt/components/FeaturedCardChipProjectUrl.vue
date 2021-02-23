<template>
  <VLinkableChip
    class=""
    v-bind="$attrs"
    icon="mdi-web"
    icon-color="#000000ed"
    :label="projectUrl.label"
    :url="projectUrl.url"
  />
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import VLinkableChip from '@/components/VLinkableChip.vue'
import { ProgrammingProject } from '@/types/store/programmingProject'

type Props = {
  projectUrl: ProgrammingProject['projectUrls'][number]
}

export default Vue.extend<unknown, unknown, unknown, Props>({
  components: { VLinkableChip },
  props: {
    projectUrl: {
      type: Object as PropType<ProgrammingProject['projectUrls'][number]>,
      required: true,
    },
  },
})
</script>
