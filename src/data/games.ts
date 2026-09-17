export type GameStatus = 'Undetected' | 'Updating' | 'Use with caution'

export type Game = {
  slug: string
  name: string
  status: GameStatus
  popular?: boolean
}

/** Site is DayZ cheats only — no other titles in the catalog. */
export const GAMES: Game[] = [
  { slug: 'dayz', name: 'DayZ', status: 'Undetected', popular: true },
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
    name: 'DayZ Aimbot (silent aim)',
    text: 'Silent-aim tracking with FOV, smoothing and bone selection — fire near a survivor and still land the hit, so it reads as legit even when an admin spectates.',
  },
  {
    name: 'Player ESP / Wallhack',
    text: 'See survivors through walls and treelines with distance, health and gear information when the build supports it — tell friendlies from hostiles instantly.',
  },
  {
    name: 'Infected ESP',
    text: 'Track infected before they track you, so a loot run in Cherno or Elektro never turns into a zombie train at the worst moment.',
  },
  {
    name: 'Loot & Item ESP',
    text: 'Highlight guns, ammo, medical supplies and rare gear by category so you skip empty houses and gear up in minutes instead of hours.',
  },
  {
    name: 'Radar Hack',
    text: '2D radar awareness for off-screen survivors across Chernarus and Livonia — spot the third party before it reaches your position.',
  },
  {
    name: 'Base & Stash Intel',
    text: 'Spot player bases, tents and buried stashes on private servers so raids land on full storage instead of empty walls.',
  },
  {
    name: 'Official & modded server support',
    text: 'Works on official DayZ servers and on private servers running most common mod setups.',
  },
  {
    name: 'Spoofer + Cleaner',
    text: 'Protect hardware identifiers and refresh traces after bans or hardware swaps — included with the package.',
  },
  {
    name: 'BattlEye status + support',
    text: 'Undetected or Updating status is reviewed after BattlEye and DayZ patches before you load.',
  },
] as const

/** @deprecated use PRODUCT_PAGE_FAQS from faqs.ts — kept as alias */
export { PRODUCT_PAGE_FAQS as PRODUCT_FAQS } from './faqs'
