/**
 * Cloudflare Worker entry for static Astro output in ./dist.
 * Requires assets.run_worker_first so host redirects run before asset lookup.
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

function withHtmlCharset(response) {
  const contentType = response.headers.get('content-type') || ''
  if (!contentType.toLowerCase().startsWith('text/html')) return response
  if (/charset=/i.test(contentType)) return response

  const headers = new Headers(response.headers)
  headers.set('content-type', 'text/html; charset=utf-8')
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (needsCanonicalRedirect(url)) {
      url.protocol = 'https:'
      url.hostname = CANONICAL_HOST
      return Response.redirect(url.toString(), 301)
    }

    const assetResponse = await env.ASSETS.fetch(request)
    return withHtmlCharset(assetResponse)
  },
}
