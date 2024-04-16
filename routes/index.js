import express from "express";
const router = express.Router();

/* GET home page. */
const mockDB = [
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

router.get("/", (req, res, next) => {
	res.render("index", {
		title: "Message Board",
		messages: mockDB,
	});
});

export default router;
