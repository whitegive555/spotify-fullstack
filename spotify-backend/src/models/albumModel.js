import mongoose from 'mongoose'

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  year: { type: String, required: true },
  artworkId: { type: String, required: true },
  artworkUrl: { type: String, required: true },
  bgColor: { type: String, required: true },
  songIds: { type: Array, required: true },
  duration: { type: Number, required: true }
})

const albumModel = mongoose.models.album || mongoose.model('album', albumSchema)

export default albumModel