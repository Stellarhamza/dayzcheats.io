export type GameStatus = 'Undetected' | 'Updating' | 'Use with caution'

export type Game = {
  slug: string
  name: string
  status: GameStatus
  popular?: boolean
}

/** Site is The Isle Cheats only — no other titles in the catalog. */
export const GAMES: Game[] = [
  { slug: 'isle', name: 'The Isle', status: 'Undetected', popular: true },
]

export function getGame(slug: string) {
  return GAMES.find((g) => g.slug === slug)
}

export function guidePath(slug: string) {
  return `/${slug}-cheats`
}

export function parseGuideSlug(param: string) {
  return param.endsWith('-cheats') ? param.slice(0, -7) : param
}

/**
 * Feature list tuned to what ranks for The Isle Cheats
 * Feature bullets for the product page — ESP & awareness first.
 */
export const GUIDE_FEATURES = [
  {
    name: 'Entity ESP / Wallhack',
    text: 'Players and dinos through fog — growth, distance, class, and health when the build supports it.',
  },
  {
    name: 'World ESP',
    text: 'Food, water, corpses, and survival props so you stop guessing the next meal on Evrima.',
  },
  {
    name: '2D Radar',
    text: 'Map-style awareness for dinos and players nearby — pair with ESP for clean rotates.',
  },
  {
    name: 'HWID Spoofer',
    text: 'Hardware reset path after an EAC ban. Pair with Undetected status before you inject.',
  },
  {
    name: 'Stream-proof mode',
    text: 'Hide The Isle Cheats overlays from capture software when you clip or go live.',
  },
  {
    name: 'Optional aim assist',
    text: 'Available if you want it — most buyers want ESP / radar first, not sticky aim.',
  },
  {
    name: 'Evrima + Horde ready',
    text: 'Built for modern The Isle branches players actually search — Evrima first, Horde when supported.',
  },
  {
    name: 'Patch status + support',
    text: 'Undetected / Updating marked after EAC and Isle patches. Instant delivery on supported builds.',
  },
] as const

/** @deprecated use PRODUCT_PAGE_FAQS from faqs.ts — kept as alias */
export { PRODUCT_PAGE_FAQS as PRODUCT_FAQS } from './faqs'
