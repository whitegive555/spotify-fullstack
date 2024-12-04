import React from 'react'

const ContextMenu = ({
  isActive,
  position
}) => {
  return (
    <menu className='rounded bg-[#282828] p-1 flex-col w-fit absolute z-10' style={{
      display: isActive ? 'flex' : 'none',
      ...position
    }}>
      <button className='hover:bg-[rgba(255,255,255,0.1)] text-sm text-[#eaeaea] flex justify-start items-center gap-3 p-3 pr-2 cursor-default rounded-sm'>
        <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className="w-4 fill-[#1ed760]"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm11.748-1.97a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 1 0-1.061 1.06l2.466 2.467 5.53-5.53z"></path></svg>
        Remove from your library
      </button>

      <button className='hover:bg-[rgba(255,255,255,0.1)] text-sm text-[#eaeaea] flex justify-start items-center gap-3 p-3 pr-2 cursor-default rounded-sm'>
        <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className="w-4 fill-[#b3b3b3]"><path d="M16 15H2v-1.5h14V15zm0-4.5H2V9h14v1.5zm-8.034-6A5.484 5.484 0 0 1 7.187 6H13.5a2.5 2.5 0 0 0 0-5H7.966c.159.474.255.978.278 1.5H13.5a1 1 0 1 1 0 2H7.966zM2 2V0h1.5v2h2v1.5h-2v2H2v-2H0V2h2z"></path></svg>
        Add to queue
      </button>

      <button className='hover:bg-[rgba(255,255,255,0.1)] text-sm text-[#eaeaea] flex justify-start items-center gap-3 p-3 pr-2 cursor-default rounded-sm relative after:absolute after:left-0 after:right-0 after:bottom-0 after:content-[""] after:border-solid after:border-b after:border-[hsla(0,0%,100%,.1)]'>
        <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className="w-4 fill-[#b3b3b3]"><path d="M5.624 3.886A4.748 4.748 0 0 0 3.25 8c0 1.758.955 3.293 2.375 4.114l.75-1.3a3.249 3.249 0 0 1 0-5.63l-.75-1.298zm4.001 1.299.75-1.3A4.748 4.748 0 0 1 12.75 8a4.748 4.748 0 0 1-2.375 4.114l-.75-1.3a3.249 3.249 0 0 0 0-5.63zM8 6.545a1.455 1.455 0 1 0 0 2.91 1.455 1.455 0 0 0 0-2.91z"></path><path d="M4 1.07A7.997 7.997 0 0 0 0 8a7.997 7.997 0 0 0 4 6.93l.75-1.3A6.497 6.497 0 0 1 1.5 8a6.497 6.497 0 0 1 3.25-5.63L4 1.07zm7.25 1.3.75-1.3A7.997 7.997 0 0 1 16 8a7.997 7.997 0 0 1-3.999 6.93l-.75-1.3A6.497 6.497 0 0 0 14.5 8a6.497 6.497 0 0 0-3.25-5.63z"></path></svg>
        Go to artist radio
      </button>

      <button className='hover:bg-[rgba(255,255,255,0.1)] text-sm text-[#eaeaea] flex justify-start items-center gap-3 p-3 pr-2 cursor-default rounded-sm'>
        <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className="w-4 fill-[#b3b3b3]"><path d="M11.609 1.858a1.22 1.22 0 0 0-1.727 0L5.92 5.82l-2.867.768 6.359 6.359.768-2.867 3.962-3.963a1.22 1.22 0 0 0 0-1.726L11.61 1.858zM8.822.797a2.72 2.72 0 0 1 3.847 0l2.534 2.533a2.72 2.72 0 0 1 0 3.848l-3.678 3.678-1.337 4.988-4.486-4.486L1.28 15.78a.75.75 0 0 1-1.06-1.06l4.422-4.422L.156 5.812l4.987-1.337L8.822.797z"></path></svg>
        Pin album
      </button>

      <button className='hover:bg-[rgba(255,255,255,0.1)] text-sm text-[#eaeaea] flex justify-between items-center p-3 pr-2 cursor-default rounded-sm relative after:absolute after:left-0 after:right-0 after:bottom-0 after:content-[""] after:border-solid after:border-b after:border-[hsla(0,0%,100%,.1)]'>
        <div className='flex justify-start gap-3'>
          <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className="w-4 fill-[#b3b3b3]"><path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"></path></svg>
          Add to playlist
        </div>
        <svg data-encore-id="icon" role="img" aria-hidden="true" className="w-4 fill-white rotate-90" viewBox="0 0 16 16"><path d="M14 10 8 4l-6 6h12z"></path></svg>
      </button>
     
      <button className='hover:bg-[rgba(255,255,255,0.1)] text-sm text-[#eaeaea] flex justify-between items-center p-3 pr-2 cursor-default rounded-sm relative after:absolute after:left-0 after:right-0 after:bottom-0 after:content-[""] after:border-solid after:border-b after:border-[hsla(0,0%,100%,.1)]'>
        <div className='flex justify-start gap-3'>
          <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className="w-4 fill-[#b3b3b3]"><path d="M1 5.75A.75.75 0 0 1 1.75 5H4v1.5H2.5v8h11v-8H12V5h2.25a.75.75 0 0 1 .75.75v9.5a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75v-9.5z"></path><path d="M8 9.576a.75.75 0 0 0 .75-.75V2.903l1.454 1.454a.75.75 0 0 0 1.06-1.06L8 .03 4.735 3.296a.75.75 0 0 0 1.06 1.061L7.25 2.903v5.923c0 .414.336.75.75.75z"></path></svg>
          Share
        </div>
        <svg data-encore-id="icon" role="img" aria-hidden="true" className="w-4 fill-white rotate-90" viewBox="0 0 16 16"><path d="M14 10 8 4l-6 6h12z"></path></svg>
      </button>

      <button className='hover:bg-[rgba(255,255,255,0.1)] text-sm text-[#eaeaea] flex justify-start items-center gap-3 p-3 pr-2 cursor-default rounded-sm'>
        <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className="w-4 fill-[#b3b3b3]"><path d="M8.319.006A8.003 8.003 0 0 0 .006 7.683a7.998 7.998 0 0 0 7.677 8.31A8 8 0 0 0 8.319.006Zm3.377 11.72a.478.478 0 0 1-.652.179 9.612 9.612 0 0 0-3.426-1.165 9.599 9.599 0 0 0-3.613.176.479.479 0 0 1-.226-.93c1.3-.316 2.637-.38 3.972-.193 1.336.188 2.602.62 3.765 1.28.228.13.309.422.178.652l.002.001Zm1.05-2.1a.62.62 0 0 1-.841.25A11.793 11.793 0 0 0 7.923 8.57a11.775 11.775 0 0 0-4.188.158.622.622 0 0 1-.74-.473.62.62 0 0 1 .473-.739 13.032 13.032 0 0 1 4.626-.176c1.552.217 3.031.704 4.4 1.444a.62.62 0 0 1 .25.842h.003Zm1.166-2.367a.765.765 0 0 1-1.031.326 14.307 14.307 0 0 0-4.612-1.473 14.285 14.285 0 0 0-4.84.145.764.764 0 1 1-.303-1.499 15.812 15.812 0 0 1 5.356-.16c1.791.252 3.51.8 5.104 1.63.374.194.52.656.326 1.03Z"></path></svg>
        Open in desktop app
      </button>
    </menu>
  )
}

export default ContextMenu
