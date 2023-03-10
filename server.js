//View site at: https://mybrary-app-lytr.onrender.com/

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

  const path = require('path') 
  
  const express = require('express')
  const app = express()
  const expressLayouts = require('express-ejs-layouts')
  const bodyParser = require('body-parser')

  const indexRouter = require('./routes/index')
  const authorRouter = require('./routes/authors')
  
  app.set('view engine', 'ejs')
  app.set('views', path.join(__dirname, 'views'))
  app.set('layout', 'layouts/Layout')
  app.use(expressLayouts)
  app.use(express.static('public'))
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))

  const mongoose = require('mongoose')
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  const db = mongoose.connection
  db.on('error', error => console.error(error))
  db.once('open', () => console.log('Connected to Mongoose'))
  
  app.use('/', indexRouter)
  app.use('/authors', authorRouter) //every route inside autoRouter is prepended with 'authors'
  
  app.listen(process.env.PORT || 3000)