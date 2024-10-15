require('express-async-errors')
const mongoose = require('mongoose')
require('dotenv').config()

const express = require('express')
const cors = require("cors")
const errorsHandler = require('./handlers/errorshandler')
const userRoutes = require('./modules/users/users.routes')
const transactionRoutes = require('./modules/transactions/transactions.routes')


mongoose.connect(process.env.MONGO_URI,{})
.then(()=>{
  console.log("mongodb connected successfuly");
})
.catch(()=>{
  console.log("connection failed");
})

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/users",userRoutes)
app.use("/api/transactions",transactionRoutes)
app.all('*',(req,res,next)=>{
  res.status(404).json({
    status:"failed",
    message:"not found"
  })
})
app.use(errorsHandler)
require('./models/users.model')
require("./models/transactions.model")
app.listen(8000,()=>{
  console.log("server is started succesfuly");
})

