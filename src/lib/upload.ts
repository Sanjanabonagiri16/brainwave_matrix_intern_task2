import { writeFile } from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'

const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads')
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export interface UploadedFile {
  filename: string
  path: string
  size: number
  mimetype: string
}

export async function uploadFile(
  file: File,
  options: {
    directory?: string
    maxSize?: number
    allowedTypes?: string[]
  } = {}
): Promise<UploadedFile> {
  // Validate file size
  if (file.size > (options.maxSize || MAX_FILE_SIZE)) {
    throw new Error('File size exceeds limit')
  }

  // Validate file type
  if (!(options.allowedTypes || ALLOWED_FILE_TYPES).includes(file.type)) {
    throw new Error('File type not allowed')
  }

  // Create unique filename
  const ext = path.extname(file.name)
  const filename = `${uuidv4()}${ext}`
  const uploadDir = path.join(UPLOAD_DIR, options.directory || '')
  const filepath = path.join(uploadDir, filename)

  // Ensure upload directory exists
  await createUploadDir(uploadDir)

  // Optimize image if it's an image file
  if (file.type.startsWith('image/')) {
    const buffer = await file.arrayBuffer()
    await optimizeAndSaveImage(Buffer.from(buffer), filepath)
  } else {
    const buffer = await file.arrayBuffer()
    await writeFile(filepath, Buffer.from(buffer))
  }

  return {
    filename,
    path: `/uploads/${options.directory ? options.directory + '/' : ''}${filename}`,
    size: file.size,
    mimetype: file.type,
  }
}

async function createUploadDir(dir: string) {
  try {
    await writeFile(dir, '')
  } catch (error) {
    // Directory already exists or creation failed
    console.error('Error creating upload directory:', error)
  }
}

async function optimizeAndSaveImage(buffer: Buffer, filepath: string) {
  try {
    await sharp(buffer)
      .resize(1200, 1200, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: 80 })
      .toFile(filepath)
  } catch (error) {
    console.error('Error optimizing image:', error)
    throw new Error('Failed to process image')
  }
} 