import { GeneralInformation, Featureable } from './common'

export interface MusicWork extends GeneralInformation, Featureable {
  url: string
  type: MusicWorkType[]
  audioSources: Record<AudioSourceServiceName, string>
}

export type MusicWorkType =
  | 'CLASSICAL'
  | 'COMTEMPORARY'
  | 'POPULAR'
  | 'ELECTRONICS'
  | 'BGM'

export type AudioSourceServiceName =
  | 'YOUTUBE'
  | 'SOUNDCLOUD'
  | 'NICONICO'
  | 'TWITTER'
