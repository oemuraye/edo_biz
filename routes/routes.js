import express from "express";
import { aboutPage, blogPage, blogSinglePage, contactPage, detailPage, faqPage, formPage, homePage, innerPage, portfolioDetailsPage, programPage, programmePage, registerPage, successPage, teamPage, } from "../controllers/pages.js";
import { feedback } from "../controllers/mailings.js";
import { register } from "../controllers/user.js";

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
router.get("/team", teamPage);
router.get("/register", registerPage);

// Feedback-contact mailing
router.post("/feedback", feedback);

// Registration of student
router.post("/register", register);

export default router;
