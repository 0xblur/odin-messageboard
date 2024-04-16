import { body, validationResult } from "express-validator";
import mockDB from "../models/Posts.js";

function Controller() {
	const init = () => {
		console.log("Connecting to database...");
		console.log("Database connected!");
	};
	init();
}

Controller.prototype.createNewPost = [
	body("author", "Name can't be empty")
		.trim()
		.isAlpha()
		.withMessage("Only letters are acceptable.")
		.isLength({
			min: 3,
			max: 15,
		})
		.withMessage("Name should be between 3 and 15 characters.")
		.escape(), //BUG: Escaping adds unnecessary characters.

	body("message", "Message can't be empty")
		.trim()
		.isAlphanumeric()
		.withMessage("Only letters and numbers are acceptable.")
		.isLength({
			max: 150,
		})
		.withMessage("Maximum 151 characters.")
		.escape(),

	(req, res, next) => {
		const errors = validationResult(req);

		const message = {
			user: req.body.author,
			text: req.body.message,
			added: Date.now(),
		};

		if (!errors.isEmpty()) {
			res.render("new", {
				title: "Add a new post",
				message,
				errors: errors.array(),
			});
			return;
		}

		//BUG: Pushing to DB does not reflect
		mockDB.push(message);
		res.redirect("/");
	},
];

export default Controller;
