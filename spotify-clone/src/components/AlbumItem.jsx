import React from 'react'
import { useNavigate } from 'react-router-dom'
import { forwardRef } from 'react'

const AlbumItem = forwardRef(({ id, title, artist, artworkUrl}, ref) => {
  const navigate = useNavigate()

  return (
    <div ref={ref} className='min-w-[184px] max-w-[184px] p-3 cursor-pointer' onClick={() => navigate(`/album/${id}`)}>
      <img className='rounded-[6px] w-full block' src={artworkUrl} alt=''/>
      <a className='text-white truncate block pt-2 pb-1'>{title}</a>
      <a className='text-[#b3b3b3] text-sm truncate block'>{artist}</a>
    </div>
  )
})

export default AlbumItem
