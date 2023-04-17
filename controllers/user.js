import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    address,
    dob,
    password,
    confirm_password,
  } = req.body;
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const errors = [];

  // const existingUser = await User.findOne({ email });


  // Check required fields
  if (
    !first_name ||
    !last_name ||
    !email ||
    !address ||
    !dob ||
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

  
  
  if (errors.length > 0) {
    req.flash("error", errors);
    req.flash("formData", { first_name, last_name, email, address, dob });
    res.redirect("/register");
  } else {
    // Save data to database or send email
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const result = await User.create({
    //   email,
    //   password: hashedPassword,
    //   name: `${firstName} ${lastName}`,
    // });

    // const token = jwt.sign(
    //   { email: result.email, id: result._id },
    //   "memories",
    //   { expiresIn: "1h" }
    // );

    // return res.status(200).render('success', {result, token});

    res.redirect("success");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // const existingUser = await User.findOne({ email });
    const errors = [];

    if (!existingUser) {
      return errors.push("User does not exist");
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return errors.push("Password is not correct");
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "edobiz",
      { expiresIn: "1h" }
    );

    if (errors.length > 0) {
      req.flash("error", errors);
      req.flash("formData", { email });
      res.redirect("/login");
    } else {
      res.cookie('jwt', token);
      res.status(200).render("dashboard", { result: existingUser });
    }
  } catch (error) {
    res.status(500).render({ message: "Something went wrong." });
  }
};
