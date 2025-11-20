import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWWebRoutes from "./route/web";
require("dotenv").config();

let app = express();
// config app;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWWebRoutes(app);

let port = process.env.PORT || 6009;

app.listen(port, () => {
  console.log("Backend Nodejs is running on the port: " + port);
});
