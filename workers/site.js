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

function firstHeaderValue(value) {
  return (value || '').split(',')[0].trim()
}

function cleanResponseHeaders(response, pathname) {
  const headers = new Headers(response.headers)
  const path = pathname.toLowerCase()

  if (path === '/sitemap.xml' || path.endsWith('.xml')) {
    headers.set('content-type', 'application/xml; charset=utf-8')
  } else if (path === '/robots.txt') {
    headers.set('content-type', 'text/plain; charset=utf-8')
  } else {
    const type = firstHeaderValue(headers.get('content-type'))
    if (type.toLowerCase().startsWith('text/html')) {
      headers.set(
        'content-type',
        /charset=/i.test(type) ? type : 'text/html; charset=utf-8',
      )
    } else if (type) {
      headers.set('content-type', type)
    }
  }

  const cache = firstHeaderValue(headers.get('cache-control'))
  if (cache) headers.set('cache-control', cache)

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
    return cleanResponseHeaders(assetResponse, url.pathname)
  },
}
