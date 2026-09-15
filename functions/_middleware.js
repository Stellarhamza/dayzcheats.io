/**
 * Canonical host: HTTPS + apex theislecheats.net.
 * Also redirects legacy .cc / www hosts to .net. Sitemap/robots bypass via _routes.json.
 */
const CANONICAL_HOST = 'theislecheats.net'
const LEGACY_HOSTS = new Set(['theislecheats.cc', 'www.theislecheats.cc', 'www.theislecheats.net'])

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
