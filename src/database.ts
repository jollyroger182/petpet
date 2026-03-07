import { sql } from 'bun'

interface DBEmoji {
  name: string
  target_user: string
  creator: string
  created_at: Date
}

interface DBEmojiUpdate {
  id: number
  name: string
  updater: string
  updated_at: Date
}

const DB = {
  async getEmoji(name: string) {
    return (await sql<DBEmoji[]>`SELECT * FROM emojis WHERE name = ${name}`)[0]
  },

  async addEmoji(emoji: Omit<DBEmoji, 'created_at'>) {
    return (
      await sql<[DBEmoji]>`INSERT INTO emojis ${sql(emoji)} RETURNING *`
    )[0]
  },

  async deleteEmoji(name: string) {
    await sql`DELETE FROM emojis WHERE name = ${name}`
  },

  async addEmojiUpdate(update: Omit<DBEmojiUpdate, 'id' | 'updated_at'>) {
    return (
      await sql<
        [DBEmojiUpdate]
      >`INSERT INTO emoji_updates ${sql(update)} RETURNING *`
    )[0]
  },
}
export default DB
