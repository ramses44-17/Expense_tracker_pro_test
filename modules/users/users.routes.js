const express = require('express')
const register = require('./controllers/register')
const login = require('./controllers/login')
const userDashboard = require('./controllers/userdashboard')
const auth = require('../../middlewares/auth')
const forgotPassword = require('./controllers/forgotpassword')
const resetPassword = require('./controllers/resetpassword')
const userRoutes = express.Router()



userRoutes.post("/register",register)
userRoutes.post("/login",login)
userRoutes.post('/forgotpw',forgotPassword)
userRoutes.post('/resetpw',resetPassword)



userRoutes.use(auth)

userRoutes.get("/dashboard",userDashboard)



module.exports = userRoutes