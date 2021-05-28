import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import simpleGit, { SimpleGitOptions } from 'simple-git'
import { OutputBundle } from 'rollup'
import path from 'path'
import fs from 'fs'
import crc32 from 'crc/lib/crc32'
import dotenv from 'dotenv'

dotenv.config()

type Version = Record<
  string,
  {
    file: string
    specifier: string
    metadata: Record<string, string>
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

const readContent = (isServer: boolean, fileName: string, content: string) => {
  const source = fs.readFileSync(fileName, 'utf-8')
  const group = !isServer && content.match(/export{\S+\s+as\s+(\S+)}/)
  const exportVar = group ? group[1] : 'c'
  const moduleSrc = isServer
    ? source.replace('export default content', 'module.exports = {default:content}')
    : source.replace('export default content', `export{content as ${exportVar}}`)
  return { moduleSrc, exportVar }
}

const uploadFile = (Body: string, Key: string, versionPath: string, exportVar?: string) => {
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
        ? `${key}.${crc32(source).toString(8)}`
        : key
      : path.join(isServer ? 'server' : 'client', key)
  }
  return root ? `${key}.${crc32(source).toString(8)}` : path.join(isServer ? 'server' : 'client', key)
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
      const content = source || code
      const { moduleSrc, exportVar } = fileName.includes('.content')
        ? readContent(isServer, facadeModuleId, content)
        : { moduleSrc: content }

      const specifier = versionKey(root, isServer, fileName, moduleSrc)
      const file = versionKey('', isServer, fileName, moduleSrc)
      const key = (facadeModuleId || name).replace(process.cwd(), '')
      version[key] = {
        specifier,
        file,
        metadata: {
          exportVar
        }
      }
      const versionPath = path.join(root, 'dist', file)
      return uploadFile(moduleSrc, specifier, versionPath, exportVar)
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
