export type GameStatus = 'Undetected' | 'Updating' | 'Use with caution'

export type Game = {
  slug: string
  name: string
  status: GameStatus
  popular?: boolean
}

/** Site is Tarkov / EFT Cheats only — no other titles in the catalog. */
export const GAMES: Game[] = [
  { slug: 'tarkov', name: 'Escape from Tarkov', status: 'Undetected', popular: true },
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
    name: 'EFT Aimbot',
    text: 'Smooth, humanized Aimbot with FOV, smoothing, bone selection and silent-aim options so shots look natural in Tarkov raids.',
  },
  {
    name: 'Player ESP / Wallhack',
    text: 'See PMCs, Scavs and bosses through walls with distance, health, weapon and team information when supported.',
  },
  {
    name: 'Loot ESP & Price Filter',
    text: 'Highlight keys, weapons, meds and high-value loot by category or rouble price so you clear rooms with intent.',
  },
  {
    name: 'Radar Hack',
    text: '2D radar awareness for off-screen PMCs and Scavs across Customs, Interchange, Reserve, Streets and more.',
  },
  {
    name: 'Exfil & Hazard Intel',
    text: 'Mark extracts, tripwires and other raid hazards so you never push or extract blind.',
  },
  {
    name: 'Movement Suite',
    text: 'Optional speed hack, high jump and infinite stamina for extended control when the current build supports them.',
  },
  {
    name: 'HWID Spoofer + Cleaner',
    text: 'Protect system identifiers and refresh traces after bans or hardware swaps — included with the package.',
  },
  {
    name: 'BattlEye status + support',
    text: 'Undetected or Updating status is reviewed after BattlEye and Escape from Tarkov patches before you load.',
  },
] as const

/** @deprecated use PRODUCT_PAGE_FAQS from faqs.ts — kept as alias */
export { PRODUCT_PAGE_FAQS as PRODUCT_FAQS } from './faqs'
