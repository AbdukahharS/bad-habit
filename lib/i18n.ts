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
        'Software Engineer and Web Developer specializing in React, NextJS, and Node.js',
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
    },
    hero: {
      subtitle: 'SOFTWARE ENGINEER, WEB DEVELOPER',
    },
    expertise: {
      title: 'Expertise',
      subtitle: 'Crafting exceptional web experiences with modern technologies',
    },
    projects: {
      title: 'My Projects',
      filter: 'Filter Projects',
      live: 'Live',
      code: 'Code',
    },
    experience: {
      title: 'Experience',
      subtitle: 'My professional journey building innovative web solutions',
      technologies: 'Technologies & Tools',
    },
    footer: {
      title: "Let's build something amazing together",
      description:
        'Have an exciting project you need help with? Send me an email or contact me via instant message!',
      email: 'Email',
    },
    categories: commonCategories,
  },
  uz: {
    meta: {
      title: 'Shahzod Abdukahhar',
      description:
        "React, NextJS va Node.js bo'yicha ixtisoslashgan dasturchi va veb-ishlab chiquvchi",
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
    },
    hero: {
      subtitle: 'DASTURIY MUHANDIS, VEB DASTURCHI',
    },
    expertise: {
      title: 'Ko`nikmalar',
      subtitle: 'Zamonaviy texnologiyalar bilan samarali veb-yechimlar yarataman',
    },
    projects: {
      title: 'Loyihalarim',
      filter: 'Loyihalarni saralash',
      live: 'Sayt',
      code: 'Kod',
    },
    experience: {
      title: 'Tajriba',
      subtitle: 'Innovatsion veb-yechimlar yaratishdagi kasbiy yo`lim',
      technologies: 'Texnologiyalar va vositalar',
    },
    footer: {
      title: 'Keling, birgalikda ajoyib mahsulot yarataylik',
      description:
        'Qiziqarli loyiha bormi? Menga email yozing yoki tezkor messenjer orqali bog`laning.',
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
