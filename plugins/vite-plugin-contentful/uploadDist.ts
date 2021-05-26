import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import simpleGit, { SimpleGitOptions } from 'simple-git'
import { OutputBundle } from 'rollup'
import path from 'path'
import fs from 'fs'
import crc from 'crc'
import dotenv from 'dotenv'

dotenv.config()

type Version = Record<
  string,
  {
    file: string
    specifier: string
  }
>

const options: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(),
  binary: 'git'
}

const git = simpleGit(options)

const region = process.env.S3_REGION
const Bucket = process.env.S3_BUCKET

console.log({ region, Bucket })

const client = new S3Client({ region })

const readContent = (isServer: boolean, fileName: string) => {
  const source = fs.readFileSync(fileName, 'utf-8')
  const moduleSrc = isServer
    ? source.replace('export default content', 'module.exports = {default:content}')
    : source.replace('export default content', 'export{content as c}')
  return moduleSrc
}

const uploadFile = (Body: string, Key: string, versionPath: string) => {
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
      resolve(`uploaded ${Key} to S3:${Bucket}: ${versionPath}`)
    })
  })
}

const versionKey = (root: string, isServer: boolean, key: string, source: string) => {
  if (key.startsWith('assets')) {
    return root
      ? key.includes('.content.')
        ? `${key}.${crc.crc32(source).toString(8)}`
        : key
      : path.join(isServer ? 'server' : 'client', key)
  }
  return root ? `${key}.${crc.crc32(source).toString(8)}` : path.join(isServer ? 'server' : 'client', key)
}

async function uploadDist(dir: string, bundle: OutputBundle) {
  const isServer = dir.endsWith('/server')
  const status = await git.status()
  const { current } = status
  const root = current || ''

  const version: Version = {}

  const results = await Promise.all(
    Object.entries(bundle).map(([name, item]) => {
      const { source, code, fileName, facadeModuleId } = item
      const moduleSource = fileName.includes('.content') ? readContent(isServer, facadeModuleId) : source || code

      const specifier = versionKey(root, isServer, fileName, moduleSource)
      const file = versionKey('', isServer, fileName, moduleSource)
      version[name] = {
        specifier,
        file
      }
      const versionPath = path.join(root, 'dist', file)
      return uploadFile(moduleSource, specifier, versionPath)
    })
  )

  console.log('\nVersion manifest', version)
  const versionSource = JSON.stringify(version)
  const manifestKey = path.join(root, isServer ? 'server' : 'client', 'manifest.json')
  const log = await uploadFile(versionSource, manifestKey, manifestKey)
  results.push(log)
  for (const result of results) {
    console.log(result)
  }
}

export default uploadDist
