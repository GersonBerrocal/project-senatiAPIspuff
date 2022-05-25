const axios = require('axios')
const express = require('express')
const {
  SPOTIFY_CLIENT_ID: ID,
  SPOTIFY_CLIENT_SECRET: SECRET,
  HOSTNAME,
  PORT
} = require('dotenv').config().parsed
const generateRandomString = length => {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
const PATH = '/api/spotify'
const redirect_uri = `${HOSTNAME}:${PORT}${PATH}/callback`
const stateKey = 'spotify_auth_state'

const spotifyRouter = app => {
  const router = express.Router()
  app.use(PATH, router)

  router.get('/login', (req, res) => {
    const state = generateRandomString(16)
    res.cookie(stateKey, state)
    const scope = 'user-read-private user-read-email'
    res.redirect(
      'https://accounts.spotify.com/authorize?' +
        new URLSearchParams({
          response_type: 'code',
          client_id: ID,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state
        }).toString()
    )
  })

  router.get('/callback', async (req, res) => {
    const code = req.query.code || null
    const state = req.query.state || null
    const storedState = req.cookies ? req.cookies[stateKey] : null
    if (state === null || state !== storedState) {
      res.redirect(
        '/error/spotify/' +
          new URLSearchParams({
            error: 'state_mismatch'
          }).toString()
      )
    } else {
      res.clearCookie(stateKey)

      // get access token
      const options_axios_access = {
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        data: new URLSearchParams({
          code,
          redirect_uri,
          grant_type: 'authorization_code'
        }).toString(),
        headers: {
          Authorization:
            'Basic ' + Buffer.from(`${ID}:${SECRET}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json'
        }
      }
      try {
        const response = await axios(options_axios_access)
        const { access_token, refresh_token } = response.data
        res.redirect(
          '/?' +
            new URLSearchParams({
              access_token,
              refresh_token
            })
        )
      } catch (err) {
        res
          .redirect(
            '/error/spotify/' +
              new URLSearchParams({
                error: 'error_get_token'
              }).toString()
          )
          .toString()
      }
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
    }
  })
}

module.exports = { spotifyRouter }
