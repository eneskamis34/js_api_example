const nodemailer = require("nodemailer");

const sendEmail = async (mailOptions) => {
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: "@gmail.com",
            pass: "x"
          }
        });

        let info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
    };

    module.exports = sendEmail;

