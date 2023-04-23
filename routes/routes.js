import express from "express";
import { aboutPage, blogPage, blogSinglePage, contactPage, detailPage, errorPage, faqPage, formPage, homePage, innerPage, loginPage, portfolioDetailsPage, programPage, programmePage, registerPage, student_dashboard, successPage, teamPage, } from "../controllers/pages.js";
import { feedback } from "../controllers/mailings.js";
import { logout, register, signin } from "../controllers/user.js";
import { get_payment_receipt, paystack_init_payment, paystack_verify_payment } from "../controllers/payment.js";
import { checkToken } from "../middleware/auth.js";

const router = express.Router();

// Web Pages
router.get("/", homePage);
router.get("/about", aboutPage);
router.get("/blog-single", blogSinglePage);
router.get("/blog", blogPage);
router.get("/contact", contactPage);
router.get("/detail", detailPage);
router.get("/faq", faqPage);
router.get("/form", formPage);
router.get("/inner-page", innerPage);
router.get("/portfolio-details", portfolioDetailsPage);
router.get("/program", programPage);
router.get("/programme", programmePage);
router.get("/success", successPage);
router.get("/error", errorPage);
router.get("/team", teamPage);
router.get("/register", registerPage);
router.get("/dashboard", checkToken, student_dashboard);
router.get("/login", loginPage);

// Feedback-contact mailing
router.post("/feedback", feedback);

// Registration of student
router.post("/signin", signin);
router.post("/signup", register);
router.get("/logout", logout);

//Make Payments
router.post("/paystack_pay", paystack_init_payment)
router.get("/paystack/callback/:id", paystack_verify_payment);
router.get("/receipt/:id", get_payment_receipt);

export default router;
