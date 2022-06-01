import React from 'react'

import { Home } from '../pages/Home/'
import { PanelOptions } from './PanelOptions'
import { appContext } from './context/'
import { redirectQueryUrl } from './utils/redirectUrl'
import { Locked } from '../pages/Locked'
import { Watch } from '../pages/Watch'

function AppGUI() {
  const {
    panelOptions,
    setPanelOptions,
    useQueryParameter,
    token,
    setToken,
    setRefreshToken,
    spotify,
    watchStatus
  } = React.useContext(appContext)

  const { access_token, refresh_token, watch, watch_type } = useQueryParameter()
  const [logged, setLogged] = React.useState(false)
  const [statusSpotify, setStatusSpotify] = React.useState({
    status: 400,
    message: ''
  })

  if (token === '' && access_token !== null) {
    setToken(access_token)
    setRefreshToken(refresh_token)
    redirectQueryUrl({ page: 'home' })
  }
  if (access_token !== null && refresh_token !== null)
    redirectQueryUrl({ page: 'home' })

  const clickApp = () => {
    if (panelOptions !== null) setPanelOptions(null)
  }
  React.useEffect(() => {
    ;(async () => {
      const status = await spotify.status()
      setStatusSpotify(status)
      if (status.status === 200) setLogged(true)
    })()
  }, [])

  // PROBAR

  return (
    <div className="AppContainer" onClick={clickApp}>
      {logged ? <Home /> : <Locked status={statusSpotify} />}
      {panelOptions === null ? null : <PanelOptions />}
      {watchStatus.watch !== null ? <Watch /> : null}
    </div>
  )
}

export { AppGUI }
