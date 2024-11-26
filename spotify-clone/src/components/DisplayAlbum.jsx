import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { PlayerContext } from '../context/PlayerContext'

const DisplayAlbum = () => {
  const { id } = useParams()
  const [album, setAlbum] = useState(null)
  const { playAlbum } = useContext(PlayerContext)

  const getAlbumData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/album/get/${id}`)
      
      if(response.data.success) {
        setAlbum(response.data.album)
      }
    }
    catch (error) {
      
    }
  }

  useEffect(() => {
    getAlbumData()
  }, [id])

  return album ? (
    <div className='relative'>
      <div className='h-[268px]' style={{backgroundColor: album.bgColor }}></div>
      <div className='absolute top-0 h-[268px] w-full p-6 flex' style={{backgroundImage: 'linear-gradient(transparent 0,rgba(0,0,0,.5) 100%)'}}>
        <img className='w-[220px] mr-6 rounded' src={album.artworkUrl} alt=''/>
        <div className='flex flex-col justify-end'>
          <p className='text-sm'>Album</p>
          <h1 className='text-5xl font-extrabold pt-[5px]'>{album.title}</h1>
          <div className='mt-2 flex items-center justify-start'>
            <img className='w-6 rounded-full mr-1' src={album.artworkUrl} alt=''/>
            <span className='text-sm font-bold'>{album.artist}</span>
            <span className='mx-1 text-sm text-[#ffffffb3]'>•</span>
            <span className='text-sm text-[#ffffffb3]'>{album.year}</span>
            <span className='mx-1 text-sm text-[#ffffffb3]'>•</span>
            <span className='text-sm text-[#ffffffb3]'>{album.songs.length} songs, {Math.floor(album.duration / 60).toString()} min {Math.floor(album.duration % 60).toString().padStart(2, '0')} sec</span>
          </div>
        </div>
      </div>

      <div className='w-full h-[232px] absolute top-[268px]' style={{
        backgroundColor: album.bgColor,
        backgroundImage: 'linear-gradient(rgba(0,0,0,.6) 0, #121212 100%)'
      }}></div>

      <div className='relative'>
        <div className='h-[104px] p-6 flex justify-between items-center'>
          <div className='flex justify-start items-center gap-6'>
            <button onClick={() => playAlbum(album.songs, 0)} className='w-14 h-14 bg-[#1ed760] rounded-full p-4 mr-2'>
              <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" className="w-6 fill-black"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg>
            </button>
            <button className='w-8 h-8 bg-transparent rounded-full cursor-default'>
              <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" className="w-8 fill-[#1ed760] border-none"><path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm16.398-2.38a1 1 0 0 0-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 0 0-1.414 1.414l3.308 3.308 7.425-7.425z"></path></svg>
            </button>
            <button className='w-8 h-8 cursor-default'>
              <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" className="fill-[#b3b3b3]"><path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path></svg>
            </button>
          </div>
          <button className='px-2 flex justify-between items-center gap-2 cursor-default'>
            <span className='text-sm text-[#b3b3b3]'>List</span>
            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className="w-4 fill-[#b3b3b3]"><path d="M15 14.5H5V13h10v1.5zm0-5.75H5v-1.5h10v1.5zM15 3H5V1.5h10V3zM3 3H1V1.5h2V3zm0 11.5H1V13h2v1.5zm0-5.75H1v-1.5h2v1.5z"></path></svg>
          </button>
        </div>
      </div>
      
      <div className='relative px-6'>
        <div className='px-4 h-9 text-[#b3b3b3] mb-4 border-b border-b-[hsla(0,0%,100%,.1)] flex justify-between items-center'>
          <div className='flex justify-start items-center gap-4'>
            <span className='w-4'>#</span>
            <span className='text-sm'>Title</span>
          </div>
          <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className="fill-[#b3b3b3] w-4 mr-8"><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path><path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path></svg>
        </div>

        {
          album.songs.map((item, index) => (
            <div key={index} className='h-14 px-4 text-[#b3b3b3] text-sm flex justify-between items-center rounded-lg hover:bg-[hsla(0,0%,100%,.1)] cursor-pointer' onClick={() => playAlbum(album.songs, index)}>
              <div className='flex justify-start items-center gap-4'>
                <span className='w-4 p-auto'>{index + 1}</span>
                <div>
                  <div className='text-base text-white'>{item.title}</div>
                  <div>{item.artist}</div>
                </div>
              </div>
              <span className='pr-7'>{Math.floor(item.duration / 60).toString()}:{Math.floor(item.duration / 60).toString().padStart(2, '0')}</span>
            </div>
          ))
        }
        
      </div>
      <div className='h-48'></div>
    </div>
  ) : null
}

export default DisplayAlbum
