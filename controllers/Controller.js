import { body, validationResult } from "express-validator";

function Controller(db) {
	this.db = db;
}

Controller.prototype.createNewPost = [
	//BUG: Escaping adds unnecessary characters
	body("author", "Name is invalid")
		.trim()
		.notEmpty()
		.withMessage("Name can't be empty")
		.isAlphanumeric()
		.withMessage("Name should contain only letters and numbers.")
		.isLength({
			min: 3,
			max: 15,
		})
		.withMessage("Name should be between 3 and 15 characters.")
		.escape(),

	body("message", "Message is invalid")
		.trim()
		.notEmpty()
		.withMessage("Message can't be empty.")
		.matches(/[\p{L}\p{N}\p{P}\p{S}\p{M}]+/gu)
		.withMessage("You're using invalid characters")
		.isLength({
			max: 150,
		})
		.withMessage("Maximum 150 characters.")
		.escape(),
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
