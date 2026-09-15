/**
 * Host redirects for legacy Pages Functions (if invoked).
 * Primary redirects live in workers/site.js for `npx wrangler deploy`.
 * Do not force www → apex (apex may lack IPv4 A records).
 */
export async function onRequest(context) {
  const url = new URL(context.request.url)
  if (url.protocol === 'http:') {
    url.protocol = 'https:'
    return Response.redirect(url.toString(), 301)
  }
  return context.next()
}
