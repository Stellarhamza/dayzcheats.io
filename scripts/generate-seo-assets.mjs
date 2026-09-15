/**
 * Only fill missing auxiliary artwork. Never overwrite battlelog-sourced
 * Warzone hero/cover/OG/GIF assets under public/media and public/og.
 */
import { access, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const ogDir = join(root, 'public', 'og')
const mediaDir = join(root, 'public', 'media')

await Promise.all([
  mkdir(ogDir, { recursive: true }),
  mkdir(mediaDir, { recursive: true }),
])

function escapeXml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function artwork(width, height, eyebrow, title, subtitle, footer = 'warzonecheats.uk') {
  const titleSize = Math.round(width * 0.066)
  const subtitleSize = Math.round(width * 0.026)
  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="#08060f"/>
          <stop offset="0.55" stop-color="#14101f"/>
          <stop offset="1" stop-color="#2a1548"/>
        </linearGradient>
        <radialGradient id="glow">
          <stop stop-color="#b040fb" stop-opacity=".7"/>
          <stop offset="1" stop-color="#b040fb" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <circle cx="${width * 0.83}" cy="${height * 0.18}" r="${width * 0.34}" fill="url(#glow)"/>
      <circle cx="${width * 0.12}" cy="${height * 0.88}" r="${width * 0.28}" fill="url(#glow)" opacity=".35"/>
      <text x="${width * 0.075}" y="${height * 0.47}" fill="#c084fc" font-size="${width * 0.022}" font-family="Arial, sans-serif" font-weight="700" letter-spacing="6">${escapeXml(eyebrow)}</text>
      <text x="${width * 0.075}" y="${height * 0.64}" fill="#ffffff" font-size="${titleSize}" font-family="Arial, sans-serif" font-weight="700">${escapeXml(title)}</text>
      <text x="${width * 0.075}" y="${height * 0.75}" fill="#c9bdd2" font-size="${subtitleSize}" font-family="Arial, sans-serif">${escapeXml(subtitle)}</text>
      <text x="${width * 0.075}" y="${height * 0.9}" fill="#9299a3" font-size="${width * 0.018}" font-family="Arial, sans-serif">${escapeXml(footer)}</text>
    </svg>
  `)
}

async function exists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

async function writeIfMissing(path, factory) {
  if (await exists(path)) return false
  await factory(path)
  return true
}

const requiredBattlelog = [
  join(mediaDir, 'warzone-delta-hero.webp'),
  join(mediaDir, 'warzone-auron-cover.webp'),
  join(mediaDir, 'warzone-delta-gameplay.gif'),
  join(mediaDir, 'warzone-menu.gif'),
  join(mediaDir, 'warzone-esp-gameplay.gif'),
  join(mediaDir, 'warzone-ranked-cover.webp'),
  join(ogDir, 'warzone-cheats.jpg'),
]

for (const path of requiredBattlelog) {
  if (!(await exists(path))) {
    throw new Error(`Missing battlelog Warzone asset (do not regenerate): ${path}`)
  }
}

const created = []

if (
  await writeIfMissing(join(mediaDir, 'warzone-tactical-art.jpg'), (path) =>
    sharp(
      artwork(
        1200,
        675,
        'CALL OF DUTY WARZONE',
        'Warzone Cheats',
        'Aimbot · ESP · Radar · Ricochet status',
      ),
    )
      .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
      .toFile(path),
  )
) {
  created.push('warzone-tactical-art.jpg')
}

if (
  await writeIfMissing(join(mediaDir, 'warzone-control-art.jpg'), (path) =>
    sharp(
      artwork(
        1200,
        675,
        'WARZONE · WINDOWS PC',
        'Warzone ESP & Radar',
        'Built for UK and worldwide Warzone lobbies',
      ),
    )
      .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
      .toFile(path),
  )
) {
  created.push('warzone-control-art.jpg')
}

if (
  await writeIfMissing(join(mediaDir, 'warzone-home-art.jpg'), (path) =>
    sharp(
      artwork(
        1920,
        1080,
        'WARZONECHEATS.UK',
        'Warzone Cheats',
        'Aimbot, ESP, wallhack and radar for PC',
      ),
    )
      .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
      .toFile(path),
  )
) {
  created.push('warzone-home-art.jpg')
}

console.log(
  created.length
    ? `SEO assets OK — preserved battlelog media; created missing: ${created.join(', ')}`
    : 'SEO assets OK — preserved all battlelog Warzone media',
)
