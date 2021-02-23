<template>
  <VLinkableChip
    class=""
    v-bind="$attrs"
    :icon="getRepositoryIcon(repository)"
    icon-color="#000000ed"
    :label="getRepositoryLabel(repository)"
    :url="repository.visibility === 'PUBLIC' ? repository.url : ''"
  >
    <template v-if="repository.serviceName === 'GITLAB'" #icon>
      <VSimpleIconGitLab
        color="#000000ed"
        size="14px"
        style="margin-left: -6px; margin-right: 6px"
      />
    </template>
  </VLinkableChip>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import VLinkableChip from '@/components/VLinkableChip.vue'
import {
  ProgrammingProject,
  Repository,
  RepositoryServiceName,
} from '@/types/store/programmingProject'

type Methods = {
  getRepositoryIcon(repository: Repository): string
  getRepositoryLabel(repository: Repository): string
}

type Props = {
  repository: ProgrammingProject['repositories'][number]
}

export default Vue.extend<unknown, Methods, unknown, Props>({
  components: { VLinkableChip },
  props: {
    repository: {
      type: Object as PropType<ProgrammingProject['repositories'][number]>,
      required: true,
    },
  },
  methods: {
    getRepositoryIcon(repository) {
      const icons: Record<RepositoryServiceName, string> = {
        GITHUB: 'mdi-github',
        GITLAB: '',
        TRANSIFEX: 'mdi-translate',
      }

      return icons[repository.serviceName]
    },
    getRepositoryLabel(repository) {
      const visibility = repository.visibility === 'PRIVATE' ? '（非公開）' : ''
      if (repository.label) return repository.label + visibility

      const labels: Record<RepositoryServiceName, string> = {
        GITHUB: 'GitHub',
        GITLAB: 'GitLab',
        TRANSIFEX: 'Transifex',
      }
      return labels[repository.serviceName] + visibility
    },
  },
})
</script>
