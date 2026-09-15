import { WARZONE_OG, PAGE_IMAGES } from './images'

export const SITE_URL = 'https://warzonecheats.uk'
export const SITE_NAME = 'Warzone Cheats'
export const SITE_HOST = 'warzonecheats.uk'

/**
 * Sole purpose — used in schema + about copy.
 * Single-product site: Warzone cheats for PC (UK + worldwide).
 */
export const SITE_PURPOSE =
  'Warzone Cheats covers undetected Aimbot, ESP, wallhack, radar and live Ricochet status for Call of Duty: Warzone on Windows PC — built for UK and worldwide players.'

export const SITE_ABOUT = [
  'Warzone Cheats',
  'Warzone cheats UK',
  'Warzone aimbot',
  'Warzone ESP',
  'Warzone wallhack',
  'Warzone radar hack',
  'undetected Warzone cheats',
  'Warzone PC cheats',
  'BO7 Warzone cheats',
  'Ricochet Warzone',
] as const

/** Offer price shown on product schema + purchase UI. */
export const PRODUCT_PRICE_USD = '6.90'

export const SEO_REGIONS = [
  { hreflang: 'en-GB', label: 'United Kingdom' },
  { hreflang: 'en', label: 'English' },
  { hreflang: 'x-default', label: 'Default' },
] as const

export const OG_IMAGE = WARZONE_OG

export type PageSeo = {
  title: string
  description: string
  path: string
  ogType?: 'website' | 'article' | 'product'
  image?: string
  robots?: string
}

export const SEO = {
  home: {
    title: 'Warzone Cheats UK | Aimbot, ESP, Wallhack & Radar',
    description:
      'Buy undetected Warzone cheats for PC in the UK and worldwide — Aimbot, ESP, wallhack, radar hack and live Ricochet status for Call of Duty Warzone.',
    path: '/',
    ogType: 'website',
    image: PAGE_IMAGES.home.src,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  },
  forums: {
    title: 'Warzone Cheats Guides | Setup, Aimbot, ESP & Status',
    description:
      'Warzone cheats guides covering Aimbot settings, ESP, radar, stream-proof setup, antivirus exclusions and Ricochet status for UK PC players.',
    path: '/forums',
    ogType: 'website',
    image: PAGE_IMAGES.forums.src,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  },
  reviews: {
    title: 'Warzone Cheats Reviews | Before You Buy',
    description:
      'Player feedback on Warzone Aimbot, ESP, wallhack and Ricochet rebuilds before you choose a UK or worldwide licence.',
    path: '/reviews',
    ogType: 'website',
    image: PAGE_IMAGES.reviews.src,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  },
  faq: {
    title: 'Warzone Cheats FAQ | UK PC, Ricochet & Setup',
    description:
      'Answers about Warzone cheats on Windows PC, UK delivery, Aimbot/ESP features, Ricochet updates and loader status.',
    path: '/faq',
    ogType: 'website',
    image: PAGE_IMAGES.faq.src,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  },
  support: {
    title: 'Warzone Cheats Support | Loader & Setup Help',
    description:
      'Support for Warzone cheats delivery, Windows setup, loader errors, Ricochet updates and order questions on warzonecheats.uk.',
    path: '/support',
    ogType: 'website',
    image: PAGE_IMAGES.support.src,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  },
  product: {
    title: 'Warzone Cheats Features | Aimbot, ESP & Radar Hack',
    description:
      'Compare Warzone Aimbot, ESP, wallhack, radar hack, stream-proof options and current Ricochet compatibility for PC.',
    path: '/warzone-cheats',
    ogType: 'product',
    image: PAGE_IMAGES.product.src,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  },
} as const satisfies Record<string, PageSeo>

export const HOME_HEADINGS = {
  h1: 'Warzone Cheats for PC',
  h2Features: 'Aimbot, ESP, wallhack & radar',
  h2Featured: 'Warzone ESP and Aimbot',
  h2About: 'Built for Warzone players in the UK and worldwide',
  h2Access: 'Get Warzone Cheats',
  h2Faq: 'Warzone Cheats FAQ',
} as const

export function absoluteUrl(path: string) {
  if (!path || path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
