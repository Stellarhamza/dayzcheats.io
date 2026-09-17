export type FaqItem = {
  q: string
  a: string
}

/** Master FAQ — visible on /faq and reused in sections. */
export const SITE_FAQS: FaqItem[] = [
  {
    q: 'What are DayZ Cheats?',
    a: 'DayZ Cheats are DayZ Standalone tools on dayzcheats.io — silent-aim Aimbot, player ESP, wallhack, infected and loot ESP, and a 2D radar hack — with live Undetected or Updating status after BattlEye patches.',
  },
  {
    q: 'How much do DayZ cheats cost?',
    a: `DayZ cheats start from $4.90 for short access. Longer licenses cost more. Always confirm Undetected status and the live price on dayzcheats.io before checkout.`,
  },
  {
    q: 'Do you sell DayZ hacks for other games?',
    a: 'No. dayzcheats.io sells DayZ cheats / DayZ hacks only — one product, no multi-game catalog.',
  },
  {
    q: 'Is Aimbot the main feature?',
    a: 'Aimbot is optional. Most buyers lead with DayZ ESP, loot highlighting and radar awareness, then enable silent aim only if they want it.',
  },
  {
    q: 'Are DayZ Cheats undetected against BattlEye?',
    a: 'We mark live Undetected or Updating status after DayZ and BattlEye updates. Always check status on dayzcheats.io before you load.',
  },
  {
    q: 'What is DayZ ESP / wallhack?',
    a: 'DayZ ESP and wallhack show survivors, infected and loot through walls with distance and health when supported. Loot ESP highlights guns, ammo and medical gear so empty houses stop wasting your time.',
  },
  {
    q: 'What is a DayZ radar hack?',
    a: 'The radar hack is a 2D overlay for off-screen survivors and third parties — useful for military loot approaches and avoiding ambushes on Chernarus or Livonia.',
  },
  {
    q: 'What features are included?',
    a: 'DayZ Aimbot with silent aim, player ESP, infected ESP, loot and item ESP, radar hack, base and stash intel, spoofer and stream-proof options — DayZ Standalone on Windows PC only. See the Features Checklist guide for the full list.',
  },
  {
    q: 'Do DayZ Cheats work on official and private servers?',
    a: 'Yes. The cheats run on official DayZ servers and on private servers using most common mod setups. Heavily modded servers with custom anti-cheat scripts can behave differently — ask support before you buy.',
  },
  {
    q: 'How do I buy DayZ cheats?',
    a: 'Start on the homepage, confirm Undetected status and review the price from $4.90. Open Product details for compatibility and features, then continue to checkout for digital delivery.',
  },
  {
    q: 'How do I load DayZ Cheats?',
    a: 'After checkout, follow the Complete Setup forum thread for the current load order. If status is Updating, wait rather than forcing an outdated build.',
  },
  {
    q: 'Where do I get DayZ Cheats support?',
    a: 'Use the Support page and your checkout order channel. Include Undetected/Updating status and whether you need load, menu or delivery help.',
  },
  {
    q: 'Where can I read DayZ Cheats reviews?',
    a: 'Player reviews with ratings are on the Reviews page. They cover ESP usefulness, Undetected honesty and patch survival before you buy.',
  },
  {
    q: 'What is your refund policy?',
    a: 'Digital licenses follow the Refunds page — delivery failures and extended Updating windows can qualify; change of mind after a working key does not.',
  },
  {
    q: 'Is this the official DayZ site?',
    a: 'No. We sell DayZ Cheats only. Buy and play the game from dayz.com. We are not affiliated with Bohemia Interactive or DayZ.',
  },
]

/** Commercial questions shown on the homepage; FAQ schema lives on /faq only. */
export const HOME_FAQS: FaqItem[] = [
  SITE_FAQS[1],
  SITE_FAQS[4],
  SITE_FAQS[5],
  SITE_FAQS[9],
]

export const PRODUCT_PAGE_FAQS: FaqItem[] = [
  SITE_FAQS[1],
  SITE_FAQS[4],
  SITE_FAQS[5],
  SITE_FAQS[6],
  SITE_FAQS[9],
  SITE_FAQS[11],
]
