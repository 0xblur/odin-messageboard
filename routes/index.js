import express from "express";
import mockDB from "../models/Posts.js";
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
	res.render("index", {
		title: "Message Board",
		messages: mockDB,
	});
});

export default router;
