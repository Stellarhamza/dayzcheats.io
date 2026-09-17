export type SupportFaq = {
  q: string
  a: string
}

export type SupportTopic = {
  heading: string
  body: string[]
}

export const SUPPORT_INTRO =
  'Support for DayZ Cheats buyers on dayzcheats.io — loader setup, Undetected status, menu config and delivery help after you purchase DayZ cheats.'

export const SUPPORT_TOPICS: SupportTopic[] = [
  {
    heading: 'Before you open a support request',
    body: [
      'Confirm you bought DayZ Cheats from dayzcheats.io. We only support this DayZ Standalone product — not random downloads from elsewhere.',
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
      'Supported: DayZ Standalone on Windows PC — Aimbot, ESP, wallhack, loot ESP, radar hack, spoofer, menu, setup and status questions.',
      'Server types: official DayZ servers and private servers with common mods. Heavily scripted community servers are best-effort.',
      'Not supported: other games, cracked loaders or third-party mirrors.',
      'Policy pages: Privacy, Terms and Refunds are linked in the footer.',
    ],
  },
]

export const SUPPORT_FAQS: SupportFaq[] = [
  {
    q: 'How do I contact DayZ Cheats support?',
    a: 'Open your order on dayzcheats.io and use the checkout support channel tied to your purchase. Include a status screenshot (Undetected / Updating) and whether you need load, menu or delivery help.',
  },
  {
    q: 'How do I load DayZ Cheats after a patch?',
    a: 'Follow the Complete Setup forum thread for the current load order. If status is Updating, wait; if an Undetected build fails, include your order ID in a support request.',
  },
  {
    q: 'Loader failed — what should I do?',
    a: 'Do not spam launch. Restart DayZ, confirm antivirus exclusions, re-check status, then try one clean load. If it still fails, contact support with your order ID.',
  },
  {
    q: 'Will it work on the private server I play?',
    a: 'Official DayZ servers and private servers with common mods are supported. If your server runs custom admin scripts, send us the server name before you buy and we will tell you what to expect.',
  },
  {
    q: 'Is Aimbot required?',
    a: 'No. DayZ Cheats lead with player ESP, loot ESP and radar. Silent aim is optional. Support focuses on awareness features and safe load steps.',
  },
  {
    q: 'Where is the DayZ Cheats download?',
    a: 'Delivery is digital after checkout on dayzcheats.io. Use only that loader link. Third-party mirrors are unsupported and unsafe.',
  },
]
