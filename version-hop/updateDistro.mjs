import Distro from './distro.mjs'

export default async (root, mkey, version) => {
  const { Manifest } = Distro(root, version)
  await Distro(root, mkey).patch(Manifest('server'))
  await Distro(root, mkey).patch(Manifest('client'))
}
