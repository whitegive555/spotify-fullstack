import React, { useContext } from 'react'
import { images } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'
import Seekbar from './Seekbar'

const Player = () => {

  // const { track, seekBar, seekBg, playStatus, play, pause, time, previous, next, seekSong } = useContext(PlayerContext)
  const { track, playStatus, play, pause, time, previous, next } = useContext(PlayerContext)

  return track ? (
    <div className='lg:col-span-3 h-[72px] bg-black flex justify-between item-center text-white px-4'>
      <div className='hidden lg:flex items-center gap-4'>
        <img className='w-12' src={track.image} alt=''/>
        <div>
          <p>{track.name}</p>
          <p>{track.desc.slice(0, 12)}</p>
        </div>
      </div>
      <div className='flex flex-col items-center gap-1 m-auto'>
        <div className='flex gap-4'>
          <img className='w-4 cursor-pointer' src={images.shuffle_icon} alt=''/>
          <img onClick={previous} className='w-4 cursor-pointer' src={images.prev_icon} alt=''/>
          {playStatus
            ? <img onClick={pause} className='w-4 cursor-pointer' src={images.pause_icon} alt=''/>
            : <img onClick={play} className='w-4 cursor-pointer' src={images.play_icon} alt=''/>
          }
          <img onClick={next} className='w-4 cursor-pointer' src={images.next_icon} alt=''/>
          <img className='w-4 cursor-pointer' src={images.loop_icon} alt=''/>
        </div>
        <div className='flex items-center gap-5'>
          <p>{time.currentTime.minute.toString().padStart(2, '0')}:{time.currentTime.second.toString().padStart(2, '0')}</p>

          {/* ------------ Seekbar ----------- */}
          {/* <div ref={seekBg} onClick={seekSong} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
            <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full'/>
          </div> */}
          <Seekbar />
          <p className='relative'>{time.totalTime.minute.toString().padStart(2, '0')}:{time.totalTime.second.toString().padStart(2, '0')}</p>
        </div>
      </div>
      <div className='hidden lg:flex items-center gap-2 opacity-75'>
        <img className='w-4' src={images.plays_icon} alt=''/>
        <img className='w-4' src={images.mic_icon} alt=''/>
        <img className='w-4' src={images.queue_icon} alt=''/>
        <img className='w-4' src={images.speaker_icon} alt=''/>
        <img className='w-4' src={images.volume_icon} alt=''/>
        <div className='w-20 bg-slate-50 h-1 rounded'></div>
        <img className='w-4' src={images.mini_player_icon} alt=''/>
        <img className='w-4' src={images.zoom_icon} alt=''/>
      </div>
    </div>
  ) : null
}

export default Player
