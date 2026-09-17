export type SupportFaq = {
  q: string
  a: string
}

export type SupportTopic = {
  heading: string
  body: string[]
}

export const SUPPORT_INTRO =
  'Support for Tarkov Cheats buyers on tarkovcheats.io — loader setup, Undetected status, menu config and delivery help after you purchase Escape from Tarkov cheats.'

export const SUPPORT_TOPICS: SupportTopic[] = [
  {
    heading: 'Before you open a support request',
    body: [
      'Confirm you bought Tarkov Cheats from tarkovcheats.io. We only support this Escape from Tarkov product — not random downloads from elsewhere.',
      'Check live status on the product page. If it says Updating, do not load. Wait for Undetected.',
      'Have your order email and license length ready. That speeds up help after BattlEye patches.',
    ],
  },
  {
    heading: 'Setup and load order',
    body: [
      'Follow the Complete Setup forum thread for the current load order, antivirus exclusions, menu configuration and first clean launch.',
      'If the product is Updating, wait. If an Undetected build still fails after one clean retry, open a support request with your order ID.',
    ],
  },
  {
    heading: 'Status windows and refunds',
    body: [
      'Do not load while status is Updating — that is the biggest avoidable risk after a BattlEye patch.',
      'Delivery failures and extended Updating windows are covered on the Refunds page. Include your order ID when you write in.',
    ],
  },
  {
    heading: 'What we support',
    body: [
      'Supported: Escape from Tarkov on Windows PC — Aimbot, ESP, wallhack, loot filter, radar, HWID spoofer, menu, setup and status questions.',
      'Not supported: other games (including Warzone or Apex), cracked loaders or third-party mirrors.',
      'Policy pages: Privacy, Terms and Refunds are linked in the footer.',
    ],
  },
]

export const SUPPORT_FAQS: SupportFaq[] = [
  {
    q: 'How do I contact Tarkov Cheats support?',
    a: 'Open your order on tarkovcheats.io and use the checkout support channel tied to your purchase. Include a status screenshot (Undetected / Updating) and whether you need load, menu or delivery help.',
  },
  {
    q: 'How do I load EFT Cheats after a patch?',
    a: 'Follow the Complete Setup forum thread for the current load order. If status is Updating, wait; if an Undetected build fails, include your order ID in a support request.',
  },
  {
    q: 'Loader failed — what should I do?',
    a: 'Do not spam launch. Restart Escape from Tarkov, confirm antivirus exclusions, re-check status, then try one clean load. If it still fails, contact support with your order ID.',
  },
  {
    q: 'Do you help with setup and config?',
    a: 'Yes. Use the Complete Setup forum thread first, then contact support with your order ID if a current Undetected build still fails.',
  },
  {
    q: 'Is Aimbot required?',
    a: 'No. Tarkov Cheats lead with ESP, loot filter and radar. Aimbot is optional. Support focuses on awareness features and safe load steps.',
  },
  {
    q: 'Where is the Tarkov Cheats download?',
    a: 'Delivery is digital after checkout on tarkovcheats.io. Use only that loader link. Third-party mirrors are unsupported and unsafe.',
  },
]
