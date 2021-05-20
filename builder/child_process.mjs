import vite from 'vite'

const mode = process.argv[2]

const { build } = vite

const serverBuild = build({ build: { ssr: true } })
const clientBuild = mode === 'SSR' ? build() : Promise.resolve()

buildForDist()

async function buildForDist() {
  await Promise.all([serverBuild, clientBuild])
  process.send(true)
}
