export type FaqItem = {
  q: string
  a: string
}

/** Master FAQ â€” visible on /faq and reused in sections. */
export const SITE_FAQS: FaqItem[] = [
  {
    q: 'What are Warzone Cheats?',
    a: 'Warzone Cheats are tools for Call of Duty: Warzone on warzonecheats.uk â€” Aimbot, player ESP, wallhack and 2D radar â€” with live Undetected or Updating status after Ricochet patches.',
  },
  {
    q: 'Do you cover other games?',
    a: 'No. warzonecheats.uk sells Warzone Cheats only â€” no Apex, Fortnite or filler catalog titles.',
  },
  {
    q: 'Is Aimbot the main feature?',
    a: 'Aimbot is optional. Many buyers lead with Warzone ESP, wallhack and radar awareness, then enable Aimbot only if they want it.',
  },
  {
    q: 'Are Warzone Cheats undetected against Ricochet?',
    a: 'We mark live Undetected or Updating status after Warzone / Ricochet updates. Always check status on warzonecheats.uk before you load.',
  },
  {
    q: 'What features are included?',
    a: 'Warzone Aimbot, player ESP / wallhack, loot ESP when supported, 2D radar and stream-proof options â€” Warzone on Windows PC only. See the Features List guide for the full checklist.',
  },
  {
    q: 'Does it work on Windows PC Warzone?',
    a: 'Yes. Warzone Cheats target Call of Duty: Warzone on Windows 10/11 (Battle.net / official PC client). Confirm Undetected after each Ricochet patch before loading.',
  },
  {
    q: 'How do I buy Warzone Cheats?',
    a: 'Start on the homepage, confirm Undetected status and review the price. Open Product details for compatibility and features, then continue to checkout for digital delivery.',
  },
  {
    q: 'How do I load Warzone Cheats?',
    a: 'After checkout, follow the Complete Setup forum thread for the current load order. If status is Updating, wait rather than forcing an outdated build.',
  },
  {
    q: 'Where do I get Warzone Cheats support?',
    a: 'Use the Support page and your checkout order channel. Include Undetected/Updating status and whether you need load, menu or delivery help.',
  },
  {
    q: 'Where can I read Warzone Cheats reviews?',
    a: 'Player reviews with ratings are on the Reviews page. They cover ESP usefulness, Undetected honesty and patch survival before you buy.',
  },
  {
    q: 'What is your refund policy?',
    a: 'Digital licenses follow the Refunds page â€” delivery failures and extended Updating windows can qualify; change of mind after a working key does not.',
  },
  {
    q: 'Is this the official Warzone game site?',
    a: 'No. We sell Warzone Cheats only. Play the game from callofduty.com/warzone. We are not affiliated with Activision or Call of Duty.',
  },
]

/** Commercial questions shown on the homepage; FAQ schema lives on /faq only. */
export const HOME_FAQS: FaqItem[] = [
  SITE_FAQS[3],
  SITE_FAQS[4],
  SITE_FAQS[5],
  SITE_FAQS[6],
]

export const PRODUCT_PAGE_FAQS: FaqItem[] = [
  SITE_FAQS[3],
  SITE_FAQS[4],
  SITE_FAQS[5],
  SITE_FAQS[6],
  SITE_FAQS[8],
]
