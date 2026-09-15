/**
 * Legacy Pages middleware (unused by wrangler deploy).
 * Host redirects now live in workers/site.js for Workers+assets deploys.
 * Kept so older Pages dashboards that still invoke Functions keep working.
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
