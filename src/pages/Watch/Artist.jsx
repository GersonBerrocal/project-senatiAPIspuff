import React from 'react'
import { appContext } from '../../components/context/'

function Artist({ id }) {
  const { spotify } = React.useContext(appContext)
  const [artist, setArtist] = React.useState({})
  const [tracks, setTracks] = React.useState([])
  React.useEffect(() => {
    ;(async () => {
      const tracksReq = await spotify.getTopTracksOfArtist(id)
      setTracks(tracksReq.tracks)
      const artistReq = await spotify.getInfoOfArtist(id)
      setArtist(artistReq)
    })()
  }, [])
  let tracksHtml = tracks.map(track => (
    <li key={track.id}>
      <span className="artist-track-name">{track.name}</span>
      <span className="artist-track-duration">
        {(track.duration_ms / 60000).toFixed(2)}min
      </span>
    </li>
  ))
  let body =
    Object.keys(artist).length === 0 ? null : (
      <div className="artist">
        <div className="artist-header">
          <img className="artist-header-image" src={artist.images[0].url} />
          <h4 className="artist-header-name">{artist.name}</h4>
        </div>
        <div className="artist-info">
          <p>{artist.followers?.total} followers</p>
          <p>Genres : {artist.genres.join(', ')}</p>
        </div>
        <ul className="artist-track">{tracksHtml}</ul>
      </div>
    )
  return body
}

export { Artist }
