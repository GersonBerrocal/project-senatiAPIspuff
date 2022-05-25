const redirectQueryUrl = parameters => {
  const querys = new URLSearchParams(parameters).toString()
  window.location.href = `/?${querys}`
}

export { redirectQueryUrl }
