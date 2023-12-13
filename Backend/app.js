
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const person = require('./controllers/person')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


var morgan =require('morgan')
morgan(':method :url :status :res[content-length] - :response-time ms')


app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.json())


const password = process.env.PASSWORD


const url = `mongodb+srv://root:${password}@cluster0.ampzclt.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery',false)
mongoose.connect(url).then(()=>{
    logger.info('connected with database')}).catch((error)=>{
    logger.error(error)
})


app.use('/api/phonebook',person)


app.use(middleware)


module.exports = app