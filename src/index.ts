import { generatePet } from './petpet'
import app from './slack'

console.log('petpet is starting...')

app.command(/^\/.*petpet$/, async ({ ack, respond, payload }) => {
  const match = payload.text.match(/^\s*<@([A-Z0-9]+)(?:\|.*)?>\s*$/)
  if (match) {
    await ack()

    const userId = match[1]!
    const user = await app.client.users.info({ user: userId })
    const pfp =
      user.user?.profile?.image_original ||
      user.user?.profile?.image_512 ||
      user.user?.profile?.image_72
    if (!pfp) {
      await ack('no pfp for user found')
      return
    }

    const image = await fetch(pfp).then((r) => r.arrayBuffer())

    const petpet = await generatePet(image)

    const files = await app.client.filesUploadV2({
      file: petpet,
      filename: 'petpet.gif',
      channel_id: payload.channel_id,
    })
    const file = files.files[0]?.files?.[0]

    if (!file) {
      await respond('Failed to upload petpet image.')
      return
    }

    return
  }

  console.log(payload.text)
  await ack('hello world')
})

await app.start()

console.log('petpet started!')
