import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import PlayerContextProvider from './context/PlayerContext.jsx'
import ContextMenuContextProvider from './context/ContextMenuContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ContextMenuContextProvider>
        <PlayerContextProvider>
          <App />
        </PlayerContextProvider>
      </ContextMenuContextProvider>  
    </BrowserRouter>
  </StrictMode>,
)
