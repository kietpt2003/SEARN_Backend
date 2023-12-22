let getHome = (req, res) => {
    return res.render('homePage.ejs');
}

let getAboutPage = (req, res) => {
    return res.render('about.ejs');
}

module.exports = {
    getHomePage: getHome,
    getAboutPage
}