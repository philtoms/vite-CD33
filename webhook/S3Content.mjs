import s3 from '@aws-sdk/client-s3'

const { S3Client, PutObjectCommand, GetObjectCommand } = s3

export default () => {
  const region = process.env.S3_REGION
  const Bucket = process.env.S3_BUCKET

  const client = new S3Client({ region })

  const uploadFile = (Body, Key) => {
    const region = process.env.S3_REGION
    const Bucket = process.env.S3_BUCKET

    const client = new S3Client({ region })

    const uploadParams = {
      Bucket,
      Body,
      Key
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
    try {
      const response = await client.send(command)
      return new Promise((resolve) => {
        const body = response.Body
        body.on('data', (chunk) => {
          content += chunk
        })
        body.on('end', () => {
          resolve(content)
        })
      })
    } catch (err) {
      console.log('PIPSQUEEK', params)
    }
  }

  return {
    uploadFile,
    downloadFile
  }
}
