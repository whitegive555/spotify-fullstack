import React, { useContext, useRef, useState } from 'react'
import AlbumItem from './AlbumItem'
import { PlayerContext } from '../context/PlayerContext'

const DisplayHome = () => {
  const { home } = useContext(PlayerContext)
  const mainRef = useRef()
  const [scrollTop, setScrollTop] = useState(0)

  const homeScroll = () => {
    setScrollTop(mainRef.current.scrollTop)
  }

  return (
    <div ref={mainRef} className='w-full h-full overflow-auto relative' onScroll={homeScroll}>
      <div className='absolute top-0 w-full h-64 bg-[#d05058] bg-gradient-to-b from-[rgba(0,0,0,.6)] to-[#121212]'></div>
      <div className='top-0 w-full h-16 sticky bg-[#d05058] after:block after:w-full after:h-full after:bg-[rgba(0,0,0,.6)] z-10' style={{opacity: `${Math.min(scrollTop, 100)}`}}></div>
      <div className='top-0 w-full h-16 flex items-center gap-2 text-sm px-6 py-4 sticky z-10'>
        <button className='py-[6px] bg-white text-black px-3 rounded-full cursor-default'>All</button>
        <button className='py-[6px] bg-[#ffffff1a] px-3 rounded-full cursor-default'>Music</button>
        <button className='py-[6px] bg-[#ffffff1a] px-3 rounded-full cursor-default'>Podcasts</button>
      </div>

      <div className='px-6 pt-1 flex flex-col gap-6 relative'>
        <div className='h-12 flex justify-between items-end pb-2'>
          <a className='font-bold text-[24px] leading-[1.2] text-white'>Recommended For You</a>
          {/* <a className='font-bold text-sm text-white hover:underline cursor-pointer pr-2'>Show all</a> */}
        </div>
        <div className='-mx-3 flex flex-wrap'>
          {
            home.map((item, index) => (
            <AlbumItem key={index} id={item.id} title={item.title} artist={item.artist} artworkUrl={item.artworkUrl} />
          ))}
        </div>
      </div>
      <div className='h-96'></div>
    </div>
  )
}

export default DisplayHome
