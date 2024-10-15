const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const emailManager = require('../../../managers/emailmanager')


const resetPassword = async (req,res)=>{
  const usersModel = mongoose.model('users')
  const {email,reset_code,new_password} = req.body

  if(!email) throw "email is required"
  if(!reset_code) throw "reset code is required"
  if(!new_password) throw "new password is required"
  if(new_password.length < 5) throw 'password muste have at least 5 characters'

  const getUserWithResetCode = await usersModel.findOne({
    email,
    reset_code
  })

  if(!getUserWithResetCode) throw "reset code dont match"


  const hashedPassword = await bcrypt.hash(new_password.toString(),12)



  
  await usersModel.updateOne({
    email
  },{
    password:hashedPassword,
    reset_code:""
  },{
    runValidators:true
  })


  await emailManager(email,'your password is reseted successfuly, if is not you contact us please','your password is reseted successfuly, if is not you contact us please',"password reset successfuly")

res.status(200).json({
  status:"password reseted successfuly"
})

}


module.exports = resetPassword