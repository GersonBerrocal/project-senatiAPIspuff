import React from 'react'

import { appContext } from '../context'
import iconNext from '@media/next.svg'

function Slider({ elements }) {
  const { useResize, useVarCss } = React.useContext(appContext)
  const divRef = React.useRef()
  const { width, height } = useResize(divRef)
  const [styles, setStyles] = React.useState({})

  const gap = 20
  const widthAlbum = parseFloat(useVarCss('--width-album', 'px'))

  const maxVisibleItems = parseInt((width + gap) / (widthAlbum + gap))
  const totalItems = elements.length
  let [mount, setMount] = React.useState(0)
  let [count, setCount] = React.useState(0)
  const clickNext = () => {
    let next = widthAlbum * maxVisibleItems + maxVisibleItems * gap
    const falta = totalItems - count - maxVisibleItems
    if (falta < maxVisibleItems) {
      const a = totalItems - maxVisibleItems
      next = widthAlbum * a + a * gap
      setStyles({ transform: `translateX(-${next}px)` })
      setMount(next)
      setCount(a)
    } else {
      setStyles({ transform: `translateX(-${mount + next}px)` })
      setCount(count + maxVisibleItems)
      setMount(mount + next)
    }
  }
  const clickBack = () => {
    let back
    if (count > maxVisibleItems) {
      const elm = count - maxVisibleItems
      back = elm * widthAlbum + elm * gap
      setStyles({ transform: `translateX(-${back}px)` })
      setMount(back)
      setCount(elm)
    } else {
      setStyles({ transform: `translateX(0px)` })
      setCount(0)
      setMount(0)
    }
  }
  const classNext = count + maxVisibleItems === totalItems ? ' is-hidden' : ''
  const classPrevious = count === 0 ? ' is-hidden' : ''
  return (
    <div className="slider" ref={divRef}>
      <div className="slider-container" style={styles}>
        {elements}
      </div>
      <img
        onClick={clickBack}
        className={`slider-previous${classPrevious}`}
        src={iconNext}
      />
      <img
        onClick={clickNext}
        className={`slider-next${classNext}`}
        src={iconNext}
      />
    </div>
  )
}

export { Slider }
