import { WARZONE_OG, PAGE_IMAGES } from './images'

export const SITE_URL = 'https://www.warzonecheats.uk'
export const SITE_NAME = 'Warzone Cheats'
export const SITE_HOST = 'www.warzonecheats.uk'

/**
 * Sole purpose — used in schema + about copy.
 * Single-product site: Warzone cheats for PC (UK + worldwide).
 */
export const SITE_PURPOSE =
  'Buy undetected Warzone cheats for Call of Duty: Warzone on Windows PC — Aimbot, ESP, wallhack, radar hack and live Ricochet status with instant digital delivery.'

export const SITE_ABOUT = [
  'Warzone cheats',
  'buy Warzone cheats',
  'Warzone aimbot',
  'Warzone ESP',
  'Warzone wallhack',
  'Warzone radar hack',
  'undetected Warzone cheats',
  'Warzone PC cheats',
  'Warzone cheats UK',
  'Ricochet Warzone cheats',
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
    title: 'Warzone Cheats | Aimbot, ESP, Wallhack & Radar',
    description:
      'Buy Warzone cheats for PC — undetected Aimbot, ESP, wallhack and radar from $6.90. Check Ricochet status, then checkout for UK and worldwide delivery.',
    path: '/',
    ogType: 'website',
    image: PAGE_IMAGES.home.src,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  },
  forums: {
    title: 'Warzone Cheats Guides | Aimbot, ESP Setup & Status',
    description:
      'Commercial Warzone cheats guides — Aimbot settings, ESP/wallhack, radar, antivirus exclusions, loader setup and Ricochet Undetected checks before you buy.',
    path: '/forums',
    ogType: 'website',
    image: PAGE_IMAGES.forums.src,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  },
  reviews: {
    title: 'Warzone Cheats Reviews | Verified Buyer Feedback',
    description:
      'Read Warzone cheats reviews on Aimbot, ESP, wallhack and Ricochet rebuilds before you buy a licence for PC.',
    path: '/reviews',
    ogType: 'website',
    image: PAGE_IMAGES.reviews.src,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  },
  faq: {
    title: 'Warzone Cheats FAQ | Price, Ricochet & Setup',
    description:
      'FAQ for buying Warzone cheats on Windows PC — price, Aimbot/ESP features, Ricochet status, loader setup and delivery.',
    path: '/faq',
    ogType: 'website',
    image: PAGE_IMAGES.faq.src,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  },
  support: {
    title: 'Warzone Cheats Support | Loader, Delivery & Setup',
    description:
      'Get help buying and loading Warzone cheats — delivery email, Windows setup, antivirus exclusions, loader errors and Ricochet updates.',
    path: '/support',
    ogType: 'website',
    image: PAGE_IMAGES.support.src,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  },
  product: {
    title: 'Warzone Cheats Features & Price | Aimbot, ESP, Radar',
    description:
      'Compare Warzone cheats features and price — Aimbot, ESP, wallhack, radar hack, stream-proof mode and current Ricochet compatibility before checkout.',
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
  h2About: 'Built for Warzone players who want clear status before checkout',
  h2Access: 'Buy Warzone Cheats',
  h2Faq: 'Warzone Cheats FAQ',
} as const

export function absoluteUrl(path: string) {
  if (!path || path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
