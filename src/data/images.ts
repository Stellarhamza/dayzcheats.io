import {
  TARKOV_HERO,
  TARKOV_SOLDIER,
  TARKOV_COVER,
  TARKOV_GAMEPLAY,
  TARKOV_MENU,
  TARKOV_ESP,
} from './media'

export const TARKOV_OG = '/og/tarkov-cheats.jpg'
export const TARKOV_PRODUCT_HERO = TARKOV_HERO
export const TARKOV_PRODUCT_COVER = TARKOV_COVER

/** @deprecated aliases */
export const WARZONE_OG = TARKOV_OG
export const WARZONE_PRODUCT_HERO = TARKOV_PRODUCT_HERO
export const WARZONE_PRODUCT_COVER = TARKOV_PRODUCT_COVER

export type ImageSeoFields = {
  alt: string
  title: string
  caption: string
}

export const IMAGE_SEO: Record<
  string,
  ImageSeoFields & {
    heroAlt: string
    heroTitle: string
    heroCaption: string
  }
> = {
  tarkov: {
    alt: 'Tarkov cheats product artwork for Escape from Tarkov PC',
    title: 'Tarkov Cheats Product Details',
    caption: 'EFT Aimbot, ESP, wallhack, loot filter, radar and BattlEye compatibility',
    heroAlt: 'Escape from Tarkov cheats Aimbot and ESP features',
    heroTitle: 'Tarkov Cheats Features',
    heroCaption: 'Review EFT Aimbot, ESP, loot filter and current BattlEye status',
  },
}

type PageImage = ImageSeoFields & { src: string }

export const PAGE_IMAGES: Record<
  'home' | 'forums' | 'reviews' | 'faq' | 'support' | 'product',
  PageImage
> = {
  home: {
    src: TARKOV_SOLDIER,
    alt: 'Tarkov cheats Aimbot and ESP artwork for Escape from Tarkov PC',
    title: 'Tarkov Cheats',
    caption: 'Escape from Tarkov Aimbot, ESP, wallhack and loot radar overview.',
  },
  forums: {
    src: TARKOV_HERO,
    alt: 'Escape from Tarkov cheats product artwork',
    title: 'Tarkov Cheats Guides',
    caption: 'Setup, Aimbot and ESP guides for EFT.',
  },
  reviews: {
    src: TARKOV_ESP,
    alt: 'Tarkov cheats review artwork',
    title: 'Tarkov Cheats Reviews',
    caption: 'Feature and compatibility feedback for Escape from Tarkov.',
  },
  faq: {
    src: TARKOV_GAMEPLAY,
    alt: 'Tarkov cheats FAQ artwork',
    title: 'Tarkov Cheats FAQ',
    caption: 'Compatibility, feature and setup answers for EFT.',
  },
  support: {
    src: TARKOV_HERO,
    alt: 'Tarkov cheats support artwork',
    title: 'Tarkov Cheats Support',
    caption: 'Delivery, loader and setup support for Escape from Tarkov cheats.',
  },
  product: {
    src: TARKOV_COVER,
    alt: 'EFT Aimbot ESP and loot filter product artwork',
    title: 'Tarkov Cheats Features',
    caption: 'Product details for Escape from Tarkov Aimbot, ESP and radar.',
  },
}

export function getGameImage(_slug: string): string {
  return TARKOV_PRODUCT_COVER
}

export function getProductHeroImage(_slug: string): string {
  return TARKOV_PRODUCT_COVER
}

export function getOgImage(path?: string): string {
  if (!path || path === '/') return PAGE_IMAGES.home.src
  if (path === '/tarkov-cheats' || path === '/eft-cheats') return PAGE_IMAGES.product.src
  if (path === '/forums') return PAGE_IMAGES.forums.src
  if (path === '/reviews') return PAGE_IMAGES.reviews.src
  if (path === '/faq') return PAGE_IMAGES.faq.src
  if (path === '/support') return PAGE_IMAGES.support.src
  return TARKOV_OG
}

export function getPageImage(key: keyof typeof PAGE_IMAGES) {
  return PAGE_IMAGES[key]
}

export function getImageAlt(
  slug: string,
  name: string,
  variant: 'catalog' | 'product' = 'catalog',
): string {
  const seo = IMAGE_SEO[slug]
  if (seo) return variant === 'product' ? seo.heroAlt : seo.alt
  return variant === 'product' ? `${name} product details` : `${name} product artwork`
}

export function getImageTitle(
  slug: string,
  name: string,
  variant: 'catalog' | 'product' = 'catalog',
): string {
  const seo = IMAGE_SEO[slug]
  if (seo) return variant === 'product' ? seo.heroTitle : seo.title
  return `${name} product`
}
