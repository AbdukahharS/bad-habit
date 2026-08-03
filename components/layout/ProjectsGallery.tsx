'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  IconArrowUpRight,
  IconBrandGithub,
  IconPackage,
  IconAdjustmentsHorizontal,
  IconX,
} from '@tabler/icons-react'
import { TagChip, getTag } from '@/components/icons/tags'
import type { ProjectCategory } from '@/lib/i18n'
import type { LocalizedProject } from '@/lib/projects'

type Labels = {
  liveLabel: string
  codeLabel: string
  packageLabel: string
  tagFilterLabel: string
  clearFilters: string
  noResults: string
  selectedCount: string
  matchAllTags: string
  categoryLabels: Record<ProjectCategory, string>
}

type ProjectsGalleryProps = {
  projects: LocalizedProject[]
  labels: Labels
}

const ProjectsGallery = ({ projects, labels }: ProjectsGalleryProps) => {
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set())
  const [panelOpen, setPanelOpen] = useState(false)
  const [matchAll, setMatchAll] = useState(false)

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
        })
      )
      .map(([slug, count]) => ({ slug, count }))
  }, [projects])

  const filteredProjects = useMemo(() => {
    if (activeTags.size === 0) return projects
    if (matchAll) {
      return projects.filter((p) =>
        [...activeTags].every((tag) => p.tags.includes(tag))
      )
    }
    return projects.filter((p) => p.tags.some((tag) => activeTags.has(tag)))
  }, [projects, activeTags, matchAll])

  // Changing this key remounts the cards so the enter animation replays on filter change
  const filterKey = useMemo(
    () => `${matchAll ? 'all' : 'any'}:${[...activeTags].sort().join(',')}`,
    [activeTags, matchAll]
  )

  const toggleTag = (slug: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    })
  }

  return (
    <div className='w-full'>
      {/* Filter bar */}
      <div className='bg-[#1a191d]/95 border-b border-white/[0.06]'>
        {/* Top row: toggle + active chips + count */}
        <div className='px-6 md:px-12 xl:px-24 h-12 flex items-center gap-4'>
          <button
            type='button'
            onClick={() => setPanelOpen((v) => !v)}
            className='inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/90 transition-colors shrink-0'
          >
            <IconAdjustmentsHorizontal className='w-4 h-4' />
            <span className='hidden sm:inline'>{labels.tagFilterLabel}</span>
            {activeTags.size > 0 && (
              <span className='w-5 h-5 rounded-full bg-white text-[#1a191d] text-xs font-bold flex items-center justify-center leading-none'>
                {activeTags.size}
              </span>
            )}
          </button>

          {/* Active tag chips row */}
          {activeTags.size > 0 && (
            <div className='flex items-center gap-2 overflow-x-auto flex-1 min-w-0 scrollbar-none'>
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
            </div>
          )}

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

          <span
            className={`${activeTags.size > 1 ? '' : 'ml-auto '}shrink-0 text-white/20 text-xs font-mono tabular-nums`}
          >
            {filteredProjects.length}
            <span className='text-white/10'>/{projects.length}</span>
          </span>
        </div>

        {/* Expandable tag panel */}
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
            panelOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className='overflow-hidden'>
            <div className='px-6 md:px-12 xl:px-24 py-4 border-t border-white/[0.06]'>
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

      {/* Project list */}
      <div className='px-6 md:px-12 xl:px-24 pb-32'>
        {filteredProjects.length === 0 ? (
          <div className='flex flex-col items-center justify-center gap-6 py-32 text-center'>
            <p className='text-xl text-white/30 font-poppins'>
              {labels.noResults}
            </p>
            <button
              type='button'
              onClick={() => setActiveTags(new Set())}
              className='inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white/60 bg-white/[0.06] border border-white/10 hover:bg-white/10 hover:text-white/90 transition-colors'
            >
              <IconX className='w-4 h-4' />
              {labels.clearFilters}
            </button>
          </div>
        ) : (
          filteredProjects.map((project, i) => (
            <ProjectCard
              key={`${project.name}-${filterKey}`}
              project={project}
              index={i}
              labels={labels}
            />
          ))
        )}
      </div>
    </div>
  )
}

type ProjectCardProps = {
  project: LocalizedProject
  index: number
  labels: Labels
}

const ProjectCard = ({ project, index, labels }: ProjectCardProps) => {
  const num = String(index + 1).padStart(2, '0')
  const isEven = index % 2 === 0

  return (
    <article
      className='gallery-card group relative py-14 md:py-20 border-b border-white/[0.06] last:border-0 overflow-hidden'
      style={{ animationDelay: `${Math.min(index * 50, 400)}ms` }}
    >
      {/* Large decorative number */}
      <span
        className='absolute top-4 right-0 font-black leading-none select-none pointer-events-none text-white/[0.025]'
        style={{ fontSize: 'clamp(6rem, 16vw, 14rem)' }}
        aria-hidden='true'
      >
        {num}
      </span>

      {/* Card header: number + category + links */}
      <div className='flex items-center justify-between gap-4 mb-8 flex-wrap'>
        <div className='flex items-center gap-3 text-white/20 text-xs'>
          <span className='font-mono tracking-wider'>{num}</span>
          <span className='h-px w-5 bg-white/15' />
          <span className='uppercase tracking-[0.2em] font-medium'>
            {labels.categoryLabels[project.category]}
          </span>
          {project.highlighted && (
            <span role='img' className='text-amber-400/50 ml-0.5' aria-label='Featured'>
              ◆
            </span>
          )}
        </div>

        {/* Links row — top right */}
        <div className='flex items-center gap-5'>
          {project.live && (
            <Link
              href={project.live}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1 text-sm font-semibold text-white hover:text-white/60 transition-colors duration-200 group/link'
            >
              {labels.liveLabel}
              <IconArrowUpRight className='w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5' />
            </Link>
          )}
          {project.source && (
            <Link
              href={project.source}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1.5 text-sm text-white/35 hover:text-white/70 transition-colors duration-200'
            >
              <IconBrandGithub className='w-4 h-4' />
              {labels.codeLabel}
            </Link>
          )}
          {project.packageRegistry && (
            <Link
              href={project.packageRegistry}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1.5 text-sm text-white/35 hover:text-white/70 transition-colors duration-200'
            >
              <IconPackage className='w-4 h-4' />
              {labels.packageLabel}
            </Link>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className='text-4xl md:text-5xl xl:text-[3.25rem] font-black font-poppins text-white leading-[1.05] tracking-tight mb-10'>
        {project.name}
      </h3>

      {/* Two-column: image + description */}
      <div
        className={`grid gap-10 md:gap-14 xl:gap-20 items-start ${
          isEven ? 'md:grid-cols-[2fr_3fr]' : 'md:grid-cols-[3fr_2fr]'
        }`}
      >
        {/* Image */}
        <div className={!isEven ? 'md:order-2' : ''}>
          <div className='relative overflow-hidden rounded-xl border border-white/[0.06] shadow-2xl shadow-black/40'>
            <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none' />
            <Image
              src={`/projects/${project.image}`}
              alt={`${project.name} screenshot`}
              width={800}
              height={500}
              sizes='(min-width: 768px) 60vw, 100vw'
              className='w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]'
            />
          </div>
        </div>

        {/* Description + tags */}
        <div className={`flex flex-col gap-6 ${!isEven ? 'md:order-1' : ''}`}>
          <div className='text-white/55 text-sm leading-[1.85] whitespace-pre-line'>
            {project.longDescription}
          </div>

          {project.tags.length > 0 && (
            <div className='flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.06]'>
              {project.tags.map((tag) => (
                <TagChip key={tag} slug={tag} size='sm' />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProjectsGallery
