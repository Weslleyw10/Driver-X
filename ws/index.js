require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const database = require('./database')
const http = require('http')
const cors = require('cors')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.set('port', process.env.PORT || 8000)

app.use('/', require('./src/routes/api.routes'))

const server = http.createServer(app)

server.listen(app.get('port'), () => {
    console.log('Server is up.')
})

