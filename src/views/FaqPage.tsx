import { ChevronDown } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { SITE_FAQS } from '../data/faqs'
import { CheckoutLink } from '../components/CheckoutLink'
import { SITE_NAME } from '../data/site'

export function FaqPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-z-bg text-white">
      <div className="border-b border-z-soft/15 bg-z-bg/90 backdrop-blur-xl">
        <Navbar />
      </div>

      <main className="page-body">
        <section className="page-x pt-12 sm:pt-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
              {SITE_NAME}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              DayZ Cheats FAQ
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/55">
              BattlEye status, ESP, Aimbot, radar hack, servers, buying, loading, support and
              refunds — straight answers before you checkout.
            </p>
          </div>
        </section>

        <section id="faq" className="page-x py-10 sm:py-12" aria-labelledby="faq-heading">
          <div className="mx-auto max-w-3xl">
            <h2
              id="faq-heading"
              className="mb-6 text-lg font-semibold tracking-tight text-white sm:text-xl"
            >
              All questions
            </h2>

            <div className="divide-y divide-white/10 border-y border-white/10">
              {SITE_FAQS.map((item) => (
                <details key={item.q} className="group faq-item py-1">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-left outline-none marker:content-none [&::-webkit-details-marker]:hidden">
                    <h3 className="text-sm font-semibold leading-snug text-white sm:text-base">
                      {item.q}
                    </h3>
                    <ChevronDown
                      className="mt-0.5 h-4 w-4 shrink-0 text-white/40 transition-transform duration-200 group-open:rotate-180"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </summary>
                  <p className="pb-5 pr-8 text-sm leading-relaxed text-white/55">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="page-x border-t border-white/10 py-14 sm:py-16">
          <div className="mx-auto flex max-w-3xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Still need help?
              </h2>
              <p className="mt-2 text-sm text-white/50">
                Open support for load help, or buy when BattlEye status is clear.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/support"
                className="inline-flex items-center justify-center rounded-full border border-z-soft/35 bg-[rgba(28,22,48,0.88)] px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-xl transition-colors hover:border-z-soft/50"
              >
                Support
              </a>
              <CheckoutLink className="cta-gradient inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-white">
                Buy DayZ Cheats
              </CheckoutLink>
            </div>
          </div>
        </section>

        <SiteFooter currentPath="/faq" />
      </main>
    </div>
  )
}
