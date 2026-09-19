import { DAYZ_OG } from './images'
import { PAGE_OG } from './og'

export const SITE_URL = 'https://dayzcheats.io'
export const SITE_NAME = 'DayZ Cheats'
export const SITE_HOST = 'dayzcheats.io'

/**
 * Sole purpose — used in schema + about copy.
 * Single-product site: DayZ / DayZ Standalone cheats for PC (worldwide).
 * Canonical host is apex https://dayzcheats.io (www 301s to apex in the Worker).
 */
export const SITE_PURPOSE =
  'Buy DayZ cheats for DayZ Standalone on Windows PC — silent-aim Aimbot, player and loot ESP, wallhack, radar hack and live BattlEye status with instant digital delivery.'

export const SITE_ABOUT = [
  'dayz cheats',
  'dayz cheat',
  'dayz hacks',
  'dayz hack',
  'dayz standalone cheats',
  'dayz aimbot',
  'dayz esp',
  'dayz wallhack',
  'dayz radar hack',
  'battleye dayz cheats',
  'dayz cheat aimbot',
] as const

/** Offer price shown on product schema + purchase UI. */
export const PRODUCT_PRICE_USD = '4.90'

export const SEO_REGIONS = [
  { hreflang: 'en', label: 'English' },
  { hreflang: 'x-default', label: 'Default' },
] as const

export const OG_IMAGE = DAYZ_OG

export type PageSeo = {
  title: string
  description: string
  path: string
  ogType?: 'website' | 'article' | 'product'
  /** Prefer /og/*.jpg (1200x630) for Google SERP thumbnails */
  image?: string
  imageAlt?: string
  robots?: string
}

const INDEX_ROBOTS =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

export const SEO = {
  home: {
    title: 'DayZ Cheats | DayZ Cheat Aimbot, ESP & Hacks',
    description:
      'Buy DayZ cheats for DayZ Standalone — silent aim Aimbot, player and loot ESP, wallhack and radar hack from $4.90. Check live BattlEye status, then checkout.',
    path: '/',
    ogType: 'website',
    image: PAGE_OG.home,
    imageAlt: 'DayZ Cheats — DayZ Aimbot, ESP and radar hack for PC',
    robots: INDEX_ROBOTS,
  },
  forums: {
    title: 'DayZ Cheats Guides | Aimbot, ESP, Radar & Status',
    description:
      'DayZ cheats guides hub — silent aim, player and loot ESP, radar hack, antivirus exclusions, loader setup and BattlEye status articles before you buy.',
    path: '/forums',
    ogType: 'website',
    image: PAGE_OG.forums,
    imageAlt: 'DayZ Cheats setup guides for Aimbot, ESP and BattlEye',
    robots: INDEX_ROBOTS,
  },
  reviews: {
    title: 'DayZ Cheats Reviews | Buyer Feedback on DayZ Hacks',
    description:
      'Read DayZ cheats reviews covering silent aim, player ESP, loot ESP and BattlEye rebuilds before you buy a DayZ Standalone license for PC.',
    path: '/reviews',
    ogType: 'website',
    image: PAGE_OG.reviews,
    imageAlt: 'DayZ Cheats buyer reviews for DayZ Standalone',
    robots: INDEX_ROBOTS,
  },
  faq: {
    title: 'DayZ Cheats FAQ | Price, BattlEye Status & Setup',
    description:
      'FAQ for buying DayZ cheats on Windows PC — price, Aimbot and ESP features, BattlEye status, private server support, loader setup and delivery.',
    path: '/faq',
    ogType: 'website',
    image: PAGE_OG.faq,
    imageAlt: 'DayZ Cheats FAQ — price, BattlEye and setup',
    robots: INDEX_ROBOTS,
  },
  support: {
    title: 'DayZ Cheats Support | Loader, Delivery & Setup Help',
    description:
      'Get help buying and loading DayZ cheats — delivery email, Windows setup, antivirus exclusions, loader errors and BattlEye status updates.',
    path: '/support',
    ogType: 'website',
    image: PAGE_OG.support,
    imageAlt: 'DayZ Cheats support for loader and delivery help',
    robots: INDEX_ROBOTS,
  },
  product: {
    title: 'DayZ Cheats Price & Checkout | Aimbot, ESP, Radar',
    description:
      'DayZ cheats price and checkout — silent aim Aimbot, player ESP, loot ESP, wallhack, radar hack, spoofer and live BattlEye status from $4.90.',
    path: '/dayz-cheats',
    ogType: 'product',
    image: PAGE_OG.product,
    imageAlt: 'DayZ Aimbot, ESP and radar hack product details',
    robots: INDEX_ROBOTS,
  },
} as const satisfies Record<string, PageSeo>

export const HOME_HEADINGS = {
  h1: 'DayZ Cheats — DayZ Cheat Aimbot, ESP & Hacks',
  h2Features: 'DayZ Aimbot, ESP, loot ESP & radar hack',
  h2Featured: 'DayZ ESP and silent aim Aimbot',
  h2About: 'Clear BattlEye status before you buy DayZ cheats',
  h2Access: 'Buy DayZ Cheats',
  h2Faq: 'DayZ Cheats FAQ',
} as const

export function absoluteUrl(path: string) {
  if (!path || path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
