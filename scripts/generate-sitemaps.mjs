/**
 * Single sitemap at /sitemap.xml — every indexed page URL + image sitemap entries.
 * Every <url> must include ≥1 <image:image>. Every first-party still image must appear.
 */
import { existsSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')
const dataDir = join(root, 'src', 'data')
const pagesDir = join(root, 'src', 'pages')
const SITE = (process.env.SITE_URL || 'https://www.warzonecheats.uk').replace(/\/$/, '')
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

/** All indexable still images that must appear in the sitemap at least once. */
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
      <image:title>${escapeXml(title)}</image:title>
      <image:caption>${escapeXml(caption)}</image:caption>
    </image:image>`
}

function urlEntry({ path, priority, changefreq, lastmod = TODAY, images }) {
  if (!images?.length) {
    throw new Error(`Sitemap entry for ${path} is missing images`)
  }
  const url = siteUrl(path)
  const imageXml = images.map((image) => imageBlock(image)).join('\n')
  return `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternateLinks(url)}
${imageXml}
  </url>`
}

function buildSitemap(games, forums) {
  const entries = [
    urlEntry({
      path: '/',
      priority: '1.0',
      changefreq: 'daily',
      images: [
        {
          src: SOLDIER,
          title: 'Warzone Cheats Hero',
          caption: 'Buy Warzone cheats — Aimbot and ESP hero artwork for PC.',
        },
        {
          src: DELTA,
          title: 'Warzone Delta Product Box',
          caption: 'Warzone Delta cheats product packaging for commercial listings.',
        },
        {
          src: GAMEPLAY,
          title: 'Warzone Cheats Gameplay Preview',
          caption: 'Warzone Aimbot and ESP gameplay GIF for homepage previews.',
        },
        {
          src: PRODUCT_COVER,
          title: 'Warzone Auron Product Cover',
          caption: 'Warzone cheats product cover for checkout and social previews.',
        },
        {
          src: OG_DEFAULT,
          title: 'Warzone Cheats Social Preview',
          caption: 'Default Open Graph image for Warzone Cheats.',
        },
      ],
    }),
    ...games.map((game) =>
      urlEntry({
        path: `/${game.slug}-cheats`,
        priority: '0.9',
        changefreq: 'weekly',
        images: [
          {
            src: PRODUCT_COVER,
            title: 'Warzone ESP Product Artwork',
            caption: 'Product features, compatibility, status and price before checkout.',
          },
          {
            src: PRODUCT_HERO,
            title: `${game.name} Product Hero`,
            caption: `Hero artwork for ${game.name} product details and checkout.`,
          },
          {
            src: OBJECTIVE,
            title: `${game.name} Menu Preview`,
            caption: `Menu and feature preview GIF for ${game.name} cheats.`,
          },
          {
            src: TACTICAL,
            title: `${game.name} ESP Gameplay`,
            caption: `ESP and wallhack gameplay preview for ${game.name}.`,
          },
          {
            src: RANKED,
            title: `${game.name} Ranked Cover`,
            caption: `Ranked / spoofer-adjacent cover art for ${game.name} listings.`,
          },
        ],
      }),
    ),
    urlEntry({
      path: '/forums',
      priority: '0.85',
      changefreq: 'weekly',
      images: [
        {
          src: OBJECTIVE,
          title: 'Warzone Cheats Forum Artwork',
          caption: 'Artwork reference for setup and feature threads.',
        },
      ],
    }),
    ...forums.map((forum) =>
      urlEntry({
        path: `/forums/${forum.slug}`,
        priority: '0.8',
        changefreq: 'monthly',
        lastmod: forum.date,
        images: [
          {
            src: FORUM_IMAGES[forum.slug] || OBJECTIVE,
            title: `${forum.title} Artwork`,
            caption: `Visible Warzone reference for ${forum.title}.`,
          },
        ],
      }),
    ),
    urlEntry({
      path: '/reviews',
      priority: '0.8',
      changefreq: 'weekly',
      images: [
        {
          src: TACTICAL,
          title: 'Warzone Cheats Review Artwork',
          caption: 'Artwork accompanying verified buyer reviews.',
        },
      ],
    }),
    urlEntry({
      path: '/faq',
      priority: '0.75',
      changefreq: 'monthly',
      images: [
        {
          src: OBJECTIVE,
          title: 'Warzone Cheats FAQ Artwork',
          caption: 'Product artwork accompanying pre-purchase answers.',
        },
      ],
    }),
    urlEntry({
      path: '/support',
      priority: '0.75',
      changefreq: 'weekly',
      images: [
        {
          src: TACTICAL,
          title: 'Warzone Cheats Support Artwork',
          caption: 'Artwork accompanying load and delivery support.',
        },
      ],
    }),
    urlEntry({
      path: '/privacy',
      priority: '0.4',
      changefreq: 'yearly',
      images: [
        {
          src: OG_DEFAULT,
          title: 'Warzone Cheats Privacy Policy',
          caption: 'Privacy policy for warzonecheats.uk orders and support.',
        },
      ],
    }),
    urlEntry({
      path: '/terms',
      priority: '0.4',
      changefreq: 'yearly',
      images: [
        {
          src: OG_DEFAULT,
          title: 'Warzone Cheats Terms of Use',
          caption: 'License terms and risk disclaimer for Warzone Cheats.',
        },
      ],
    }),
    urlEntry({
      path: '/refunds',
      priority: '0.45',
      changefreq: 'yearly',
      images: [
        {
          src: OG_DEFAULT,
          title: 'Warzone Cheats Refund Policy',
          caption: 'Refund rules for digital Warzone Cheats licenses.',
        },
      ],
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

function validate(games, forums, staticRoutes, sitemap) {
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

  const expectedRoutes = new Set([
    ...staticRoutes,
    ...games.map((game) => `/${game.slug}-cheats`),
    ...forums.map((forum) => `/forums/${forum.slug}`),
  ])
  const expectedUrls = new Set([...expectedRoutes].map(siteUrl))

  // Page <loc> only — image:loc also uses <loc> nesting under image:image
  const pageLocs = [...sitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
  const imageLocs = [...sitemap.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((match) => match[1])
  const urlBlocks = sitemap.match(/<url>[\s\S]*?<\/url>/g) || []

  for (const url of expectedUrls) {
    if (!pageLocs.includes(url)) errors.push(`Missing URL: ${url}`)
  }
  for (const url of pageLocs) {
    if (!expectedUrls.has(url)) errors.push(`Unexpected URL: ${url}`)
  }
  if (new Set(pageLocs).size !== pageLocs.length) {
    errors.push('sitemap.xml contains duplicate page URLs')
  }
  if (sitemap.includes('<sitemapindex')) errors.push('sitemap.xml must be a single urlset, not an index')
  if (urlBlocks.length !== expectedUrls.size) {
    errors.push(`Expected ${expectedUrls.size} <url> entries, found ${urlBlocks.length}`)
  }

  for (const block of urlBlocks) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1] || '(unknown)'
    if (!block.includes('<image:image>')) {
      errors.push(`URL missing image entry: ${loc}`)
    }
    if (!block.includes('<image:loc>')) {
      errors.push(`URL missing image:loc: ${loc}`)
    }
  }

  for (const image of ALL_SITE_IMAGES) {
    const absolute = siteUrl(image)
    if (!imageLocs.includes(absolute)) {
      errors.push(`Sitemap missing required image: ${image}`)
    }
  }

  if (imageLocs.length < expectedUrls.size) {
    errors.push('Image count is lower than page count — every URL needs an image')
  }

  if (errors.length) throw new Error(`Sitemap validation failed:\n- ${errors.join('\n- ')}`)
}

function main() {
  const games = loadGames()
  const forums = loadForums()
  const staticRoutes = loadStaticRoutes()
  const sitemap = buildSitemap(games, forums)
  validate(games, forums, staticRoutes, sitemap)

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

  const stale = [
    'sitemap-pages.xml',
    'sitemap-products.xml',
    'sitemap-forums.xml',
    'sitemap-images.xml',
    'sitemap-blogs.xml',
    'sitemap-regions.xml',
    'sitemap-index.xml',
    'sitemap_index.xml',
  ]
  for (const name of stale) {
    for (const dir of [publicDir, join(root, 'dist')]) {
      const path = join(dir, name)
      if (existsSync(path)) unlinkSync(path)
    }
  }

  const urlCount = (sitemap.match(/<url>/g) || []).length
  const imageCount = (sitemap.match(/<image:image>/g) || []).length
  console.log(
    `Sitemap OK: ${urlCount} URLs, ${imageCount} images in ${siteUrl('/sitemap.xml')}`,
  )
}

main()
