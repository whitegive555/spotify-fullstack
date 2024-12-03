import React, { useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import getAverageColor from 'get-average-color'
import rgbHex from 'rgb-hex'

const AddAlbum = () => {
  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [year, setYear] = useState('')
  const [artwork, setArtwork] = useState(false)
  const artworkInputRef = useRef()
  const [bgColor, setBgColor] = useState('#121212')

  const loadArtwork = async () => {
    setArtwork(artworkInputRef.current.files[0])
    const rgb = await getAverageColor(URL.createObjectURL(artworkInputRef.current.files[0]))
    setTitle(artworkInputRef.current.files[0].name.slice(0, -4))
    setBgColor('#'+rgbHex(rgb.r, rgb.g, rgb.b))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const albumForm = new FormData()
      albumForm.append('title', title)
      albumForm.append('artist', artist)
      albumForm.append('year', year)
      albumForm.append('artwork', artwork)
      albumForm.append('bgColor', bgColor)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/album/add`, albumForm)
      
      if (response.data.success) {
        toast.success('Album added')
        setTitle('')
        setArtist('')
        setYear('')
        setArtwork(false)
        setBgColor('#121212')
      }
      else {
        toast.error('Something went wrong')
      }
    }
    catch (error) {
      toast.error('Error occurred')
    }
    setLoading(false)
  }

  return loading ? 
    <div className='grid play-items-center min-h-[80vh]'>
      <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin'></div>
    </div> : (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-8 text-gray-600'>
      <div className='flex flex-col gap-4'>
        <p>Artwork</p>
        <input ref={artworkInputRef} onChange={loadArtwork} type='file' id='image' accept='image/*' hidden />
        <label htmlFor='image'>
          <img className='w-24 cursor-pointer' src={artwork ? URL.createObjectURL(artwork) : assets.upload_area} alt=''/>
        </label>
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Title</p>
        <input onChange={(e) => setTitle(e.target.value)} value={title} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' type='text' placeholder='Type here' />
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Artist</p>
        <input onChange={(e) => setArtist(e.target.value)} value={artist} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' type='text' placeholder='Type here' />
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Year</p>
        <input onChange={(e) => setYear(e.target.value)} value={year} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' type='text' placeholder='Type here' />
      </div>
      <div className='flex flex-col gap-3'>
        <p>Background Color</p>
        <input onChange={(e) => setBgColor(e.target.value)} value={bgColor} type='color' />
      </div>
      <button className='text-base bg-black text-white py-2.5 px-14 cursor-pointer'>ADD</button>
    </form>
  )
}

export default AddAlbum
