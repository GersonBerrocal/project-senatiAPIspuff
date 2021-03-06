const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const { PORT } = require('dotenv').config().parsed
const { spotifyRouter } = require('./routes/spotify')

app.use(express.json())
app.use(cookieParser())

app.use(express.static('build'))
spotifyRouter(app)

app.listen(PORT, () => {
  console.log('server running http://127.0.0.1:%s', PORT)
})
