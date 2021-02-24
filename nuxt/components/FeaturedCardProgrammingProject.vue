<template>
  <FeaturedCard
    class="Card"
    :title="title"
    :thumbnail-url="thumbnailUrl"
    :description="description"
    :details-url="detailsUrl"
  >
    <v-row class="Card-Info-Wrapper" align="center" no-gutters>
      <v-col class="" cols="12">
        <FeaturedCardChipProjectUrl
          v-for="(project, index) in projectUrls"
          :key="`p${index}`"
          class="mr-1 mb-1 Card-Info-Chip"
          :project-url="project"
        />
        <FeaturedCardChipRepository
          v-for="(repo, index) in repositories"
          :key="`r${index}`"
          class="mr-1 mb-1 Card-Info-Chip"
          :repository="repo"
        />
      </v-col>
      <v-col class="pb-1" cols="12">
        <FeaturedCardChipAuthorAndMyRole
          class=""
          :author="author"
          :my-role="myRole"
        />
      </v-col>
      <v-col v-if="sortedSkills.length > 0" class="pb-1 mr-1" cols="auto">
        <v-avatar
          v-for="icon in sortedSkills"
          :key="icon"
          class="ml-1"
          size="14px"
          tile
        >
          <VSkillIcon :value="icon" size="14px" />
        </v-avatar>
      </v-col>
      <v-col class="pb-1 mr-1" cols="auto">
        <FeaturedCardChipNoActivable
          v-if="license"
          class="mr-1 Card-Info-Chip-NoActivable"
          :icon="mdiFileOutline"
          :text="licenseLabel"
        />
      </v-col>
      <v-col class="pb-1 mr-1" cols="auto">
        <FeaturedCardChipNoActivable
          class="mr-1 Card-Info-Chip-NoActivable"
          :icon="mdiCalendarRange"
          :text="date"
        />
      </v-col>
      <v-col class="pb-1 mr-1" cols="auto">
        <span>{{ dedication }}</span>
      </v-col>
    </v-row>
  </FeaturedCard>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { mdiFileOutline, mdiCalendarRange } from '@mdi/js'
import { License } from '@/types/store/common'
import { ProgrammingProject } from '@/types/store/programmingProject'

type Data = {
  mdiFileOutline: string
  mdiCalendarRange: string
}

type Methods = {}

type Computed = {
  sortedSkills: string[]
  licenseLabel: string
}

type Props = {
  // Passed to the base component
  title: string
  description: string
  detailsUrl: string | false
  thumbnailUrl: string
  // Implemented here
  author: string
  date: string
  dedication: string
  license: License | ''
  myRole: string
  projectUrls: ProgrammingProject['projectUrls']
  repositories: ProgrammingProject['repositories']
  skills: string[]
}

export default Vue.extend<Data, Methods, Computed, Props>({
  props: {
    // Passed to the base component
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    detailsUrl: {
      type: [String, Boolean as () => false],
      default() {
        return false
      },
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    // Implemented here
    author: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: '',
    },
    dedication: {
      type: String,
      default: '',
    },
    license: {
      type: String as () => License,
      required: true,
    },
    myRole: {
      type: String,
      required: true,
    },
    projectUrls: {
      type: Array as PropType<ProgrammingProject['projectUrls']>,
      default() {
        return []
      },
    },
    repositories: {
      type: Array as PropType<ProgrammingProject['repositories']>,
      default() {
        return []
      },
    },
    skills: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  data() {
    return {
      mdiFileOutline,
      mdiCalendarRange,
    }
  },
  computed: {
    sortedSkills() {
      return this.skills.concat().sort((a, b) => a.localeCompare(b))
    },
    licenseLabel() {
      if (!this.license) return ''

      const labels: Record<License, string> = {
        'CC-BY-4.0': 'CC BY 4.0',
        MIT: 'MIT License',
        PD: 'Public Domain',
        UNLICENSED: 'All rights reserved',
      }
      return labels[this.license]
    },
  },
  methods: {},
})
</script>

<style lang="scss"></style>

<style lang="scss" scoped>
.Card {
  &-Info {
    &-Wrapper,
    &-Chip.v-chip,
    &-Chip-NoActivable.v-chip {
      color: rgba(0, 0, 0, 0.75);
      font-size: 0.65rem !important;
      line-height: 100% !important;
      overflow-wrap: normal;
    }

    &-Chip.v-chip,
    &-Chip-NoActivable.v-chip {
      height: 18px;
      /* .v-icon {
        color: rgba(0, 0, 0, 0.93);
      } */
    }

    &-Chip-NoActivable:active {
      box-shadow: unset;
    }
  }
}
</style>
