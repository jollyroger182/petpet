import DB from './database'
import { deleteEmoji, uploadEmoji } from './emoji'
import { generatePet } from './petpet'
import app from './slack'

console.log('petpet is starting...')

app.command(/^\/.*petpet$/, async ({ ack, respond, payload }) => {
  const match = payload.text.match(
    /^\s*<@([A-Z0-9]+)(?:\|.*)?>\s*([a-z0-9-]+)$/,
  )
  if (match) {
    await ack()

    const userId = match[1]!
    const name = match[2]!

    const existingEmoji = await DB.getEmoji(name)
    if (existingEmoji && existingEmoji.target_user !== userId) {
      await respond(
        `:${name}: is registered as a petpet for <@${existingEmoji.target_user}>`,
      )
      return
    }

    const user = await app.client.users.info({ user: userId })
    const pfp =
      user.user?.profile?.image_original ||
      user.user?.profile?.image_512 ||
      user.user?.profile?.image_72
    if (!pfp) {
      await respond('no pfp for user found')
      return
    }

    const image = await fetch(pfp).then((r) => r.arrayBuffer())

    const petpet = await generatePet(image)

    if (existingEmoji) {
      await deleteEmoji(name)
    }

    let emoji = await uploadEmoji(petpet, name)
    if (!emoji.ok) {
      if (emoji.error === 'error_name_taken') {
        await respond(`:${name}: already exists!`)
        return
      }

      console.error('Failed to upload emoji', emoji)
      await respond(`Error \`${emoji.error}\` uploading emoji.`)
      return
    }

    if (!existingEmoji) {
      await DB.addEmoji({ name, target_user: userId, creator: payload.user_id })
    } else {
      await DB.addEmojiUpdate({ name, updater: payload.user_id })
    }

    await respond(`:${name}: added!`)

    return
  }

  await ack(
    `usage: \`/petpet @user emoji-name\` (for example: \`/petpet <@${payload.user_id}> pet-someone\`)`,
  )
})

await app.start()

console.log('petpet started!')
