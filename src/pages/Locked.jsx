import React from 'react'
import { appContext } from '../components/context/'
import { redirectQueryUrl } from '../components/utils/redirectUrl'

function Locked({ status }) {
  const { spotify, setToken } = React.useContext(appContext)
  let message
  let link
  let messageButton
  let onClickButton
  if (status.status === 400) {
    message = "This app use spotify's api, pls login"
    link = spotify.urlLogin
    messageButton = 'Login'
    onClickButton = () => {}
  } else if (
    status.status === 401 &&
    status.message?.indexOf('expired') !== -1
  ) {
    message = 'Your token has expired'
    link = ''
    messageButton = 'Refresh'
    onClickButton = async e => {
      e.preventDefault()
      const res = await spotify.refreshToken()
      setToken(res.access_token)
      redirectQueryUrl({ page: 'home' })
    }
  }
  return (
    <div className="locked">
      <div>
        <p>{message}</p>
        <a href={link} onClick={onClickButton}>
          {messageButton}
        </a>
      </div>
    </div>
  )
}
export { Locked }
