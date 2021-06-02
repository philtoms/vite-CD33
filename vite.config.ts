import reactRefresh from '@vitejs/plugin-react-refresh'
import ssr from 'vite-plugin-ssr/plugin'
import { UserConfig } from 'vite'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import contentful from './plugins/contentful'

const isBuild = !!process.env.BUILD

const config: UserConfig = {
  plugins: isBuild ? [ssr(), nodeResolve()] : [reactRefresh(), ssr(), contentful()]
}

export default config
