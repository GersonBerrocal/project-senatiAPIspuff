import React from 'react'
import { useQueryParameter } from '../hooks/useQueryParameter'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useResize } from '../hooks/useResize'
import { useVarCss } from '../hooks/useVarCss'
import { Spotify } from '../../api/spotify'

const appContext = React.createContext()

function AppProvider({ children }) {
  const [panelOptions, setPanelOptions] = React.useState(null)
  const [token, setToken] = useLocalStorage('TOKEN_SPOTIFY', '')
  const [refreshToken, setRefreshToken] = useLocalStorage('TOKEN_REFRESH', '')
  const spotify = new Spotify(token, refreshToken, setToken, setRefreshToken)

  const [watchStatus, setWatchStatus] = React.useState({
    watch: null,
    watch_type: null
  })

  return (
    <appContext.Provider
      value={{
        panelOptions,
        setPanelOptions,
        useQueryParameter,
        useResize,
        useVarCss,
        token,
        setToken,
        refreshToken,
        setRefreshToken,
        spotify,
        watchStatus,
        setWatchStatus
      }}
    >
      {children}
    </appContext.Provider>
  )
}

export { appContext, AppProvider }
