import { blogPath } from './blog-paths'

/** Official Warzone destinations for factual game context. */
export const OFFICIAL_WARZONE_LINKS = [
  {
    label: 'Call of Duty: Warzone',
    href: 'https://www.callofduty.com/warzone',
    description: 'Official Warzone game page',
  },
  {
    label: 'Warzone on Battle.net',
    href: 'https://battle.net/support/en/article/000364203',
    description: 'Official PC download and support',
  },
  {
    label: 'Activision Support',
    href: 'https://support.activision.com/',
    description: 'Publisher support and account help',
  },
] as const

/** @deprecated alias */
export const OFFICIAL_WARDOGS_LINKS = OFFICIAL_WARZONE_LINKS

/** Primary internal routes for crawl equity. */
export const SITE_PAGE_LINKS = [
  { label: 'Home', to: '/', description: 'Live status, price and checkout' },
  {
    label: 'Product page',
    to: '/warzone-cheats',
    description: 'Aimbot, ESP, radar and compatibility details',
  },
  {
    label: 'Forums index',
    to: '/forums',
    description: 'Setup forums — Aimbot, ESP, load, status',
  },
  {
    label: 'Player reviews',
    to: '/reviews',
    description: 'Player reviews and ratings',
  },
  {
    label: 'FAQ answers',
    to: '/faq',
    description: 'Frequently asked questions',
  },
  {
    label: 'Support desk',
    to: '/support',
    description: 'Delivery, loader and setup help',
  },
  {
    label: 'Privacy policy',
    to: '/privacy',
    description: 'Order data and site privacy',
  },
  {
    label: 'Terms of use',
    to: '/terms',
    description: 'License rules and risk disclaimer',
  },
  {
    label: 'Refund policy',
    to: '/refunds',
    description: 'When digital license refunds apply',
  },
] as const

export const SITE_GUIDE_LINKS = [
  { label: 'Features list guide', to: blogPath('features-list') },
  { label: 'Aimbot settings guide', to: blogPath('aimbot-settings') },
  { label: 'ESP & wallhack guide', to: blogPath('esp-wallhack-guide') },
  { label: 'Radar hack guide', to: blogPath('radar-hack-guide') },
  { label: 'Hotkeys guide', to: blogPath('hotkeys') },
  { label: 'Complete setup guide', to: blogPath('complete-setup') },
  { label: 'Windows setup guide', to: blogPath('windows-setup') },
  { label: 'Antivirus exclusion guide', to: blogPath('disable-antivirus') },
  { label: 'Stream-proof setup', to: blogPath('stream-proof-setup') },
  { label: 'Ricochet status guide', to: blogPath('ricochet-status') },
  { label: 'Ranked play guide', to: blogPath('ranked-play-guide') },
  { label: 'Loader errors guide', to: blogPath('loader-errors') },
  { label: 'Undetected status guide', to: blogPath('undetected-status') },
] as const

const CHECKOUT_HOST = ['za', 'deyo', '.com'].join('')
const CHECKOUT_REF = ['Q', 'R', 'H'].join('')
const CHECKOUT_PRODUCT = '/products/warzone-cheats'

export const CHECKOUT_URL = `https://${CHECKOUT_HOST}/go/${CHECKOUT_REF}?to=${encodeURIComponent(CHECKOUT_PRODUCT)}`

export function getCheckoutUrl(_productSlug?: string): string {
  return CHECKOUT_URL
}

export const CHECKOUT_REL = 'nofollow noopener noreferrer'
