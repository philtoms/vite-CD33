export default {
  downloadFile: mock(() => Promise.resolve({ item1: { file: './f2', specifier: 's2' } })),
  uploadFile: mock()
}
