import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import AudioProvider from './context/AudioContext.jsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AudioProvider>
      <App />
    </AudioProvider>
  </React.StrictMode>,
)