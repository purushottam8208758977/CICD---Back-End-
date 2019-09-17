const mailer = require('nodemailer')
require('dotenv').config()

module.exports = {
    
    nodeMailer(requestEmail,urlReceived,callback) {

        console.log("user  ---->",process.env.USEREMAIL)

        console.log("url received"+urlReceived);
        
    let transporter = mailer.createTransport({
        
        service: process.env.USERSERVICE,
        auth: {
            user: process.env.USEREMAIL,
            pass: process.env.USERPASSWORD
        }
    })

    let mailoptions = {
        from:  process.env.USEREMAIL,
        to: requestEmail,
        subject: "Forget password : All Chat",
        text:urlReceived
    }

    transporter.sendMail(mailoptions, (err, data) => {
        if (err) {
            return callback(err)
        }
        else {
            return callback(null,data)
        }

    })

}
}


