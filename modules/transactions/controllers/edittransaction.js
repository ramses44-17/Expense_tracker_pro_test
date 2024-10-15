const mongoose = require('mongoose')
const validator = require('validator')
const editTransaction = async(req,res)=>{
  const transactionsModel = mongoose.model('transactions')
  const {transaction_id,remarks,amount,transaction_type} = req.body
  const usersModel = mongoose.model('users')

  if(!transaction_id) throw "transaction id is required"
  if(!validator.isMongoId(transaction_id)) throw "provide a valid ID"
  if(transaction_type !== "expense" && transaction_type !== "income") throw "transaction type must be expense or income"
  if(remarks.length < 5) throw "income must be at least 5 character long"
  if(!validator.isNumeric(amount.toString())) throw "amount must be a number"
  if(amount<0) throw "amount must not be negative"



  const getTransaction = await transactionsModel.findOne({
    _id:transaction_id
  })

  if(!getTransaction) throw "transaction not found"


  if(getTransaction.transaction_type !== transaction_type && getTransaction.amount !== amount){
    if(transaction_type==="income"){
     await usersModel.updateOne({
        _id:getTransaction.user_id
      },{
        $inc:{balance:amount}
      },{
        runValidators:true
      })
    }else{
      await usersModel.updateOne({
        _id:getTransaction.user_id
      },{
        $inc:{balance:amount*-1}
      },{
        runValidators:true
      })
    }
  }else{
    if (getTransaction.transaction_type!== transaction_type) {
      if(transaction_type==="income"){
        await usersModel.updateOne({
           _id:getTransaction.user_id
         },{
           $inc:{balance:amount}
         },{
           runValidators:true
         })
       }else{
         await usersModel.updateOne({
           _id:getTransaction.user_id
         },{
           $inc:{balance:amount*-1}
         },{
           runValidators:true
         })
       }
    }else if(getTransaction.amount !== amount){
      await usersModel.updateOne({
        _id:getTransaction.user_id,
      },{
        $inc:{
          balance:getTransaction.amount - amount
        }
      },{
        runValidators:true
      })
    }
  }

  
  

  await transactionsModel.updateOne({
    _id:transaction_id
  },{
    remarks:remarks,
    transaction_type:transaction_type,
    amount:amount
  },{
    runValidators:true
  })

  res.status(200).json({
    status:"transaction edited successfuly"
  })
}

module.exports = editTransaction