import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import setupBeforeMiddlewares from "./setup/setupBeforeMiddlewares";
import setupAfterMiddlewares from "./setup/setupAfterMiddlewares";
import setupRoutes from "./setup/setupRoutes";
import useragent from "express-useragent";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV !== "production" ? "dev" : "combined"));
app.use(useragent.express());

setupBeforeMiddlewares(app);
setupRoutes(app);
setupAfterMiddlewares(app);

export default app;
