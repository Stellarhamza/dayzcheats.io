/**
 * Cloudflare Pages middleware — runs before static HTML for matched routes.
 * 301 www/.cc/http → https://theislecheats.net (canonical apex).
 * /sitemap.xml and /robots.txt are excluded in public/_routes.json so Google
 * fetches them as pure static files (avoids Functions/522 timeouts).
 */
const CANONICAL_HOST = 'theislecheats.net'
const LEGACY_HOSTS = new Set([
  'theislecheats.cc',
  'www.theislecheats.cc',
  'www.theislecheats.net',
])

export async function onRequest(context) {
  const url = new URL(context.request.url)
  const host = url.hostname.toLowerCase()
  const needsHttps = url.protocol === 'http:'
  const needsHostFix = LEGACY_HOSTS.has(host)

  if ((host === CANONICAL_HOST || needsHostFix) && (needsHttps || needsHostFix)) {
    url.protocol = 'https:'
    url.hostname = CANONICAL_HOST
    return Response.redirect(url.toString(), 301)
  }

  return context.next()
}
