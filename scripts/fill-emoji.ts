import DB from '../src/database'

while (true) {
  const user = prompt('user:')
  if (!user) break
  while (true) {
    const name = prompt('name:')
    if (!name) break
    const creator = prompt('creator:')
    if (!creator) break

    await DB.addEmoji({ creator, name, target_user: user })
  }
}
