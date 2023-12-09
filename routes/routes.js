import express from "express";
import multer from "multer";

import { aboutPage, blogPage, blogSinglePage, bootcampForm, contactPage, detailPage, errorPage, faqPage, homePage, innerPage, loginPage, portfolioDetailsPage, programPage, programmePage, registerPage, student_dashboard, successPage, teamPage, } from "../controllers/pages.js";
import { feedback } from "../controllers/mailings.js";
import { bootcamp_reg, logout, register, resetPassword, sendResetPassword, signin, upload } from "../controllers/user.js";
import { get_payment_receipt, paystack_init_payment, paystack_verify_payment } from "../controllers/payment.js";
import { checkToken } from "../middleware/auth.js";


// const upload = multer({ dest: "./public/" });
const router = express.Router();


// Web Pages
router.get("/", homePage);
router.get("/about", aboutPage);
router.get("/blog-single", blogSinglePage);
router.get("/blog", blogPage);
router.get("/contact", contactPage);
router.get("/detail", detailPage);
router.get("/faq", faqPage);
router.get("/inner-page", innerPage);
router.get("/portfolio-details", portfolioDetailsPage);
router.get("/program", programPage);
router.get("/program_offers", programOfferedPage);
router.get("/programme", programmePage);
router.get("/success", successPage);
router.get("/error", errorPage);
router.get("/team", teamPage);
router.get("/gallery", galleryPage);
router.get("/dashboard", checkToken, student_dashboard);
router.get("/login", loginPage);
router.get("/register", registerPage);
router.get("/form", bootcampForm);
router.get("/forgot_password", passwordRecovery);
router.get("/reset_password", passwordReset);
// router.get("/reset_password/:userId/:token", passwordReset);

// Feedback-contact mailing
router.post("/feedback", feedback);

// Registration of student
router.post("/signin", signin);
router.post("/signup", upload, register);
router.get("/logout", logout);

// Registration of bootcamp Student
router.post("/boot_reg", bootcamp_reg);

//Make Payments
router.post("/paystack_pay", paystack_init_payment)
router.get("/paystack/callback/:id", paystack_verify_payment);
router.get("/receipt/:id", get_payment_receipt);

// password reset
router.post("/password_reset", sendResetPassword);
router.post("/reset-password/:userId/:token", resetPassword);

export default router;
