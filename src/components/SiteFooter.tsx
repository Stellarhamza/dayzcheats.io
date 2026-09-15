import { LogoMark } from './LogoMark'
import { SiteLinkHub } from './SiteLinkHub'
import { OFFICIAL_ISLE_LINKS } from '../data/links'
import { SITE_HOST, SITE_NAME, SITE_URL } from '../data/site'

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
              Undetected The Isle cheats for Evrima. Status checked. Features listed. Built for{' '}
              <a
                href={OFFICIAL_ISLE_LINKS[0].href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/75 underline-offset-2 hover:text-white hover:underline"
              >
                The Isle
              </a>{' '}
              players only.
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/65">
            <li>
              <a href={SITE_URL} className="hover:text-white">
                {SITE_HOST}
              </a>
            </li>
            <li>
              <a href="/sitemap.xml" className="hover:text-white">
                XML sitemap
              </a>
            </li>
            <li>
              <a
                href={OFFICIAL_ISLE_LINKS[1].href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                The Isle on Steam
              </a>
            </li>
          </ul>
        </div>
        <p className="mx-auto mt-10 max-w-6xl text-xs text-white/35">
          © {new Date().getFullYear()} {SITE_NAME}. Not affiliated with Afterthought LLC or
          the official The Isle game.
        </p>
      </footer>
    </>
  )
}
