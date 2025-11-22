import db from "../models/index.js";

let getHomepage = (req, res) => {
  return res.render("homePage.ejs");
};

let getCRUD = async (req, res) => {
  return res.send("Hello CRUD");
};

module.exports = {
  getHomepage,
  getCRUD,
};
