import { fork } from 'child_process'
import dotenv from 'dotenv'

dotenv.config()

const mode = process.env.APP_MODE || 'SSR'
fork('./builder/child_process.mjs', [mode])
