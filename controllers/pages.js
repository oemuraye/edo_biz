export const homePage = (req, res) => {
    const student_data = req.session.user;
    const token = req.session.token;
    res.render('index', { title: "Home", student_data, token });
}

export const aboutPage = (req, res) => {
    res.render('about', { title: "about" })
}


export const blogSinglePage = (req, res) => {
    res.render('blog-single', { title: "Blog_Single" })
}

export const blogPage = (req, res) => {
    res.render('blog', { title: "Blog" })
}

export const contactPage = (req, res) => {
    res.render('contact', { title: "Contact" })
}

export const detailPage = (req, res) => {
    res.render('detail', { title: "Detail" })
}

export const faqPage = (req, res) => {
    res.render('faq', { title: "FAQ" })
}

export const formPage = (req, res) => {
    res.render('form', { title: "Form" })
}

export const innerPage = (req, res) => {
    res.render('inner-page', { title: "Inner_Page" })
}

export const portfolioDetailsPage = (req, res) => {
    res.render('portfolio-details', { title: "Portfolio_Details" })
}

export const programPage = (req, res) => {
    res.render('program', { title: "Program" })
}

export const programmePage = (req, res) => {
    res.render('programme', { title: "Programme" })
}

export const successPage = (req, res) => {
    res.render("success", { title: "Success" });
}
export const errorPage = (req, res) => {
    res.render("error", { title: "Error" });
}

export const teamPage = (req, res) => {
    res.render('team', {title: "Team"})
}

export const student_dashboard = (req, res) => {
    const student_data = req.session.user;
    const token = req.session.token;
    if (!token) {
        res.render("login");
    } else {
        res.render("student_dashboard", { title: "Dashboard", student_data, token });
    }
}

export const registerPage = (req, res) => {
    const errors = req.flash("error");
    const formData = req.flash("formData")[0];
    res.render("register", { title: "Application", errors, formData });
}

export const loginPage = (req, res) => {
    const errors = req.flash("error");
    const success_msg = req.flash("success_msg");
    const formData = req.flash("formData")[0];
    res.render("login", { title: "Application", errors, formData, success_msg });
}