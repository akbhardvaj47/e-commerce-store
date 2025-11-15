import nodemailer from "nodemailer";

const sendEmail = async (email, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"MERN Store" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: subject,
    html: message,
  });

  console.log("Email Sent Successfully");
};

export default sendEmail;
