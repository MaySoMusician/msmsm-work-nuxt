import { GeneralInformation, Featureable } from './common'

export interface ProgrammingProject extends GeneralInformation, Featureable {
  projectUrls: ProjectUrl[]
  myRole: string
  repositories: Repository[]
  skills: string[]
}

export interface ProjectUrl {
  label: string
  url: string
}

export interface Repository {
  label?: string
  serviceName: RepositoryServiceName
  url: string
  visibility: RepositoryVisibility
}

export type RepositoryServiceName = 'GITHUB' | 'GITLAB' | 'TRANSIFEX'

export type RepositoryVisibility = 'PUBLIC' | 'PRIVATE'
