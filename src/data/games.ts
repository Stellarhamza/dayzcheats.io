export type GameStatus = 'Undetected' | 'Updating' | 'Use with caution'

export type Game = {
  slug: string
  name: string
  status: GameStatus
  popular?: boolean
}

/** Site is Warzone Cheats only — no other titles in the catalog. */
export const GAMES: Game[] = [
  { slug: 'warzone', name: 'Warzone', status: 'Undetected', popular: true },
]

export function getGame(slug: string) {
  return GAMES.find((g) => g.slug === slug)
}

export function guidePath(slug: string) {
  return `/${slug.toLowerCase()}-cheats`
}

export function parseGuideSlug(param: string) {
  const lower = param.toLowerCase()
  return lower.endsWith('-cheats') ? lower.slice(0, -7) : lower
}

export const GUIDE_FEATURES = [
  {
    name: 'Warzone Aimbot',
    text: 'Smooth, humanized Aimbot with FOV, smoothing and hitbox controls so shots look natural in Warzone lobbies.',
  },
  {
    name: 'Player ESP / Wallhack',
    text: 'See enemies through buildings and terrain with distance, health and team information when supported.',
  },
  {
    name: 'Loot & World ESP',
    text: 'Highlight high-value loot, contracts and world items so you rotate with better information.',
  },
  {
    name: 'Radar Hack',
    text: '2D radar awareness for off-screen threats across Verdansk-style and current Warzone maps.',
  },
  {
    name: 'Stream-proof mode',
    text: 'Keep supported overlays out of common capture software when you stream or clip.',
  },
  {
    name: 'Triggerbot (optional)',
    text: 'Optional trigger assistance where the current build supports it — leave off for a lower footprint.',
  },
  {
    name: 'Windows PC support',
    text: 'Built for Windows 10 and 11 on Intel and AMD CPUs with straightforward loader setup.',
  },
  {
    name: 'Ricochet status + support',
    text: 'Undetected or Updating status is reviewed after Ricochet and Warzone patches before you load.',
  },
] as const

/** @deprecated use PRODUCT_PAGE_FAQS from faqs.ts — kept as alias */
export { PRODUCT_PAGE_FAQS as PRODUCT_FAQS } from './faqs'
