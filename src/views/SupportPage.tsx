import { ChevronDown } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { CheckoutLink } from '../components/CheckoutLink'
import { SITE_NAME } from '../data/site'
import { SUPPORT_FAQS, SUPPORT_INTRO, SUPPORT_TOPICS } from '../data/support'
import { blogPath } from '../data/blogs'

export function SupportPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-z-bg text-white">
      <div className="border-b border-z-soft/15 bg-z-bg/90 backdrop-blur-xl">
        <Navbar />
      </div>

      <main className="support-surface">
        <section className="page-x pt-12 sm:pt-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#5b21b6]/70">
              {SITE_NAME} · Help
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#1c1728] sm:text-5xl">
              DayZ Cheats Support
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#3d3554]/85">{SUPPORT_INTRO}</p>
            <p className="mt-3 text-sm text-[#3d3554]/70">
              Setup guides live in the{' '}
              <a href="/forums" className="support-link">
                forums
              </a>
              . Start with{' '}
              <a href={blogPath('complete-setup')} className="support-link">
                complete setup
              </a>{' '}
              before opening a ticket.
            </p>
          </div>
        </section>

        <section className="page-x py-10 sm:py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-lg font-semibold tracking-tight text-[#1c1728] sm:text-xl">
              How we help
            </h2>
            <ol className="mt-6 space-y-6">
              {SUPPORT_TOPICS.map((topic, i) => (
                <li key={topic.heading} className="flex gap-4 sm:gap-5">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#b040fb]/15 text-sm font-semibold text-[#5b21b6]"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="text-base font-semibold text-[#1c1728]">{topic.heading}</h3>
                    <ul className="mt-2 space-y-2 text-sm leading-relaxed text-[#3d3554]/85">
                      {topic.body.map((line) => (
                        <li key={line.slice(0, 48)}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="faq" className="page-x pb-10 sm:pb-12" aria-labelledby="support-faq-heading">
          <div className="mx-auto max-w-3xl">
            <h2
              id="support-faq-heading"
              className="mb-6 text-lg font-semibold tracking-tight text-[#1c1728] sm:text-xl"
            >
              Support FAQ
            </h2>
            <div className="support-divider divide-y border-y">
              {SUPPORT_FAQS.map((item) => (
                <details key={item.q} className="group py-1">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-left outline-none marker:content-none [&::-webkit-details-marker]:hidden">
                    <h3 className="text-sm font-semibold leading-snug text-[#1c1728] sm:text-base">
                      {item.q}
                    </h3>
                    <ChevronDown
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#5b21b6]/50 transition-transform duration-200 group-open:rotate-180"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </summary>
                  <p className="pb-5 pr-8 text-sm leading-relaxed text-[#3d3554]/85">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="page-x border-t border-[#4c1d95]/12 py-14 sm:py-16">
          <div className="mx-auto flex max-w-3xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-[#1c1728] sm:text-2xl">
                Need help now?
              </h2>
              <p className="mt-2 text-sm text-[#3d3554]/75">
                Confirm BattlEye status on the product page, then buy or reopen your order for
                delivery support.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/dayz-cheats"
                className="inline-flex items-center justify-center rounded-full border border-[#5b21b6]/25 bg-white/70 px-5 py-2.5 text-sm font-semibold text-[#1c1728] shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
              >
                Product details
              </a>
              <CheckoutLink className="cta-gradient inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-white">
                Buy DayZ Cheats
              </CheckoutLink>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter currentPath="/support" />
    </div>
  )
}
