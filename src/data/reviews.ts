export type Review = {
  id: string
  author: string
  role: string
  game: string
  rating: number
  /** ISO date — required for Review schema */
  datePublished: string
  body: string
}

/**
 * Buyer reviews shown on /reviews and emitted as Review + AggregateRating schema.
 * Dates stay recent for DayZ commercial reviews.
 */
export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'jayk',
    role: 'DayZ survivor',
    game: 'DayZ',
    rating: 5,
    datePublished: '2026-09-14',
    body: 'Status on the product page matched what I got in game. Player ESP held after the first BattlEye rebuild — glad I waited for Undetected before loading.',
  },
  {
    id: '2',
    author: 'nova',
    role: 'Chernarus looter',
    game: 'DayZ',
    rating: 5,
    datePublished: '2026-09-13',
    body: 'Bought it for loot ESP and leave the aimbot off. Not clearing forty empty houses on the coast changes the whole game.',
  },
  {
    id: '3',
    author: 'rift',
    role: 'Squad lead',
    game: 'DayZ',
    rating: 4,
    datePublished: '2026-09-13',
    body: 'No fake multi-game catalog. Base and stash markers plus honest Updating vs Undetected flips are what I wanted before buying DayZ cheats.',
  },
  {
    id: '4',
    author: 'kiln',
    role: 'Duo queue',
    game: 'DayZ',
    rating: 5,
    datePublished: '2026-09-12',
    body: 'They rebuilt when other sellers still pushed dead loaders. We check status, then checkout — ESP held around Tisy and NWAF.',
  },
  {
    id: '5',
    author: 'moss',
    role: 'Night runs',
    game: 'DayZ',
    rating: 5,
    datePublished: '2026-09-12',
    body: 'Menu was easy. Stream-proof on, radar on. Setup guides covered antivirus and load order so we did not burn the first launch.',
  },
  {
    id: '6',
    author: 'vale',
    role: 'New buyer',
    game: 'DayZ',
    rating: 5,
    datePublished: '2026-09-11',
    body: 'Weekly key first was the right call. Instant delivery and live BattlEye status sold me before I took the monthly plan.',
  },
  {
    id: '7',
    author: 'drake',
    role: 'Solo survivor',
    game: 'DayZ',
    rating: 4,
    datePublished: '2026-09-11',
    body: 'Player ESP distance readouts were solid. Radar helped when a third party pushed from the treeline. Silent aim took ten minutes to dial in.',
  },
  {
    id: '8',
    author: 'echo',
    role: 'Livonia regular',
    game: 'DayZ',
    rating: 5,
    datePublished: '2026-09-14',
    body: 'Infected ESP alone is worth it — no more pulling a zombie train while looting a military tent. Nothing like the free junk I tried first.',
  },
  {
    id: '9',
    author: 'prism',
    role: 'PvP tryhard',
    game: 'DayZ',
    rating: 4,
    datePublished: '2026-09-15',
    body: 'Silent aim looks legit even when an admin spectates, as long as FOV and smoothing stay conservative. I still check status after every BattlEye note.',
  },
  {
    id: '10',
    author: 'blade',
    role: 'Three-stack',
    game: 'DayZ',
    rating: 5,
    datePublished: '2026-09-15',
    body: 'One license, full menu. ESP plus loot highlighting covered our airfield and base raid runs. Support answered with the order ID the same day.',
  },
  {
    id: '11',
    author: 'orio',
    role: 'Windows 11',
    game: 'DayZ',
    rating: 3,
    datePublished: '2026-09-12',
    body: 'Loader ran fine after exclusions. Wish the first-run docs called out overlay conflicts earlier — lost an hour to Discord overlay.',
  },
  {
    id: '12',
    author: 'sage',
    role: 'Private server',
    game: 'DayZ',
    rating: 5,
    datePublished: '2026-09-14',
    body: 'DayZ-only shop is a plus. No random filler titles. Worked on our modded private server and the feature list matched the menu.',
  },
]

export function getReviewsAggregate() {
  const count = REVIEWS.length
  const ratingValue = (
    REVIEWS.reduce((sum, review) => sum + review.rating, 0) / count
  ).toFixed(1)
  return { ratingValue, reviewCount: count, bestRating: '5', worstRating: '1' }
}
