const express = require('express')

const cors = require('cors')
const bodyParser = require ('body-parser')

let app = express()

app.use(bodyParser.urlencoded({extended : true}))
.use(bodyParser.json());

require('./Config/database')

app.use(cors())

const moviesController = require ('./Controlles/moviesController')
const usersController = require ('./Controlles/usersController')
const membersController = require ('./Controlles/membersController')
const subscriptionsController = require ('./Controlles/subscriptionsController')

app.use('/api/movies',moviesController)
app.use('/api/users',usersController)
app.use('/api/members',membersController)
app.use('/api/subscriptions',subscriptionsController)

app.listen(8000)

