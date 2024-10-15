const mongoose = require("mongoose")
const emailManager = require("../../../managers/emailmanager")


const forgotPassword = async (req,res)=>{
  const usersModel = mongoose.model('users')

  const {email} = req.body

  if(!email) throw "email must be provided"
  
  const getUser = await usersModel.findOne({
    email
  })

  if(!getUser) throw "this email dont exist in the system"


  const resetCode = Math.floor(10000+Math.random()*50000)

  await usersModel.updateOne({
    email
  },{
    reset_code:resetCode
  },{
    runValidators:true
  })

  await emailManager(email,`your password reset code is ${resetCode}`,`your password reset code is ${resetCode}`,"reset your password")
  


  res.status(200).json({
    status:"reset code is sent successfuly"
  })
}

module.exports = forgotPassword