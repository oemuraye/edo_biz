import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, text) => {
  try {
    // const output = `
    //   <p>You have a new contact request</p>
    //   <h3>Contact Details</h3>
    //   <ul>
    //   <li>Name: ${req.body.name}</li>
    //   <li>Email: ${req.body.email}</li>
    //   <li>Subject: ${req.body.subject}</li>
    //   </ul>
    //   <h3>Message</h3>
    //   <p>${req.body.message}</p>
    //   `;


    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.gmail_password,
      },
    });

    let mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: subject,
      text: text,
    //   html: output,
    };

    await transporter.sendMail({
      from: "oemuraye360@outlook.com",
    //   from: process.env.ADMIN_EMAIL,
      to: email,
      subject: subject,
      text: text,
    });

    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.render("passwordRecovery", { email_failed_msg: "Error: Email was not sent!" });
    }
    // res.status(200).render("contact", { email_success_msg: "Email sent successfully" });
    console.log("email sent successfully");
  });
  
} catch (error) {
    res.render("passwordRecovery", { email_failed_msg: "Error: Email was not sent!" });
    console.log(error, "email not sent");
  }
};
