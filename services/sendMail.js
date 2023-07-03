/*
 *
 *
 ------->Title: send mail
 ->Description: this file is to send mail to the user
 ------>Author: Shawon Talukder
 -------->Date: 06/28/2023
 *
 *
 */
// dependencies
const nodemailer = require("nodemailer");
require("dotenv").config();

// model structure
const sendMailer = (email, subject, messageHTML) => {
    /*
     * @params: 
     *      email:string   -> email address of the receiver
     *      subject:string -> subject of the email
     *      messageHTML:string -> message in the message body
     * 
     * @returns: the function returns true if sent successfully else false
     * 
    */
    // declaring constants
    const USER_SENDER = process.env.NODEMAILER_USER;
    const USER_PASSWORD = process.env.NODEMAILER_PASS;


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: USER_SENDER,
            pass: USER_PASSWORD
        }
    });
    const messageBody = {
        // sender address
        from: USER_SENDER,
        // list of receivers
        to: email,
        subject, // Subject line
        html: messageHTML, // plain text body
    }

    transporter.sendMail(messageBody, (err, info) => {
        if (err || !info.accepted.length > 0) {
            return false;
        }
        return true;
    });
}


// export model
module.exports = {
    sendMailer
}