require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')



const path = require('path')
const serveStatic = require('serve-static')

const api = require('./routes')//api directory
const app = express()

app.use(bodyParser.json())
app.use(express.json())
app.use(cors())//to handle the CORS origin policy

//joining the frontend path
app.use('/', serveStatic(path.join(__dirname,'../client/build')))

//serving the react frontend 
app.get('/./*',function (req, res){
  res.sendFile(path.join(__dirname,'../client/build/index.html'))
  })
  
//using the apis
app.use(api)


//mongodb connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.mongoConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  if (err) console.log(err)
  else console.log("mongdb is connected");
})
//server start
app.listen(process.env.port,()=>{
    console.log(`server connected! @${process.env.port}`)
})