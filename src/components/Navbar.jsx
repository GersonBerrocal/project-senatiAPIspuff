import React from 'react'
import logo from '@media/Trackly.svg'
import iconUser from '@media/user.svg'
import iconSearch from '@media/search.svg'
import iconClose from '@media/close.svg'

import { appContext } from './context/'

function Navbar() {
  const [textSearch, setTextSearch] = React.useState('')
  const { setPanelOptions } = React.useContext(appContext)

  const onClickClose = () => {
    setTextSearch('')
  }
  const onChangeInput = e => {
    setTextSearch(e.target.value)
  }
  const clickUserIcon = e => {
    setPanelOptions({ options: { login: '/api/spotify/login' }, event: e })
  }
  return (
    <div className="navbar">
      <img src={logo} className="navbar-logo" />
      <label className="inputSearch">
        {textSearch === '' ? (
          <img src={iconSearch} className="inputSearch-iconSearch" />
        ) : (
          <img
            src={iconClose}
            className="inputSearch-iconClose"
            onClick={onClickClose}
          />
        )}
        <input
          className="inputSearch-input"
          placeholder="Buscar"
          value={textSearch}
          onChange={onChangeInput}
        />
      </label>
      <img src={iconUser} className="navbar-user" onClick={clickUserIcon} />
    </div>
  )
}

export { Navbar }
