import { LogoMark } from './LogoMark'
import { SiteLinkHub } from './SiteLinkHub'
import { SITE_NAME } from '../data/site'

type SiteFooterProps = {
  currentPath?: string
}

/**
 * One HTML sitemap (SiteLinkHub) + a slim brand footer.
 * Avoids duplicate identical internal anchors that SEO crawlers flag.
 */
export function SiteFooter({ currentPath }: SiteFooterProps) {
  const hubPath = currentPath || '/'

  return (
    <>
      <SiteLinkHub currentPath={hubPath} />

      <footer className="page-x border-t border-z-soft/15 bg-z-band py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-2">
              <LogoMark className="text-z-soft" />
              <span className="font-semibold text-z-ink">{SITE_NAME}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              Warzone Cheats for PC — Aimbot, ESP, wallhack, radar and live Ricochet status for
              UK and worldwide players.
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/65">
            <li>
              <a href="/privacy" className="hover:text-white">
                Privacy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-white">
                Terms
              </a>
            </li>
            <li>
              <a href="/refunds" className="hover:text-white">
                Refunds
              </a>
            </li>
          </ul>
        </div>
        <p className="mx-auto mt-10 max-w-6xl text-xs text-white/35">
          © {new Date().getFullYear()} {SITE_NAME}. Not affiliated with Activision and Call of Duty or
          the official Warzone game.
        </p>
      </footer>
    </>
  )
}
