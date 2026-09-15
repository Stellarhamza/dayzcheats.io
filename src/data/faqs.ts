export type FaqItem = {
  q: string
  a: string
}

/** Master FAQ — visible on /faq and reused in sections. */
export const SITE_FAQS: FaqItem[] = [
  {
    q: 'What are Warzone Cheats?',
    a: 'Warzone Cheats are tools for Warzone on warzonecheats.uk — mainly player ESP, vehicle ESP, soft aim and 2D radar — with live Undetected or Updating status after Ricochet patches.',
  },
  {
    q: 'Do you cover other games?',
    a: 'No. warzonecheats.uk sells Warzone Cheats only. No filler catalog of unrelated titles.',
  },
  {
    q: 'Is aimbot the main feature?',
    a: 'No. Soft aim is optional. Most buyers come for Warzone ESP, vehicle tags and radar awareness.',
  },
  {
    q: 'Are Warzone Cheats undetected against Ricochet?',
    a: 'We mark live Undetected or Updating status after Warzone / Ricochet updates. Always check status on warzonecheats.uk before you load.',
  },
  {
    q: 'What features are included?',
    a: 'Player ESP / wallhack, vehicle ESP, 2D radar, stream-proof options and configurable soft aim — focused on Warzone only. See the Features List guide for the full checklist.',
  },
  {
    q: 'Does it work on Steam Early Access?',
    a: 'Yes. Compatibility tracks the Windows Early Access build (Steam app 1867240). Confirm Undetected after Ricocheth patch before loading.',
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
    a: 'Digital licenses follow the Refunds page — delivery failures and extended Updating windows can qualify; change of mind after a working key does not.',
  },
  {
    q: 'Is this the official Warzone game site?',
    a: 'No. We sell Warzone Cheats only. Play the game from Warzone.com or Warzone on Steam. We are not affiliated with Activision or Call of Duty.',
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
