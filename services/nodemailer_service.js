require("dotenv").config();
const nodemailer = require("nodemailer");
const { SERVICE_PASSWORD, ADMIN_EMAIL } = process.env;
//   host: "smtp.ethereal.email",
//   port: 465,
//   service: "gmail",
//   secure: true, //
const transporter = nodemailer.createTransport({
  service: "gmail",
  authMethod: "plain",
  tls: true,
  port: 587,
  auth: {
    user: ADMIN_EMAIL,
    pass: SERVICE_PASSWORD,
  },
});

async function email_send(email, username, otp_code) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"M.HASSAN " ${ADMIN_EMAIL}`, // sender address
    to: email, // list of receivers
    subject: `OTP Verification`, // Subject line
    // text: "Hello world?", // plain text body
    html: `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Confirmation</title>
        <style>
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                animation: fadeIn 2s ease-out;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                animation: fadeIn 3s ease-out;
            }
            .header {
                background-color: #a80101;
                padding: 15px;
                text-align: center;
                color: white;
                border-radius: 5px 5px 0 0;
            }
            .header h1 {
                margin: 0;
            }
            .content {
                padding: 20px;
                background-color: #fff;
                border: 1px solid #ddd;
                border-top: none;
                border-radius: 0 0 5px 5px;
            }
            .footer {
                padding: 10px;
                text-align: center;
                color: #a80101;
                font-size: 0.8em;
                background-color: #ffb9b7;
                border-radius: 0 0 5px 5px;
            }
            a {
                color: #007bff;
            }
            a:hover {
                text-decoration: none;
            }
        </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>OTP Verification Required</h1>
                </div>
                <div class="content">
                    <h3>Hi ${username},</h3>
                    <p>Thank you for choosing BLOODY.</p>
                    <p>We've received a request to access your account from a new device. Please confirm your identity by entering the One-Time Password (OTP) below:</p>
                    <p><strong>OTP Code:</strong> ${otp_code}</p>
                    <p>This OTP is valid for 2 minutes and is meant for your use only. Please do not share this code with anyone.</p>
                    <p>If you did not request this OTP, please re signUp with correct credientials!</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 BLOODY. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

module.exports = { email_send };
