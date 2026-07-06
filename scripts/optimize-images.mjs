import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..')

async function fileExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function convertToWebp(inputPath, outputPath, options = {}) {
  const exists = await fileExists(inputPath)

  if (!exists) {
    console.log(`Skipped missing file: ${inputPath}`)
    return
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true })

  const image = sharp(inputPath).rotate()

  if (options.width || options.height) {
    image.resize({
      width: options.width,
      height: options.height,
      fit: options.fit || 'cover',
      withoutEnlargement: true,
    })
  }

  await image
    .webp({
      quality: options.quality || 78,
      effort: 6,
    })
    .toFile(outputPath)

  console.log(`Optimized: ${path.relative(root, outputPath)}`)
}

async function optimizeProfileImage() {
  const profileInput = path.join(root, 'src', 'assets', 'portfolioimage.png')

  await convertToWebp(
    profileInput,
    path.join(root, 'public', 'profile-image.webp'),
    {
      width: 720,
      quality: 78,
      fit: 'cover',
    }
  )

  await convertToWebp(
    profileInput,
    path.join(root, 'public', 'og-image.webp'),
    {
      width: 1200,
      height: 630,
      quality: 82,
      fit: 'cover',
    }
  )
}

async function optimizeProjectImages() {
  const projectsDir = path.join(root, 'public', 'projects')
  const exists = await fileExists(projectsDir)

  if (!exists) {
    console.log('Skipped projects folder: public/projects not found')
    return
  }

  const files = await fs.readdir(projectsDir)

  const imageFiles = files.filter((file) =>
    /\.(png|jpg|jpeg)$/i.test(file)
  )

  for (const file of imageFiles) {
    const inputPath = path.join(projectsDir, file)
    const outputPath = path.join(
      projectsDir,
      file.replace(/\.(png|jpg|jpeg)$/i, '.webp')
    )

    await convertToWebp(inputPath, outputPath, {
      width: 1200,
      quality: 78,
      fit: 'inside',
    })
  }
}

async function main() {
  console.log('Starting image optimization...')

  await optimizeProfileImage()
  await optimizeProjectImages()

  console.log('Image optimization completed.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})