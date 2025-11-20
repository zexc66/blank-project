import { NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3 = new S3Client({
  region: 'us-east-1',
  endpoint: process.env.STORAGE_ENDPOINT,
  credentials: {
    accessKeyId: process.env.STORAGE_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY || '',
  },
})

export async function POST(req: Request) {
  const body = await req.json()
  const { filename, contentType } = body
  if (!filename || !contentType) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
  }

  const bucket = process.env.STORAGE_BUCKET || ''
  const key = `uploads/${Date.now()}-${filename}`
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
  })

  const url = await getSignedUrl(s3, command, { expiresIn: 300 })
  return NextResponse.json({ uploadUrl: url, fileUrl: `${process.env.STORAGE_ENDPOINT}/${bucket}/${key}` })
}