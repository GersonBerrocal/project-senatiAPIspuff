import React from 'react'
import { Navbar } from '../../components/Navbar'
import { appContext } from '../../components/context'
import { Slider } from '../../components/assets/Slider'
import { Album } from '../../components/assets/Album'
import { Playlist } from '../../components/assets/Playlist'

function Home() {
  const { spotify } = React.useContext(appContext)
  const [albums, setAlbums] = React.useState([])
  const [myPlaylists, setMyPlaylists] = React.useState([])
  const elementsNewReleases = albums.map(album => (
    <Album key={album.id} album={album} />
  ))
  const elementMyPlaylits = myPlaylists.map(playlist => (
    <Playlist key={playlist.id} playlist={playlist} />
  ))
  React.useEffect(() => {
    ;(async () => {
      const albums = await spotify.getAlbumsNewReleases()
      setAlbums(albums.albums.items)
    })()
    ;(async () => {
      const playlists = await spotify.getMePlaylist()
      setMyPlaylists(playlists.items)
    })()
  }, [])
  return (
    <React.Fragment>
      <Navbar />
      <div className="section">
        <h3 className="section-title">New releases</h3>
        <Slider elements={elementsNewReleases} />
      </div>
      <div className="section">
        <h3 className="section-title">My playlists</h3>
        <Slider elements={elementMyPlaylits} />
      </div>
    </React.Fragment>
  )
}

export { Home }
