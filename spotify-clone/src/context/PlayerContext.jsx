import { createContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { debounce } from 'lodash'

export const PlayerContext = createContext()

const PlayerContextProvider = (props) => {
  const audioRef = useRef()
  // const seekBg = useRef()
  // const seekBar = useRef()
  const sliderRef = useRef()
  const [progress, setProgress] = useState(0)
  let isSeeking = useRef(false)

  const url = 'http://localhost:4000'

  const [songsData, setSongsData] = useState([])
  const [albumsData, setAlbumsData] = useState([])
  const [track, setTrack] = useState(songsData[0])
  const [playStatus, setPlayStatus] = useState(false)
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0
    },
    totalTime: {
      second: 0,
      minute: 0
    }
  })

  const play = () => {
    audioRef.current.play()
    setPlayStatus(true)
  }
  
  const pause = () => {
    audioRef.current.pause()
    setPlayStatus(false)
  }

  const playWithId = async (id) => {
    // await setTrack(songsData[id])
    // await audioRef.current.play()
    // setPlayStatus(true)
    await songsData.map((item) => {
      if (id == item._id) {
        setTrack(item)
      }
    })
    await audioRef.current.play()
    setPlayStatus(true)
  }

  const previous = async () => {
    // if(track.id > 0) {
    //   await setTrack(songsData[track.id-1])
    //   await audioRef.current.play()
    //   setPlayStatus(true)
    // }
    songsData.map(async (item, index) => {
      if (track._id == item._id && index > 0) {
        await setTrack(songsData[index-1])
        await audioRef.current.play()
        setPlayStatus(true)
      }
    })
  }
  
  const next = async () => {
    // if(track.id < songsData.length+1) {
    //   await setTrack(songsData[track.id+1])
    //   await audioRef.current.play()
    //   setPlayStatus(true)
    // }
    songsData.map(async (item, index) => {
      if (track._id == item._id && index < songsData.length + 1) {
        await setTrack(songsData[index+1])
        await audioRef.current.play()
        setPlayStatus(true)
      }
    })
  }

  const handleMouseDown = () => {
    isSeeking.current = true
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleChange = () => {
    setProgress(sliderRef.current.value / sliderRef.current.max)
    setTime({
      currentTime: {
        second: Math.floor((audioRef.current.duration * sliderRef.current.value / sliderRef.current.max ) % 60),
        minute: Math.floor((audioRef.current.duration * sliderRef.current.value / sliderRef.current.max ) / 60)
      },
      totalTime: {
        second: Math.floor(audioRef.current.duration % 60),
        minute: Math.floor(audioRef.current.duration / 60)
      }
    })
  }

  const handleMouseUp = () => {
    document.removeEventListener('mouseup', handleMouseUp)
    audioRef.current.currentTime = sliderRef.current.value / sliderRef.current.max * audioRef.current.duration
    isSeeking.current = false
  }

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`)
      if (response.data.success) {
        setSongsData(response.data.songs)
        setTrack(response.data.songs[0])
      }
    }
    catch (error) {
      
    }
  }

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`)
      if (response.data.success) {
        setAlbumsData(response.data.albums)
      }
    }
    catch (error) {
      
    }
  }

  useEffect(() => {
    setTimeout(() => {      
      audioRef.current.ontimeupdate = () => {
        // seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + '%'
        if (isSeeking.current) return
        setProgress(audioRef.current.currentTime / audioRef.current.duration)
        sliderRef.current.value = Math.round(audioRef.current.currentTime / audioRef.current.duration * sliderRef.current.max)
        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60)
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60)
          }
        })
      }
    }, 1000);
  }, [audioRef])

  useEffect(() => {
    getSongsData()
    getAlbumsData()
  }, [])

  // const contextValue = {
  //   audioRef,
  //   seekBg,
  //   seekBar,
  //   track, setTrack,
  //   playStatus, setPlayStatus,
  //   time, setTime,
  //   play, pause,
  //   playWithId,
  //   previous, next,
  //   seekSong,
  //   songsData, albumsData
  // }
  const contextValue = {
    audioRef,
    progress, setProgress,
    sliderRef,
    handleMouseDown, handleChange,
    track, setTrack,
    playStatus, setPlayStatus,
    time, setTime,
    play, pause,
    playWithId,
    previous, next,
    songsData, albumsData
  }
  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  )
}

export default PlayerContextProvider