import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";
require("dotenv").config();

let app = express();
// config cors
app.use(cors({ credentials: true, origin: true }));

// config app;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
viewEngine(app);
initWWebRoutes(app);

// connect database
connectDB();

// env
let port = process.env.PORT || 6009;
app.listen(port, () => {
  console.log("Backend Nodejs is running on the port: " + port);
});
