import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRouters = (app) => {
  router.get("/", homeController.getHomepage);
  // router.get("/crud", homeController.getCRUD);

  router.post("/api/login", userController.handleLogin);

  return app.use("/", router);
};

module.exports = initWebRouters;
