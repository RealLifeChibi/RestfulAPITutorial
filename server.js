//Require Dotenv
require('dotenv').config()

// Import Express, Mongoose
const express = require('express')
const mongoose = require('mongoose')

// Create an express app
const app = express()

//Setup Express to accept Json
app.use(express.json())

//Connect to DB
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true})
 
//Message Handling
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to DB'))

//Setup Routes
const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

//Have the app listen to port 3000 and console that the Sever has started
app.listen(3000, () => console.log('Server Started'))