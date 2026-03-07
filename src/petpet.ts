import { createCanvas, loadImage } from '@napi-rs/canvas'
import GIFEncoder from 'gifencoder'
import { buffer } from 'stream/consumers'

export async function generatePet(image: ArrayBuffer) {
  const img = await loadImage(image)

  const canvas = createCanvas(CONFIG.w, CONFIG.h)
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#FFFFFF00'

  const encoder = new GIFEncoder(CONFIG.w, CONFIG.h)
  const stream = encoder.createReadStream()

  encoder.start()
  encoder.setRepeat(0)
  encoder.setDelay(60)
  encoder.setTransparent(0)

  for (const frame of CONFIG.frames) {
    ctx.clearRect(0, 0, CONFIG.w, CONFIG.h)
    ctx.fillRect(0, 0, CONFIG.w, CONFIG.h)
    ctx.drawImage(img, frame.x, frame.y, frame.w, frame.h)
    ctx.drawImage(frame.image, 0, 0)
    encoder.addFrame(ctx)
  }

  encoder.finish()

  const data = await buffer(stream)
  return data
}

const CONFIG = {
  w: 112,
  h: 112,
  frames: [
    {
      image: await loadImage('frames/0.png'),
      x: 112 - 98,
      y: 112 - 92,
      w: 98,
      h: 92,
    },
    {
      image: await loadImage('frames/1.png'),
      x: 112 - 100,
      y: 112 - 79,
      w: 100,
      h: 79,
    },
    {
      image: await loadImage('frames/2.png'),
      x: 112 - 104,
      y: 112 - 72,
      w: 104,
      h: 72,
    },
    {
      image: await loadImage('frames/3.png'),
      x: 112 - 102,
      y: 112 - 79,
      w: 102,
      h: 79,
    },
    {
      image: await loadImage('frames/4.png'),
      x: 112 - 98 - 2,
      y: 112 - 92,
      w: 98,
      h: 92,
    },
  ],
}
