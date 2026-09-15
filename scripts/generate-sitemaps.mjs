/**
 * Single sitemap at /sitemap.xml — every indexed page URL + image entries.
 * One urlset only (never a sitemap index). 404 is excluded.
 */
import { existsSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')
const dataDir = join(root, 'src', 'data')
const pagesDir = join(root, 'src', 'pages')
const SITE = (process.env.SITE_URL || 'https://warzonecheats.uk').replace(/\/$/, '')
const TODAY = new Date().toLocaleDateString('en-CA')
const HREFLANG = ['en-GB', 'en', 'x-default']

const SOLDIER = '/media/warzone-soldier-hero.webp'
const DELTA = '/media/warzone-delta-hero.webp'
const TACTICAL = '/media/warzone-esp-gameplay.gif'
const OBJECTIVE = '/media/warzone-menu.gif'
const PRODUCT_HERO = '/media/warzone-delta-hero.webp'
const PRODUCT_COVER = '/media/warzone-auron-box.webp'
const GAMEPLAY = '/media/warzone-delta-gameplay.gif'
const RANKED = '/media/warzone-ranked-cover.webp'
const CONTROL = '/media/warzone-control-art.jpg'
const HOME_ART = '/media/warzone-home-art.jpg'
const TACTICAL_ART = '/media/warzone-tactical-art.jpg'
const OG_DEFAULT = '/og/warzone-cheats.jpg'

const ALL_SITE_IMAGES = [
  SOLDIER,
  DELTA,
  TACTICAL,
  OBJECTIVE,
  PRODUCT_HERO,
  PRODUCT_COVER,
  GAMEPLAY,
  RANKED,
  CONTROL,
  HOME_ART,
  TACTICAL_ART,
  OG_DEFAULT,
]

const FORUM_IMAGES = {
  'features-list': PRODUCT_COVER,
  hotkeys: OBJECTIVE,
  'complete-setup': PRODUCT_HERO,
  'disable-antivirus': CONTROL,
  'undetected-status': PRODUCT_COVER,
  'aimbot-settings': GAMEPLAY,
  'esp-wallhack-guide': TACTICAL,
  'radar-hack-guide': OBJECTIVE,
  'stream-proof-setup': HOME_ART,
  'ricochet-status': PRODUCT_COVER,
  'windows-setup': SOLDIER,
  'ranked-play-guide': RANKED,
  'loader-errors': TACTICAL_ART,
}

const PAGE_META = {
  '/': { priority: '1.0', changefreq: 'daily' },
  '/warzone-cheats': { priority: '0.9', changefreq: 'weekly' },
  '/forums': { priority: '0.85', changefreq: 'weekly' },
  '/reviews': { priority: '0.8', changefreq: 'weekly' },
  '/faq': { priority: '0.75', changefreq: 'monthly' },
  '/support': { priority: '0.75', changefreq: 'weekly' },
  '/privacy': { priority: '0.4', changefreq: 'yearly' },
  '/terms': { priority: '0.4', changefreq: 'yearly' },
  '/refunds': { priority: '0.45', changefreq: 'yearly' },
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

/** Keep captions ASCII-safe for maximum crawler compatibility. */
function asciiSafe(value) {
  return String(value)
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2026/g, '...')
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, '')
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

function loadStaticRoutes() {
  return readdirSync(pagesDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.astro') && entry.name !== '404.astro')
    .map((entry) => (entry.name === 'index.astro' ? '/' : `/${entry.name.slice(0, -6)}`))
}

function alternateLinks(url) {
  return HREFLANG.map(
    (language) =>
      `    <xhtml:link rel="alternate" hreflang="${language}" href="${escapeXml(url)}" />`,
  ).join('\n')
}

function imageBlock({ src, title, caption }) {
  return `    <image:image>
      <image:loc>${escapeXml(siteUrl(src))}</image:loc>
      <image:title>${escapeXml(asciiSafe(title))}</image:title>
      <image:caption>${escapeXml(asciiSafe(caption))}</image:caption>
    </image:image>`
}

function urlEntry({ path, priority, changefreq, lastmod = TODAY, images }) {
  if (!images?.length) throw new Error(`Sitemap entry for ${path} is missing images`)
  const url = siteUrl(path)
  return `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternateLinks(url)}
${images.map((image) => imageBlock(image)).join('\n')}
  </url>`
}

function imagesForPath(path, games, forums) {
  if (path === '/') {
    return [
      { src: SOLDIER, title: 'Warzone Cheats Hero', caption: 'Buy Warzone cheats - Aimbot and ESP hero artwork for PC.' },
      { src: DELTA, title: 'Warzone Delta Product Box', caption: 'Warzone Delta cheats product packaging for commercial listings.' },
      { src: GAMEPLAY, title: 'Warzone Cheats Gameplay Preview', caption: 'Warzone Aimbot and ESP gameplay GIF for homepage previews.' },
      { src: PRODUCT_COVER, title: 'Warzone Auron Product Cover', caption: 'Warzone cheats product cover for checkout and social previews.' },
      { src: OG_DEFAULT, title: 'Warzone Cheats Social Preview', caption: 'Default Open Graph image for Warzone Cheats.' },
    ]
  }

  const game = games.find((g) => path === `/${g.slug}-cheats`)
  if (game) {
    return [
      { src: PRODUCT_COVER, title: 'Warzone ESP Product Artwork', caption: 'Product features, compatibility, status and price before checkout.' },
      { src: PRODUCT_HERO, title: `${game.name} Product Hero`, caption: `Hero artwork for ${game.name} product details and checkout.` },
      { src: OBJECTIVE, title: `${game.name} Menu Preview`, caption: `Menu and feature preview GIF for ${game.name} cheats.` },
      { src: TACTICAL, title: `${game.name} ESP Gameplay`, caption: `ESP and wallhack gameplay preview for ${game.name}.` },
      { src: RANKED, title: `${game.name} Ranked Cover`, caption: `Ranked cover art for ${game.name} listings.` },
    ]
  }

  if (path === '/forums') {
    return [{ src: OBJECTIVE, title: 'Warzone Cheats Forum Artwork', caption: 'Artwork reference for setup and feature threads.' }]
  }

  if (path.startsWith('/forums/')) {
    const slug = path.slice('/forums/'.length)
    const forum = forums.find((f) => f.slug === slug)
    return [
      {
        src: FORUM_IMAGES[slug] || OBJECTIVE,
        title: `${forum?.title || slug} Artwork`,
        caption: `Visible Warzone reference for ${forum?.title || slug}.`,
      },
    ]
  }

  if (path === '/reviews') {
    return [{ src: TACTICAL, title: 'Warzone Cheats Review Artwork', caption: 'Artwork accompanying verified buyer reviews.' }]
  }
  if (path === '/faq') {
    return [{ src: OBJECTIVE, title: 'Warzone Cheats FAQ Artwork', caption: 'Product artwork accompanying pre-purchase answers.' }]
  }
  if (path === '/support') {
    return [{ src: TACTICAL, title: 'Warzone Cheats Support Artwork', caption: 'Artwork accompanying load and delivery support.' }]
  }
  if (path === '/privacy') {
    return [{ src: OG_DEFAULT, title: 'Warzone Cheats Privacy Policy', caption: 'Privacy policy for warzonecheats.uk orders and support.' }]
  }
  if (path === '/terms') {
    return [{ src: OG_DEFAULT, title: 'Warzone Cheats Terms of Use', caption: 'License terms and risk disclaimer for Warzone Cheats.' }]
  }
  if (path === '/refunds') {
    return [{ src: OG_DEFAULT, title: 'Warzone Cheats Refund Policy', caption: 'Refund rules for digital Warzone Cheats licenses.' }]
  }

  return [{ src: OG_DEFAULT, title: 'Warzone Cheats', caption: 'Warzone Cheats page artwork.' }]
}

function collectAllPaths(games, forums, staticRoutes) {
  const paths = new Set([
    ...staticRoutes,
    ...games.map((game) => `/${game.slug}-cheats`),
    ...forums.map((forum) => `/forums/${forum.slug}`),
  ])
  // Never index error page
  paths.delete('/404')
  return [...paths]
}

function buildSitemap(games, forums, allPaths) {
  const forumByPath = new Map(forums.map((f) => [`/forums/${f.slug}`, f]))

  const sorted = [...allPaths].sort((a, b) => {
    const rank = (path) => {
      if (path === '/') return 0
      if (path.endsWith('-cheats')) return 1
      if (path === '/forums') return 2
      if (path.startsWith('/forums/')) return 3
      if (path === '/reviews') return 4
      if (path === '/faq') return 5
      if (path === '/support') return 6
      return 10
    }
    const diff = rank(a) - rank(b)
    return diff !== 0 ? diff : a.localeCompare(b)
  })

  const entries = sorted.map((path) => {
    const meta = PAGE_META[path] || {
      priority: path.startsWith('/forums/') ? '0.8' : '0.5',
      changefreq: path.startsWith('/forums/') ? 'monthly' : 'weekly',
    }
    const forum = forumByPath.get(path)
    return urlEntry({
      path,
      priority: meta.priority,
      changefreq: meta.changefreq,
      lastmod: forum?.date || TODAY,
      images: imagesForPath(path, games, forums),
    })
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join('\n')}
</urlset>
`
}

function validate(games, forums, allPaths, sitemap) {
  const errors = []
  if (forums.some((forum) => ['instructions', 'how-to-load'].includes(forum.slug))) {
    errors.push('Retired forum slug remains indexed')
  }
  for (const game of games) {
    const page = join(pagesDir, `${game.slug}-cheats.astro`)
    if (!existsSync(page)) errors.push(`Product route has no page file: /${game.slug}-cheats`)
  }
  if (forums.length && !existsSync(join(pagesDir, 'forums', '[slug].astro'))) {
    errors.push('Forum routes have no dynamic page file: src/pages/forums/[slug].astro')
  }
  for (const image of ALL_SITE_IMAGES) {
    const diskPath = join(publicDir, image.replace(/^\//, ''))
    if (!existsSync(diskPath)) errors.push(`Missing image asset on disk: ${image}`)
  }

  const expectedUrls = new Set(allPaths.map(siteUrl))
  const pageLocs = [...sitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
  const imageLocs = [...sitemap.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((match) => match[1])
  const urlBlocks = sitemap.match(/<url>[\s\S]*?<\/url>/g) || []

  for (const url of expectedUrls) {
    if (!pageLocs.includes(url)) errors.push(`Missing URL: ${url}`)
  }
  for (const url of pageLocs) {
    if (!expectedUrls.has(url)) errors.push(`Unexpected URL: ${url}`)
  }
  if (new Set(pageLocs).size !== pageLocs.length) errors.push('sitemap.xml contains duplicate page URLs')
  if (sitemap.includes('<sitemapindex')) errors.push('sitemap.xml must be a single urlset, not an index')
  if ((sitemap.match(/<urlset[\s>]/g) || []).length !== 1) {
    errors.push('sitemap.xml must contain exactly one <urlset>')
  }
  if (urlBlocks.length !== expectedUrls.size) {
    errors.push(`Expected ${expectedUrls.size} <url> entries, found ${urlBlocks.length}`)
  }
  for (const block of urlBlocks) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1] || '(unknown)'
    if (!block.includes('<image:image>') || !block.includes('<image:loc>')) {
      errors.push(`URL missing image entry: ${loc}`)
    }
  }
  for (const image of ALL_SITE_IMAGES) {
    if (!imageLocs.includes(siteUrl(image))) errors.push(`Sitemap missing required image: ${image}`)
  }
  if (imageLocs.length < expectedUrls.size) {
    errors.push('Image count is lower than page count - every URL needs an image')
  }
  if (/[^\x09\x0A\x0D\x20-\x7E]/.test(sitemap.replace(/https?:\/\//g, ''))) {
    // Allow non-ascii only inside https URLs if any; captions should be ascii.
  }
  if (errors.length) throw new Error(`Sitemap validation failed:\n- ${errors.join('\n- ')}`)
}

function main() {
  const games = loadGames()
  const forums = loadForums()
  const staticRoutes = loadStaticRoutes()
  const allPaths = collectAllPaths(games, forums, staticRoutes)
  const sitemap = buildSitemap(games, forums, allPaths)
  validate(games, forums, allPaths, sitemap)

  writeFileSync(join(publicDir, 'sitemap.xml'), sitemap, 'utf8')
  writeFileSync(
    join(publicDir, 'robots.txt'),
    [
      'User-agent: Googlebot',
      'Allow: /',
      'Allow: /sitemap.xml',
      'Allow: /robots.txt',
      'Allow: /media/',
      'Allow: /og/',
      '',
      'User-agent: Google-InspectionTool',
      'Allow: /',
      'Allow: /sitemap.xml',
      'Allow: /robots.txt',
      'Allow: /media/',
      'Allow: /og/',
      '',
      'User-agent: Bingbot',
      'Allow: /',
      'Allow: /sitemap.xml',
      'Allow: /robots.txt',
      '',
      'User-agent: *',
      'Allow: /',
      'Allow: /sitemap.xml',
      'Allow: /robots.txt',
      'Allow: /media/',
      'Allow: /og/',
      'Disallow: /404',
      'Disallow: /404.html',
      '',
      `Sitemap: ${siteUrl('/sitemap.xml')}`,
      '',
    ].join('\n'),
    'utf8',
  )

  for (const name of [
    'sitemap-pages.xml',
    'sitemap-products.xml',
    'sitemap-forums.xml',
    'sitemap-images.xml',
    'sitemap-blogs.xml',
    'sitemap-regions.xml',
    'sitemap-index.xml',
    'sitemap_index.xml',
  ]) {
    for (const dir of [publicDir, join(root, 'dist')]) {
      const path = join(dir, name)
      if (existsSync(path)) unlinkSync(path)
    }
  }

  console.log(
    `Sitemap OK: ${allPaths.length} pages in single sitemap.xml (${siteUrl('/sitemap.xml')})`,
  )
}

main()
