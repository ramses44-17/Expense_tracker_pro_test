const mongoose = require('mongoose')
const validator  = require('validator')

const deleteTransaction = async(req,res)=>{

  const transactionsModel = mongoose.model('transactions')
  const usersModel = mongoose.model('users')
  const {transaction_id} = req.params
  if(!validator.isMongoId(transaction_id)) throw "provide a valid ID"

  const getTransaction = await transactionsModel.findOne({
    _id:transaction_id
  })

  if(!getTransaction) throw "transaction dont found"
  console.log(getTransaction);
  

  if(getTransaction.transaction_type === "income"){
    await usersModel.updateOne({
      _id:getTransaction.user_id
    },{
      $inc:{
        balance:getTransaction.amount*-1
      }
    })
  }else{
    await usersModel.updateOne({
      _id:getTransaction.user_id
    },{
      $inc:{
        balance:getTransaction.amount
      }
    })
  }
  await transactionsModel.deleteOne({
    _id:transaction_id
  })

  res.status(200).json({
    status:"deleted successfuly"
  })
}


module.exports = deleteTransaction