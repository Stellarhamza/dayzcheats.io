import { useEffect, useRef, useState } from 'react'

const REVIEWS_VIDEO = '/videos/reviews-neon.webm'
const START_AT = 5

type LocalVideoStripProps = {
  className?: string
  src?: string
  startAt?: number
  /** Start loading immediately (home / reviews strips) */
  eager?: boolean
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function LocalVideoStrip({
  className = '',
  src = REVIEWS_VIDEO,
  startAt = START_AT,
  eager = false,
}: LocalVideoStripProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLVideoElement>(null)
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(eager)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (eager) return

    const root = wrapRef.current
    if (!root) return

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true)
          io.disconnect()
        }
      },
      { rootMargin: '500px 0px', threshold: 0 },
    )
    io.observe(root)
    return () => io.disconnect()
  }, [eager])

  useEffect(() => {
    if (!active) return
    const video = ref.current
    if (!video) return

    let cancelled = false
    let showTimer: ReturnType<typeof setTimeout> | undefined
    let retryTimer: ReturnType<typeof setTimeout> | undefined

    const reduced = prefersReducedMotion()

    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    video.loop = true
    video.controls = false
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')

    const show = () => {
      if (!cancelled) setVisible(true)
    }

    const jumpStart = () => {
      const mark = Number.isFinite(video.duration) ? Math.min(startAt, Math.max(0, video.duration - 0.5)) : startAt
      if (!video.duration || video.duration <= mark) return
      try {
        if (video.currentTime < mark - 0.2) {
          video.currentTime = mark
        }
      } catch {
        /* ignore seek failures */
      }
    }

    const play = () => {
      if (cancelled || reduced) {
        show()
        return
      }
      jumpStart()
      void video
        .play()
        .then(show)
        .catch(() => {
          if (video.readyState >= 2) show()
          retryTimer = setTimeout(() => {
            if (cancelled) return
            void video.play().then(show).catch(() => show())
          }, 400)
        })
    }

    const onLoadedData = () => {
      jumpStart()
      play()
    }
    const onCanPlay = () => play()
    const onPlaying = () => show()
    const onSeeked = () => {
      if (reduced) {
        show()
        return
      }
      void video.play().then(show).catch(() => show())
    }
    const onEnded = () => {
      const mark = Number.isFinite(video.duration) ? Math.min(startAt, Math.max(0, video.duration - 0.5)) : 0
      try {
        video.currentTime = mark
      } catch {
        /* ignore */
      }
      void video.play().catch(() => {})
    }
    const onError = () => {
      setFailed(true)
      show()
    }

    const onVisibility = () => {
      if (document.hidden || reduced || cancelled) return
      if (video.paused) void video.play().catch(() => {})
    }

    video.addEventListener('loadeddata', onLoadedData)
    video.addEventListener('canplay', onCanPlay)
    video.addEventListener('playing', onPlaying)
    video.addEventListener('seeked', onSeeked)
    video.addEventListener('ended', onEnded)
    video.addEventListener('error', onError)
    document.addEventListener('visibilitychange', onVisibility)

    showTimer = setTimeout(show, 1200)

    if (video.readyState >= 2) onLoadedData()
    else video.load()

    return () => {
      cancelled = true
      if (showTimer) clearTimeout(showTimer)
      if (retryTimer) clearTimeout(retryTimer)
      video.removeEventListener('loadeddata', onLoadedData)
      video.removeEventListener('canplay', onCanPlay)
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('seeked', onSeeked)
      video.removeEventListener('ended', onEnded)
      video.removeEventListener('error', onError)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [active, src, startAt])

  return (
    <div
      ref={wrapRef}
      className={`video-strip relative w-full overflow-hidden pointer-events-none select-none ${className}`.trim()}
    >
      <div className="absolute inset-0 z-0 bg-z-band" aria-hidden />
      {active && !failed ? (
        <video
          ref={ref}
          className={`video-strip-local absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-700 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          src={src}
          muted
          autoPlay
          playsInline
          loop
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden
          tabIndex={-1}
        />
      ) : null}
      <div className="video-strip-tint pointer-events-none absolute inset-0 z-[2]" aria-hidden />
      <div className="video-strip-tint-glow pointer-events-none absolute inset-0 z-[2]" aria-hidden />
    </div>
  )
}
