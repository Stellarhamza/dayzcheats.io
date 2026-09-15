/**
 * Cloudflare Worker entry for static Astro output in ./dist.
 * Handles legacy host redirects, then serves assets.
 */
const CANONICAL_HOST = 'theislecheats.net'
const LEGACY_HOSTS = new Set([
  'theislecheats.cc',
  'www.theislecheats.cc',
  'www.theislecheats.net',
])

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const host = url.hostname.toLowerCase()
    const needsHttps = url.protocol === 'http:'
    const needsHostFix = LEGACY_HOSTS.has(host)

    if ((host === CANONICAL_HOST || needsHostFix) && (needsHttps || needsHostFix)) {
      url.protocol = 'https:'
      url.hostname = CANONICAL_HOST
      return Response.redirect(url.toString(), 301)
    }

    return env.ASSETS.fetch(request)
  },
}
