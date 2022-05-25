import React from 'react'
import { useQueryParameter } from '../hooks/useQueryParameter'
import { useLocalStorage } from '../hooks/useLocalStorage'

const appContext = React.createContext()

function AppProvider({ children }) {
  const [panelOptions, setPanelOptions] = React.useState(null)
  const [token, setToken] = useLocalStorage('TOKEN_SPOTIFY', '')

  return (
    <appContext.Provider
      value={{
        panelOptions,
        setPanelOptions,
        useQueryParameter,
        token,
        setToken
      }}
    >
      {children}
    </appContext.Provider>
  )
}

export { appContext, AppProvider }
