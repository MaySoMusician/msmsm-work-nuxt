export interface GeneralInformation {
  title: string
  slug: string
  author: string
  description: Description
  dedication: string
  license: License | ''
  date: string
  thumbnailUrl?: string
  position: number
}

export interface Description {
  summary: string
  full: string
}

export type License = 'CC-BY-4.0' | 'MIT' | 'PD' | 'UNLICENSED' | 'MPL2'

export interface Featureable {
  featured: boolean
  featuredPosition: number
}
