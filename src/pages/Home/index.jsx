import React from 'react'
import { Navbar } from '../../components/Navbar'
import { appContext } from '../../components/context'

// const options_me = {
//   method: 'GET',
//   url: 'https://api.spotify.com/v1/playlists/2H228TcIq3WZ2osPLUL8Es',
//   headers: {
//     Authorization: 'Bearer ' + access_token,
//     Accept: 'application/json'
//   }
// }
// const res2 = await axios(options_me)
// console.log(res2)

function Home() {
  return (
    <React.Fragment>
      <Navbar />
    </React.Fragment>
  )
}

export { Home }
