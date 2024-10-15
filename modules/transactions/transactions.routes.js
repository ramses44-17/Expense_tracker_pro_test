const express = require('express')
const auth = require('../../middlewares/auth')
const addIncome = require('./controllers/addincome')
const addExpense = require('./controllers/addexpense')
const getTransactions = require('./controllers/gettransactions')
const deleteTransaction = require('./controllers/deletetransaction')
const editTransaction = require('./controllers/edittransaction')
const transactionRoutes = express.Router()





transactionRoutes.use(auth)

transactionRoutes.post("/addincome",addIncome)

transactionRoutes.post("/addexpense",addExpense)

transactionRoutes.get("/",getTransactions)


transactionRoutes.delete("/:transaction_id",deleteTransaction)
transactionRoutes.patch('/',editTransaction)


module.exports = transactionRoutes