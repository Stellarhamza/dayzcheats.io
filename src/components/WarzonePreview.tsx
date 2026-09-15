import {
  WARZONE_ESP,
  WARZONE_GAMEPLAY,
  WARZONE_HOME_VIDEO,
  WARZONE_MENU,
} from '../data/media'

type WarzonePreviewProps = {
  className?: string
  /** Wider crop on product page */
  wide?: boolean
}

/** Self-hosted Warzone preview — mediadelivery embeds 403 off battlelog domains. */
export function WarzonePreview({ className = '', wide = false }: WarzonePreviewProps) {
  return (
    <div className={`video-brand-mask border border-z-soft/20 ${className}`.trim()}>
      <div
        className={`relative w-full overflow-hidden ${wide ? 'aspect-video lg:aspect-[21/9]' : 'aspect-video'}`}
      >
        <div className="absolute inset-0 grid grid-cols-3">
          <img
            src={WARZONE_GAMEPLAY}
            alt="Warzone Aimbot gameplay preview"
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
          <img
            src={WARZONE_MENU}
            alt="Warzone cheats menu preview"
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
          <img
            src={WARZONE_ESP}
            alt="Warzone ESP wallhack gameplay preview"
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-z-bg/50 via-transparent to-z-bg/20" />
        <div className="video-brand-blur" aria-hidden />
      </div>
      <p className="sr-only">{WARZONE_HOME_VIDEO.title}</p>
    </div>
  )
}
