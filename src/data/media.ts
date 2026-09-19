export type SeoMediaItem = {
  image: string
  video?: string
  alt: string
  title: string
  caption: string
  videoTitle?: string
  videoDescription?: string
}

/** DayZ product art + menu stills (self-hosted). */
export const DAYZ_HERO = '/media/dayz-hero-full.webp'
export const DAYZ_SOLDIER = '/media/dayz-hero-full.webp'
export const DAYZ_COVER = '/media/dayz-cover.webp'
export const DAYZ_BOX = '/media/dayz-box.jpg'
export const DAYZ_ESP = '/media/dayz-esp-gameplay.gif'
export const DAYZ_MENU = '/media/dayz-menu.gif'
export const DAYZ_GAMEPLAY = '/media/dayz-esp-gameplay.gif'
export const DAYZ_HOME_ART = '/media/dayz-home-art.jpg'
export const DAYZ_CONTROL = '/media/dayz-control-art.jpg'
export const DAYZ_TACTICAL = '/media/dayz-tactical-art.jpg'
export const DAYZ_VIDEO_THUMB = '/media/dayz-video-thumb.jpg'

/** Self-hosted DayZ Reaper preview (Bunny Stream GUID ee0735e7-…). */
export const DAYZ_HOME_VIDEO = {
  id: 'ee0735e7-c9a3-4072-b818-98e2bb7f07ff',
  src: '/videos/dayz-preview.mp4',
  poster: DAYZ_VIDEO_THUMB,
  title: 'DayZ Cheats Aimbot and ESP preview',
  caption: 'Preview of DayZ Aimbot, ESP menu, loot highlighting and radar hack features on PC.',
} as const

export const PAGE_MEDIA = {
  home: {
    image: DAYZ_SOLDIER,
    alt: 'DayZ cheats Aimbot and ESP product artwork for DayZ Standalone on PC',
    title: 'DayZ Cheats for DayZ Standalone',
    caption: 'Feature overview for DayZ Aimbot, ESP, wallhack, loot ESP and radar hack.',
  },
  product: {
    image: DAYZ_COVER,
    video: DAYZ_HOME_VIDEO.src,
    alt: 'DayZ ESP, silent aim Aimbot and loot highlight feature artwork',
    title: 'DayZ Aimbot, ESP and Radar Hack Features',
    caption: 'Product overview for DayZ Standalone on Windows PC.',
    videoTitle: DAYZ_HOME_VIDEO.title,
    videoDescription: DAYZ_HOME_VIDEO.caption,
  },
  forums: {
    image: DAYZ_HERO,
    alt: 'DayZ cheats product artwork',
    title: 'DayZ Cheats Guides',
    caption: 'Reference for setup, Aimbot, ESP, loot and BattlEye status articles.',
  },
  reviews: {
    image: DAYZ_ESP,
    alt: 'DayZ cheats ESP gameplay review artwork',
    title: 'DayZ Cheats Reviews',
    caption: 'Feature and compatibility feedback for DayZ cheats.',
  },
  faq: {
    image: DAYZ_MENU,
    alt: 'DayZ cheats menu artwork for the FAQ',
    title: 'DayZ Cheats FAQ',
    caption: 'Compatibility, status and setup answers for DayZ Standalone.',
  },
  support: {
    image: DAYZ_HERO,
    alt: 'DayZ cheats support artwork',
    title: 'DayZ Cheats Support',
    caption: 'Delivery, loader and setup help for DayZ cheats.',
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
    image: DAYZ_BOX,
    alt: 'DayZ survival and loot run cheats artwork',
    title: 'DayZ Survival and Loot Run Cheats Guide',
    caption: 'Loot run tips for DayZ Aimbot, ESP and radar hack.',
  },
  'loader-errors': { ...PAGE_MEDIA.support },
}

export function getForumMedia(slug: string): SeoMediaItem {
  return FORUM_MEDIA[slug] || PAGE_MEDIA.forums
}
