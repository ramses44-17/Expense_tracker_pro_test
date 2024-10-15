const mongoose = require('mongoose')
const jwtManager = require('../../../managers/jwtmanager')
const emailManager = require('../../../managers/emailmanager')



const register = async (req,res)=>{
  const usersModel = mongoose.model('users')
  const bcrypt = require('bcrypt')

  const {email,password,confirm_password,name,balance} = req.body

  if(!name) throw "name must be provided"
  if(!name.trim()) throw "name must be provided"
  if(!email) throw "email must be provided"
  if(!email.trim()) throw "email must be provided"
  if(!password) throw "password must be provided"
  if(password.length < 5) "password must be at least 5 character long"
  if(password !== confirm_password) throw "password dont match confirm password"

  const getDuplicateEmail = await usersModel.findOne({
    email
  })
  if(getDuplicateEmail) throw "this email already exist"
  
const hashedPassword = await bcrypt.hash(password.toString(),12)
const createdUser = await usersModel.create({
  name:name,
  email:email,
  password:hashedPassword,
  balance:balance
})

const accessToken = jwtManager(createdUser)




await emailManager(createdUser.email,"Welcome to the expense tracker pro, for manage your money well","<h1>welcome to the expense tracker pro</h1><br/> we hope you can manage you cash easily","welcome to the expense tracker")


  res.status(201).json({
    status:"user register successfuly",
    accessToken
  })
}


module.exports = register