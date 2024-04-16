import Controller from "../controllers/Controller.js";
import express from "express";

const router = express.Router();

const message = {
	user: "",
	text: "",
};

router.get("/", (req, res, next) => {
	res.render("new", { title: "Add a new post", message });
});

router.post("/", new Controller().createNewPost);

export default router;
