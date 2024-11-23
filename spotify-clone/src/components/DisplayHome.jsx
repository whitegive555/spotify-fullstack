import React, { useContext } from 'react'
import AlbumItem from './AlbumItem'
import SongItem from './SongItem'
import { PlayerContext } from '../context/PlayerContext'
import { NavLink } from 'react-router-dom'

const DisplayHome = () => {

  return (
    <div className='overflow-auto'>
      <div className='flex items-center gap-2 mt-4'>
        <p className='bg-white text-black px-4 py-1 rounded-2xl cursor-pointer'>All</p>
        <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Music</p>
        <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Podcasts</p>
      </div>
      <NavLink to={`/album/${'6741ba9b41f0cc251d9ca58c'}`}>Nav</NavLink>
    </div>
  )
}

export default DisplayHome
