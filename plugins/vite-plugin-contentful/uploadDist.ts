import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import simpleGit, { SimpleGitOptions } from 'simple-git'
import { OutputBundle } from 'rollup'
import path from 'path'
import fs from 'fs'
import crc from 'node-crc'
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
  const moduleSrc = isServer ? `module.exports = {default:${source.replace('export default', '')}}` : source
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
      resolve(`uploaded ${Key} to S3:${Bucket}`)
    })
  })
}

const versionKey = (root: string, isServer: boolean, key: string, source: string) => {
  if (key.startsWith('assets')) {
    return root
      ? key.includes('.content.')
        ? `${key}.${crc.crc32(Buffer.from(source, 'utf8')).toString('hex')}`
        : key
      : path.join(isServer ? 'server' : 'client', key)
  }
  return root
    ? `${key}.${crc.crc32(Buffer.from(source, 'utf8')).toString('hex')}`
    : path.join(isServer ? 'server' : 'client', key)
}

const createVersionManifest = (isServer: boolean, root: string): Version => {
  let version = {}
  if (isServer) {
    const fileName = 'manifest.json'
    const moduleSource = fs.readFileSync(path.join(__dirname, '../../dist/client', fileName), 'utf-8')
    const specifier = versionKey(root, false, fileName, moduleSource)
    const file = versionKey('', false, fileName, moduleSource)
    version = {
      'client/manifest': {
        specifier,
        file
      }
    }
  }
  return version
}

async function uploadDist(dir: string, bundle: OutputBundle) {
  const isServer = dir.endsWith('/server')
  const status = await git.status()
  const { current } = status
  const root = current || ''

  const version = createVersionManifest(isServer, root)

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
  if (isServer) {
    console.log('\nVersion manifest', version)
    const manifestKey = path.join(root, 'manifest.json')
    const log = await uploadFile(JSON.stringify(version), manifestKey, manifestKey)
    results.push(log)
  }
  for (const result of results) {
    console.log(result)
  }
}

export default uploadDist
