import s3 from '@aws-sdk/client-s3'

const { S3Client, PutObjectCommand, GetObjectCommand } = s3

export default () => {
  const region = process.env.S3_REGION
  const Bucket = process.env.S3_BUCKET

  const client = new S3Client({ region })

  const uploadFile = (Body, Key, versionPath) => {
    const uploadParams = {
      Bucket,
      Body,
      Key,
      Metadata: {
        'x-amz-meta-version-path': versionPath
      }
    }

    const command = new PutObjectCommand(uploadParams)
    return new Promise((resolve) => {
      client.send(command).then(() => {
        resolve(`uploaded ${Key} to S3:${Bucket}`)
      })
    })
  }

  const downloadFile = async (Key) => {
    const params = {
      Bucket,
      Key
    }
    let content = ''
    const command = new GetObjectCommand(params)
    return new Promise(async (resolve, reject) => {
      try {
        const response = await client.send(command)
        const body = response.Body
        body.on('data', (chunk) => {
          content += chunk
        })
        body.on('end', () => {
          resolve(content)
        })
      } catch (err) {
        if (err.name === 'NoSuchKey') {
          resolve({ NoSuchKey: true })
        }
        reject(err)
      }
    })
  }

  return {
    uploadFile,
    downloadFile
  }
}
