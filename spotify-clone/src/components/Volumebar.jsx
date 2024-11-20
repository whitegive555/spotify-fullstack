import React, { useContext, useRef } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const Volumebar = () => {
  const {volumeSliderRef, volumeProgressRef, volume, volumeMouseEnter, volumeMouseLeave, volumeChange } = useContext(PlayerContext)

  return (
    <div className='w-[105px] h-3 relative'>
      <input
        type='range' min='0' max='100' defaultValue='0'
        className='w-[105px] h-3 absolute appearance-none bg-transparent outline-none opacity-0 hover:opacity-100 z-10 [&::-webkit-slider-thumb]:h-[12px] [&::-webkit-slider-thumb]:w-[12px] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full'
        ref={volumeSliderRef}
        onChange={volumeChange}
        onMouseEnter={volumeMouseEnter}
        onMouseLeave={volumeMouseLeave}
      />
      <div className='w-[93px] h-1 absolute left-[6px] top-1 rounded-full bg-[#4c4c4c] overflow-hidden'>
        <div ref={volumeProgressRef} className='w-[93px] h-1 rounded-full bg-white' style={{transform: `translateX(calc(-101% + ${volume*100}%))`}}></div>
      </div>
    </div>
  )
}

export default Volumebar
