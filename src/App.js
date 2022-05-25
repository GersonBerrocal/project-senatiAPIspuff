import React from 'react'
import './sass/main.scss'
import { AppGUI } from './components/AppGUI'
import { AppProvider } from './components/context'

function App() {
  return (
    <AppProvider>
      <AppGUI />
    </AppProvider>
  )
}

export { App }
