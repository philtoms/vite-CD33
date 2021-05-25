import reactRefresh from '@vitejs/plugin-react-refresh'
import ssr from 'vite-plugin-ssr/plugin'
import { UserConfig } from 'vite'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import contentful from './plugins/vite-plugin-contentful'

const isBuild = !!process.env.BUILD

const config: UserConfig = {
  // plugins: isBuild ? [ssr(), { ...contentful(), enforce: 'pre' }, nodeResolve(), commonjs()] : [reactRefresh(), ssr()]
  plugins: isBuild ? [ssr(), { ...contentful(), enforce: 'pre' }, nodeResolve()] : [reactRefresh(), ssr()]
}

export default config
