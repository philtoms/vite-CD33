import chokidar from 'chokidar'
import simpleGit from 'simple-git'
import build from './build.mjs'

const folder = process.cwd() + '/pages'

const options = {
  baseDir: process.cwd(),
  binary: 'git'
}

const git = simpleGit(options)

git.status().then(({ current }) => {
  if (current === 'master' || current === 'main') {
    throw new Error(`Watch mode not supported on ${current} branch`)
  }

  let building = false,
    queued = false
  chokidar.watch(folder).on('change', (path) => {
    console.log(path)
    queued = !building
  })

  setInterval(async () => {
    if (queued) {
      queued = false
      building = true
      await build()
      building = false
    }
  }, 1000)
})
