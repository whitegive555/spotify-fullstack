import React, { createContext, useEffect, useRef, useState } from 'react'

export const NavContext = createContext()

const NavContextProvider = (props) => {
  const [atHome, setAtHome] = useState(true)

  const contextValue = {
    atHome, setAtHome
  }

  return (
    <NavContext.Provider value={contextValue}>
      {props.children}
    </NavContext.Provider>
  )
}

export default NavContextProvider
