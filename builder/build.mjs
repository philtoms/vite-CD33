import vite from 'vite'
import dotenv from 'dotenv'

dotenv.config()

const mode = process.argv[2] || 'SSR'
console.log('building for ', mode)

const { build } = vite

export default async function buildForDist() {
  await build()
  await build({ build: { ssr: true } })
}
