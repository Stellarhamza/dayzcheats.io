/**
 * Worker entry for Astro static output in ./dist.
 * IMPORTANT: Always fetch assets via https://assets.local — never the request
 * hostname — or Cloudflare returns HTTP 522 on custom domains.
 *
 * Apex currently has AAAA-only DNS in some setups; www has IPv4 A records.
 * Do NOT 301 www → apex or IPv4 users get NXDOMAIN / unreachable after redirect.
 * Prefer apex when present; keep www serving the same site until A records exist.
 */
const APEX_HOST = 'warzonecheats.uk'
const WWW_HOST = 'www.warzonecheats.uk'

function assetsFetch(env, request, pathname) {
  return env.ASSETS.fetch(new Request(new URL(pathname, 'https://assets.local'), request))
}

function withHtmlCharset(response) {
  const contentType = response.headers.get('content-type') || ''
  const primary = contentType.split(',')[0].trim()
  if (!primary.toLowerCase().startsWith('text/html')) return response
  if (/charset=/i.test(primary)) {
    if (contentType.includes(',')) {
      const headers = new Headers(response.headers)
      headers.set('content-type', primary)
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      })
    }
    return response
  }
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
    const host = url.hostname.toLowerCase()

    // HTTPS only — do not bounce www ↔ apex (breaks IPv4 when apex lacks A records)
    if (url.protocol === 'http:') {
      url.protocol = 'https:'
      if (host !== APEX_HOST && host !== WWW_HOST) {
        url.hostname = APEX_HOST
      }
      return Response.redirect(url.toString(), 301)
    }

    const assetResponse = await assetsFetch(env, request, url.pathname + url.search)
    return withHtmlCharset(assetResponse)
  },
}
