/**
 * Unused while the project deploys as Cloudflare Pages
 * (see wrangler.toml pages_build_output_dir + npm run deploy).
 * Kept as a fallback Worker entry if the project is moved to Workers+assets again.
 * If re-enabled, always fetch via https://assets.local/... — never the request host —
 * to avoid Cloudflare HTTP 522 on custom domains.
 */
const CANONICAL_HOST = 'theislecheats.net'
const LEGACY_HOSTS = new Set([
  'theislecheats.cc',
  'www.theislecheats.cc',
  'www.theislecheats.net',
])

function needsCanonicalRedirect(url) {
  const host = url.hostname.toLowerCase()
  return url.protocol === 'http:' || LEGACY_HOSTS.has(host)
}

function assetRequest(request, pathname) {
  return new Request(new URL(pathname, 'https://assets.local'), request)
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (needsCanonicalRedirect(url)) {
      url.protocol = 'https:'
      url.hostname = CANONICAL_HOST
      return Response.redirect(url.toString(), 301)
    }

    return env.ASSETS.fetch(assetRequest(request, url.pathname + url.search))
  },
}
