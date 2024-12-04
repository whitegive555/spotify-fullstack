import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { forwardRef } from 'react'
import { ContextMenuContext } from '../context/ContextMenuContext'

const AlbumItem = forwardRef(({ id, title, artist, artworkUrl}, ref) => {
  const navigate = useNavigate()
  const { rightClickItem } = useContext(ContextMenuContext)

  return (
    <div ref={ref} className='min-w-[184px] max-w-[184px] p-3 cursor-pointer rounded-[6px] hover:bg-[#1f1f1f]' onClick={() => navigate(`/album/${id}`)} onContextMenu={rightClickItem}>
      <img className='rounded-[6px] w-full block' src={artworkUrl} alt=''/>
      <a className='text-white truncate block pt-2 pb-1'>{title}</a>
      <a className='text-[#b3b3b3] text-sm truncate block'>{artist}</a>
    </div>
  )
})

export default AlbumItem
