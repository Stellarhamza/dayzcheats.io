import {
  WARZONE_HERO,
  WARZONE_COVER,
  WARZONE_GAMEPLAY,
  WARZONE_MENU,
  WARZONE_ESP,
} from './media'

export const WARZONE_OG = '/og/warzone-cheats.jpg'
export const WARZONE_PRODUCT_HERO = WARZONE_HERO
export const WARZONE_PRODUCT_COVER = WARZONE_COVER

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
  warzone: {
    alt: 'Warzone cheats product artwork for PC',
    title: 'Warzone Cheats Product Details',
    caption: 'Warzone Aimbot, ESP, wallhack, radar and Ricochet compatibility',
    heroAlt: 'Warzone cheats Aimbot and ESP features',
    heroTitle: 'Warzone Cheats Features',
    heroCaption: 'Review Warzone Aimbot, ESP, radar and current status',
  },
}

type PageImage = ImageSeoFields & { src: string }

export const PAGE_IMAGES: Record<
  'home' | 'forums' | 'reviews' | 'faq' | 'support' | 'product',
  PageImage
> = {
  home: {
    src: WARZONE_HERO,
    alt: 'Warzone cheats Aimbot and ESP artwork for PC',
    title: 'Warzone Cheats UK',
    caption: 'Warzone Aimbot, ESP, wallhack and radar overview.',
  },
  forums: {
    src: WARZONE_MENU,
    alt: 'Warzone cheats setup and status guide artwork',
    title: 'Warzone Cheats Guides',
    caption: 'Setup, Aimbot and ESP guides for Warzone.',
  },
  reviews: {
    src: WARZONE_ESP,
    alt: 'Warzone cheats review artwork',
    title: 'Warzone Cheats Reviews',
    caption: 'Feature and compatibility feedback for Warzone.',
  },
  faq: {
    src: WARZONE_GAMEPLAY,
    alt: 'Warzone cheats FAQ artwork',
    title: 'Warzone Cheats FAQ',
    caption: 'Compatibility, feature and setup answers for Warzone.',
  },
  support: {
    src: WARZONE_HERO,
    alt: 'Warzone cheats support artwork',
    title: 'Warzone Cheats Support',
    caption: 'Delivery, loader and setup support for Warzone.',
  },
  product: {
    src: WARZONE_COVER,
    alt: 'Warzone Aimbot ESP and radar product artwork',
    title: 'Warzone Cheats Features',
    caption: 'Product details for Warzone Aimbot, ESP and radar.',
  },
}

export function getGameImage(_slug: string): string {
  return WARZONE_PRODUCT_COVER
}

export function getProductHeroImage(slug: string): string {
  return slug === 'warzone' ? WARZONE_PRODUCT_HERO : getGameImage(slug)
}

export function getOgImage(path?: string): string {
  if (!path || path === '/') return PAGE_IMAGES.home.src
  if (path === '/warzone-cheats') return PAGE_IMAGES.product.src
  if (path === '/forums') return PAGE_IMAGES.forums.src
  if (path === '/reviews') return PAGE_IMAGES.reviews.src
  if (path === '/faq') return PAGE_IMAGES.faq.src
  if (path === '/support') return PAGE_IMAGES.support.src
  return WARZONE_OG
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
