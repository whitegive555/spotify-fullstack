import React, { useContext } from 'react'
import LeftSidebar from './components/LeftSidebar'
import RightSidebar from './components/RightSidebar'
import Player from './components/Player'
import Display from './components/Display'
import { PlayerContext } from './context/PlayerContext'
import Navbar from './components/Navbar'

const App = () => {
  
  const { audioRef, playingSong } = useContext(PlayerContext)

  return (
    <>
      {
        <div className='h-screen w-screen bg-black grid rid-rows-[minmax(0,1fr)_auto] lg:grid-rows-[auto_minmax(0,1fr)_auto] lg:grid-cols-[auto_minmax(0,1fr)_auto] gap-2 p-2'>
          <Navbar />
          <LeftSidebar />
          <Display />
          <RightSidebar />
          <Player />
        </div>
      }
      <audio ref={audioRef} src={playingSong ? playingSong.file : ''} preload='auto'></audio>
    </>
  )
}

export default App
