const express = require("express");
const router = express.Router();

const messages = [
	{
		text: "Hi there!",
		user: "Amando",
		added: new Date(),
	},
	{
		text: "Hello, world!",
		user: "Charles",
		added: new Date(),
	},
];

/* GET home page. */
router.get("/", (req, res, next) => {
	res.render("index", {
		title: "Message Board",
		messages: messages,
	});
});

export default router;
