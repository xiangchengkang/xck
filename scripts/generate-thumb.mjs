import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const inputPath = join(__dirname, '../docs/public/images/hero.jpg')
const outputPath = join(__dirname, '../docs/public/images/hero-thumb.jpg')

async function generateThumb() {
  try {
    console.log('Generating thumbnail...')
    
    await sharp(inputPath)
      .resize(100, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ 
        quality: 30,
        progressive: true,
        mozjpeg: true
      })
      .toFile(outputPath)
    
    console.log('Thumbnail generated successfully!')
    console.log('Output:', outputPath)
  } catch (error) {
    console.error('Error generating thumbnail:', error)
    process.exit(1)
  }
}

generateThumb()
