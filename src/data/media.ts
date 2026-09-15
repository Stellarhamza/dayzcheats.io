export type SeoMediaItem = {
  image: string
  video?: string
  alt: string
  title: string
  caption: string
  videoTitle?: string
  videoDescription?: string
}

export const WARZONE_HERO = '/media/warzone-delta-hero.webp'
export const WARZONE_SOLDIER = '/media/warzone-soldier-hero.webp'
export const WARZONE_GAMEPLAY = '/media/warzone-delta-gameplay.gif'
export const WARZONE_MENU = '/media/warzone-menu.gif'
export const WARZONE_ESP = '/media/warzone-esp-gameplay.gif'
export const WARZONE_COVER = '/media/warzone-auron-box.webp'
export const WARZONE_RANKED = '/media/warzone-ranked-cover.webp'
export const WARZONE_CONTROL = '/media/warzone-control-art.jpg'
export const WARZONE_HOME_ART = '/media/warzone-home-art.jpg'
export const WARZONE_TACTICAL = '/media/warzone-tactical-art.jpg'

/** Preview copy — media is self-hosted GIFs (Bunny Stream embeds 403 off battlelog). */
export const WARZONE_HOME_VIDEO = {
  id: 'local-warzone-preview',
  title: 'Warzone Cheats Aimbot and ESP preview',
  caption: 'Preview of Warzone Aimbot, ESP menu and radar features on PC.',
} as const

export const PAGE_MEDIA = {
  home: {
    image: WARZONE_SOLDIER,
    alt: 'Warzone cheats Aimbot and ESP product artwork for PC',
    title: 'Warzone Cheats for PC',
    caption: 'Feature overview for Warzone Aimbot, ESP, wallhack and radar.',
  },
  product: {
    image: WARZONE_COVER,
    alt: 'Warzone ESP, Aimbot and radar feature artwork',
    title: 'Warzone Aimbot, ESP and Radar Features',
    caption: 'Product overview for Warzone on Windows PC.',
  },
  forums: {
    image: WARZONE_HERO,
    alt: 'Warzone Delta cheats product artwork',
    title: 'Warzone Cheats Guides',
    caption: 'Reference for setup, Aimbot, ESP, radar and status articles.',
  },
  reviews: {
    image: WARZONE_ESP,
    alt: 'Warzone cheats ESP gameplay review artwork',
    title: 'Warzone Cheats Reviews',
    caption: 'Feature and compatibility feedback for Warzone cheats.',
  },
  faq: {
    image: WARZONE_GAMEPLAY,
    alt: 'Warzone cheats FAQ artwork',
    title: 'Warzone Cheats FAQ',
    caption: 'Compatibility, status and setup answers for Warzone.',
  },
  support: {
    image: WARZONE_HERO,
    alt: 'Warzone cheats support artwork',
    title: 'Warzone Cheats Support',
    caption: 'Delivery, loader and setup help for Warzone.',
  },
} as const satisfies Record<string, SeoMediaItem>

const FORUM_MEDIA: Record<string, SeoMediaItem> = {
  'features-list': { ...PAGE_MEDIA.product },
  hotkeys: { ...PAGE_MEDIA.forums },
  'complete-setup': { ...PAGE_MEDIA.product },
  'disable-antivirus': { ...PAGE_MEDIA.home },
  'undetected-status': { ...PAGE_MEDIA.product },
  'aimbot-settings': { ...PAGE_MEDIA.home },
  'esp-wallhack-guide': { ...PAGE_MEDIA.reviews },
  'radar-hack-guide': { ...PAGE_MEDIA.faq },
  'stream-proof-setup': { ...PAGE_MEDIA.forums },
  'ricochet-status': { ...PAGE_MEDIA.product },
  'windows-setup': { ...PAGE_MEDIA.support },
  'ranked-play-guide': {
    image: WARZONE_RANKED,
    alt: 'Warzone Ranked play cheats artwork',
    title: 'Warzone Ranked Cheats Guide',
    caption: 'Ranked lobby tips for Warzone Aimbot and ESP.',
  },
  'loader-errors': { ...PAGE_MEDIA.support },
}

export function getForumMedia(slug: string): SeoMediaItem {
  return FORUM_MEDIA[slug] || PAGE_MEDIA.forums
}
