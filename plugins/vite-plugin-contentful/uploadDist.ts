import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import simpleGit, { SimpleGitOptions } from 'simple-git'
import { OutputBundle } from 'rollup'
import path from 'path'
import fs from 'fs'
import crc from 'node-crc'
import dotenv from 'dotenv'

dotenv.config()

type Version = {
  [key: string]: {
    file: string
    specifier: string
  }
}

const options: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(),
  binary: 'git'
}

const git = simpleGit(options)

const region = process.env.AWS_REGION
const Bucket = process.env.S3_BUCKET

const client = new S3Client({ region })

const readContent = (isServer: boolean, fileName: string) => {
  const source = fs.readFileSync(fileName, 'utf-8')
  const moduleSrc = isServer ? `module.exports = {default:${source.replace('export default', '')}}` : source
  return moduleSrc
}

const uploadFile = (Body: string, Key: string) => {
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

const versionKey = (isSpecifier: boolean, isServer: boolean, key: string, source: string) => {
  if (key.startsWith('assets')) {
    return isSpecifier
      ? key.includes('.content.')
        ? `${key}.${crc.crc32(Buffer.from(source, 'utf8')).toString('hex')}`
        : key
      : path.join(isServer ? 'server' : 'client', key)
  }
  return isSpecifier
    ? `${key}.${crc.crc32(Buffer.from(source, 'utf8')).toString('hex')}`
    : path.join(isServer ? 'server' : 'client', key)
}

const createVersionManifest = (isServer: boolean): Record<string, unknown> => {
  let version = {}
  if (isServer) {
    const fileName = 'manifest.json'
    const moduleSource = fs.readFileSync(path.join(__dirname, '../../dist/client', fileName), 'utf-8')
    const specifier = versionKey(true, isServer, fileName, moduleSource)
    const file = versionKey(false, false, fileName, moduleSource)
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

  const version = createVersionManifest(isServer)

  const results = await Promise.all(
    Object.entries(bundle).map(([name, item]) => {
      const { source, code, fileName, facadeModuleId } = item
      const moduleSource = fileName.includes('.content') ? readContent(isServer, facadeModuleId) : source || code

      const specifier = versionKey(true, isServer, fileName, moduleSource)
      const file = versionKey(false, isServer, fileName, moduleSource)
      version[name] = {
        specifier,
        file
      }
      return uploadFile(moduleSource, specifier.replace('{mkey}', root))
    })
  )
  if (isServer) {
    console.log('\nVersion manifest', version)
    const manifestKey = path.join(root, 'manifest.json')
    const log = await uploadFile(JSON.stringify(version), manifestKey)
    results.push(log)
  }
  for (const result of results) {
    console.log(result)
  }
}

export default uploadDist
