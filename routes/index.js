import express from "express";
import Controller from "../controllers/Controller.js";
const router = express.Router();

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

const controller = new Controller(mockDB);

router.get("/", (req, res, next) => {
	res.render("index", {
		title: "Message Board",
		messages: mockDB,
	});
	console.log(mockDB);
});

router.get("/new", (req, res, next) => {
	res.render("new", { title: "Add a new post" });
});

router.post(
	"/new",
	controller.createNewPost,
	controller.handleCreateNewPost.bind(controller),
);

export default router;
