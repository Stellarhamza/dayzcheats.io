export type SeoMediaItem = {
  image: string
  video?: string
  alt: string
  title: string
  caption: string
  videoTitle?: string
  videoDescription?: string
}

/** EFT Reaper product art + menu stills (self-hosted). */
export const TARKOV_HERO = '/media/tarkov-reaper-full.webp'
export const TARKOV_SOLDIER = '/media/tarkov-reaper-full.webp'
export const TARKOV_GAMEPLAY = '/media/tarkov-exfil-esp.gif'
export const TARKOV_MENU = '/media/tarkov-menu.gif'
export const TARKOV_ESP = '/media/tarkov-esp-gameplay.gif'
export const TARKOV_COVER = '/media/tarkov-reaper-lite.webp'
export const TARKOV_RAID = '/media/tarkov-reaper-box.jpg'
export const TARKOV_CONTROL = '/media/tarkov-control-art.jpg'
export const TARKOV_HOME_ART = '/media/tarkov-home-art.jpg'
export const TARKOV_TACTICAL = '/media/tarkov-tactical-art.jpg'
export const TARKOV_VIDEO_THUMB = '/media/tarkov-video-thumb.jpg'

/** Self-hosted battlelog EFT Reaper preview (Bunny Stream GUID 8bd1c340-…). */
export const TARKOV_HOME_VIDEO = {
  id: '8bd1c340-5705-45d7-84c6-3a326a9747ce',
  src: '/videos/tarkov-preview.mp4',
  poster: TARKOV_VIDEO_THUMB,
  title: 'Tarkov Cheats Aimbot and ESP preview',
  caption: 'Preview of Escape from Tarkov Aimbot, ESP menu and loot radar features on PC.',
} as const

export const PAGE_MEDIA = {
  home: {
    image: TARKOV_SOLDIER,
    video: TARKOV_HOME_VIDEO.src,
    alt: 'Tarkov cheats Aimbot and ESP product artwork for Escape from Tarkov PC',
    title: 'Tarkov Cheats for Escape from Tarkov',
    caption: 'Feature overview for EFT Aimbot, ESP, wallhack, loot filter and radar.',
    videoTitle: TARKOV_HOME_VIDEO.title,
    videoDescription: TARKOV_HOME_VIDEO.caption,
  },
  product: {
    image: TARKOV_COVER,
    alt: 'EFT ESP, Aimbot and loot filter feature artwork',
    title: 'Escape from Tarkov Aimbot, ESP and Radar Features',
    caption: 'Product overview for Escape from Tarkov on Windows PC.',
  },
  forums: {
    image: TARKOV_HERO,
    alt: 'Escape from Tarkov cheats product artwork',
    title: 'Tarkov Cheats Guides',
    caption: 'Reference for setup, Aimbot, ESP, loot filter and BattlEye status articles.',
  },
  reviews: {
    image: TARKOV_ESP,
    alt: 'Tarkov cheats ESP gameplay review artwork',
    title: 'Tarkov Cheats Reviews',
    caption: 'Feature and compatibility feedback for Escape from Tarkov cheats.',
  },
  faq: {
    image: TARKOV_GAMEPLAY,
    alt: 'Tarkov cheats FAQ artwork for EFT',
    title: 'Tarkov Cheats FAQ',
    caption: 'Compatibility, status and setup answers for Escape from Tarkov.',
  },
  support: {
    image: TARKOV_HERO,
    alt: 'Tarkov cheats support artwork',
    title: 'Tarkov Cheats Support',
    caption: 'Delivery, loader and setup help for EFT cheats.',
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
  'battleye-status': { ...PAGE_MEDIA.product },
  'windows-setup': { ...PAGE_MEDIA.support },
  'raid-play-guide': {
    image: TARKOV_RAID,
    alt: 'Escape from Tarkov raid cheats artwork',
    title: 'EFT Raid Cheats Guide',
    caption: 'Raid tips for Tarkov Aimbot, ESP and loot filter.',
  },
  'loader-errors': { ...PAGE_MEDIA.support },
}

export function getForumMedia(slug: string): SeoMediaItem {
  return FORUM_MEDIA[slug] || PAGE_MEDIA.forums
}
