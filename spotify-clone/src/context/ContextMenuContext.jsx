import React from 'react'
import { createContext, useEffect, useRef, useState } from 'react'

export const ContextMenuContext = createContext()

const ContextMenuContextProvider = (props) => {
  const [contextMenuStatus, setContextMenuStatus] = useState({
    isActive: false,
    position: {
      top: '0px',
      left: '0px'
    }
  })

  const leftClick = () => {
    setContextMenuStatus({
      isActive: false,
      position: {
        top: '0px',
        left: '0px'
      }
    })
  }

  const rightClick = (e) => {
    e.preventDefault()
  }

  const rightClickItem = (e) => {
    let left = 'auto', right = 'auto', top = 'auto', bottom = 'auto'

    if(e.clientX < window.innerWidth / 2) {
      left = `${e.clientX}px`
    }
    else {
      right = `${window.innerWidth - e.clientX}px`
    }
    
    if(e.clientY < window.innerHeight / 2) {
      top = `${e.clientY}px`
    }
    else {
      bottom = `${window.innerHeight - e.clientY}px`
    }

    setContextMenuStatus({
      isActive: true,
      position: { left, right, top, bottom }
    })
  }
  
  const contextValue = {
    contextMenuStatus, setContextMenuStatus,
    leftClick, rightClick,
    rightClickItem
  }

  return (
    <ContextMenuContext.Provider value={contextValue}>
      {props.children}
    </ContextMenuContext.Provider>
  )
}

export default ContextMenuContextProvider
