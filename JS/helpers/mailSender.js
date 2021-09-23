const nodemailer = require('nodemailer')

function sendEmail(fullName, target) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mantr4code@gmail.com',
            pass: 'hwnckjzugrzovudc'
        }
    })

    let message = {
        from: 'E-Sembako',
        to: target,
        subject: 'Welcome to E-Sembako Platform',
        text: `Hai ${fullName}, Selamat bergabung menjadi seller kami di E-Sembako Ecommerce`
    }

    transporter.sendMail(message, (err, info) => {
        if (err) console.log(err)
        console.log(info)
    })
}

module.exports = sendEmail