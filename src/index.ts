import app from './slack'

console.log('petpet is starting...')

app.command(/^\/.*petpet$/, async ({ ack, payload }) => {
  console.log(payload.text)
  await ack('hello world')
})

await app.start()

console.log('petpet started!')
