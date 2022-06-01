import React from 'react'

function Tooltip({ children, tooltip, element = 'div' }) {
  const [displaySpan, setDisplaySpan] = React.useState('none')
  let timer
  const mouseOver = () => {
    timer = setTimeout(() => {
      setDisplaySpan('initial')
    }, 1000)
  }
  const mouseOut = () => {
    clearTimeout(timer)
    setDisplaySpan('none')
  }
  return React.createElement(
    element,
    {
      className: 'tooltip',
      onMouseOver: mouseOver,
      onMouseOut: mouseOut
    },
    React.createElement('span', { className: 'tooltip-text' }, tooltip),
    React.createElement('span', { style: { display: displaySpan } }, tooltip)
  )
}

export { Tooltip }
