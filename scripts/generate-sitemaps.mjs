/**
 * Single sitemap at /sitemap.xml — every indexed URL in one urlset.
 * Support stays out (noindex). Images are attached on the same entries.
 */
import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')
const dataDir = join(root, 'src', 'data')
const SITE = (process.env.SITE_URL || 'https://theislecheats.cc').replace(/\/$/, '')
const TODAY = new Date().toLocaleDateString('en-CA')
const HREFLANG = ['en', 'x-default']

const FOREST = '/media/theisle-cheats-esp-forest.jpg'
const RIVER = '/media/theisle-cheats-esp-river.jpg'

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function siteUrl(path) {
  return !path || path === '/' ? `${SITE}/` : `${SITE}${path.startsWith('/') ? path : `/${path}`}`
}

function loadGames() {
  const src = readFileSync(join(dataDir, 'games.ts'), 'utf8')
  return [...src.matchAll(/\{\s*slug:\s*['"]([^'"]+)['"],\s*name:\s*['"]([^'"]+)['"]/g)].map(
    (match) => ({ slug: match[1], name: match[2] }),
  )
}

function loadForums() {
  const src = readFileSync(join(dataDir, 'blogs.ts'), 'utf8')
  const pattern =
    /slug:\s*['"]([^'"]+)['"],\s*title:\s*['"]([^'"]+)['"],[\s\S]*?date:\s*['"](\d{4}-\d{2}-\d{2})['"]/g
  return [...src.matchAll(pattern)].map((match) => ({
    slug: match[1],
    title: match[2],
    date: match[3],
  }))
}

function alternateLinks(url) {
  return HREFLANG.map(
    (language) =>
      `    <xhtml:link rel="alternate" hreflang="${language}" href="${escapeXml(url)}" />`,
  ).join('\n')
}

function imageBlock(image, title, caption) {
  return `    <image:image>
      <image:loc>${escapeXml(siteUrl(image))}</image:loc>
      <image:title>${escapeXml(title)}</image:title>
      <image:caption>${escapeXml(caption)}</image:caption>
    </image:image>`
}

function urlEntry({
  path,
  priority,
  changefreq,
  lastmod = TODAY,
  image,
  imageTitle,
  imageCaption,
}) {
  const url = siteUrl(path)
  const imageXml =
    image && imageTitle && imageCaption
      ? `\n${imageBlock(image, imageTitle, imageCaption)}`
      : ''
  return `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternateLinks(url)}${imageXml}
  </url>`
}

function buildSitemap(games, forums) {
  const entries = [
    urlEntry({
      path: '/',
      priority: '1.0',
      changefreq: 'daily',
      image: FOREST,
      imageTitle: 'TheIsle Cheats ESP Gameplay',
      imageCaption: 'Entity ESP gameplay shown before checkout.',
    }),
    ...games.map((game) =>
      urlEntry({
        path: `/${game.slug}-cheats`,
        priority: '0.9',
        changefreq: 'weekly',
        image: RIVER,
        imageTitle: 'Evrima ESP Product Gameplay',
        imageCaption: 'Product features, compatibility, status and price before checkout.',
      }),
    ),
    urlEntry({
      path: '/forums',
      priority: '0.85',
      changefreq: 'weekly',
      image: RIVER,
      imageTitle: 'The Isle Cheats Forum Gameplay',
      imageCaption: 'Gameplay reference for setup and feature threads.',
    }),
    ...forums.map((forum, index) =>
      urlEntry({
        path: `/forums/${forum.slug}`,
        priority: '0.8',
        changefreq: 'monthly',
        lastmod: forum.date,
        image: index % 2 === 0 ? RIVER : FOREST,
        imageTitle: `${forum.title} Gameplay`,
        imageCaption: `Visible Evrima gameplay reference for ${forum.title}.`,
      }),
    ),
    urlEntry({
      path: '/reviews',
      priority: '0.8',
      changefreq: 'weekly',
      image: FOREST,
      imageTitle: 'The Isle Cheats Review Gameplay',
      imageCaption: 'Gameplay accompanying verified buyer reviews.',
    }),
    urlEntry({
      path: '/faq',
      priority: '0.75',
      changefreq: 'monthly',
      image: RIVER,
      imageTitle: 'Evrima ESP FAQ Gameplay',
      imageCaption: 'Product screenshot accompanying pre-purchase answers.',
    }),
    urlEntry({
      path: '/support',
      priority: '0.75',
      changefreq: 'weekly',
      image: FOREST,
      imageTitle: 'The Isle Cheats Support Gameplay',
      imageCaption: 'Evrima ESP reference accompanying load, inject and delivery support.',
    }),
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join('\n')}
</urlset>
`
}

function validate(games, forums, sitemap) {
  const errors = []
  if (games.length !== 1 || games[0]?.slug !== 'isle') errors.push('Expected one isle product')
  if (forums.length !== 5) errors.push(`Expected 5 forum threads, found ${forums.length}`)
  if (forums.some((forum) => ['instructions', 'how-to-load'].includes(forum.slug))) {
    errors.push('Retired forum slug remains indexed')
  }

  const required = [
    `${SITE}/`,
    `${SITE}/isle-cheats`,
    `${SITE}/forums`,
    `${SITE}/reviews`,
    `${SITE}/faq`,
    `${SITE}/support`,
    ...forums.map((forum) => `${SITE}/forums/${forum.slug}`),
  ]
  for (const url of required) {
    if (!sitemap.includes(`<loc>${url}</loc>`)) errors.push(`Missing URL: ${url}`)
  }
  if (sitemap.includes('<sitemapindex')) errors.push('sitemap.xml must be a single urlset, not an index')
  if ((sitemap.match(/<url>/g) || []).length !== required.length) {
    errors.push(`Expected ${required.length} URLs in sitemap.xml`)
  }
  if (errors.length) throw new Error(`Sitemap validation failed:\n- ${errors.join('\n- ')}`)
}

function main() {
  const games = loadGames()
  const forums = loadForums()
  const sitemap = buildSitemap(games, forums)
  validate(games, forums, sitemap)

  writeFileSync(join(publicDir, 'sitemap.xml'), sitemap)
  writeFileSync(
    join(publicDir, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl('/sitemap.xml')}\n`,
  )

  const stale = [
    'sitemap-pages.xml',
    'sitemap-products.xml',
    'sitemap-forums.xml',
    'sitemap-images.xml',
    'sitemap-blogs.xml',
    'sitemap-regions.xml',
  ]
  for (const name of stale) {
    const path = join(publicDir, name)
    if (existsSync(path)) unlinkSync(path)
  }

  const urlCount = (sitemap.match(/<url>/g) || []).length
  console.log(`Sitemap OK: ${urlCount} URLs in ${siteUrl('/sitemap.xml')}`)
}

main()
