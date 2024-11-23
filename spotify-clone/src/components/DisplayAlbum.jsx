import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { images } from '../assets/assets'
import { useState } from 'react'
import axios from 'axios'

const DisplayAlbum = () => {
  const url = 'http://localhost:4000'

  const { albumId } = useParams()
  const [album, setAlbum] = useState(null)

  const getAlbumData = async () => {
    try {
      console.log(albumId)
      const response = await axios.get(`${url}/api/album/get?id=${albumId}`)
      if(response.data.success) {
        setAlbum(response.data.album)
      }
    }
    catch (error) {
      
    }
  }

  useEffect(() => {
    getAlbumData()
  }, [])

  return album ? (
    <>
     <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
      <img className='w-48 rounded' src={album.artworkUrl} alt=''/>
      <div className='flex flex-col'>
        <p>Playlist</p>
        <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{album.title}</h2>
        <h4>{album.artist}</h4>
        <p className='mt-1'>
          <img className='inline-block w-5' src={images.spotify_logo} alt=''/>
          <b>Spotify</b>
          • 1,323,154 likes
          • <b>50 songs,</b>
          about 2 hr 30 min
        </p>
      </div>
     </div>
     <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
      <p><b className='mr-4'>#</b>Title</p>
      <p>Album</p>
      <p className='hidden sm:block'>Date Added</p>
      <img className='m-auto w-4' src={images.clock_icon} alt=''/>
     </div>
     <hr/>
     {
      album.songs.map((item, index) => (
        <div key={index} className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'>
          <p className='text-white'>
            <b className='inline-block w-[10px] mr-4 text-[#a7a7a7]'>{index+1}</b>
            <img className='inline w-10 mr-5' src={item.artworkUrl} alt=''/>
            {item.title}
          </p>
          <p className='text-[15px]'>{album.title}</p>
          <p className='text-[15px] hidden sm:block'>5 days ago</p>
          <p className='text-[15px] text-center'>{item.duration}</p>
        </div>
      ))
     }
    </>
  ) : null
}

export default DisplayAlbum
