import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url } from '../App'
import { toast } from 'react-toastify'

const ListAlbum = () => {
  const [albums, setAlbums] = useState([])

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/album/getAll`)
      if (response.data.success) {
        setAlbums(response.data.albums)
      }
    }
    catch (error) {
      toast.error('Error Occurred')
    }
  }

  const deleteAlbum = async (id) => {
    try {
      const response = await axios.post(`${url}/api/album/delete/${id}`)
      if (response.data.success) {
        toast.success('Album deleted')
        await fetchAlbums()
      }
    }
    catch (error) {
      toast.error('Error Occurred')
    }
  }

  useEffect(() => {
    fetchAlbums()
  }, [])

  return (
    <div>
      <p>All Albums</p>
      <br/>
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_1fr_1fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>Artwork</b>
          <b>Title</b>
          <b>Artist</b>
          <b>Year</b>
          <b>Background color</b>
          <b>Action</b>
        </div>
        {albums.map((item, index) => {
          return (
            <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_1fr_1fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
              <img className='w-12' src={item.artworkUrl} alt=''/>
              <p>{item.title}</p>
              <p>{item.artist}</p>
              <p>{item.year}</p>
              <input type='color' value={item.bgColor} />
              <p onClick={() => deleteAlbum(item.id)}  className='cursor-pointer'>x</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListAlbum
