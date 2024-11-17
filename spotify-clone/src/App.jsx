import React, { useContext } from 'react'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Display from './components/Display'
import { PlayerContext } from './context/PlayerContext'
import Navbar from './components/Navbar'

const App = () => {
  
  const { audioRef, track, songsData } = useContext(PlayerContext)

  return (
    <>
      {
        songsData.length != 0
        ?
        <div className='h-screen w-screen bg-black grid rid-rows-[minmax(0,1fr)_auto] lg:grid-rows-[auto_minmax(0,1fr)_auto] lg:grid-cols-[auto_minmax(0,1fr)_auto] gap-2 p-2'>
          <Navbar />
          <Sidebar />
          <Display />
          <div className='lg:col-span-1 w-[280px] bg-[#121212] rounded hidden lg:flex'></div>
          <Player />
        </div>
        : null
      }
      <audio ref={audioRef} src={track ? track.file : ''} preload='auto'></audio>
    </>
  )
}

export default App
