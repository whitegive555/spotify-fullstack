import { v2 as cloudinary } from 'cloudinary'
import userModel from '../models/userModel.js'
import songModel from '../models/songModel.js'
import albumModel from '../models/albumModel.js'

const addUser = async (req, res) => {
  try {
    const user = userModel({
      albums: [],
      home: []
    })
    await user.save()
    
    // response different from schema here
    res.json({ success: true, user: {
      id: user.id,
      albums: user.albums,
      home: user.home
    }})
  }
  catch (error) {
    res.json({ success: false })
  }
}

const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id)

    const albums = await Promise.all(user.albums.map(async id => {
      try {
        const album = await albumModel.findById(id)
        return {
          id: album.id,
          title: album.title,
          artist: album.artist,
          year: album.year,
          artworkUrl: album.artworkUrl,
          bgColor: album.bgColor,
          duration: album.duration
        }
      }
      catch (error) {
        console.log(`Error: Album id ${id} not found`)
        return []
      }
    }))
    const home = await Promise.all(user.home.map(async id => {
      try {
        const album =  await albumModel.findById(id)
        return {
          id: album.id,
          title: album.title,
          artist: album.artist,
          year: album.year,
          artworkUrl: album.artworkUrl,
          bgColor: album.bgColor,
          duration: album.duration
        }
      }
      catch (error) {
        console.log(`Error: Album id ${id} not found`)
        return []
      }
    }))

    // response different from schema here
    res.json({ success: true, user: {
      id: user.id,
      albums: albums,
      home: home
    }})
  }
  catch (error) {
    res.json({ success: false })
  }
}

const getMoreHomeContent = async (req, res) => {
  try {
    const data = await albumModel.aggregate().sample(10)
    
    const albums = data.map(item => ({
      id: item._id.toString(),
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

const updateUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id)
    user[req.params.field] = req.body[req.params.field]
    await user.save()

    const albums = await Promise.all(user.albums.map(async id => {
      try {
        const album = await albumModel.findById(id)
        return {
          id: album.id,
          title: album.title,
          artist: album.artist,
          year: album.year,
          artworkUrl: album.artworkUrl,
          bgColor: album.bgColor,
          songIds: album.songIds,
          duration: album.duration
        }
      }
      catch (error) {
        console.log(`Error: Album id ${id} not found`)
        return []
      }
    }))
    const home = await Promise.all(user.home.map(async id => {
      try {       
        const album = await albumModel.findById(id)
        return {
          id: album.id,
          title: album.title,
          artist: album.artist,
          year: album.year,
          artworkUrl: album.artworkUrl,
          bgColor: album.bgColor,
          songIds: album.songIds,
          duration: album.duration
        }
      }
      catch (error) {
        console.log(`Error: Album id ${id} not found`)
        return []
      }
    }))

    res.json({ success: true, user: {
      id: user.id,
      albums: albums,
      home: home
    }})
  }
  catch (error) {
    res.json({ success: false })
  }
}

export { addUser, getUser, getMoreHomeContent, updateUser }