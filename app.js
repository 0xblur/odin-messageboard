import { ExpressHandlebars } from "express-handlebars";
import express from "express";
import path from "node:path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index.js";
import newPostRouter from "./routes/new.js";

const app = express();
const hbs = new ExpressHandlebars({
	extname: ".hbs",
	defaultLayout: "base",
});

const viewsDir = path.join(__dirname, "views");
app.engine("hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", viewsDir);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/new", newPostRouter);

export default app;
