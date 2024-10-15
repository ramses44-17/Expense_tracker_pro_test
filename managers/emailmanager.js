const nodemailer = require('nodemailer')

const emailManager = async(to,text,html,subject)=>{
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7d62ce98da960c", 
      pass:"e6e13ba00a2821"
  
    }
  
  });
  
  
  await transport.sendMail({
    to:to,
    from:"info@expensetracker.com",
    text:text,
    html:html,
    subject:subject
  })
}



module.exports = emailManager