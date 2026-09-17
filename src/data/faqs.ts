export type FaqItem = {
  q: string
  a: string
}

/** Master FAQ — visible on /faq and reused in sections. */
export const SITE_FAQS: FaqItem[] = [
  {
    q: 'What are Tarkov Cheats?',
    a: 'Tarkov Cheats are Escape from Tarkov (EFT) tools on tarkovcheats.io — Aimbot, player ESP, wallhack, loot price filter and 2D radar — with live Undetected or Updating status after BattlEye patches.',
  },
  {
    q: 'Do you cover other games?',
    a: 'No. tarkovcheats.io sells Escape from Tarkov cheats only — no Warzone, Apex, Fortnite or filler catalog titles.',
  },
  {
    q: 'Is Aimbot the main feature?',
    a: 'Aimbot is optional. Many buyers lead with EFT ESP, loot filter and radar awareness, then enable Aimbot only if they want it.',
  },
  {
    q: 'Are Tarkov Cheats undetected against BattlEye?',
    a: 'We mark live Undetected or Updating status after Escape from Tarkov / BattlEye updates. Always check status on tarkovcheats.io before you load.',
  },
  {
    q: 'What features are included?',
    a: 'EFT Aimbot, PMC/Scav/boss ESP, loot ESP with price filter, radar, optional movement tools, HWID spoofer and stream-proof options — Escape from Tarkov on Windows PC only. See the Features List guide for the full checklist.',
  },
  {
    q: 'Does it work on Windows PC Escape from Tarkov?',
    a: 'Yes. Tarkov Cheats target Escape from Tarkov on Windows 10/11 (official BSG launcher). Confirm Undetected after each BattlEye patch before loading.',
  },
  {
    q: 'How do I buy Escape from Tarkov cheats?',
    a: 'Start on the homepage, confirm Undetected status and review the price. Open Product details for compatibility and features, then continue to checkout for digital delivery.',
  },
  {
    q: 'How do I load EFT Cheats?',
    a: 'After checkout, follow the Complete Setup forum thread for the current load order. If status is Updating, wait rather than forcing an outdated build.',
  },
  {
    q: 'Where do I get Tarkov Cheats support?',
    a: 'Use the Support page and your checkout order channel. Include Undetected/Updating status and whether you need load, menu or delivery help.',
  },
  {
    q: 'Where can I read Tarkov Cheats reviews?',
    a: 'Player reviews with ratings are on the Reviews page. They cover ESP usefulness, Undetected honesty and patch survival before you buy.',
  },
  {
    q: 'What is your refund policy?',
    a: 'Digital licenses follow the Refunds page — delivery failures and extended Updating windows can qualify; change of mind after a working key does not.',
  },
  {
    q: 'Is this the official Escape from Tarkov site?',
    a: 'No. We sell Tarkov Cheats only. Play the game from escapefromtarkov.com. We are not affiliated with Battlestate Games or Escape from Tarkov.',
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
