import React from 'react'

const RightSidebar = () => {
  return (
    <div className='lg:col-span-1 w-[280px] bg-[#121212] rounded-lg hidden lg:flex flex-col'>
      <div className='h-16 flex justify-between items-center px-4'>
        <h1 className='text-white font-bold'>Queue</h1>
        <button className='p-2 cursor-default'>
          <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className="w-4 fill-[#b3b3b3]"><path d="M2.47 2.47a.75.75 0 0 1 1.06 0L8 6.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L9.06 8l4.47 4.47a.75.75 0 1 1-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 0 1 0-1.06Z"></path></svg>
        </button>
      </div>
      
      <div className='pl-4 pt-4 pr-6 pb-6 flex flex-col gap-6'>
        <div>
          <h2 className='text-white font-bold pt-1 pb-[6px]'>Now playing</h2>
          <div className='flex gap-3 p-2 pl-0'>
            <img className='w-12 h-12 rounded-[4px]' src='https://res.cloudinary.com/djo1p8rg6/image/upload/v1732360858/yvzj9onimv6nwbtofssm.jpg' alt=''/>
            <div>
              <p className='text-[#1ed760]'>Song title</p>
              <div className='h-[2px]'></div>
              <p className='text-[#b3b3b3] text-sm'>Song artist</p>
            </div>
          </div>
        </div>

        <div>
        <h2 className='text-white font-bold pt-1 pb-[6px]'>Next from: </h2>
          <div className='flex gap-3 p-2 pl-0'>
            <img className='w-12 h-12 rounded-[4px]' src='https://res.cloudinary.com/djo1p8rg6/image/upload/v1732360858/yvzj9onimv6nwbtofssm.jpg' alt=''/>
            <div>
              <p className='text-white'>Song title</p>
              <div className='h-[2px]'></div>
              <p className='text-[#b3b3b3] text-sm'>Song artist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightSidebar
