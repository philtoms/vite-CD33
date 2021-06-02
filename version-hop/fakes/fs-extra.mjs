const validPaths = ['root/v1/server/manifest.json', 'root/v1/f1']

export default {
  pathExistsSync: (p) => validPaths.includes(p),
  readJsonSync: () => ({ item1: { file: './f1', specifier: 's1' } }),
  outputFileSync: mock(),
  writeJsonSync: mock()
}
