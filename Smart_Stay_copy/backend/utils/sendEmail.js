import nodemailer from "nodemailer";

const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"SmartStay" <${process.env.SMTP_MAIL}>`,
    to: email,
    subject,
    text: message,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;