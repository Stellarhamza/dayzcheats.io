/**
 * Legacy local video strip — unused after Tarkov rebrand.
 * Kept as a no-op image strip so old imports do not crash builds.
 */
import { TARKOV_ESP } from '../data/media'

type LocalVideoStripProps = {
  title?: string
  src?: string
  startAt?: number
  poster?: string
  className?: string
  eager?: boolean
}

export function LocalVideoStrip({
  title = 'Escape from Tarkov gameplay preview',
  poster = TARKOV_ESP,
  className = '',
}: LocalVideoStripProps) {
  return (
    <div
      className={`video-strip relative w-full overflow-hidden pointer-events-none select-none ${className}`.trim()}
    >
      <img
        src={poster}
        alt={title}
        className="video-strip-local absolute inset-0 z-[1] h-full w-full object-cover opacity-100"
        loading="lazy"
        decoding="async"
      />
      <div className="video-strip-tint pointer-events-none absolute inset-0 z-[2]" aria-hidden />
      <div className="video-strip-tint-glow pointer-events-none absolute inset-0 z-[2]" aria-hidden />
    </div>
  )
}
