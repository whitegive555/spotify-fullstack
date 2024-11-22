import { v2 as cloudinary } from 'cloudinary'
import songModel from '../models/songModel.js'

const addSong = async (req, res) => {
  let imageUpload, audioUpload
  try {
    const title = req.body.title  
    const artist = req.body.artist 
    
    const imageFile = req.files.image[0]
    const audioFile = req.files.audio[0]
    imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
    audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: 'video' })

    // const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60).padStart(2, '0')}`
    const duration = audioUpload.duration

    const songData = {
      title,
      artist,
      artworkUrl: imageUpload.secure_url,
      audioUrl: audioUpload.secure_url,
      duration
    }

    const song = songModel(songData)
    await song.save()

    res.json({ success: true, song: song })
  }
  catch (error) {
    if(imageUpload && imageUpload.public_id) {
      await cloudinary.uploader.destroy(imageUpload.public_id)
    }
    if(audioUpload && audioUpload.public_id) {
      await cloudinary.uploader.destroy(audioUpload.public_id)
    }

    res.json({ success: false })
  }
}

const getAllSongs = async (req, res) => {
  try {
    const allSongs = await songModel.find({})

    res.json({ success: true, songs: allSongs })
  }
  catch (error) {
    res.json({ success: false })
  }
}

const deleteSong = async (req, res) => {
  try {
    await songModel.findByIdAndDelete(req.body.id)

    res.json({ success: true })
  }
  catch (error) {
    res.json({ success: false })
  }
}

export { addSong, getAllSongs, deleteSong }