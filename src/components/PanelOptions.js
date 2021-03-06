import React from 'react'
import ReactDOM from 'react-dom'
import { appContext } from './context/'

function PanelOptions() {
  const {
    panelOptions: { options, event }
  } = React.useContext(appContext)
  const keyOptions = Object.keys(options)
  let list = keyOptions.map(key => {
    if (options[key].url)
      return (
        <a href={options[key].url} key={key}>
          {key}
        </a>
      )
    else
      return (
        <a key={key} onClick={options[key].cb}>
          {key}
        </a>
      )
  })
  const left = event.pageX
  const top = event.pageY
  const right = window.innerWidth - left
  const bottom = window.innerHeight - top
  let style = {}
  if (left > right) style.right = right
  else style.left = left

  if (top > bottom) style.bottom = bottom
  else style.top = top
  return ReactDOM.createPortal(
    <div className="panelOptions" style={style}>
      {list}
    </div>,
    document.getElementById('panelFixed')
  )
}

export { PanelOptions }
