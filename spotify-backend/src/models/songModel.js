import mongoose from 'mongoose'

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  artworkUrl: { type: String, required: true },
  audioUrl: { type: String, required: true },
  duration: { type: Number, required: true }
})

const songModel = mongoose.models.song || mongoose.model('song', songSchema)

export default songModel