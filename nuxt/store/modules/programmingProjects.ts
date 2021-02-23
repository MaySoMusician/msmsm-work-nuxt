import { createModule, getter } from 'vuex-class-component'
import { ProgrammingProject } from '@/types/store/programmingProject'

const VuexModule = createModule({
  namespaced: 'programmingProjects',
  strict: false,
  target: 'nuxt',
})

export interface ProgrammingProjectFirebaseObject extends ProgrammingProject {
  id: string
}

export class ProgrammingProjectsStore extends VuexModule {
  @getter projects: ProgrammingProjectFirebaseObject[] = []

  get featuredProjects() {
    return this.projects.filter((project) => project.featured)
  }
}
