import { v2 as cloudinary } from 'cloudinary'
import userModel from '../models/userModel.js'

const updateUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.id)
    user.playlists = req.body.playlists
    user.artists = req.body.artists
    user.queue = req.body.queue
    await user.save()
    res.json( { success: true, message: 'User updated' })
  }
  catch (error) {
    res.json( { success: false })
  }
}

const listUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.query.id)
    res.json({ success: true, user: user })
  }
  catch (error) {
    res.json({ success: false })
  }
}

const addUser = async (req, res) => {
  try {
    const userData = {
      playlists: [],
      artists: [],
      queue: []
    }

    const user = userModel(userData)
    await user.save()

    res.json( { success: true, message: 'User added' })
  }
  catch (error) {
    res.json( { success: false })
  }
}

export { listUser, addUser, updateUser }