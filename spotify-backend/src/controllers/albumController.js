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

    const songIds = []
    const duration = 0

    const albumData = {
      title,
      artist,
      year,
      artworkId: imageUpload.public_id,
      artworkUrl: imageUpload.secure_url,
      bgColor,
      songIds,
      duration
    }

    const album = albumModel(albumData)
    await album.save()

    res.json({ success: true, album: {
      id: album.id,
      title: album.title,
      artist: album.artist,
      year: album.year,
      artworkUrl: album.artworkUrl,
      bgColor: album.bgColor,
      songs: [],
      duration: album.duration
    }})
  }
  catch (error) {
    if(imageUpload && imageUpload.public_id) {
      await cloudinary.uploader.destroy(imageUpload.public_id, { resource_type: 'image' })
    }

    res.json({ success: false })
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

    res.json({ success: true, album: {
      id: album.id,
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

// do not find all songs for each album
const getAllAlbums = async (req, res) => {
  try {
    const allAlbums = await albumModel.find({})
    const albums = allAlbums.map(item => ({
      id: item.id,
      title: item.title,
      artist: item.artist,
      year: item.year,
      artworkUrl: item.artworkUrl,
      bgColor: item.bgColor,
      duration: item.duration
    }))

    res.json({ success: true, albums: albums })
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
      id: album.id,
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
    const album = await albumModel.findById(req.body.id)
    await cloudinary.uploader.destroy(album.artworkId, { resource_type: 'image' })
    await album.deleteOne()

    res.json({ success: true })
  }
  catch (error) {
    res.json({ success: false })
  }
}

export { addAlbum, getAlbum, getAllAlbums, updateAlbum, deleteAlbum }