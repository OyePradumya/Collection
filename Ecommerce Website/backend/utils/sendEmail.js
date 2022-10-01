// const nodeMailer = require('nodemailer');
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const nodemailer = require("nodemailer");
const { setInterval } = require("timers");
const sendEmail = async (options) => {
    // console.log(options.templateId);
    // const transporter = nodeMailer.createTransport({
    //     host: process.env.SMTP_HOST,
    //     port: process.env.SMTP_PORT,
    //     service: process.env.SMTP_SERVICE,
    //     auth: {
    //         user: process.env.SMTP_MAIL,
    //         pass: process.env.SMTP_PASSWORD,
    //     },
    // });

    // const mailOptions = {
    //     from: process.env.SMTP_MAIL,
    //     to: options.email,
    //     subject: options.subject,
    //     html: options.message,
    // };

    // await transporter.sendMail(mailOptions);

    // const msg = {
    //     to: options.email,
    //     from: process.env.SENDGRID_MAIL,
    //     templateId: options.templateId,
    //     dynamic_template_data: options.data,
    // }
    // sgMail.send(msg).then(() => {
    //     console.log('Email Sent')
    // }).catch((error) => {
    //     console.error(error)
    // });
    
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   secure: false, // true for 465, false for other ports
    //   auth: {
    //     user: "onlyjeet31@gmail.com", // generated ethereal user
    //     pass: "njrgoycvnsjaoxrx", // generated ethereal password
    //   },
    // });
  
    // // send mail with defined transport object
    // let info = await transporter.sendMail({
    //   from: "onlyjeet31@gmail.com", // sender address
    //   to: "devpatel8907@gmail.com", // list of receivers
    //   subject: "Hello", // Subject line
    //   text: "Hello", // plain text body
    //   // html: { path: "http://127.0.0.1:5501/test.html" }, // html body
    // });
    let transporter = nodemailer.createTransport({
        service: "gmail",
        // port: 587,
        // secure: false, // true for 465, false for other ports
        tls:{
            rejectUnauthorized:false
        },
        auth: {
          user: "onlyjeet31@gmail.com", // generated ethereal user
          pass: "njrgoycvnsjaoxrx", // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      // let info = await transporter.sendMail({
      //   from: "onlyjeet31@gmail.com", // sender address
      //   to: "devpatel8907@gmail.com", // list of receivers
      //   subject: "Hello", // Subject line
      //   text: "Hello",
      // }); //Link
};
sendEmail();
// async..await is not allowed in global scope, must use a wrapper

  // Generate test SMTP service account from ethereal.email
//   Only needed if you don't have a real mail account for testing
 
module.exports = sendEmail;