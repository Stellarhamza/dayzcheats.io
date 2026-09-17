import { TARKOV_OG, PAGE_IMAGES } from './images'

export const SITE_URL = 'https://tarkovcheats.io'
export const SITE_NAME = 'Tarkov Cheats'
export const SITE_HOST = 'tarkovcheats.io'

/**
 * Sole purpose — used in schema + about copy.
 * Single-product site: Escape from Tarkov / EFT cheats for PC (worldwide).
 */
export const SITE_PURPOSE =
  'Buy undetected Escape from Tarkov cheats for EFT on Windows PC — Aimbot, ESP, wallhack, loot filter, radar and live BattlEye status with instant digital delivery.'

export const SITE_ABOUT = [
  'tarkov cheats',
  'escape from tarkov cheats',
  'eft cheats',
  'tarkov aimbot',
  'tarkov ESP',
  'tarkov wallhack',
  'eft aimbot',
  'eft ESP',
  'undetected tarkov cheats',
  'BattlEye tarkov cheats',
  'escape from tarkov hacks',
] as const

/** Offer price shown on product schema + purchase UI. */
export const PRODUCT_PRICE_USD = '11.90'

export const SEO_REGIONS = [
  { hreflang: 'en', label: 'English' },
  { hreflang: 'x-default', label: 'Default' },
] as const

export const OG_IMAGE = TARKOV_OG

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
    title: 'Tarkov Cheats | Escape from Tarkov & EFT Aimbot, ESP',
    description:
      'Buy Tarkov cheats for Escape from Tarkov (EFT) — undetected Aimbot, ESP, wallhack, loot filter and radar from $11.90. Check BattlEye status, then checkout.',
    path: '/',
    ogType: 'website',
    image: PAGE_IMAGES.home.src,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  },
  forums: {
    title: 'Tarkov Cheats Guides | EFT Aimbot, ESP Setup & Status',
    description:
      'Escape from Tarkov cheats guides — Aimbot, ESP, loot filter, radar, antivirus exclusions, loader setup and BattlEye Undetected checks before you buy.',
    path: '/forums',
    ogType: 'website',
    image: PAGE_IMAGES.forums.src,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  },
  reviews: {
    title: 'Tarkov Cheats Reviews | EFT Buyer Feedback',
    description:
      'Read Escape from Tarkov cheats reviews on Aimbot, ESP, loot ESP and BattlEye rebuilds before you buy an EFT license for PC.',
    path: '/reviews',
    ogType: 'website',
    image: PAGE_IMAGES.reviews.src,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  },
  faq: {
    title: 'Tarkov Cheats FAQ | EFT Price, BattlEye & Setup',
    description:
      'FAQ for buying Escape from Tarkov cheats (EFT) on Windows PC — price, Aimbot/ESP features, BattlEye status, loader setup and delivery.',
    path: '/faq',
    ogType: 'website',
    image: PAGE_IMAGES.faq.src,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  },
  support: {
    title: 'Tarkov Cheats Support | EFT Loader, Delivery & Setup',
    description:
      'Get help buying and loading Escape from Tarkov cheats — delivery email, Windows setup, antivirus exclusions, loader errors and BattlEye updates.',
    path: '/support',
    ogType: 'website',
    image: PAGE_IMAGES.support.src,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  },
  product: {
    title: 'EFT Cheats Features & Price | Tarkov Aimbot, ESP, Radar',
    description:
      'Compare Escape from Tarkov cheats features and price — Aimbot, ESP, wallhack, loot filter, radar, HWID spoofer and BattlEye status before checkout.',
    path: '/tarkov-cheats',
    ogType: 'product',
    image: PAGE_IMAGES.product.src,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  },
} as const satisfies Record<string, PageSeo>

export const HOME_HEADINGS = {
  h1: 'Tarkov Cheats for Escape from Tarkov',
  h2Features: 'EFT Aimbot, ESP, loot filter & radar',
  h2Featured: 'Escape from Tarkov ESP and Aimbot',
  h2About: 'Built for EFT players who want clear BattlEye status before checkout',
  h2Access: 'Buy Tarkov Cheats',
  h2Faq: 'Tarkov Cheats FAQ',
} as const

export function absoluteUrl(path: string) {
  if (!path || path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
