import ImageKit from 'imagekit'

export const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
})

export interface UploadResponse {
  fileId: string
  name: string
  size: number
  versionInfo: {
    id: string
    name: string
  }
  filePath: string
  url: string
  fileType: string
  height: number
  width: number
  thumbnailUrl: string
  AITags: string | null
}

export async function uploadImage(
  file: File,
  folder: string = 'listings'
): Promise<UploadResponse> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    const response = await imagekit.upload({
      file: buffer,
      fileName: file.name,
      folder,
      tags: ['campus-bazaar'],
    })
    
    return response as UploadResponse
  } catch (error) {
    console.error('Image upload failed:', error)
    throw new Error('Failed to upload image')
  }
}

export function getImageUrl(filePath: string, transformations?: any): string {
  return imagekit.url({
    path: filePath,
    transformation: transformations,
  })
}

export function deleteImage(fileId: string): Promise<void> {
  return imagekit.deleteFile(fileId)
}