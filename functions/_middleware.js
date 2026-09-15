/**
 * Canonical host: HTTPS + apex (non-www).
 * Sitemap/robots/static assets bypass this via public/_routes.json excludes.
 */
const CANONICAL_HOST = 'theislecheats.cc'

export async function onRequest(context) {
  const url = new URL(context.request.url)
  const host = url.hostname.toLowerCase()
  const needsHttps = url.protocol === 'http:'
  const needsApex = host === `www.${CANONICAL_HOST}`

  if (
    (needsHttps || needsApex) &&
    (host === CANONICAL_HOST || host === `www.${CANONICAL_HOST}`)
  ) {
    url.protocol = 'https:'
    url.hostname = CANONICAL_HOST
    return Response.redirect(url.toString(), 301)
  }

  return context.next()
}
