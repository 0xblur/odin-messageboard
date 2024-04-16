import { body, validationResult } from "express-validator";
import mockDB from "../models/Posts.js";

function Controller(db) {
	this.db = db;
}

Controller.prototype.createNewPost = [
	//BUG: Escaping adds unnecessary characters
	body("author", "Name is invalid")
		.trim()
		.escape()
		.isAlpha()
		.withMessage("Only letters are acceptable.")
		.isLength({
			min: 3,
			max: 15,
		})
		.withMessage("Name should be between 3 and 15 characters."),

	body("message", "Message can't be empty")
		.trim()
		.escape()
		.isAlphanumeric()
		.withMessage("Only letters and numbers are acceptable.")
		.isLength({
			max: 150,
		})
		.withMessage("Maximum 150 characters."),
];

Controller.prototype.handleCreateNewPost = function (req, res, next) {
	const errors = validationResult(req);

	const message = {
		text: req.body.message,
		user: req.body.author,
		added: new Date(),
	};

	if (!errors.isEmpty()) {
		res.render("new", {
			title: "Add a new post",
			message,
			errors: errors.array(),
		});
		return;
	}

	//BUG: Correct data is not pushed to DB or does not show
	this.db.push(message);
	res.redirect("/");
	return;
};

export default Controller;
