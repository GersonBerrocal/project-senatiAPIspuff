import React from 'react'
import { Tooltip } from '../utils/Tooltip'
import { appContext } from '../context/'

function Album({ album }) {
  const { setWatchStatus } = React.useContext(appContext)
  const id = album.id
  const artistHtml = album.artists.map(artist => (
    <a
      key={artist.name}
      href="#"
      onClick={e => {
        e.preventDefault()
        setWatchStatus({ watch: artist.id, watch_type: 'artist' })
      }}
    >
      {artist.name}
    </a>
  ))
  return (
    <div className="album">
      <img
        className="album-img"
        src={album.images[1]?.url || album.images[0]}
      />
      <p className="album-type">{album.album_type}</p>
      <Tooltip tooltip={album.name} element="p">
        {album.name}
      </Tooltip>
      <div className="album-artists">{artistHtml}</div>
    </div>
  )
}

export { Album }
