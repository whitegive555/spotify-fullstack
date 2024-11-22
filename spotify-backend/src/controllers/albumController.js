import { v2 as cloudinary } from 'cloudinary'
import albumModel from '../models/albumModel.js'
import songModel from '../models/songModel.js'

const addAlbum = async (req, res) => {
  let imageUpload
  try {
    const title = req.body.title
    const artist = req.body.artist
    const year = req.body.year
    
    const imageFile = req.file
    imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
    // TODO: auto generate bgColor
    const bgColor = req.body.bgColor

    const songs = []
    const duration = 0

    const albumData = {
      title,
      artist,
      year,
      artworkUrl: imageUpload.secure_url,
      bgColor,
      // response different from schema here
      songs,
      duration
    }

    const album = albumModel(albumData)
    await album.save()

    res.json({ success: true, album: album })
  }
  catch (error) {
    if(imageUpload && imageUpload.public_id) {
      await cloudinary.uploader.destroy(imageUpload.public_id)
    }

    res.json( { success: false })
  }
}

const getAlbum = async (req, res) => {
  try {
    const album = await albumModel.findById(req.query.id)
    const songs = []
    for(const id of album.songIds) {
      // TODO: is there any other way to do this?
      const song = await songModel.findById(id)
      songs.push(song)
    }

    res.json({ success: true, albums: {
      title: album.title,
      artist: album.artist,
      year: album.year,
      artworkUrl: album.artworkUrl,
      bgColor: album.bgColor,
      songs: songs,
      duration: album.duration
    }})
  }
  catch (error) {
    res.json({ success: false })
  }
}

const updateAlbum = async (req, res) => {
  try {
    const album = await albumModel.findById(req.body.id)
    // TODO: will i lose reference if i don't use Array.from here?
    album.songIds = Array.from(req.body.songIds)
    const songs = []
    let duration = 0
    for(const id of album.songIds) {
      // TODO: is there any other way to do this?
      const song = await songModel.findById(id)
      songs.push(song)
      duration += song.duration
    }
    album.duration = duration

    await album.save()
    
    res.json({ success: true, album: {
      title: album.title,
      artist: album.artist,
      year: album.year,
      artworkUrl: album.artworkUrl,
      bgColor: album.bgColor,
      songs: songs,
      duration: album.duration
    }})
  }
  catch (error) {
    res.json({ success: false })
  }
}

const deleteAlbum = async (req, res) => {
  try {
    await albumModel.findByIdAndDelete(req.body.id)

    res.json({ success: true })
  }
  catch (error) {
    res.json({ success: false })
  }
}

export { addAlbum, getAlbum, updateAlbum, deleteAlbum }