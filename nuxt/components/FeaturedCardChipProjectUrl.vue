<template>
  <VLinkableChip
    class=""
    v-bind="$attrs"
    :icon="mdiWeb"
    icon-color="#000000a1"
    :label="projectUrl.label"
    :url="projectUrl.url"
  />
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { mdiWeb } from '@mdi/js'
import { ProgrammingProject } from '@/types/store/programmingProject'

type Data = {
  mdiWeb: string
}

type Props = {
  projectUrl: ProgrammingProject['projectUrls'][number]
}

export default Vue.extend<Data, unknown, unknown, Props>({
  props: {
    projectUrl: {
      type: Object as PropType<ProgrammingProject['projectUrls'][number]>,
      required: true,
    },
  },
  data() {
    return {
      mdiWeb,
    }
  },
})
</script>
