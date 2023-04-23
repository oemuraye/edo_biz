import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from '../models/user.js';

export const register = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    confirm_password,
  } = req.body;
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const errors = [];

  const existingUser = await User.findOne({ email });


  // Check required fields
  if (
    !first_name ||
    !last_name ||
    !email ||
    !password ||
    !confirm_password
  ) {
    errors.push("Please fill in all fields");
  }

  // Check email
  if (!email.match(validRegex)) {
    errors.push("Use a valid Email address");
  }
  // Check password match
  if (password !== confirm_password) {
    errors.push("Password does not match");
  }
  // Check password length
  if (password.length < 6) {
    errors.push("Password should be at least 6 character");
  }
  // Check if email already exists
  if (existingUser) {
    errors.push("A User with this email already exists");
  }

  
  
  if (errors.length > 0) {
    req.flash("error", errors);
    req.flash("formData", { first_name, last_name, email });
    res.redirect("/register");
  } else {

    // Save data to database or send email
    const hashedPassword = await bcrypt.hash(password, 10);
    const student_data = await User.create({
      name: `${first_name} ${last_name}`,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ student_data }, process.env.JWT_SECRET, { expiresIn: "1hr" });
    console.log(token);
    req.flash("success_msg", "You are now registered and can log in");
    req.flash("formData", { email });
    res.redirect("/login");

    // res.redirect("success");
  }
};

export const signin = async (req, res) => {
    const { email, password } = req.body;
  
    const existingUser = await User.findOne({ email });
    const errors = [];

    // Check required fields
    if (!email || !password ) {
      errors.push("Please fill in all fields");
    }
    if (!existingUser) {
      errors.push("User does not exist");
    }

    if (errors.length > 0) {
      req.flash("error", errors);
      req.flash("formData", { email });
      res.redirect("/login");
    } else {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );
  
      if (!isPasswordCorrect) {
        errors.push("Password is not correct");
      }
  
      const token = jwt.sign({ existingUser }, "edobiz", { expiresIn: "1hr" });
      const student_data = existingUser

      req.session.user = student_data;
      req.session.token = token;
      res.status(200).redirect("/dashboard");
    }
  // } catch (error) {
  //   res.status(500).render({ message: "Something went wrong." });
  // }
};

export const logout = (req, res) => {
  if (req.session) {
    req.session?.destroy();
  }
  res.redirect("/");
}