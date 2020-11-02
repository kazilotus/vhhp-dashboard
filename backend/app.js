const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const adminRouter = require('./routes/adminRoutes')

const app = express()

app.use(cors())

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json())

app.use((req, res, next) => {
  console.log(req.url)
  next()
})

// Routes
app.use('/api/v1/', adminRouter)

module.exports = app
