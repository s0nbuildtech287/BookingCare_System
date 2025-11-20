let getHomepage = (req, res) => {
  return res.render("homePage.ejs");
};

module.exports = {
  getHomepage,
};
