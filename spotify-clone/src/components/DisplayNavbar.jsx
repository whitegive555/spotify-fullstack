import React from 'react'
import { images } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const DisplayNavbar = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className='w-full flex justify-between items-center font-semibold'>
        <div className='flex items-center gap-2'>
          <img onClick={() => navigate(-1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={images.arrow_left} alt=''/>
          <img onClick={() => navigate(1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={images.arrow_right} alt=''/>
        </div>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <p className='bg-white text-black px-4 py-1 rounded-2xl cursor-pointer'>All</p>
        <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Music</p>
        <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Podcasts</p>
      </div>
    </>
  )
}

export default DisplayNavbar
