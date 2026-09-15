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
import { SeoMedia } from '../components/SeoMedia'
import { CheckoutLink } from '../components/CheckoutLink'
import { NotFoundPage } from './NotFoundPage'
import { blogPath } from '../data/blogs'
import { PAGE_MEDIA } from '../data/media'

function ProductPurchaseCard({ game }: { game: Game }) {
  return (
    <div className="page-card overflow-hidden rounded-2xl sm:rounded-3xl">
      <CheckoutLink className="block" aria-label="Buy The Isle Cheats">
        <GameCover slug={game.slug} name={game.name} aspect="square" className="rounded-none" />
      </CheckoutLink>
      <div className="p-5 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="icon-well shrink-0 text-sm font-bold">TI</div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">The Isle Cheats</p>
            <p className="text-xs text-white/45">
              Status: {game.status} · Evrima · From ${PRODUCT_PRICE_USD}
            </p>
          </div>
        </div>

        <CheckoutLink className="cta-gradient mt-5 block w-full rounded-full py-3.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:mt-6">
          Buy The Isle Cheats
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

  if (!guideSlug.endsWith('-cheats')) {
    const maybe = getGame(guideSlug)
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

            <div className="mt-5 overflow-hidden rounded-2xl border border-z-soft/20 sm:mt-8">
              <video
                controls
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
                poster={PAGE_MEDIA.product.image}
                aria-label={PAGE_MEDIA.product.videoTitle}
                className="aspect-video w-full bg-black object-cover lg:aspect-[21/9]"
              >
                <source src={PAGE_MEDIA.product.video} type="video/mp4" />
              </video>
            </div>

            <div className="mt-5 sm:mt-6">
              <span className="inline-flex items-center gap-1.5 text-xs text-z-success/90">
                <Shield className="h-3.5 w-3.5 shrink-0 text-z-success" strokeWidth={1.75} />
                {game.status} · Evrima / Horde · EAC-aware · {SITE_HOST}
              </span>

              <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-white sm:mt-4 sm:text-4xl lg:text-5xl">
                Evrima ESP Features, Price & Checkout
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55 sm:mt-4 sm:text-base">
                Compare Entity ESP, World ESP, radar, stream-proof mode, and HWID spoofer
                support. Confirm current status, then continue to checkout.
              </p>
              <CheckoutLink className="cta-gradient mt-5 inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                Buy The Isle Cheats
              </CheckoutLink>
            </div>

            <div className="mt-8">
              <SeoMedia media={PAGE_MEDIA.product} showVideo={false} />
            </div>

            <div className="mt-6 lg:hidden">
              <ProductPurchaseCard game={game} />
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
              <div className="lg:col-span-7 space-y-10">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    Included Evrima features
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
                    Entity ESP, World ESP & radar
                  </h2>
                  <p>
                    The Isle Cheats kit leads with Entity ESP / wallhack (players + dinos),
                    World ESP for food/water/corpses, and a 2D radar so you rotate before
                    they scent you.
                  </p>
                  <p>
                    Optional aim assist stays optional. If you want the lowest footprint
                    playstyle, run ESP + radar + stream-proof and leave combat extras off.
                  </p>
                </div>

                <div className="space-y-3 text-sm leading-relaxed text-white/55">
                  <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    The Isle Undetected status (EAC)
                  </h2>
                  <p>
                    The Isle uses Easy Anti-Cheat. After an Evrima or Horde patch, builds can
                    flip to Updating until tested. {SITE_NAME} shows live Undetected status so
                    you are not buying a dead loader from a screenshot farm.
                  </p>
                  <p>
                    Rule: status first, inject second. That beats every “lifetime undetected”
                    claim on competing shops.
                  </p>
                </div>

                <div className="space-y-3 text-sm leading-relaxed text-white/55">
                  <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    Checkout and delivery
                  </h2>
                  <ol className="list-decimal space-y-2 pl-5">
                    <li>Confirm current status on the {SITE_HOST} homepage.</li>
                    <li>Confirm status is Undetected (or accept Updating risk).</li>
                    <li>Scan Entity ESP / World ESP / radar / spoofer features.</li>
                    <li>Checkout for instant loader delivery.</li>
                    <li>
                      Follow the{' '}
                      <a
                        href={blogPath('complete-setup')}
                        className="text-white/80 underline-offset-2 hover:underline"
                      >
                        complete setup and load order
                      </a>{' '}
                      after delivery.
                    </li>
                  </ol>
                </div>

                <div className="space-y-3 text-sm leading-relaxed text-white/55">
                  <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    Evrima, Horde & why we stay Isle-only
                  </h2>
                  <p>
                    {SITE_NAME} is Isle-only — The Isle Evrima first, Horde when the build
                    includes it. Status updates stay on one product page, not buried under a
                    multi-game catalog.
                  </p>
                  <p>
                    Play the game from the{' '}
                    <a
                      href="https://www.survivetheisle.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 underline-offset-2 hover:underline"
                    >
                      official The Isle website
                    </a>{' '}
                    or{' '}
                    <a
                      href="https://store.steampowered.com/app/376210/The_Isle/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 underline-offset-2 hover:underline"
                    >
                      The Isle on Steam
                    </a>
                    . For cheats, stay on {SITE_HOST}:{' '}
                    <a href="/reviews" className="text-white/80 underline-offset-2 hover:underline">
                      reviews
                    </a>
                    ,{' '}
                    <a href="/support" className="text-white/80 underline-offset-2 hover:underline">
                      support
                    </a>
                    , and{' '}
                    <a href="/forums" className="text-white/80 underline-offset-2 hover:underline">
                      forums
                    </a>
                    .
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    More help
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">
                    Full answers live in the FAQ section below and on the{' '}
                    <a href="/faq" className="text-white/80 underline-offset-2 hover:underline">
                      The Isle Cheats FAQ
                    </a>{' '}
                    page. For load issues open{' '}
                    <a href="/support" className="text-white/80 underline-offset-2 hover:underline">
                      support
                    </a>
                    .
                  </p>
                </div>
              </div>

              <aside className="hidden lg:col-span-5 lg:block lg:sticky lg:top-8">
                <ProductPurchaseCard game={game} />
              </aside>
            </div>
          </div>
        </section>

        <FaqSection
          id="faq"
          heading="Product questions"
          intro="Answers about EAC status, included features, compatibility, and HWID spoofer support."
          items={PRODUCT_PAGE_FAQS}
        />

        <SiteFooter currentPath="/isle-cheats" />
      </main>
    </div>
  )
}
