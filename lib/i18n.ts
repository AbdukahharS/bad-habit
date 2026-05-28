export const locales = ['uz', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'uz'
export const SITE_URL = 'https://abdukahhar.uz'

export const isValidLocale = (value: string): value is Locale =>
  locales.includes(value as Locale)

export type ProjectCategory =
  | 'All'
  | 'Enterprise Applications'
  | 'Mobile Apps'
  | 'Desktop Apps'
  | 'Full-Stack Web Apps'
  | 'Landing Pages'
  | 'Documentation'
  | 'Design Work'
  | 'Libraries'

type Dictionary = {
  meta: {
    title: string
    description: string
    siteName: string
    openGraphLocale: string
  }
  nav: {
    expertise: string
    projects: string
    experience: string
    contact: string
    blog: string
    cirth: string
    language: string
    openMenu: string
    closeMenu: string
  }
  hero: {
    subtitle: string
  }
  expertise: {
    title: string
    subtitle: string
  }
  projects: {
    title: string
    filter: string
    live: string
    code: string
    package: string
  }
  experience: {
    title: string
    subtitle: string
    technologies: string
  }
  footer: {
    title: string
    description: string
    email: string
  }
  categories: Record<ProjectCategory, string>
}

const commonCategories: Record<ProjectCategory, string> = {
  All: 'All',
  'Enterprise Applications': 'Enterprise Applications',
  'Mobile Apps': 'Mobile Apps',
  'Desktop Apps': 'Desktop Apps',
  'Full-Stack Web Apps': 'Full-Stack Web Apps',
  'Landing Pages': 'Landing Pages',
  Documentation: 'Documentation',
  'Design Work': 'Design Work',
  Libraries: 'Libraries',
}

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    meta: {
      title: 'Shahzod Abdukahhar',
      description:
        'Full-Stack Software Engineer specializing in React, Next.js, Vue, and Node.js. Building enterprise applications, GIS platforms, SDKs, and SaaS products.',
      siteName: 'Shahzod Abdukahhar personal website',
      openGraphLocale: 'en_US',
    },
    nav: {
      expertise: 'expertise',
      projects: 'projects',
      experience: 'experience',
      contact: 'contact',
      blog: 'blog',
      cirth: 'cirth',
      language: 'language',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    hero: {
      subtitle: 'SOFTWARE ENGINEER, WEB DEVELOPER',
    },
    expertise: {
      title: 'Expertise',
      subtitle: 'Building scalable enterprise applications, GIS platforms, SDKs, and full-stack solutions',
    },
    projects: {
      title: 'My Projects',
      filter: 'Filter Projects',
      live: 'Live',
      code: 'Code',
      package: 'Package',
    },
    experience: {
      title: 'Experience',
      subtitle: 'My professional journey building production-grade software across diverse domains',
      technologies: 'Technologies & Tools',
    },
    footer: {
      title: "Let's build something amazing together",
      description:
        'From enterprise systems and GIS platforms to SaaS products and mobile apps — let\'s turn your idea into production-ready software.',
      email: 'Email',
    },
    categories: commonCategories,
  },
  uz: {
    meta: {
      title: 'Shahzod Abdukahhar',
      description:
        "React, Next.js, Vue va Node.js bo'yicha full-stack dasturchi. Korporativ ilovalar, GIS platformalari, SDK lar va SaaS mahsulotlarini ishlab chiqaman.",
      siteName: 'Shahzod Abdukahhar shaxsiy sayti',
      openGraphLocale: 'uz_UZ',
    },
    nav: {
      expertise: 'tajriba',
      projects: 'loyihalar',
      experience: 'faoliyat',
      contact: 'aloqa',
      blog: 'blog',
      cirth: 'cirth',
      language: 'til',
      openMenu: 'Menyuni ochish',
      closeMenu: 'Menyuni yopish',
    },
    hero: {
      subtitle: 'DASTURIY MUHANDIS, VEB DASTURCHI',
    },
    expertise: {
      title: 'Ko`nikmalar',
      subtitle:
        'Masshtablanuvchi korporativ ilovalar, GIS platformalari, SDK lar va full-stack yechimlar yarataman',
    },
    projects: {
      title: 'Loyihalarim',
      filter: 'Loyihalarni saralash',
      live: 'Sayt',
      code: 'Kod',
      package: 'Paket',
    },
    experience: {
      title: 'Tajriba',
      subtitle: 'Turli sohalarda production-darajadagi dasturiy ta\'minot yaratishdagi kasbiy yo\'lim',
      technologies: 'Texnologiyalar va vositalar',
    },
    footer: {
      title: 'Keling, birgalikda ajoyib mahsulot yarataylik',
      description:
        'Korporativ tizimlar va GIS platformalaridan tortib SaaS mahsulotlari va mobil ilovalargacha — g\'oyangizni production-darajadagi dasturiy ta\'minotga aylantiramiz.',
      email: 'Email',
    },
    categories: {
      All: 'Barchasi',
      'Enterprise Applications': 'Korporativ ilovalar',
      'Mobile Apps': 'Mobil ilovalar',
      'Desktop Apps': 'Desktop ilovalar',
      'Full-Stack Web Apps': 'Full-Stack veb-ilovalar',
      'Landing Pages': 'Landing sahifalar',
      Documentation: 'Hujjatlar',
      'Design Work': 'Dizayn ishlari',
      Libraries: 'Kutubxonalar',
    },
  },
}

export const getDictionary = (locale: Locale) => dictionaries[locale]
