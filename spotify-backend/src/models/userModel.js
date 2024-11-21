import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  playlists: { type: Array, required: true },
  artists: { type: Array, required: true },
  queue: { type: Array, required: true }
})

const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel