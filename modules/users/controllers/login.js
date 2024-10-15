const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtManager = require("../../../managers/jwtmanager")
const login = async(req,res)=>{
  const usersModel = mongoose.model('users')

  const {email,password} = req.body

  const getUser = await usersModel.findOne({
    email
  })

  if(!getUser) throw "this email dont exist in the system"
  
  const isPasswordMatched = await bcrypt.compare(password.toString(),getUser.password)

  if(!isPasswordMatched) throw "incorrect password"
  
 const accessToken = jwtManager(getUser)

  res.status(200).json({
    status:"success",
    message:"user logged successfuly",
    accessToken
  })
}

module.exports = login