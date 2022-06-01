import React from 'react'

function Playlist({ playlist }) {
  const id = playlist.id
  return (
    <div className="playlist">
      <img className="playlist-img" src={playlist.images[0]?.url} />
      <p className="playlist-name">{playlist.name}</p>
      <div className="playlist-owner">by {playlist.owner.display_name}</div>
    </div>
  )
}

export { Playlist }
