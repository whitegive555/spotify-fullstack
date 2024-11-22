import { v2 as cloudinary } from 'cloudinary'
import userModel from '../models/userModel.js'
import songModel from '../models/songModel.js'

const addUser = async (req, res) => {
  try {
    const userData = {
      playlists: [],
      artists: [],
      recommendations: [],
      queue: []
    }
    
    const user = userModel(userData)
    await user.save()
    
    // response different from schema here
    res.json({ success: true, user: {
      id: user.id,
      playlists: user.playlists,
      artists: user.artists,
      recommendations: user.recommendations,
      queue: user.queue
    }})
  }
  catch (error) {
    res.json({ success: false })
  }
}

const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.query.id)
    const playlists = []
    for(const _playlist of user.playlists) {
      const playlist = { name: _playlist.name, songs: [] }
      for(const id of _playlist.songIds) {
        // TODO: is there any other way to do this?
        const song = await songModel.findById(id)
        playlist.songs.push(song)
      }
      playlists.push(playlist)
    }

    // response different from schema here
    res.json({ success: true, user: {
      id: user.id,
      playlists: playlists,
      artists: user.artists,
      recommendations: user.recommendations,
      queue: user.queue
    }})
  }
  catch (error) {
    res.json({ success: false })
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.id)
    user.playlists = req.body.playlists
    const playlists = []
    for(const _playlist of user.playlists) {
      const playlist = { name: _playlist.name, songs: [] }
      for(const id of _playlist.songIds) {
        // TODO: is there any other way to do this?
        const song = await songModel.findById(id)
        playlist.songs.push(song)
      }
      playlists.push(playlist)
    }

    await user.save()

    res.json({ success: true, user: {
      id: user.id,
      playlists: playlists,
      artists: user.artists,
      recommendations: user.recommendations,
      queue: user.queue
    }})
  }
  catch (error) {
    res.json({ success: false })
  }
}

export { addUser, getUser, updateUser }