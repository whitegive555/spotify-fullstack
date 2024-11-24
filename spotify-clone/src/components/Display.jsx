import React, { useContext, useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import DisplayAlbum from './DisplayAlbum'
import Seekbar from './Seekbar'
import { PlayerContext } from '../context/PlayerContext'

const Display = () => {

  return (
    <div className='col-span-1 overflow-auto rounded-lg bg-[#121212] text-white'>
      {
        <Routes>
          <Route path='/' element={<DisplayHome />} />
          <Route path='/album/:id' element={<DisplayAlbum />} />
        </Routes>
      }
    </div>
  )
}

export default Display
