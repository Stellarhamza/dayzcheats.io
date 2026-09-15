/**
 * Host redirects for legacy Pages Functions (if invoked).
 * Canonical host is www.warzonecheats.uk.
 */
const CANONICAL_HOST = 'www.warzonecheats.uk'
const LEGACY_HOSTS = new Set(['warzonecheats.uk'])

export async function onRequest(context) {
  const url = new URL(context.request.url)
  const host = url.hostname.toLowerCase()
  const needsHttps = url.protocol === 'http:'
  const needsHostFix = LEGACY_HOSTS.has(host)

  if (needsHttps || needsHostFix) {
    url.protocol = 'https:'
    url.hostname = CANONICAL_HOST
    return Response.redirect(url.toString(), 301)
  }

  return context.next()
}
