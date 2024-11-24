import { v2 as cloudinary } from 'cloudinary'
import userModel from '../models/userModel.js'
import songModel from '../models/songModel.js'
import albumModel from '../models/albumModel.js'

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
        playlist.songs.push({
          id: song.id,
          title: song.title,
          artist: song.artist,
          artworkUrl: song.artworkUrl,
          audioUrl: song.audioUrl,
          duration: song.duration
        })
      }
      playlists.push(playlist)
    }

    const recommendations = []
    for(const _section of user.recommendations) {
      const section = { name: _section.name, albums: [] }
      for(const id of _section.albumIds) {
        // TODO: is there any other way to do this?
        const album = await albumModel.findById(id)
        section.albums.push({
          id: album.id,
          title: album.title,
          artist: album.artist,
          year: album.year,
          artworkUrl: album.artworkUrl,
          bgColor: album.bgColor,
          duration: album.duration
        })
      }
      recommendations.push(section)
    }

    // response different from schema here
    res.json({ success: true, user: {
      id: user.id,
      playlists: playlists,
      artists: user.artists,
      recommendations: recommendations,
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
    user.recommendations = req.body.recommendations

    const playlists = []
    for(const _playlist of user.playlists) {
      const playlist = { name: _playlist.name, songs: [] }
      for(const id of _playlist.songIds) {
        // TODO: is there any other way to do this?
        const song = await songModel.findById(id)
        playlist.songs.push({
          id: song.id,
          title: song.title,
          artist: song.artist,
          artworkUrl: song.artworkUrl,
          audioUrl: song.audioUrl,
          duration: song.duration
        })
      }
      playlists.push(playlist)
    }
    
    const recommendations = []
    for(const _section of user.recommendations) {
      const section = { name: _section.name, albums: [] }
      
      for(const id of _section.albumIds) {
        // TODO: is there any other way to do this?
        const album = await albumModel.findById(id)
        section.albums.push({
          id: album.id,
          title: album.title,
          artist: album.artist,
          year: album.year,
          artworkUrl: album.artworkUrl,
          bgColor: album.bgColor,
          duration: album.duration
        })
      }
      recommendations.push(section)
    }

    await user.save()

    res.json({ success: true, user: {
      id: user.id,
      playlists: playlists,
      artists: user.artists,
      recommendations: recommendations,
      queue: user.queue
    }})
  }
  catch (error) {
    res.json({ success: false })
  }
}

export { addUser, getUser, updateUser }