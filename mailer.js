'use strict';
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'consummatelydone@gmail.com',
        pass: 'szbd ddrj lheb axdc'
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: 'consummatelydone@gmail.com', // sender address
    to: 'deepak.uniyal@veneratech.com', // list of receivers
    subject: 'Hello ', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});
