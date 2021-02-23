<template>
  <div>
    <v-container>
      <v-row justify="start" align="stretch">
        <v-col class="pb-0 mb-n2" cols="12">
          <h2>注目のプロジェクト</h2>
        </v-col>
        <v-col
          v-for="project in featuredProjects"
          :key="project.id"
          cols="12"
          sm="6"
          lg="4"
        >
          <FeaturedCardProgrammingProject
            :title="project.title"
            :author="project.author"
            :date="project.date"
            :dedication="project.dedication"
            :description="project.description.summary"
            :license="project.license"
            :my-role="project.myRole"
            :project-urls="project.projectUrls"
            :repositories="project.repositories"
            :skills="project.skills"
            :thumbnail-url="project.thumbnailUrl ? project.thumbnailUrl : ''"
          />
        </v-col>
      </v-row>
      <v-row justify="start" align="stretch">
        <v-col class="pb-0 mb-n2" cols="12">
          <h2>すべてのプロジェクト</h2>
        </v-col>
        <v-col class="" cols="12">
          <v-list two-line>
            <div v-for="project in allSortedProjects" :key="project.id">
              <MyItemProgrammingProject
                :title="project.title"
                :author="project.author"
                :date="project.date"
                :dedication="project.dedication"
                :description="project.description.summary"
                :license="project.license"
                :my-role="project.myRole"
                :project-urls="project.projectUrls"
                :repositories="project.repositories"
                :skills="project.skills"
                :thumbnail-url="
                  project.thumbnailUrl ? project.thumbnailUrl : ''
                "
              />
              <v-divider />
            </div>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { titlePerPage } from '@/userModules/constants'
import { vxm } from '@/store/index'
import FeaturedCardProgrammingProject from '@/components/FeaturedCardProgrammingProject.vue'
import MyItemProgrammingProject from '@/components/MyItemProgrammingProject.vue'
import { ProgrammingProjectFirebaseObject } from '@/store/modules/programmingProjects'

type Data = {
  projects: typeof vxm.programmingProjects
}

type Computed = {
  featuredProjects: ProgrammingProjectFirebaseObject[]
  allSortedProjects: ProgrammingProjectFirebaseObject[]
}

export default Vue.extend<Data, unknown, Computed, unknown>({
  components: {
    FeaturedCardProgrammingProject,
    MyItemProgrammingProject,
  },
  data() {
    return {
      projects: vxm.programmingProjects,
    }
  },
  computed: {
    featuredProjects() {
      return this.projects.featuredProjects
        .concat()
        .sort((a, b) => a.featuredPosition - b.featuredPosition)
    },
    allSortedProjects() {
      return this.projects.projects
        .concat()
        .sort((a, b) => b.position - a.position)
    },
  },
  mounted() {},
  head() {
    return {
      title: titlePerPage.programming,
      meta: [
        { hid: 'og:title', property: 'og:title', content: titlePerPage.index },
      ],
    }
  },
})
</script>

<style lang="scss"></style>

<style lang="scss" scoped></style>
