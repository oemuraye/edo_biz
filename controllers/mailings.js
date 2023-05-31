import nodemailer from "nodemailer";

export const feedback = (req, res) => {

  const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Subject: ${req.body.subject}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
      `;

  // Define email settings
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.gmail_password,
    },
  });

  let mailOptions = {
    to: process.env.ADMIN_EMAIL,
    from: req.body.email,
    subject: "Contact Request Feedback",
    html: output,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.render("passwordRecovery", { email_failed_msg: "Error: Email was not sent!" });
    }
    // console.log(req.body.email);
    res.status(200).render("success", { email_success_msg: "Email sent successfully" });
  });
};
