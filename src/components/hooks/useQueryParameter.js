import React from 'react'

function useQueryParameter() {
  const params = new URLSearchParams(window.location.search)
  const [queryParameters, setQueryParemeters] = React.useState({
    page: params.get('page'),
    access_token: params.get('access_token'),
    refresh_token: params.get('refresh_token')
  })

  return queryParameters
}

export { useQueryParameter }
