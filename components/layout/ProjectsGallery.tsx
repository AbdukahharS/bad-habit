'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Github, Package as PackageIcon, X } from 'lucide-react'
import { TagChip } from '@/components/icons/tags'
import type { LocalizedProject } from '@/lib/projects'

type Labels = {
  liveLabel: string
  codeLabel: string
  packageLabel: string
  tagFilterLabel: string
  clearFilters: string
  noResults: string
  selectedCount: string
}

type ProjectsGalleryProps = {
  projects: LocalizedProject[]
  labels: Labels
}

const ProjectsGallery = ({ projects, labels }: ProjectsGalleryProps) => {
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set())

  const availableTags = useMemo(() => {
    const counts = new Map<string, number>()
    for (const project of projects) {
      for (const tag of project.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1)
      }
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([slug, count]) => ({ slug, count }))
  }, [projects])

  const filteredProjects = useMemo(() => {
    if (activeTags.size === 0) return projects
    return projects.filter((p) => p.tags.some((tag) => activeTags.has(tag)))
  }, [projects, activeTags])

  const toggleTag = (slug: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    })
  }

  return (
    <div className='w-full px-6 md:px-12 xl:px-24 pt-32 pb-24'>
      <div className='sticky top-20 z-10 -mx-6 md:-mx-12 xl:-mx-24 px-6 md:px-12 xl:px-24 py-4 backdrop-blur-md bg-[#1a191d]/80 border-b border-white/5'>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center justify-between gap-4 flex-wrap'>
            <div className='flex items-center gap-3'>
              <div className='w-9 h-9 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
                <svg
                  className='w-4 h-4 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'
                  />
                </svg>
              </div>
              <p className='text-lg font-semibold text-white font-poppins'>
                {labels.tagFilterLabel}
              </p>
              {activeTags.size > 0 && (
                <span className='text-sm text-blue-300 font-mono'>
                  {activeTags.size} {labels.selectedCount}
                </span>
              )}
            </div>
            {activeTags.size > 0 && (
              <button
                type='button'
                onClick={() => setActiveTags(new Set())}
                className='inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 text-sm transition-all'
              >
                <X className='w-4 h-4' />
                {labels.clearFilters}
              </button>
            )}
          </div>
          <div className='flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-2'>
            {availableTags.map(({ slug }) => (
              <TagChip
                key={slug}
                slug={slug}
                size='md'
                active={activeTags.has(slug)}
                onClick={() => toggleTag(slug)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className='mt-12 space-y-12'>
        {filteredProjects.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-32 text-center'>
            <p className='text-xl text-white/60 font-poppins'>
              {labels.noResults}
            </p>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <ProjectCard key={project.name} project={project} labels={labels} />
          ))
        )}
      </div>
    </div>
  )
}

type ProjectCardProps = {
  project: LocalizedProject
  labels: Labels
}

const ProjectCard = ({ project, labels }: ProjectCardProps) => {
  return (
    <article
      className='group relative grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-8 p-6 md:p-8 rounded-2xl border border-white/10 backdrop-blur-md transition-all duration-500 hover:border-white/20'
      style={{
        background:
          'linear-gradient(135deg, rgba(59, 130, 246, 0.06) 0%, rgba(147, 51, 234, 0.06) 50%, rgba(236, 72, 153, 0.06) 100%)',
      }}
    >
      <div className='relative overflow-hidden rounded-xl border border-white/10 self-start'>
        <Image
          src={`/projects/${project.image}`}
          alt={`${project.name} project screenshot`}
          width={800}
          height={500}
          className='w-full h-auto transition-transform duration-700 ease-out group-hover:scale-105'
        />
      </div>

      <div className='flex flex-col gap-5'>
        <div>
          <h3 className='text-3xl md:text-4xl font-bold text-white font-poppins mb-3'>
            {project.name}
          </h3>
          <p className='text-gray-300 leading-relaxed whitespace-pre-line'>
            {project.longDescription}
          </p>
        </div>

        {project.tags.length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {project.tags.map((tag) => (
              <TagChip key={tag} slug={tag} size='sm' />
            ))}
          </div>
        )}

        <div className='flex flex-wrap gap-3 pt-2'>
          {project.live && (
            <Link
              href={project.live}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all duration-300 hover:scale-105'
            >
              <ExternalLink className='w-4 h-4' />
              {labels.liveLabel}
            </Link>
          )}
          {project.source && (
            <Link
              href={project.source}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-200 bg-gray-800/80 hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-105'
            >
              <Github className='w-4 h-4' />
              {labels.codeLabel}
            </Link>
          )}
          {project.packageRegistry && (
            <Link
              href={project.packageRegistry}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-orange-200 bg-orange-500/20 hover:bg-orange-500/30 rounded-lg border border-orange-500/30 transition-all duration-300 hover:scale-105'
            >
              <PackageIcon className='w-4 h-4' />
              {labels.packageLabel}
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProjectsGallery
