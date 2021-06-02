const downloadFile = mock(() => Promise.resolve({ item1: { file: './f2', specifier: 's2' } }))
const uploadFile = mock()

export default () => ({
  downloadFile,
  uploadFile
})
