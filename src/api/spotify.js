class Spotify {
  constructor(token, refreshToken) {
    this.token = token
    this._refreshToken = refreshToken
    this.urlLogin = '/api/spotify/login'
    this.base = 'https://api.spotify.com/v1'
    this.headers = {
      Authorization: `Bearer ${this.token}`,
      Accept: 'application/json'
    }
    this.user = null
  }
  async status() {
    try {
      const res = await fetch(`${this.base}/me`, {
        method: 'GET',
        headers: this.headers
      })
      const resJson = await res.json()
      if (resJson.error !== undefined) return resJson.error
      if (res.status === 200) this.user = resJson
      return res
    } catch (err) {
      return err.error
    }
  }
  async refreshToken() {
    try {
      const res = await fetch(
        `/api/spotify/refresh?refresh_token=${this._refreshToken}`
      )
      const resToken = await res.json()
      return resToken
    } catch (err) {
      return err
    }
  }
  async getMe() {
    const res = await fetch(`${this.base}/me`, {
      method: 'GET',
      headers: this.headers
    })
    return res.json()
  }
  async getAlbumsNewReleases() {
    const res = await fetch(`${this.base}/browse/new-releases`, {
      method: 'GET',
      headers: this.headers
    })
    return res.json()
  }
  async getMePlaylist() {
    const res = await fetch(`${this.base}/me/playlists`, {
      method: 'GET',
      headers: this.headers
    })
    return res.json()
  }

  async getTopTracksOfArtist(id) {
    const res = await fetch(`${this.base}/artists/${id}/top-tracks?market=ES`, {
      method: 'GET',
      headers: this.headers
    })
    return res.json()
  }

  async getInfoOfArtist(id) {
    const res = await fetch(`${this.base}/artists/${id}`, {
      method: 'GET',
      headers: this.headers
    })
    return res.json()
  }
}

export { Spotify }
