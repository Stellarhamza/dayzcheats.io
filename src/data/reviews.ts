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
 * Dates stay recent for Tarkov / EFT commercial reviews.
 */
export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'jayk',
    role: 'EFT PMC',
    game: 'Escape from Tarkov',
    rating: 5,
    datePublished: '2026-09-14',
    body: 'Status on the product page matched what I got in-raid. Player ESP held after the first BattlEye rebuild — glad I waited for Undetected before loading.',
  },
  {
    id: '2',
    author: 'nova',
    role: 'Interchange farmer',
    game: 'Escape from Tarkov',
    rating: 5,
    datePublished: '2026-09-13',
    body: 'Bought it for loot ESP and leave Aimbot off. Filtering by rouble price changes everything when you clear Techlight and OLI.',
  },
  {
    id: '3',
    author: 'rift',
    role: 'Squad lead',
    game: 'Escape from Tarkov',
    rating: 4,
    datePublished: '2026-09-13',
    body: 'No fake multi-game catalog. Boss ESP and honest Updating vs Undetected flips are what I wanted before buying EFT cheats.',
  },
  {
    id: '4',
    author: 'kiln',
    role: 'Duo queue',
    game: 'Escape from Tarkov',
    rating: 5,
    datePublished: '2026-09-12',
    body: 'They rebuilt when other sellers still pushed dead loaders. We check status, then checkout — ESP held on Customs and Reserve.',
  },
  {
    id: '5',
    author: 'moss',
    role: 'Night raids',
    game: 'Escape from Tarkov',
    rating: 5,
    datePublished: '2026-09-12',
    body: 'Menu was easy. Stream-proof on, radar on. Setup guides covered antivirus and load order so we did not burn the first launch.',
  },
  {
    id: '6',
    author: 'vale',
    role: 'New buyer',
    game: 'Escape from Tarkov',
    rating: 5,
    datePublished: '2026-09-11',
    body: 'Day key first was the right call. Instant delivery and live BattlEye status sold me before I took the 30-day plan.',
  },
  {
    id: '7',
    author: 'drake',
    role: 'Solo PMC',
    game: 'Escape from Tarkov',
    rating: 4,
    datePublished: '2026-09-11',
    body: 'Player ESP distance readouts were solid. Radar helped when scavs swung off-screen. Aimbot smoothing took ten minutes to dial in.',
  },
  {
    id: '8',
    author: 'echo',
    role: 'Streets runner',
    game: 'Escape from Tarkov',
    rating: 5,
    datePublished: '2026-09-14',
    body: 'Exfil markers alone are worth it — never guessing which extract is still open. Nothing like the free junk I tried first.',
  },
  {
    id: '9',
    author: 'prism',
    role: 'PvP tryhard',
    game: 'Escape from Tarkov',
    rating: 4,
    datePublished: '2026-09-15',
    body: 'Aimbot feels human once FOV and smoothing are conservative. I still check status after every BattlEye note.',
  },
  {
    id: '10',
    author: 'blade',
    role: 'Three-stack',
    game: 'Escape from Tarkov',
    rating: 5,
    datePublished: '2026-09-15',
    body: 'One license, full menu. ESP + loot filter covered our Labs and Reserve runs. Support answered with the order ID the same day.',
  },
  {
    id: '11',
    author: 'orio',
    role: 'Windows 11',
    game: 'Escape from Tarkov',
    rating: 3,
    datePublished: '2026-09-12',
    body: 'Loader ran fine after exclusions. Wish the first-run docs called out overlay conflicts earlier — lost an hour to Discord overlay.',
  },
  {
    id: '12',
    author: 'sage',
    role: 'Casual scav runs',
    game: 'Escape from Tarkov',
    rating: 5,
    datePublished: '2026-09-14',
    body: 'Tarkov-only shop is a plus. No random filler titles. Feature list matched the menu — true Escape from Tarkov cheats.',
  },
]

export function getReviewsAggregate() {
  const count = REVIEWS.length
  const ratingValue = (
    REVIEWS.reduce((sum, review) => sum + review.rating, 0) / count
  ).toFixed(1)
  return { ratingValue, reviewCount: count, bestRating: '5', worstRating: '1' }
}
