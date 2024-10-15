const mongoose = require('mongoose')
const validator = require('validator')

const addExpense = async (req,res)=>{
  const transactionModel = mongoose.model('transactions')
  const usersModel  = mongoose.model("users")


  const {amount,remarks} = req.body


  if(!amount) throw "amount is required"
  if(!remarks) throw "remarks is required"
  if(remarks.length < 5) throw "income must be at least 5 character long"
  if(!validator.isNumeric(amount.toString())) throw "amount must be a number"

  await transactionModel.create({
    user_id: req.user._id,
    amount,
    remarks,
    transaction_type:"expense"
  })

  if(amount<0) throw "amount must not be negative"
  
  await usersModel.updateOne({
    _id:req.user._id,

  },
  {
    $inc:{
      balance:amount * -1
    }
  },
  {
    runValidators: true
  }
)

  res.status(200).json({
    status:"success",
    message:"incomme added successfuly"
  })
}


module.exports = addExpense