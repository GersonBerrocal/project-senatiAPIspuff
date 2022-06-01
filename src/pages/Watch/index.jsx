import React from 'react'
import ReactDOM from 'react-dom'

import { appContext } from '../../components/context/'

import { Artist } from './Artist'
import { Album } from './Album'

function Watch() {
  let body = null
  const { watchStatus, setWatchStatus } = React.useContext(appContext)
  const { watch, watch_type } = watchStatus
  if (watch !== null && watch_type !== null) {
    let main
    switch (watch_type) {
      case 'artist':
        main = <Artist id={watch} />
        break
      case 'album':
        main = <Album />
        break
    }
    body = (
      <div className="watch">
        <main>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <span
              className="link"
              onClick={() =>
                setWatchStatus({ watch: null, watch_status: null })
              }
            >
              close
            </span>
          </div>
          {main}
        </main>
      </div>
    )
  }
  return ReactDOM.createPortal(body, document.getElementById('watch'))
}

export { Watch }
