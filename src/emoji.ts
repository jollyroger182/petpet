const { SLACK_XOXC_TOKEN, SLACK_XOXD_TOKEN } = process.env

export async function uploadEmoji(image: Buffer, name: string) {
  const data = new FormData()
  data.set('token', SLACK_XOXC_TOKEN)
  data.set('name', name)
  data.set('mode', 'data')
  data.set('image', new Blob([image]), 'petpet.gif')

  const resp = (await fetch('https://hackclub.slack.com/api/emoji.add', {
    method: 'POST',
    body: data,
    headers: {
      Cookie: `d=${SLACK_XOXD_TOKEN}`,
    },
  }).then((r) => r.json())) as any

  return resp
}

export async function deleteEmoji(name: string) {
  const resp = (await fetch('https://hackclub.slack.com/api/emoji.remove', {
    method: 'POST',
    body: `token=${SLACK_XOXC_TOKEN}&name=${encodeURIComponent(name)}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie: `d=${SLACK_XOXD_TOKEN}`,
    },
  }).then((r) => r.json())) as any

  return resp
}
