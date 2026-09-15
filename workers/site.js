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
const BOT_UA =
  /Googlebot|Google-InspectionTool|Googlebot-Image|bingbot|BingPreview|Slurp|DuckDuckBot|YandexBot|Baiduspider|Applebot|facebookexternalhit|Twitterbot|LinkedInBot|SemrushBot|AhrefsBot/i

function needsCanonicalRedirect(url) {
  const host = url.hostname.toLowerCase()
  return url.protocol === 'http:' || LEGACY_HOSTS.has(host)
}

function firstContentType(value) {
  return (value || '').split(',')[0].trim()
}

async function serveSitemap(request, env) {
  const assetResponse = await env.ASSETS.fetch(request)
  if (!assetResponse.ok) return assetResponse

  let body = await assetResponse.text()
  const ua = request.headers.get('user-agent') || ''
  const wantsStylesheet = !BOT_UA.test(ua)

  if (wantsStylesheet && !body.includes('xml-stylesheet')) {
    body = body.replace(
      /^<\?xml version="1\.0" encoding="UTF-8"\?>\s*/,
      '<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/css" href="/sitemap.css"?>\n',
    )
  }

  return new Response(body, {
    status: 200,
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': wantsStylesheet
        ? 'public, max-age=3600'
        : 'public, max-age=600, must-revalidate',
      'x-content-type-options': 'nosniff',
      'x-robots-tag': 'noarchive',
    },
  })
}

async function serveRobots(request, env) {
  const assetResponse = await env.ASSETS.fetch(request)
  if (!assetResponse.ok) return assetResponse
  const body = await assetResponse.text()
  return new Response(body, {
    status: 200,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=600, must-revalidate',
      'x-content-type-options': 'nosniff',
    },
  })
}

function cleanResponseHeaders(response) {
  const headers = new Headers(response.headers)
  const type = firstContentType(headers.get('content-type'))
  if (type.toLowerCase().startsWith('text/html')) {
    headers.set(
      'content-type',
      /charset=/i.test(type) ? type : 'text/html; charset=utf-8',
    )
  } else if (type) {
    headers.set('content-type', type)
  }

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

    if (url.pathname === '/sitemap.xml') {
      return serveSitemap(request, env)
    }
    if (url.pathname === '/robots.txt') {
      return serveRobots(request, env)
    }

    const assetResponse = await env.ASSETS.fetch(request)
    return cleanResponseHeaders(assetResponse)
  },
}
