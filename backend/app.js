const express = require('express')
const cors = require('cors')

const adminRouter = require('./routes/adminRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.url)
  next()
})

// Routes
app.use('/api/v1/admin', adminRouter)

module.exports = app
