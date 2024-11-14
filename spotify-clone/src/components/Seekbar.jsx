import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const Seekbar = ({ height = 5, width = 218, bgColor = '#494949', progressColor = '#ffffff', hoverColor = '#1baf4f' }) => {
  const {sliderRef, progress, handleMouseDown, handleChange } = useContext(PlayerContext)

  return (
    <div className='relative' style={{height: `${15}px`, width: `${width}px`}}>
      <input
        type='range' min='0' max='100' defaultValue='0'
        className='rounded-full appearance-none opacity-0 hover:opacity-100 absolute top-0 left-0 z-10 [&::-webkit-slider-thumb]:h-[15px] [&::-webkit-slider-thumb]:w-[15px] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full'
        ref={sliderRef}
        style={{
          height: `${height}px`,
          width: `${width}px`,
          background: `linear-gradient(to right, ${hoverColor} 0%, ${hoverColor} ${Math.round(progress*100)}%, transparent ${Math.round(progress*100)}%, transparent 100%)`
        }}
        onMouseDown={handleMouseDown}
        onChange={handleChange}
      />
      <div
        className='absolute top-0 left-0 z-0'
        style={{
          height: `${height}px`,
          width: `${width}px`,
          backgroundColor: bgColor,
          clipPath: 'inset(0 0 0 0 round 9999px)'
        }}
      >
        <div
          className='rounded-full absolute top-0'
          style={{
            height: `${height}px`,
            width: `${width}px`,
            left: `${Math.round(width*progress)-width}px`,
            backgroundColor: progressColor
          }}
        ></div>
      </div>
    </div>
  )
}

export default Seekbar
