import { createContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'

export const PlayerContext = createContext()

const PlayerContextProvider = (props) => {
  const url = 'http://localhost:4000'

  const [playlists, setPlaylists] = useState([])
  const [artists, setArtists] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [queue, setQueue] = useState([])

  
  const audioRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)
  const [playingSong, setPlayingSong] = useState(null)

  const seekSliderRef = useRef()
  const seekBarRef = useRef()
  // is useRef a must here?
  let isSeeking = useRef(false)
  const [progress, setProgress] = useState(0)
  const [time, setTime] = useState({
    currentTime: {
      minute: '-',
      second: '--'
    },
    totalTime: {
      minute: '-',
      second: '--'
    }
  })
  
  const volumeSliderRef = useRef()
  const volumeBarRef = useRef()
  const [volume, setVolume] = useState(0.5)

  {/* ---------- fetch data ---------- */}

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${url}/api/user/get?id=674088e2ed7c9fc0e67816dc`)
      if(response.data.success) {
        setPlaylists(response.data.user.playlists)
        setArtists(response.data.user.artists)
        setRecommendations(response.data.user.recommendations)
        setQueue(response.data.user.queue)        
      }
    }
    catch (error) {
      
    }
  }

  useEffect(() => {
    fetchUserData()
    audioRef.current.volume = 0.5
  }, [])

  {/* ----- control playing song ----- */}

  const play = () => {
    if(!playingSong) return
    audioRef.current.play()
    setIsPlaying(true)
  }
  
  const pause = () => {
    audioRef.current.pause()
    setIsPlaying(false)
  }

  const previous = async () => {
    if(!playingSong) return
    queue.forEach(async (item, index) => {
      if(item.id == playingSong.id && index > 0) {
        setPlayingSong(queue[index-1])
        await audioRef.current.play()
        setIsPlaying(true)
      }
    })
  }
  
  const next = async () => {
    if(!playingSong) return
    queue.forEach(async (item, index) => {
      if(item.id == playingSong.id && index < queue.length-1) {
        setPlayingSong(queue[index+1])
        await audioRef.current.play()
        setIsPlaying(true)
      }
    })
  }

  {/* ------- control progress ------- */}

  useEffect(() => {
    setTimeout(() => {      
      audioRef.current.ontimeupdate = () => {
        if(isSeeking.current) return

        seekSliderRef.current.value = audioRef.current.currentTime / audioRef.current.duration * seekSliderRef.current.max
        setProgress(audioRef.current.currentTime / audioRef.current.duration)
        setTime({
          currentTime: {
            minute: Math.floor(audioRef.current.currentTime / 60).toString(),
            second: Math.floor(audioRef.current.currentTime % 60).toString().padStart(2, '0')
            
          },
          totalTime: {
            minute: Math.floor(audioRef.current.duration / 60).toString(),
            second: Math.floor(audioRef.current.duration % 60).toString().padStart(2, '0')
          }
        })

        // send request to update queue
      }
    }, 1000);
  }, [audioRef])

  const seekMouseEnter = () => {
    seekBarRef.current.style.backgroundColor = '#1db954'
  }

  const seekMouseLeave = () => {
    seekBarRef.current.style.backgroundColor = 'white'
  }

  const seekMouseDown = () => {
    isSeeking.current = true
    document.addEventListener('mouseup', seekMouseUp)
  }

  const seekChange = () => {
    setProgress(seekSliderRef.current.value / seekSliderRef.current.max)
    setTime({
      currentTime: {
        minute: Math.floor(audioRef.current.currentTime / 60).toString(),
        second: Math.floor(audioRef.current.currentTime % 60).toString().padStart(2, '0')
      },
      totalTime: {
        minute: Math.floor(audioRef.current.duration / 60).toString(),
        second: Math.floor(audioRef.current.duration % 60).toString().padStart(2, '0')
      }
    })
  }

  const seekMouseUp = () => {
    isSeeking.current = false
    document.removeEventListener('mouseup', seekMouseUp)

    audioRef.current.currentTime = seekSliderRef.current.value / seekSliderRef.current.max * audioRef.current.duration
  }

  {/* -------- control volume -------- */}

  const volumeMouseEnter = () => {
    volumeBarRef.current.style.backgroundColor = '#1db954'
  }
  
  const volumeMouseLeave = () => {
    volumeBarRef.current.style.backgroundColor = 'white'
  }
   
  const volumeChange = () => {
    setVolume(volumeSliderRef.current.value / volumeSliderRef.current.max)
    audioRef.current.volume = volumeSliderRef.current.value / volumeSliderRef.current.max
  }

  const contextValue = {
    playlists, artists, recommendations, queue,

    play, pause,
    previous, next,

    audioRef,
    isPlaying, setIsPlaying,
    playingSong, setPlayingSong,

    seekSliderRef, seekBarRef,
    progress, setProgress,
    time, setTime,
    seekMouseEnter, seekMouseLeave, seekMouseDown, seekChange,

    volumeSliderRef, volumeBarRef,
    volume, setVolume,
    volumeMouseEnter, volumeMouseLeave, volumeChange
  }
  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  )
}

export default PlayerContextProvider