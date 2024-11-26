import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url } from '../App'
import { toast } from 'react-toastify'

const ListSong = () => {
  const [songs, setSongs] = useState([])

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/api/song/getAll`)
      if (response.data.success) {
        setSongs(response.data.songs)
      }
    }
    catch (error) {
      toast.error('Error Occurred')
    }
  }

  useEffect(() => {
    fetchSongs()
  }, [])

  const deleteSong = async (id) => {
    try {
      const response = await axios.post(`${url}/api/song/delete/${id}`)
      if (response.data.success) {
        toast.success('Song deleted')
        await fetchSongs()
      }
    }
    catch (error) {
      toast.error('Error Occurred')
    }
  }

  return (
    <div>
      <p>All Songs</p>
      <br/>
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>Artwork</b>
          <b>Title</b>
          <b>Artist</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {songs.map((item, index) => {
          return (
            <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
              <img className='w-12' src={item.artworkUrl} alt=''/>
              <p>{item.title}</p>
              <p>{item.artist}</p>
              <p>{Math.floor(item.duration / 60)}:{Math.floor(item.duration % 60)}</p>
              <p onClick={() => deleteSong(item.id)}  className='cursor-pointer'>x</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListSong
