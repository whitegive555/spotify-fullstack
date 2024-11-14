import React from 'react'
import { useNavigate } from 'react-router-dom'

const AlbumItem = ({image, name, desc, id}) => {
  const navigate = useNavigate()

  return (
    <div className='min-w-[180px] max-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]' onClick={() => navigate(`/album/${id}`)}>
      <img className='rounded w-[156px]' src={image} alt=''/>
      <p className='font-bold mt-2 mb-1 truncate'>{name}</p>
      <p className='text-slate-200 text-sm'>{desc}</p>
    </div>
  )
}

export default AlbumItem
