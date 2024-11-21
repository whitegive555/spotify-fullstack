import { createContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { debounce } from 'lodash'

export const PlayerContext = createContext()

const PlayerContextProvider = (props) => {
  const audioRef = useRef()
  const seekSliderRef = useRef()
  const seekProgressRef = useRef()
  const volumeSliderRef = useRef()
  const volumeProgressRef = useRef()
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(0)
  
  let isSeekingProgress = useRef(false)
  let isSeekingVolume = useRef(false)
  const url = 'http://localhost:4000'

  const [playlistData, setPlaylistData] = useState([])
  const [artistData, setArtistData] = useState([])
  const [queueData, setQueueData] = useState([])
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
    await songsData.map((item) => {
      if (id == item._id) {
        setTrack(item)
      }
    })
    await audioRef.current.play()
    setPlayStatus(true)
  }

  const previous = async () => {
    songsData.map(async (item, index) => {
      if (track._id == item._id && index > 0) {
        await setTrack(songsData[index-1])
        await audioRef.current.play()
        setPlayStatus(true)
      }
    })
  }
  
  const next = async () => {
    songsData.map(async (item, index) => {
      if (track._id == item._id && index < songsData.length + 1) {
        await setTrack(songsData[index+1])
        await audioRef.current.play()
        setPlayStatus(true)
      }
    })
  }

  const seekMouseEnter = () => {
    seekProgressRef.current.style.backgroundColor = '#1db954'
  }
  
  const seekMouseLeave = () => {
    seekProgressRef.current.style.backgroundColor = 'white'
  }

  const seekMouseDown = () => {
    isSeekingProgress.current = true
    document.addEventListener('mouseup', seekMouseUp)
  }

  const seekChange = () => {
    setProgress(seekSliderRef.current.value / seekSliderRef.current.max)
    setTime({
      currentTime: {
        second: Math.floor((audioRef.current.duration * seekSliderRef.current.value / seekSliderRef.current.max ) % 60),
        minute: Math.floor((audioRef.current.duration * seekSliderRef.current.value / seekSliderRef.current.max ) / 60)
      },
      totalTime: {
        second: Math.floor(audioRef.current.duration % 60),
        minute: Math.floor(audioRef.current.duration / 60)
      }
    })
  }

  const seekMouseUp = () => {
    document.removeEventListener('mouseup', seekMouseUp)
    audioRef.current.currentTime = seekSliderRef.current.value / seekSliderRef.current.max * audioRef.current.duration
    isSeekingProgress.current = false
  }

  const getUserData = async () => {
    try {
      const response = await axios.get(`${url}/api/user/list?id=673e7ddacacf869acf1075f5`)
      if (response.data.success) {
        setPlaylistData(response.data.user.playlists)
        setArtistData(response.data.user.artists)
        setQueueData(response.data.user.queue)
      }
    }
    catch (error) {
      
    }
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
        if (isSeekingProgress.current) return
        setProgress(audioRef.current.currentTime / audioRef.current.duration)
        seekSliderRef.current.value = Math.round(audioRef.current.currentTime / audioRef.current.duration * seekSliderRef.current.max)
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
    getUserData()
    audioRef.current.volume = 0
  }, [])
 
  useEffect(() => {
    getSongsData()
    getAlbumsData()
    audioRef.current.volume = 0
  }, [playlistData])

  const volumeMouseEnter = () => {
    volumeProgressRef.current.style.backgroundColor = '#1db954'
  }
  
  const volumeMouseLeave = () => {
    volumeProgressRef.current.style.backgroundColor = 'white'
  }

  const volumeChange = () => {
    setVolume(volumeSliderRef.current.value / volumeSliderRef.current.max)
    audioRef.current.volume = volumeSliderRef.current.value / volumeSliderRef.current.max
  }

  const contextValue = {
    audioRef,
    seekSliderRef, seekProgressRef,
    progress, setProgress,
    seekMouseDown, seekChange, seekMouseEnter, seekMouseLeave,
    volumeSliderRef, volumeProgressRef,
    volume, setVolume,
    volumeChange, volumeMouseEnter, volumeMouseLeave,
    track, setTrack,
    playStatus, setPlayStatus,
    time, setTime,
    play, pause,
    playWithId,
    previous, next,
    playlistData, artistData, queueData, songsData, albumsData
  }
  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  )
}

export default PlayerContextProvider