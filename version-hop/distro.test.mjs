import t from 'ava'
import fs from 'fs-extra?__fake=./fakes/fs-extra.mjs'
import s3 from './s3.mjs?__fake=./fakes/s3.mjs'

import Distro from './distro.mjs'

const test = t.serial

test('Load a manifest from a mounted distro', async (t) => {
  const { Manifest } = Distro('root', 'v1')
  const { manifest } = await Manifest('server')
  t.deepEqual(manifest, {
    item1: { file: './f1', specifier: 's1' }
  })
  t.is(fs.writeJsonSync.calls, 0)
})

test('Load a manifest from an unmounted distro', async (t) => {
  const { Manifest } = Distro('root', 'v2')
  await Manifest('server')
  t.is(s3().downloadFile.calls, 1)
  t.is(fs.writeJsonSync.values[0][0], 'root/v2/server/manifest.json')
})

test('realign a manifest with a new distro', async (t) => {
  const { Manifest } = Distro('root', 'v1')
  const { realign } = await Manifest('server')
  const newDistro = { item2: { file: './f2', specifier: 's2' } }
  t.deepEqual(realign(newDistro), {
    item1: { file: './f1', specifier: 's1' },
    item2: { file: './f2', specifier: 's2' }
  })
})

test('realign a manifest with an updated distro', async (t) => {
  const { Manifest } = Distro('root', 'v1')
  const { realign } = await Manifest('server')
  const updatedDistro = { item1: { file: './f2', specifier: 's2' } }
  t.deepEqual(realign(updatedDistro), {
    item1: { file: './f2', specifier: 's2' }
  })
})

test('create a distribution patch for a new item', (t) => {
  const { createDistributionPatch } = Distro('root', 'v1')
  const manifest = { item2: { file: './f2', specifier: 's2' } }
  t.is(createDistributionPatch(manifest).length, 1)
})

test('create a full distribution patch for a new distro', (t) => {
  const { createDistributionPatch } = Distro('root', 'v2')
  const manifest = { item1: { file: './f1', specifier: 's1' } }
  t.is(createDistributionPatch(manifest).length, 1)
})

test('create an empty distribution patch for mounted manifest', (t) => {
  const { createDistributionPatch } = Distro('root', 'v1')
  const manifest = { item1: { file: './f1', specifier: 's' } }
  t.is(createDistributionPatch(manifest).length, 0)
})

test('apply distribution patch to update a distro', async (t) => {
  const { applyDistributionPatch } = Distro('root', 'v1')
  const patch = [{ file: './f1', specifier: 's1' }]
  await applyDistributionPatch(patch)
  t.is(fs.outputFileSync.calls, 1)
})

test('patch a v1 distro with v2 items', async (t) => {
  const distroV2 = { item1: { file: './f2', specifier: 's2' } }
  const { Manifest } = Distro('root', 'v2')
  await Distro('root', 'v1').patch(Manifest('server'))
  t.deepEqual(fs.outputFileSync.values[0][1], distroV2)
  t.deepEqual(s3().uploadFile.values[0], ['v1/server/manifest.json', distroV2])
})

test('patch a v1 distro with v1 items', async (t) => {
  fs.outputFileSync.reset()

  const { Manifest } = Distro('root', 'v1')
  await Distro('root', 'v1').patch(Manifest('server'))
  t.is(fs.outputFileSync.calls, 0)
})
