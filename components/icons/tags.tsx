import Image from 'next/image'

export type TagSlug =
  | 'nextjs'
  | 'react'
  | 'happy-dom'
  | 'testing-library'
  | 'react-testing-library'
  | 'typescript'
  | 'tailwind'
  | 'shadcn'
  | 'framer-motion'
  | 'gsap'
  | 'zustand'
  | 'tanstack-query'
  | 'tanstack-router'
  | 'nestjs'
  | 'prisma'
  | 'postgres'
  | 'jwt'
  | 'aws-s3'
  | 'swagger'
  | 'supabase'
  | 'tiptap'
  | 'vite'
  | 'canvas'
  | 'exceljs'
  | 'bun-package-manager'
  | 'bun-runtime'
  | 'bun-test'
  | 'elysia'
  | 'drizzle'
  | 'bullmq'
  | 'redis'
  | 'better-auth'
  | 'pwa'
  | 'eden-treaty'
  | 'react-pdf'
  | 'react-hook-form'
  | 'zod'
  | 'axios'
  | 'tauri'
  | 'geolocation'
  | 'maplibre'
  | 'leaflet'
  | 'openlayers'
  | 'recharts'
  | 'i18n'
  | 'nuxt'
  | 'vue'
  | 'nuxt-ui'
  | 'docker'
  | 'vitest'
  | 'rollup'
  | 'rolldown'
  | 'tsdown'
  | 'flutter'
  | 'dart'
  | 'dio'
  | 'pinia'
  | 'chartjs'
  | 'yarrow-sdk'
  | 'mui'
  | 'firebase'
  | 'payme'
  | 'sonner'
  | 'clerk'
  | 'blocknote'
  | 'apexcharts'
  | 'nextron'
  | 'electron'
  | 'bootstrap'
  | 'ajax'
  | 'jquery'
  | 'fontawesome'
  | 'sass'
  | 'styled-components'
  | 'mongodb'
  | 'mongoose'
  | 'figma'
  | 'turborepo'
  | 'github-actions'
  | 'web-push'
  | 'websocket'
  | 'cloudflare-r2'
  | 'git'
  | 'js'
  | 'rest-api'
  | 'biome'
  | 'caddy'
  | 'vercel'
  | 'click'
  | 'gitlab-ci'
  | 'prismjs'
  | 'markdown'
  | 'pake'

export type TagMeta = {
  label: string
  iconFile?: string
}

export const TAG_REGISTRY: Record<TagSlug, TagMeta> = {
  nextjs: { label: 'Next.js', iconFile: 'nextjs.svg' },
  react: { label: 'React', iconFile: 'react.svg' },
  'happy-dom': { label: 'Happy DOM' },
  'testing-library': {
    label: 'Testing Library',
    iconFile: 'testing-library.png',
  },
  'react-testing-library': {
    label: 'React Testing Library',
    iconFile: 'testing-library.png',
  },
  typescript: { label: 'TypeScript', iconFile: 'typescript.svg' },
  tailwind: { label: 'Tailwind CSS', iconFile: 'tailwind.svg' },
  shadcn: { label: 'shadcn/ui', iconFile: 'shadcn-ui.svg' },
  'framer-motion': { label: 'Framer Motion', iconFile: 'framer-motion.svg' },
  gsap: { label: 'GSAP', iconFile: 'gsap.svg' },
  zustand: { label: 'Zustand', iconFile: 'zustand.svg' },
  'tanstack-query': { label: 'TanStack Query', iconFile: 'tanstack-query.svg' },
  'tanstack-router': { label: 'TanStack Router', iconFile: 'tanstack.png' },
  nestjs: { label: 'NestJS', iconFile: 'nestjs.svg' },
  prisma: { label: 'Prisma', iconFile: 'prisma.svg' },
  postgres: { label: 'PostgreSQL', iconFile: 'postgres.svg' },
  jwt: { label: 'JWT', iconFile: 'jwt.svg' },
  'aws-s3': { label: 'AWS S3', iconFile: 'aws.svg' },
  swagger: { label: 'Swagger', iconFile: 'swagger.svg' },
  supabase: { label: 'Supabase', iconFile: 'supabase.svg' },
  tiptap: { label: 'TipTap', iconFile: 'tiptap.jpg' },
  vite: { label: 'Vite', iconFile: 'vite.svg' },
  canvas: { label: 'Canvas' },
  exceljs: { label: 'ExcelJS' },
  'bun-package-manager': { label: 'Bun Package Manager', iconFile: 'bun.svg' },
  'bun-runtime': { label: 'Bun Runtime', iconFile: 'bun.svg' },
  'bun-test': { label: 'Bun Test', iconFile: 'bun.svg' },
  elysia: { label: 'Elysia', iconFile: 'elysia.png' },
  drizzle: { label: 'Drizzle ORM', iconFile: 'drizzle.svg' },
  bullmq: { label: 'BullMQ', iconFile: 'bullmq.ico' },
  redis: { label: 'Redis', iconFile: 'redis.svg' },
  'better-auth': { label: 'Better Auth', iconFile: 'betterauth.svg' },
  pwa: { label: 'PWA', iconFile: 'pwa.webp' },
  'eden-treaty': { label: 'Eden Treaty', iconFile: 'elysia.png' },
  'react-pdf': { label: 'React PDF', iconFile: 'react-pdf.png' },
  'react-hook-form': {
    label: 'React Hook Form',
    iconFile: 'react-hook-form.png',
  },
  zod: { label: 'Zod', iconFile: 'zod.svg' },
  axios: { label: 'Axios', iconFile: 'axios.svg' },
  tauri: { label: 'Tauri', iconFile: 'tauri.svg' },
  geolocation: { label: 'Geolocation' },
  maplibre: { label: 'MapLibre GL', iconFile: 'maplibre.svg' },
  leaflet: { label: 'Leaflet', iconFile: 'leaflet.ico' },
  openlayers: { label: 'OpenLayers', iconFile: 'openlayers.png' },
  recharts: { label: 'Recharts' },
  i18n: { label: 'i18n' },
  nuxt: { label: 'Nuxt', iconFile: 'nuxt.svg' },
  vue: { label: 'Vue', iconFile: 'vue.svg' },
  'nuxt-ui': { label: '@nuxt/ui', iconFile: 'nuxt.svg' },
  docker: { label: 'Docker', iconFile: 'docker.svg' },
  vitest: { label: 'Vitest', iconFile: 'vitest.svg' },
  rollup: { label: 'Rollup', iconFile: 'rollup.svg' },
  rolldown: { label: 'Rolldown', iconFile: 'rolldown.svg' },
  tsdown: { label: 'tsdown', iconFile: 'tsdown.svg' },
  flutter: { label: 'Flutter', iconFile: 'flutter.svg' },
  dart: { label: 'Dart', iconFile: 'dart.svg' },
  dio: { label: 'Dio', iconFile: 'dart.svg' },
  pinia: { label: 'Pinia', iconFile: 'pinia.svg' },
  chartjs: { label: 'Chart.js', iconFile: 'chartjs.svg' },
  'yarrow-sdk': { label: 'Yarrow Map SDK', iconFile: 'yarrow.png' },
  mui: { label: 'Material UI', iconFile: 'mui.svg' },
  firebase: { label: 'Firebase', iconFile: 'firebase.svg' },
  payme: { label: 'Payme', iconFile: 'payme.jpg' },
  sonner: { label: 'Sonner' },
  clerk: { label: 'Clerk', iconFile: 'clerk.svg' },
  blocknote: { label: 'Blocknote', iconFile: 'blocknote.png' },
  apexcharts: { label: 'ApexCharts' },
  nextron: { label: 'Nextron', iconFile: 'electron.svg' },
  electron: { label: 'Electron', iconFile: 'electron.svg' },
  bootstrap: { label: 'Bootstrap', iconFile: 'bootstrap.svg' },
  ajax: { label: 'Ajax' },
  jquery: { label: 'jQuery', iconFile: 'jquery.svg' },
  fontawesome: { label: 'Font Awesome', iconFile: 'font-awesome.svg' },
  sass: { label: 'Sass', iconFile: 'sass.svg' },
  'styled-components': {
    label: 'Styled Components',
    iconFile: 'styled-components.svg',
  },
  mongodb: { label: 'MongoDB', iconFile: 'mongodb.svg' },
  mongoose: { label: 'Mongoose', iconFile: 'mongoose.svg' },
  figma: { label: 'Figma', iconFile: 'figma.svg' },
  turborepo: { label: 'Turborepo', iconFile: 'turborepo.svg' },
  'github-actions': { label: 'GitHub Actions', iconFile: 'github.svg' },
  'web-push': { label: 'Web Push' },
  websocket: { label: 'WebSocket' },
  'cloudflare-r2': { label: 'Cloudflare R2', iconFile: 'cloudflare.svg' },
  git: { label: 'Git', iconFile: 'git.svg' },
  js: { label: 'JavaScript', iconFile: 'js.svg' },
  'rest-api': { label: 'REST API' },
  biome: { label: 'Biome', iconFile: 'biome.svg' },
  caddy: { label: 'Caddy', iconFile: 'caddy.png' },
  vercel: { label: 'Vercel', iconFile: 'vercel.svg' },
  click: { label: 'Click', iconFile: 'click.png' },
  'gitlab-ci': { label: 'GitLab CI', iconFile: 'gitlab.svg' },
  prismjs: { label: 'PrismJS', iconFile: 'prismjs.svg' },
  markdown: { label: 'Markdown' },
  pake: { label: 'Pake' },
}

export const ALL_TAG_SLUGS = (Object.keys(TAG_REGISTRY) as TagSlug[]).sort(
  (a, b) => TAG_REGISTRY[a].label.localeCompare(TAG_REGISTRY[b].label),
)

export const isTagSlug = (value: string): value is TagSlug =>
  Object.hasOwn(TAG_REGISTRY, value)

export const getTag = (slug: string): TagMeta => {
  if (isTagSlug(slug)) return TAG_REGISTRY[slug]
  return { label: slug }
}

type TagChipProps = {
  slug: string
  size?: 'sm' | 'md'
  active?: boolean
  onClick?: () => void
  className?: string
}

export const TagChip = ({
  slug,
  size = 'sm',
  active,
  onClick,
  className = '',
}: TagChipProps) => {
  const tag = getTag(slug)
  const interactive = typeof onClick === 'function'
  const sizeClasses =
    size === 'md' ? 'px-3 py-1.5 text-sm gap-2' : 'px-2 py-1 text-xs gap-1.5'
  const iconPx = size === 'md' ? 26 : 22
  const baseClasses =
    'inline-flex items-center font-medium rounded-full border backdrop-blur-sm transition-all duration-300'
  const stateClasses = active
    ? 'bg-white/20 text-white border-white/50 shadow-md shadow-black/30'
    : 'text-white/85 border-white/15 hover:border-white/30 bg-white/5'

  const content = (
    <>
      {tag.iconFile && (
        <Image
          src={`/icons/tags/${tag.iconFile}`}
          alt=''
          width={iconPx}
          height={iconPx}
          className='shrink-0'
          aria-hidden='true'
        />
      )}
      <span>{tag.label}</span>
    </>
  )

  if (interactive) {
    return (
      <button
        type='button'
        onClick={onClick}
        className={`${baseClasses} ${sizeClasses} ${stateClasses} cursor-pointer hover:scale-105 ${className}`}
      >
        {content}
      </button>
    )
  }

  return (
    <span
      className={`${baseClasses} ${sizeClasses} ${stateClasses} ${className}`}
    >
      {content}
    </span>
  )
}
