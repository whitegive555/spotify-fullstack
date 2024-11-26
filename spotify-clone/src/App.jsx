import React, { useContext } from 'react'
import LeftSidebar from './components/LeftSidebar'
import RightSidebar from './components/RightSidebar'
import Player from './components/Player'
import Display from './components/Display'
import { PlayerContext } from './context/PlayerContext'
import Navbar from './components/Navbar'
import { useEffect } from 'react'

const App = () => {
  
  const { audioRef, playingSong, songEnd } = useContext(PlayerContext)

  return (
    <>
      {
        <div className='h-screen w-screen bg-black grid lg:grid-rows-[auto_minmax(0,1fr)_auto] lg:grid-cols-[auto_minmax(0,1fr)_auto] md:grid-cols-[auto_minmax(0,1fr)] grid-cols-[minmax(0,1fr)] gap-2 p-2'>
          <Navbar />
          <LeftSidebar />
          <Display />
          <RightSidebar />
          <Player />
        </div>
      }
      <audio ref={audioRef} src={playingSong ? playingSong.audioUrl : ''} onEnded={songEnd} preload='auto'></audio>
    </>
  )
}

export default App
