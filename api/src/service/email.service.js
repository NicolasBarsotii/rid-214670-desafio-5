import nodemailer from 'nodemailer'
import 'dotenv/config.js'

const transporte = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

function sendEmail (email, booktitle, duaDate){
    const mailOptions ={
        from: '',
        to: email,
        subject: 'Remainde: Book Due Date Approaching',
        html: `
        <div style='font-famaly: Arial, sans-serif; padding: 20px; color: #333;'>
        <h2 style='color: #f60;'>Community Library Reminder</h2>
        <p>Dear User,</p>
        <p>This is a reminder taht the book <strong>'${booktitle}'</strong> is due on <strong>${duaDate}</strong>.</p>
        <p>Please make sure to return or renew it on time.</p>
        <p>Best regards,<br>Your Community Library</p>
        </div>
        `
        
    }
    
    transporte.sendMail(mailOptions, (err, info) =>{
    if (err){
        console.error('Error sending email:', err)
    }else{
        console.log('Email sent: ', info.response)
    }
})
}



export default sendEmail