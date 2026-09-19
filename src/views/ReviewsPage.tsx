import { Star } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { getReviewsAggregate, REVIEWS } from '../data/reviews'
import { CheckoutLink } from '../components/CheckoutLink'
import { SITE_NAME } from '../data/site'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < rating ? 'fill-z-soft text-z-soft' : 'text-z-soft/25'}`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}

export function ReviewsPage() {
  const aggregate = getReviewsAggregate()

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
              DayZ Cheats Reviews
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/55">
              Feedback from players who bought DayZ Cheats — ESP accuracy, status honesty, and
              whether the build held after the last BattlEye patch.
            </p>
            <p className="mt-4 text-sm text-white/45" aria-label="Aggregate rating">
              Average {aggregate.ratingValue} / 5 · {aggregate.reviewCount} reviews
            </p>
          </div>
        </section>

        <section className="page-x py-12 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {REVIEWS.map((review) => (
                <li key={review.id} className="py-7 sm:py-8">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-white">{review.author}</p>
                      <p className="text-xs text-white/45">{review.role}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Stars rating={review.rating} />
                      <time className="text-[11px] text-white/35" dateTime={review.datePublished}>
                        {review.datePublished}
                      </time>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/65">“{review.body}”</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="page-x border-t border-white/10 py-14 sm:py-16">
          <div className="mx-auto flex max-w-3xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Ready to buy DayZ Cheats?
              </h2>
              <p className="mt-2 text-sm text-white/50">
                Confirm live BattlEye status on the product page, then checkout.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/dayz-cheats"
                className="inline-flex items-center justify-center rounded-full border border-z-soft/35 bg-[rgba(28,22,48,0.88)] px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-xl transition-colors hover:border-z-soft/50"
              >
                Product details
              </a>
              <CheckoutLink className="cta-gradient inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-white">
                Buy now
              </CheckoutLink>
            </div>
          </div>
        </section>

        <SiteFooter currentPath="/reviews" />
      </main>
    </div>
  )
}
