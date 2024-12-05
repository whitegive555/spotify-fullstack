import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import PlayerContextProvider from './context/PlayerContext.jsx'
import ContextMenuContextProvider from './context/ContextMenuContext.jsx'
import NavContextProvider from './context/NavContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <NavContextProvider>
        <ContextMenuContextProvider>
          <PlayerContextProvider>
            <App />
          </PlayerContextProvider>
        </ContextMenuContextProvider>  
      </NavContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
