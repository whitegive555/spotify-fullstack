import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  playlistSongIds: { type: Array, required: true },
  artistSongIds: { type: Array, required: true },
  queueSongIds: { type: Array, required: true }
})

const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel