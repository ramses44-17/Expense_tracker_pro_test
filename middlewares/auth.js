const jwt = require('jsonwebtoken')


const auth = (req,res,next)=>{

  try {
    const accessToken = req.headers.authorization.replace("Bearer ","")
    const payload = jwt.verify(accessToken,process.env.JWT_SALT)


    req.user = payload
  } catch (e) {
    res.status(401).json({
      status: "failed",
      message:"unhautorized"
    })
    return
  }
  next()
  
}


module.exports = auth