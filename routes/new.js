import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
	res.render("new", { title: "Add a new post" });
});

export default router;
