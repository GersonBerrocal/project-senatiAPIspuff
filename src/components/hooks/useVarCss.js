import React from 'react'

function useVarCss(nameVar, remove = null) {
  const style = getComputedStyle(document.documentElement)
  let value = style.getPropertyValue(nameVar)
  if (remove !== null) value = value.replace(remove, '')
  return value
}

export { useVarCss }
