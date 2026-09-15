/**
 * Host redirects for legacy Pages Functions (if invoked).
 * HTTPS only — do not bounce www ↔ apex (negative DNS caches).
 */
export async function onRequest(context) {
  const url = new URL(context.request.url)
  if (url.protocol === 'http:') {
    url.protocol = 'https:'
    return Response.redirect(url.toString(), 301)
  }
  return context.next()
}
