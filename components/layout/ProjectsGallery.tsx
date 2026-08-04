'use client'

import {
  IconAdjustmentsHorizontal,
  IconArrowUpRight,
  IconBrandGithub,
  IconPackage,
  IconPlus,
  IconSearch,
  IconX,
} from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getTag, TagChip } from '@/components/icons/tags'
import type { ProjectCategory } from '@/lib/i18n'
import type { LocalizedProject } from '@/lib/projects'

type Labels = {
  liveLabel: string
  codeLabel: string
  packageLabel: string
  tagFilterLabel: string
  clearFilters: string
  noResults: string
  matchAllTags: string
  categoryIndexLabel: string
  searchPlaceholder: string
  showDetails: string
  hideDetails: string
  categoryLabels: Record<ProjectCategory, string>
}

type ProjectsGalleryProps = {
  projects: LocalizedProject[]
  labels: Labels
}

type CategoryGroup = {
  category: ProjectCategory
  projects: LocalizedProject[]
}

const MAX_CARD_TAGS = 4

const ProjectsGallery = ({ projects, labels }: ProjectsGalleryProps) => {
  const [query, setQuery] = useState('')
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set())
  const [panelOpen, setPanelOpen] = useState(false)
  const [matchAll, setMatchAll] = useState(false)
  const [openProject, setOpenProject] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | null>(
    null,
  )
  const sectionRefs = useRef<Map<ProjectCategory, HTMLElement>>(new Map())

  const availableTags = useMemo(() => {
    const counts = new Map<string, number>()
    for (const project of projects) {
      for (const tag of project.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1)
      }
    }
    return Array.from(counts.entries())
      .sort((a, b) =>
        getTag(a[0]).label.localeCompare(getTag(b[0]).label, undefined, {
          sensitivity: 'base',
        }),
      )
      .map(([slug, count]) => ({ slug, count }))
  }, [projects])

  // Categories ordered by project count, ties broken by first appearance
  const categoryOrder = useMemo(() => {
    const counts = new Map<ProjectCategory, number>()
    for (const project of projects) {
      counts.set(project.category, (counts.get(project.category) ?? 0) + 1)
    }
    return Array.from(counts.keys()).sort(
      (a, b) => (counts.get(b) ?? 0) - (counts.get(a) ?? 0),
    )
  }, [projects])

  const normalizedQuery = query.trim().toLowerCase()

  const matchesQuery = useCallback(
    (project: LocalizedProject) => {
      if (!normalizedQuery) return true
      const haystack = [
        project.name,
        project.description,
        project.longDescription,
        project.category,
        labels.categoryLabels[project.category],
        ...project.tags,
        ...project.tags.map((tag) => getTag(tag).label),
      ]
        .join('\n')
        .toLowerCase()
      return normalizedQuery
        .split(/\s+/)
        .every((term) => haystack.includes(term))
    },
    [normalizedQuery, labels.categoryLabels],
  )

  const matchesTags = useCallback(
    (project: LocalizedProject) => {
      if (activeTags.size === 0) return true
      if (matchAll) {
        return [...activeTags].every((tag) => project.tags.includes(tag))
      }
      return project.tags.some((tag) => activeTags.has(tag))
    },
    [activeTags, matchAll],
  )

  const isFiltering = normalizedQuery !== '' || activeTags.size > 0

  const groups = useMemo<CategoryGroup[]>(() => {
    return categoryOrder
      .map((category) => ({
        category,
        projects: projects.filter(
          (p) => p.category === category && matchesQuery(p) && matchesTags(p),
        ),
      }))
      .filter((group) => group.projects.length > 0)
  }, [categoryOrder, projects, matchesQuery, matchesTags])

  const filteredCount = useMemo(
    () => groups.reduce((sum, group) => sum + group.projects.length, 0),
    [groups],
  )

  // Changing this key remounts the cards so the enter animation replays on filter change
  const filterKey = useMemo(
    () =>
      `${normalizedQuery}|${matchAll ? 'all' : 'any'}:${[...activeTags]
        .sort()
        .join(',')}`,
    [normalizedQuery, activeTags, matchAll],
  )

  const toggleTag = (slug: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    })
  }

  const clearAll = () => {
    setActiveTags(new Set())
    setQuery('')
  }

  // Scroll-spy: highlight the category section currently in view
  // biome-ignore lint/correctness/useExhaustiveDependencies: `groups` re-attaches observers whenever sections mount/unmount
  useEffect(() => {
    if (isFiltering) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveCategory(
              entry.target.getAttribute('data-category') as ProjectCategory,
            )
          }
        }
      },
      { rootMargin: '-25% 0px -65% 0px' },
    )
    for (const el of sectionRefs.current.values()) observer.observe(el)
    return () => observer.disconnect()
  }, [groups, isFiltering])

  const scrollToCategory = (category: ProjectCategory) => {
    const el = sectionRefs.current.get(category)
    if (!el) return
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    el.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })
    setActiveCategory(category)
  }

  const toggleProject = (name: string) =>
    setOpenProject((prev) => (prev === name ? null : name))

  return (
    <div className='w-full'>
      {/* Toolbar: search + tag filter */}
      <div className='sticky top-[4.5rem] lg:top-20 z-20 bg-[#1a191d]/95 backdrop-blur-md border-b border-white/[0.08]'>
        <div className='px-6 md:px-12 xl:px-24 py-3 flex items-center gap-3'>
          {/* Search */}
          <div className='relative flex-1 min-w-0 max-w-md'>
            <IconSearch className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none' />
            <input
              type='search'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={labels.searchPlaceholder}
              className='w-full h-10 pl-9 pr-8 rounded-lg bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/30 focus:bg-white/[0.06] transition-colors [&::-webkit-search-cancel-button]:hidden'
            />
            {query && (
              <button
                type='button'
                onClick={() => setQuery('')}
                aria-label={labels.clearFilters}
                className='absolute right-2 top-1/2 -translate-y-1/2 p-1 text-white/30 hover:text-white/70 transition-colors'
              >
                <IconX className='w-3.5 h-3.5' />
              </button>
            )}
          </div>

          {/* Tag filter toggle */}
          <button
            type='button'
            onClick={() => setPanelOpen((v) => !v)}
            aria-expanded={panelOpen}
            aria-label={labels.tagFilterLabel}
            className={`inline-flex items-center gap-2 h-10 px-3 rounded-lg border text-sm transition-colors shrink-0 ${
              panelOpen || activeTags.size > 0
                ? 'border-white/30 text-white bg-white/[0.08]'
                : 'border-white/10 text-white/50 hover:text-white/90 hover:border-white/20'
            }`}
          >
            <IconAdjustmentsHorizontal className='w-4 h-4' />
            <span className='hidden sm:inline'>{labels.tagFilterLabel}</span>
            {activeTags.size > 0 && (
              <span className='w-5 h-5 rounded-full bg-white text-[#1a191d] text-xs font-bold flex items-center justify-center leading-none'>
                {activeTags.size}
              </span>
            )}
          </button>

          {/* Count */}
          <span className='ml-auto shrink-0 text-white/25 text-xs font-mono tabular-nums'>
            {filteredCount}
            <span className='text-white/10'>/{projects.length}</span>
          </span>
        </div>

        {/* Active tag chips row */}
        {activeTags.size > 0 && (
          <div className='px-6 md:px-12 xl:px-24 pb-3 flex items-center gap-2 overflow-x-auto scrollbar-none'>
            <div className='flex gap-1.5 shrink-0'>
              {[...activeTags].map((slug) => (
                <TagChip
                  key={slug}
                  slug={slug}
                  size='sm'
                  active
                  onClick={() => toggleTag(slug)}
                />
              ))}
            </div>
            <button
              type='button'
              onClick={() => setActiveTags(new Set())}
              className='shrink-0 p-1 text-white/30 hover:text-white/70 transition-colors'
              aria-label={labels.clearFilters}
            >
              <IconX className='w-3.5 h-3.5' />
            </button>
            {activeTags.size > 1 && (
              <label className='ml-auto inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors cursor-pointer select-none shrink-0'>
                <input
                  type='checkbox'
                  checked={matchAll}
                  onChange={(e) => setMatchAll(e.target.checked)}
                  className='w-3.5 h-3.5 accent-white cursor-pointer'
                />
                {labels.matchAllTags}
              </label>
            )}
          </div>
        )}

        {/* Expandable tag panel */}
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
            panelOpen
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className='overflow-hidden'>
            <div className='px-6 md:px-12 xl:px-24 py-4 border-t border-white/[0.06] max-h-64 overflow-y-auto'>
              <div className='flex flex-wrap gap-2'>
                {availableTags.map(({ slug }) => (
                  <TagChip
                    key={slug}
                    slug={slug}
                    size='sm'
                    active={activeTags.has(slug)}
                    onClick={() => toggleTag(slug)}
                  />
                ))}
              </div>
              {activeTags.size > 0 && (
                <button
                  type='button'
                  onClick={() => setActiveTags(new Set())}
                  className='mt-3 inline-flex items-center gap-1.5 text-xs text-white/35 hover:text-white/70 transition-colors'
                >
                  <IconX className='w-3.5 h-3.5' />
                  {labels.clearFilters}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Body: category rail + sections */}
      <div className='px-6 md:px-12 xl:px-24 pb-32'>
        {filteredCount === 0 ? (
          <div className='flex flex-col items-center justify-center gap-6 py-32 text-center'>
            <p className='text-xl text-white/30 font-poppins'>
              {labels.noResults}
            </p>
            <button
              type='button'
              onClick={clearAll}
              className='inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white/60 bg-white/[0.06] border border-white/10 hover:bg-white/10 hover:text-white/90 transition-colors'
            >
              <IconX className='w-4 h-4' />
              {labels.clearFilters}
            </button>
          </div>
        ) : (
          <div className='lg:grid lg:grid-cols-[13rem_1fr] xl:grid-cols-[15rem_1fr] lg:gap-14'>
            {/* Category rail (desktop) */}
            {!isFiltering && (
              <aside className='hidden lg:block'>
                <nav
                  aria-label={labels.categoryIndexLabel}
                  className='sticky top-40 pt-10 flex flex-col border-l border-white/[0.08]'
                >
                  {groups.map((group, i) => {
                    const isActive = activeCategory === group.category
                    return (
                      <button
                        key={group.category}
                        type='button'
                        onClick={() => scrollToCategory(group.category)}
                        aria-current={isActive ? 'true' : undefined}
                        className={`group relative flex items-baseline gap-3 py-2.5 pl-5 text-left transition-colors duration-200 ${
                          isActive
                            ? 'text-white'
                            : 'text-white/35 hover:text-white/70'
                        }`}
                      >
                        <span
                          className={`absolute left-[-1px] top-0 bottom-0 w-px transition-colors duration-200 ${
                            isActive
                              ? 'bg-white'
                              : 'bg-transparent group-hover:bg-white/25'
                          }`}
                          aria-hidden='true'
                        />
                        <span className='font-mono text-xs tracking-wider text-white/20 shrink-0'>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className='text-sm leading-snug flex-1'>
                          {labels.categoryLabels[group.category]}
                        </span>
                        <span className='font-mono text-xs text-white/20 tabular-nums shrink-0'>
                          {group.projects.length}
                        </span>
                      </button>
                    )
                  })}
                </nav>
              </aside>
            )}

            {/* Category chip row (mobile) */}
            {!isFiltering && (
              <div className='lg:hidden sticky top-[8.75rem] z-10 -mx-6 px-6 md:-mx-12 md:px-12 py-3 bg-[#1a191d]/95 backdrop-blur-md overflow-x-auto scrollbar-none'>
                <div className='flex gap-2 w-max'>
                  {groups.map((group) => {
                    const isActive = activeCategory === group.category
                    return (
                      <button
                        key={group.category}
                        type='button'
                        onClick={() => scrollToCategory(group.category)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs whitespace-nowrap transition-colors ${
                          isActive
                            ? 'bg-white/15 text-white border-white/40'
                            : 'bg-white/[0.04] text-white/50 border-white/10 hover:text-white/80'
                        }`}
                      >
                        {labels.categoryLabels[group.category]}
                        <span className='font-mono text-xs text-white/30 tabular-nums'>
                          {group.projects.length}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Sections */}
            <div className={isFiltering ? 'lg:col-span-2' : ''}>
              {groups.map((group, groupIndex) => (
                <section
                  key={group.category}
                  data-category={group.category}
                  ref={(el) => {
                    if (el) sectionRefs.current.set(group.category, el)
                    else sectionRefs.current.delete(group.category)
                  }}
                  className='relative scroll-mt-52 lg:scroll-mt-44 pt-10 pb-16 border-b border-white/[0.06] last:border-0'
                >
                  {/* Ghost index */}
                  <span
                    className='absolute top-2 right-0 font-black leading-none select-none pointer-events-none text-white/[0.03] font-poppins'
                    style={{ fontSize: 'clamp(4rem, 10vw, 9rem)' }}
                    aria-hidden='true'
                  >
                    {String(groupIndex + 1).padStart(2, '0')}
                  </span>

                  {/* Section header */}
                  <div className='flex items-baseline gap-4 mb-8 flex-wrap'>
                    <span className='font-mono text-xs text-white/25 tracking-wider'>
                      {'//'} {String(groupIndex + 1).padStart(2, '0')}
                    </span>
                    <h2 className='text-2xl md:text-3xl font-bold font-poppins text-white tracking-tight'>
                      {labels.categoryLabels[group.category]}
                    </h2>
                    <span className='font-mono text-xs text-white/25 tabular-nums'>
                      {group.projects.length}
                    </span>
                  </div>

                  {/* Cards */}
                  <div className='grid sm:grid-cols-2 xl:grid-cols-3 gap-5'>
                    {group.projects.map((project, i) =>
                      openProject === project.name ? (
                        <ExpandedProjectCard
                          key={`${project.name}-${filterKey}`}
                          project={project}
                          labels={labels}
                          onClose={() => setOpenProject(null)}
                        />
                      ) : (
                        <ProjectCard
                          key={`${project.name}-${filterKey}`}
                          project={project}
                          index={i}
                          labels={labels}
                          onOpen={() => toggleProject(project.name)}
                        />
                      ),
                    )}
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

type ProjectCardProps = {
  project: LocalizedProject
  index: number
  labels: Labels
  onOpen: () => void
}

const ProjectCard = ({ project, index, labels, onOpen }: ProjectCardProps) => {
  const visibleTags = project.tags.slice(0, MAX_CARD_TAGS)
  const hiddenTagCount = project.tags.length - visibleTags.length

  return (
    <article
      className='gallery-card group relative flex flex-col rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden transition-colors duration-300 hover:border-white/20'
      style={{ animationDelay: `${Math.min(index * 40, 320)}ms` }}
    >
      <button
        type='button'
        onClick={onOpen}
        aria-label={`${labels.showDetails}: ${project.name}`}
        className='flex flex-col flex-1 text-left'
      >
        {/* Screenshot */}
        <div className='relative aspect-[16/10] overflow-hidden border-b border-white/[0.06]'>
          <Image
            src={`/projects/${project.image}`}
            alt={`${project.name} screenshot`}
            width={800}
            height={500}
            sizes='(min-width: 1280px) 30vw, (min-width: 640px) 50vw, 100vw'
            className='w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]'
          />
          {project.badge && (
            <span className='absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-amber-400/90 text-[#1a191d] text-xs font-bold tracking-wide'>
              {project.badge} ★
            </span>
          )}
        </div>

        {/* Body */}
        <div className='flex flex-col gap-2.5 p-5 flex-1'>
          <div className='flex items-start justify-between gap-3'>
            <h3 className='text-base font-bold font-poppins text-white leading-snug group-hover:text-blue-300 transition-colors duration-200'>
              {project.name}
            </h3>
            <span className='shrink-0 mt-0.5 w-6 h-6 rounded-full border border-white/15 flex items-center justify-center text-white/40 group-hover:text-white group-hover:border-white/40 transition-colors duration-200'>
              <IconPlus className='w-3.5 h-3.5' />
            </span>
          </div>
          <p className='text-white/55 text-sm leading-relaxed line-clamp-2'>
            {project.description}
          </p>
          {project.tags.length > 0 && (
            <div className='flex flex-wrap items-center gap-1.5 mt-auto pt-2'>
              {visibleTags.map((tag) => (
                <TagChip key={tag} slug={tag} size='sm' />
              ))}
              {hiddenTagCount > 0 && (
                <span className='text-xs font-mono text-white/25'>
                  +{hiddenTagCount}
                </span>
              )}
            </div>
          )}
        </div>
      </button>

      {/* Links */}
      {(project.live || project.source || project.packageRegistry) && (
        <div className='flex items-center gap-4 px-5 pb-4'>
          {project.live && (
            <Link
              href={project.live}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1 text-xs font-semibold text-white/70 hover:text-white transition-colors duration-200 group/link'
            >
              {labels.liveLabel}
              <IconArrowUpRight className='w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5' />
            </Link>
          )}
          {project.source && (
            <Link
              href={project.source}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`${labels.codeLabel}: ${project.name}`}
              className='inline-flex items-center gap-1.5 text-xs text-white/35 hover:text-white/70 transition-colors duration-200'
            >
              <IconBrandGithub className='w-3.5 h-3.5' />
              {labels.codeLabel}
            </Link>
          )}
          {project.packageRegistry && (
            <Link
              href={project.packageRegistry}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`${labels.packageLabel}: ${project.name}`}
              className='inline-flex items-center gap-1.5 text-xs text-white/35 hover:text-white/70 transition-colors duration-200'
            >
              <IconPackage className='w-3.5 h-3.5' />
              {labels.packageLabel}
            </Link>
          )}
        </div>
      )}
    </article>
  )
}

type ExpandedProjectCardProps = {
  project: LocalizedProject
  labels: Labels
  onClose: () => void
}

const ExpandedProjectCard = ({
  project,
  labels,
  onClose,
}: ExpandedProjectCardProps) => {
  return (
    <article className='gallery-card col-span-full grid md:grid-cols-2 rounded-xl border border-white/15 bg-white/[0.03] overflow-hidden'>
      {/* Screenshot */}
      <div className='relative border-b md:border-b-0 md:border-r border-white/[0.08] min-h-56'>
        <Image
          src={`/projects/${project.image}`}
          alt={`${project.name} screenshot`}
          width={1200}
          height={750}
          sizes='(min-width: 768px) 50vw, 100vw'
          className='w-full h-full object-cover'
        />
        {project.badge && (
          <span className='absolute top-3 left-3 px-2 py-0.5 rounded-md bg-amber-400/90 text-[#1a191d] text-xs font-bold tracking-wide'>
            {project.badge} ★
          </span>
        )}
      </div>

      {/* Detail */}
      <div className='flex flex-col gap-5 p-6 md:p-8'>
        <div className='flex items-start justify-between gap-4'>
          <div className='flex flex-col gap-1.5'>
            <span className='font-mono text-xs uppercase tracking-[0.2em] text-white/30'>
              {'//'} {labels.categoryLabels[project.category]}
            </span>
            <h3 className='text-2xl md:text-3xl font-black font-poppins text-white leading-tight tracking-tight'>
              {project.name}
            </h3>
          </div>
          <button
            type='button'
            onClick={onClose}
            aria-label={labels.hideDetails}
            className='shrink-0 w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-colors duration-200'
          >
            <IconX className='w-4 h-4' />
          </button>
        </div>

        <div className='text-white/55 text-sm leading-[1.85] whitespace-pre-line'>
          {project.longDescription}
        </div>

        {project.tags.length > 0 && (
          <div className='flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]'>
            {project.tags.map((tag) => (
              <TagChip key={tag} slug={tag} size='sm' />
            ))}
          </div>
        )}

        {(project.live || project.source || project.packageRegistry) && (
          <div className='flex items-center gap-3 flex-wrap mt-auto pt-2'>
            {project.live && (
              <Link
                href={project.live}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-xs font-semibold text-white hover:bg-white/20 transition-colors duration-200 group/link'
              >
                {labels.liveLabel}
                <IconArrowUpRight className='w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5' />
              </Link>
            )}
            {project.source && (
              <Link
                href={project.source}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white/60 hover:bg-white/10 hover:text-white transition-colors duration-200'
              >
                <IconBrandGithub className='w-3.5 h-3.5' />
                {labels.codeLabel}
              </Link>
            )}
            {project.packageRegistry && (
              <Link
                href={project.packageRegistry}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white/60 hover:bg-white/10 hover:text-white transition-colors duration-200'
              >
                <IconPackage className='w-3.5 h-3.5' />
                {labels.packageLabel}
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default ProjectsGallery
