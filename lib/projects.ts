import rawCatalog from '@/lib/data/projects.json'
import type { Locale, ProjectCategory } from '@/lib/i18n'

type LocalizedText = Record<Locale, string>

export type Project = {
  name: string
  description: LocalizedText
  longDescription: LocalizedText
  image: string
  live: string | null
  source: string | null
  tags: string[]
  category: ProjectCategory
  highlighted?: boolean
  showOnHome?: boolean
  badge?: string
  packageRegistry?: string | null
}

export const projectCatalog: Project[] = (rawCatalog as Project[]).map((p) => ({
  ...p,
  packageRegistry: p.packageRegistry ?? null,
}))

export type LocalizedProject = Omit<
  Project,
  'description' | 'longDescription'
> & {
  description: string
  longDescription: string
}

export const localizeProjects = (locale: Locale): LocalizedProject[] =>
  projectCatalog.map((p) => ({
    ...p,
    description: p.description[locale],
    longDescription: p.longDescription[locale],
  }))
