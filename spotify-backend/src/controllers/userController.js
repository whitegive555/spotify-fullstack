import { v2 as cloudinary } from 'cloudinary'
import userModel from '../models/userModel.js'
import songModel from '../models/songModel.js'

const addUser = async (req, res) => {
  try {
    // response different from schema here
    const userData = {
      playlistSongIds: [],
      artistSongIds: [],
      queueSongIds: []
    }

    const user = userModel(userData)
    await user.save()

    res.json({ success: true, user: user })
  }
  catch (error) {
    res.json({ success: false })
  }
}

const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.query.id)
    const playlists = []
    for(const id of user.playlistSongIds) {
      // TODO: is there any other way to do this?
      const song = await songModel.findById(id)
      playlists.push(song)
    }

    // response different from schema here
    res.json({ success: true, user: {
      playlists: playlists,
      artists: [],
      queue: []
    }})
  }
  catch (error) {
    res.json({ success: false })
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.id)
    // TODO: will i lose reference if i don't use Array.from here?
    user.playlistSongIds = Array.from(req.body.playlistSongIds)
    const playlists = []
    console.log(user.playlistSongIds)
    for(const id of user.playlistSongIds) {
      // TODO: is there any other way to do this?
      const song = await songModel.findById(id)
      playlists.push(song)
    }

    await user.save()

    res.json({ success: true, user: {
      playlists: playlists,
      artists: [],
      queue: []
    }})
  }
  catch (error) {
    res.json( { success: false })
  }
}

export { addUser, getUser, updateUser }