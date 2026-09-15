import { Check, Shield } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { GameCover } from '../components/GameCover'
import {
  GUIDE_FEATURES,
  getGame,
  guidePath,
  parseGuideSlug,
  type Game,
} from '../data/games'
import { PRODUCT_PAGE_FAQS } from '../data/faqs'
import { PRODUCT_PRICE_USD, SITE_HOST, SITE_NAME } from '../data/site'
import { FaqSection } from '../components/FaqSection'
import { CheckoutLink } from '../components/CheckoutLink'
import { NotFoundPage } from './NotFoundPage'
import { blogPath } from '../data/blogs'
import { WARZONE_HOME_VIDEO } from '../data/media'
import { WarzonePreview } from '../components/WarzonePreview'

function ProductPurchaseCard({ game }: { game: Game }) {
  return (
    <div className="page-card overflow-hidden rounded-2xl sm:rounded-3xl">
      <CheckoutLink className="block" aria-label="Buy Warzone Cheats">
        <GameCover slug={game.slug} name={game.name} aspect="square" className="rounded-none" />
      </CheckoutLink>
      <div className="p-5 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="icon-well shrink-0 text-sm font-bold">WZ</div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">Warzone Cheats</p>
            <p className="text-xs text-white/45">
              Status: {game.status} · Warzone · From ${PRODUCT_PRICE_USD}
            </p>
          </div>
        </div>

        <CheckoutLink className="cta-gradient mt-5 block w-full rounded-full py-3.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:mt-6">
          Buy Warzone Cheats
        </CheckoutLink>
        <p className="mt-3 text-center text-[11px] text-white/40">
          Instant delivery · Check Undetected first
        </p>
      </div>
    </div>
  )
}

type GameProductPageProps = {
  guideSlug: string
}

export function GameProductPage({ guideSlug }: GameProductPageProps) {
  const slug = parseGuideSlug(guideSlug)
  const game = getGame(slug)

  if (!guideSlug.toLowerCase().endsWith('-cheats')) {
    const maybe = getGame(guideSlug.toLowerCase())
    if (maybe) {
      if (typeof window !== 'undefined') {
        window.location.replace(guidePath(maybe.slug))
      }
      return null
    }
    return <NotFoundPage />
  }

  if (!game) return <NotFoundPage />

  return (
    <div className="min-h-screen overflow-x-hidden bg-z-bg text-white">
      <div className="border-b border-z-soft/15 bg-z-bg/90 backdrop-blur-xl">
        <Navbar />
      </div>

      <main className="page-body">
        <section className="page-x py-8 sm:py-14">
          <div className="mx-auto max-w-6xl">
            <nav
              className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-white/40"
              aria-label="Breadcrumb"
            >
              <a href="/" className="shrink-0 hover:text-white/70">
                Home
              </a>
              <span className="shrink-0">/</span>
              <span className="min-w-0 text-white/70">Product details</span>
            </nav>

            <WarzonePreview wide className="mt-5 sm:mt-8" />
            <p className="mt-3 text-sm text-white/45">{WARZONE_HOME_VIDEO.caption}</p>

            <div className="mt-5 sm:mt-6">
              <span className="inline-flex items-center gap-1.5 text-xs text-z-soft">
                <Shield className="h-3.5 w-3.5 shrink-0 text-z-soft" strokeWidth={1.75} />
                {game.status} · Warzone · Ricochet · {SITE_HOST}
              </span>

              <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-white sm:mt-4 sm:text-4xl lg:text-5xl">
                Warzone Cheats Features, Price & Checkout
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55 sm:mt-4 sm:text-base">
                Compare Warzone Aimbot, ESP, wallhack, radar hack and stream-proof options for PC.
                Confirm Ricochet status, then continue to checkout — UK and worldwide delivery.
              </p>
              <CheckoutLink className="cta-gradient mt-5 inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                Buy Warzone Cheats
              </CheckoutLink>
            </div>

            <div className="mt-6 lg:hidden">
              <ProductPurchaseCard game={game} />
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
              <div className="space-y-10 lg:col-span-7">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    Included Warzone features
                  </h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {GUIDE_FEATURES.map((f) => (
                      <div key={f.name} className="page-card rounded-2xl p-4">
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-z-accent/20">
                            <Check className="h-3 w-3 text-z-soft" strokeWidth={2.5} />
                          </span>
                          <div className="min-w-0">
                            <h3 className="text-sm font-semibold text-white">{f.name}</h3>
                            <p className="mt-1 text-xs leading-relaxed text-white/50">{f.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 text-sm leading-relaxed text-white/55">
                  <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    Aimbot, ESP, wallhack & radar
                  </h2>
                  <p>
                    Warzone Cheats lead with humanized Aimbot, player ESP through buildings, loot
                    awareness and a 2D radar so third parties stop ending your games early.
                  </p>
                  <p>
                    Soft Aimbot stays optional. For Ranked UK lobbies, run ESP + radar first and keep
                    Aimbot conservative.
                  </p>
                </div>

                <div className="space-y-3 text-sm leading-relaxed text-white/55">
                  <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    Ricochet Undetected status
                  </h2>
                  <p>
                    Warzone uses Ricochet. After a client or anti-cheat patch, builds can flip to
                    Updating until tested. {SITE_NAME} shows live Undetected status so you are not
                    buying a dead loader.
                  </p>
                  <p>Rule: status first, load second.</p>
                </div>

                <div className="space-y-3 text-sm leading-relaxed text-white/55">
                  <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    Checkout and delivery
                  </h2>
                  <ol className="list-decimal space-y-2 pl-5">
                    <li>Confirm current status on {SITE_HOST}.</li>
                    <li>Confirm Undetected (or accept Updating risk).</li>
                    <li>Scan Aimbot / ESP / radar features on this page.</li>
                    <li>Checkout for digital licence delivery (UK & worldwide).</li>
                    <li>
                      Follow the{' '}
                      <a
                        href={blogPath('complete-setup')}
                        className="text-white/80 underline-offset-2 hover:underline"
                      >
                        complete setup guide
                      </a>{' '}
                      after delivery.
                    </li>
                  </ol>
                </div>
              </div>

              <aside className="hidden lg:col-span-5 lg:block">
                <div className="sticky top-24">
                  <ProductPurchaseCard game={game} />
                </div>
              </aside>
            </div>
          </div>
        </section>

        <FaqSection
          heading="Warzone Cheats product FAQ"
          intro="Status, features, UK delivery and load questions before checkout."
          items={PRODUCT_PAGE_FAQS}
        />

        <SiteFooter currentPath="/warzone-cheats" />
      </main>
    </div>
  )
}
