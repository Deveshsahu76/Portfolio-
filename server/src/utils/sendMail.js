import nodemailer from 'nodemailer';

const canSendMail = () => {
  return (
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.OWNER_EMAIL
  );
};

const sendMail = async ({ subject, html }) => {
  if (!canSendMail()) {
    console.log('Email skipped: SMTP environment variables are missing.');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Portfolio Alerts" <${process.env.SMTP_USER}>`,
    to: process.env.OWNER_EMAIL,
    subject,
    html,
  });
};

export default sendMail;