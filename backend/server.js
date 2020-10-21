const mongoose = require('mongoose')
const dotenv = require('dotenv')
var cors = require('cors')

dotenv.config({ path: './.env' })
const app = require('./app')

const DB = process.env.DB
const port = process.env.PORT || 5000

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.use(cors())
    app.listen(port, () => {
      console.log('DB connection successful! at => ' + DB)
      console.log(`App running on port ${port}...`)
    })
  })
