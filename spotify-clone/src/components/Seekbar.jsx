import React, { useContext, useRef } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const Seekbar = () => {
  const { playingSong, seekSliderRef, seekBarRef, progress, seekMouseEnter, seekMouseLeave, seekMouseDown, seekChange } = useContext(PlayerContext)
  
  return (
    <div className='w-[524px] h-3 relative'>
      { playingSong ?
      <input
        type='range' min='0' max='5120' defaultValue='0'
        className='w-[524px] h-3 absolute appearance-none bg-transparent outline-none opacity-0 hover:opacity-100 z-10 [&::-webkit-slider-thumb]:h-[12px] [&::-webkit-slider-thumb]:w-[12px] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full'
        ref={seekSliderRef}
        onMouseDown={seekMouseDown}
        onChange={seekChange}
        onMouseEnter={seekMouseEnter}
        onMouseLeave={seekMouseLeave}
      /> : null}
      <div className='w-[512px] h-1 absolute left-[6px] top-1 rounded-full bg-[#4c4c4c] overflow-hidden'>
        <div ref={seekBarRef} className='w-[512px] h-1 rounded-full bg-white' style={{transform: `translateX(calc(-100% + ${progress*100}%))`}}></div>
      </div>
    </div>
  )
}

export default Seekbar
