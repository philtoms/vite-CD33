import { Plugin } from 'vite'
import { NormalizedOutputOptions, OutputBundle } from 'rollup'
import uploadDist from './uploadDist'

let isBuild = !!process.env.BUILD
const PLUGIN_NAME = 'vite-plugin-contentful'

export default function plugin(): Plugin {
  return {
    name: PLUGIN_NAME,
    config(config, { command }) {
      isBuild = command === 'build'
    },
    resolveId(id: string) {
      if (isBuild) {
        if (id.includes('.content.')) return id
      }
    },
    load(id: string) {
      if (isBuild) {
        if (id.includes('.content.')) {
          const referenceId = this.emitFile({
            id,
            type: 'chunk'
          })
          return `export default import.meta.ROLLUP_FILE_URL_${referenceId};`
        }
      }
    },
    writeBundle(options: NormalizedOutputOptions, bundle: OutputBundle) {
      if (isBuild) {
        uploadDist(options.dir || '', bundle)
      }
    }
  }
}
