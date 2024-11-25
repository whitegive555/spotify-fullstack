import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlayerContext } from '../context/PlayerContext'
import { useState } from 'react'

const LeftSidebar = () => {
  const { playlists } = useContext(PlayerContext)

  return (
    <nav className='lg:col-span-1 w-[280px] bg-[#121212] rounded-lg flex-col overflow-auto gap-2 p-2 text-white hidden lg:flex'>
      <div className='pt-1 px-2'>
        <div className='flex gap-2 justify-start items-center'>
          <div className='h-[40px] w-[168px] px-2 py-1 flex justify-start items-center gap-3 text-[#b3b3b3] font-bold'>
            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" className="w-6 fill-[#b3b3b3]"><path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path></svg>
            Your Library
          </div>
          <button className='h-8 w-8 flex justify-center items-center cursor-default	'>
            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className="w-4 fill-[#b3b3b3]"><path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"></path></svg>
          </button>
          <button className='h-8 w-8 flex justify-center items-center cursor-default	'>
            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className="w-4 fill-[#b3b3b3]"><path d="M7.19 1A.749.749 0 0 1 8.47.47L16 7.99l-7.53 7.521a.75.75 0 0 1-1.234-.815.75.75 0 0 1 .174-.243l5.72-5.714H.75a.75.75 0 1 1 0-1.498h12.38L7.41 1.529a.749.749 0 0 1-.22-.53z"></path></svg>
          </button>
        </div>
        <div className='pt-4 flex gap-2 justify-start items-center'>
          {/* <button className='h-8 px-3 py-1 bg-[#2a2a2a] text-sm text-white rounded-full cursor-default	'>Playlists</button> */}
          <button className='h-8 px-3 py-1 bg-white text-sm text-black rounded-full cursor-default	'>Playlists</button>
          <button className='h-8 px-3 py-1 bg-[#2a2a2a] text-sm text-white rounded-full cursor-default	'>Artists</button>
        </div>
        <div className='h-[42px] pt-[10px] -mr-1 flex justify-between items-center'>
          <button className='h-8 w-8 flex justify-center items-center cursor-default	'>
            <svg data-encore-id="icon" role="img" aria-hidden="true" className="w-4 fill-[#b3b3b3]" viewBox="0 0 16 16"><path d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zM.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0 1 .25 7z"></path></svg>
          </button>
          <button className='pl-4 py-1 pr-3 flex justify-between items-center gap-[5px] text-sm text-[#b3b3b3] cursor-default	'>
            Recents
            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className="w-4 fill-[#b3b3b3]"><path d="M15 14.5H5V13h10v1.5zm0-5.75H5v-1.5h10v1.5zM15 3H5V1.5h10V3zM3 3H1V1.5h2V3zm0 11.5H1V13h2v1.5zm0-5.75H1v-1.5h2v1.5z"></path></svg>
          </button>
        </div>
      </div>

      
        {
          playlists.map((item, index) =>
          (
            <div key={index} className='flex flex-col justify-between items-center gap-4 p-2 rounded-lg hover:bg-[#1f1f1f]'>
              <div className='h-12 w-full flex justify-start items-center gap-3 cursor-pointer'>
                <img src={item.songs[0].artworkUrl} className='h-12 w-12 rounded-md' alt=''/>
                <div className='w-[188px] h-12'>
                  <p className='text-white overflow-ellipsis text-nowrap'>{item.name}</p>
                  <p className='text-[#b3b3b3] text-sm'>{item.songs[0].artist}</p>
                </div>
              </div>
            </div>
          ))
        }
      

    </nav>
  )
}

export default LeftSidebar
