
export const register = (req, res) => {
  const {
    first_name,
    last_name,
    email,
    address,
    dob,
    password,
    confirm_password,
  } = req.body;
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const errors = [];

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
    res.redirect("success");
  }
}