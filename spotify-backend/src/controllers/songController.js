import { v2 as cloudinary } from 'cloudinary'
import songModel from '../models/songModel.js'

const addSong = async (req, res) => {
  let imageUpload, audioUpload
  try {
    const title = req.body.title  
    const artist = req.body.artist 
    
    const imageFile = req.files.artwork[0]
    const audioFile = req.files.audio[0]
    imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
    audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: 'video' })

    // const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60).padStart(2, '0')}`
    const duration = audioUpload.duration

    const songData = {
      title,
      artist,
      artworkId: imageUpload.public_id,
      artworkUrl: imageUpload.secure_url,
      audioId: audioUpload.public_id,
      audioUrl: audioUpload.secure_url,
      duration
    }

    const song = songModel(songData)
    await song.save()

    res.json({ success: true, song: {
      id: song.id,
      title: song.title,
      artist: song.artist,
      artworkUrl: song.artworkUrl,
      audioUrl: song.audioUrl,
      duration: song.duration
    }})
  }
  catch (error) {
    if(imageUpload && imageUpload.public_id) {
      await cloudinary.uploader.destroy(imageUpload.public_id, { resource_type: 'image' })
    }
    if(audioUpload && audioUpload.public_id) {
      await cloudinary.uploader.destroy(audioUpload.public_id, { resource_type: 'video' })
    }

    res.json({ success: false })
  }
}

const getAllSongs = async (req, res) => {
  try {
    const allSongs = await songModel.find({})
    const songs = allSongs.map(item => ({
      id: item.id,
      title: item.title,
      artist: item.artist,
      artworkUrl: item.artworkUrl,
      audioUrl: item.audioUrl,
      duration: item.duration
    }))

    res.json({ success: true, songs: songs })
  }
  catch (error) {
    res.json({ success: false })
  }
}

const deleteSong = async (req, res) => {
  try {
    const song = await songModel.findById(req.body.id)
    
    await cloudinary.uploader.destroy(song.artworkId, { resource_type: 'image' })
    await cloudinary.uploader.destroy(song.audioId, { resource_type: 'video' })
    await song.deleteOne()

    res.json({ success: true })
  }
  catch (error) {
    res.json({ success: false })
  }
}

export { addSong, getAllSongs, deleteSong }