import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { parseBlob } from 'music-metadata'

const AddSong = () => {
  const [loading, setLoading] = useState(false)
  
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [artwork, setArtwork] = useState(false)
  const [audio, setAudio] = useState(false)

  const parseMetadata = async (audio) => {
    try {
      const metadata = await parseBlob(audio)
      return metadata
    } catch (error) {
      console.error('Error parsing metadata:', error.message)
    }
  }
  
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if(!audio) throw error
      const metadata = await parseMetadata(audio)
  
      const songForm = new FormData()
      songForm.append('title', title != '' ? title : metadata.common.title)
      songForm.append('artist', artist != '' ? artist : metadata.common.artist)
      songForm.append('artwork', artwork != false ? artwork : new File([metadata.common.picture[0].data], '25.jpg', { type: 'image/jpeg' }))
      songForm.append('audio', audio)
      const songResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/song/add`, songForm)

      if (songResponse.data.success) {
        toast.success('Song added')
        setTitle('')
        setArtist('')
        setArtwork(false)
        setAudio(false)
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

      <div className='flex gap-8'>

        <div className='flex flex-col gap-4'>
          <p>Upload audio</p>
          <input onChange={(e) => setAudio(e.target.files[0])} type='file' id='audio' accept='audio/*' hidden />
          <label htmlFor='audio'>
            <img src={audio ? assets.upload_added : assets.upload_song} className='w-24 cursor-pointer' alt=''/>
          </label>
        </div>

        <div className='flex flex-col gap-4'>
        <p>Upload image</p>
          <input onChange={(e) => setArtwork(e.target.files[0])} type='file' id='image' accept='image/*' hidden />
          <label htmlFor='image'>
            <img src={artwork ? URL.createObjectURL(artwork) : assets.upload_area} className='w-24 cursor-pointer' alt=''/>
          </label>
        </div>
      </div>

      <div className='flex flex-col gap-2.5'>
        <p>Title</p>
        <input onChange={(e) => setTitle(e.target.value)} value={title} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='Type Here' type='text' />
      </div>

      <div className='flex flex-col gap-2.5'>
        <p>Artist</p>
        <input onChange={(e) => setArtist(e.target.value)} value={artist} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='Type Here' type='text' />
      </div>

      <button type='submit' className='text-base bg-black text-white py-2.5 px-14 cursor-pointer'>ADD</button>
    </form>
  )
}

export default AddSong
