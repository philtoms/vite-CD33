import reactRefresh from '@vitejs/plugin-react-refresh'
import ssr from 'vite-plugin-ssr/plugin'
import { UserConfig } from 'vite'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import contentful from './plugins/vite-plugin-contentful'
import typescript from '@rollup/plugin-typescript'

const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default

// 2. create a transformer;
// the factory additionally accepts an options object which described below
const styledComponentsTransformer = createStyledComponentsTransformer({ ssr: false })

const styledComponentsSSR = typescript({
  transformers: [
    () => ({
      before: [styledComponentsTransformer]
    })
  ]
})

const isBuild = !!process.env.BUILD

const config: UserConfig = {
  // plugins: isBuild ? [ssr(), { ...contentful(), enforce: 'pre' }, nodeResolve(), commonjs()] : [reactRefresh(), ssr()]
  plugins: isBuild
    ? [ssr(), { ...contentful(), enforce: 'pre' }, nodeResolve(), styledComponentsSSR]
    : [reactRefresh(), ssr(), styledComponentsSSR]
}

export default config
