import React from 'react'

import { Home } from '../pages/Home/'
import { PanelOptions } from './PanelOptions'
import { appContext } from './context/'
import { redirectQueryUrl } from './utils/redirectUrl'

function AppGUI() {
  const { panelOptions, setPanelOptions, useQueryParameter, token, setToken } =
    React.useContext(appContext)

  const { access_token } = useQueryParameter()

  if (token === '' && access_token !== null) {
    setToken(access_token)
    redirectQueryUrl({ page: 'home' })
  }
  if (access_token !== null) redirectQueryUrl({ page: 'home' })

  const clickApp = () => {
    if (panelOptions !== null) setPanelOptions(null)
  }
  return (
    <div className="AppContainer" onClick={clickApp}>
      <Home />
      {panelOptions === null ? null : <PanelOptions />}
    </div>
  )
}

export { AppGUI }
