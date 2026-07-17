import DB from '../src/database'

const creator = prompt('creator:')
if (!creator) process.exit()

while (true) {
  const user = prompt('user:')
  if (!user) break
  while (true) {
    const name = prompt('name:')
    if (!name) break

    try {
      await DB.addEmoji({ creator, name, target_user: user })
    } catch (e) {
      console.error(e)
    }
  }
}
